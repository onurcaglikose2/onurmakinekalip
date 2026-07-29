import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/quote/rate-limit";
import { createQuoteRequest } from "@/lib/quote/service";
import { verifyTurnstile } from "@/lib/quote/turnstile";
import { verifyUploadToken } from "@/lib/quote/upload-token";
import { createStorageAdapter, type StoredFile } from "@/lib/storage";
import { quoteSchema, sanitizeText } from "@/lib/validation/quote";

export const runtime = "nodejs";

function boolValue(value: unknown) {
  return value === true || value === "true" || value === "on";
}

function textValue(payload: Record<string, unknown>, key: string) {
  const value = payload[key];
  return typeof value === "string" ? sanitizeText(value) : "";
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || "local";
  const rate = checkRateLimit(clientIp);

  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Kısa sürede çok sayıda talep gönderdiniz. Lütfen birkaç dakika sonra tekrar deneyin.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfter) },
      },
    );
  }

  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Bu form güvenli doğrudan yükleme akışını kullanmalıdır. Sayfayı yenileyip tekrar deneyin.",
        },
        { status: 415 },
      );
    }

    const body = (await request.json()) as unknown;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { ok: false, message: "Form verisi geçerli değil." },
        { status: 400 },
      );
    }
    const payload = body as Record<string, unknown>;

    const raw = {
      fullName: textValue(payload, "fullName"),
      companyName: textValue(payload, "companyName"),
      phone: textValue(payload, "phone"),
      email: textValue(payload, "email").toLowerCase(),
      requestType: textValue(payload, "requestType"),
      quantity: textValue(payload, "quantity"),
      description: textValue(payload, "description"),
      material: textValue(payload, "material"),
      deliveryDate: textValue(payload, "deliveryDate"),
      dimensions: textValue(payload, "dimensions"),
      city: textValue(payload, "city"),
      sampleAvailable: boolValue(payload.sampleAvailable),
      confidentiality: boolValue(payload.confidentiality),
      contactPreference:
        textValue(payload, "contactPreference") || "Fark etmez",
      kvkk: boolValue(payload.kvkk),
      marketingConsent: boolValue(payload.marketingConsent),
      website: textValue(payload, "website"),
      turnstileToken: textValue(payload, "turnstileToken"),
    };

    const parsed = quoteSchema.safeParse(raw);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          ok: false,
          message: "Formdaki alanları kontrol edip tekrar deneyin.",
          errors,
        },
        { status: 400 },
      );
    }

    const storage = createStorageAdapter();
    const uploadToken = textValue(payload, "uploadToken");
    const uploadPlan = uploadToken ? verifyUploadToken(uploadToken) : null;

    if (uploadToken && (!uploadPlan || uploadPlan.mode !== storage.mode)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Dosya yükleme oturumu geçersiz veya süresi dolmuş. Dosyaları yeniden seçip tekrar deneyin.",
        },
        { status: 400 },
      );
    }

    if (!uploadPlan) {
      const turnstileValid = await verifyTurnstile(
        parsed.data.turnstileToken,
        clientIp,
      );
      if (!turnstileValid) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Güvenlik doğrulaması tamamlanamadı. Lütfen tekrar deneyin.",
          },
          { status: 400 },
        );
      }
    }

    let quoteId: string | undefined;
    let storedFiles: StoredFile[] = [];

    if (uploadPlan) {
      quoteId = uploadPlan.quoteId;
      storedFiles = await Promise.all(
        uploadPlan.files.map(async (file) => ({
          ...file,
          secureUrl: await storage.createSecureUrl(file.storageKey),
        })),
      );
    }

    const result = await createQuoteRequest(parsed.data, {
      quoteId,
      files: storedFiles,
      storageMode: storage.mode,
    });
    return NextResponse.json({
      ok: true,
      quoteId: result.quoteId,
      demo: result.mode === "demo",
      message:
        "Talebiniz alındı. Teknik ekibimiz dosyanızı inceleyerek mümkün olan en kısa sürede sizinle iletişime geçecektir.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Talebiniz şu anda alınamadı. Lütfen telefon veya e-posta ile bize ulaşın.",
      },
      { status: 500 },
    );
  }
}
