import { NextResponse } from "next/server";
import { z } from "zod";
import { createQuoteId } from "@/lib/quote/id";
import { checkUploadRateLimit } from "@/lib/quote/rate-limit";
import { verifyTurnstile } from "@/lib/quote/turnstile";
import { createUploadToken } from "@/lib/quote/upload-token";
import { createStorageAdapter } from "@/lib/storage";
import {
  maxFileCount,
  maxFileSize,
  validateFile,
} from "@/lib/validation/quote";

export const runtime = "nodejs";

const uploadRequestSchema = z.object({
  website: z.string().max(0).optional(),
  turnstileToken: z.string().max(3000).optional(),
  files: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(255),
        size: z.number().int().positive().max(maxFileSize),
        type: z.string().max(160),
      }),
    )
    .min(1)
    .max(maxFileCount),
});

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || "local";
  const rate = checkUploadRateLimit(clientIp);

  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Kısa sürede çok sayıda dosya yükleme isteği oluşturdunuz. Lütfen birkaç dakika sonra tekrar deneyin.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfter) },
      },
    );
  }

  try {
    const parsed = uploadRequestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Yüklenecek dosya bilgilerini kontrol edip tekrar deneyin.",
        },
        { status: 400 },
      );
    }

    for (const file of parsed.data.files) {
      const validation = validateFile({
        name: file.name,
        size: file.size,
        type: file.type,
      });
      if (!validation.valid) {
        return NextResponse.json(
          { ok: false, message: validation.message },
          { status: 400 },
        );
      }
    }

    const turnstileValid = await verifyTurnstile(
      parsed.data.turnstileToken,
      clientIp,
    );
    if (!turnstileValid) {
      return NextResponse.json(
        {
          ok: false,
          message: "Güvenlik doğrulaması tamamlanamadı. Lütfen tekrar deneyin.",
        },
        { status: 400 },
      );
    }

    const quoteId = createQuoteId();
    const storage = createStorageAdapter();
    const targets = await Promise.all(
      parsed.data.files.map((file) =>
        storage.createUploadTarget(
          {
            originalName: file.name,
            size: file.size,
            type: file.type,
          },
          quoteId,
        ),
      ),
    );
    const uploadToken = createUploadToken({
      quoteId,
      mode: storage.mode,
      files: targets,
    });

    return NextResponse.json({
      ok: true,
      quoteId,
      storageMode: storage.mode,
      uploadToken,
      targets,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Güvenli dosya yükleme bağlantısı şu anda oluşturulamadı. Lütfen tekrar deneyin.",
      },
      { status: 500 },
    );
  }
}
