import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import type { StorageMode, StoredFile } from "@/lib/storage";

const uploadPlanSchema = z.object({
  version: z.literal(1),
  quoteId: z.string().regex(/^OMK-\d{4}-\d{6}$/),
  mode: z.enum(["demo", "supabase", "r2"]),
  expiresAt: z.number().int().positive(),
  files: z
    .array(
      z.object({
        originalName: z.string().min(1).max(255),
        storageKey: z.string().min(1).max(500),
        size: z.number().int().positive(),
        type: z.string().max(160),
      }),
    )
    .max(5),
});

export type UploadPlan = z.infer<typeof uploadPlanSchema>;

function signingSecret() {
  return (
    process.env.QUOTE_UPLOAD_SIGNING_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.R2_SECRET_ACCESS_KEY ||
    process.env.TURNSTILE_SECRET_KEY ||
    "omk-demo-upload-plan"
  );
}

function signature(value: string) {
  return createHmac("sha256", signingSecret())
    .update(value)
    .digest("base64url");
}

export function createUploadToken(input: {
  quoteId: string;
  mode: StorageMode;
  files: StoredFile[];
  now?: number;
}) {
  const payload: UploadPlan = {
    version: 1,
    quoteId: input.quoteId,
    mode: input.mode,
    expiresAt: (input.now ?? Date.now()) + 15 * 60 * 1000,
    files: input.files.map((file) => ({
      originalName: file.originalName,
      storageKey: file.storageKey,
      size: file.size ?? 0,
      type: file.type ?? "",
    })),
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${signature(encoded)}`;
}

export function verifyUploadToken(token: string, now = Date.now()) {
  const [encoded, suppliedSignature, extra] = token.split(".");
  if (!encoded || !suppliedSignature || extra) return null;

  const expectedSignature = signature(encoded);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  if (
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  ) {
    return null;
  }

  try {
    const parsed = uploadPlanSchema.safeParse(
      JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")),
    );
    if (!parsed.success || parsed.data.expiresAt < now) return null;
    return parsed.data;
  } catch {
    return null;
  }
}
