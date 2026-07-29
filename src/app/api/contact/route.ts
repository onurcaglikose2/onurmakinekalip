import { NextResponse } from "next/server";
import { company } from "@/content/company";
import { createQuoteId } from "@/lib/quote/id";
import { checkRateLimit } from "@/lib/quote/rate-limit";
import { contactSchema, sanitizeContactInput } from "@/lib/validation/contact";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char] ?? char,
  );
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "contact";
  const rate = checkRateLimit(`contact:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Lütfen birkaç dakika bekleyip tekrar deneyin.",
      },
      { status: 429 },
    );
  }

  try {
    const raw = sanitizeContactInput(
      (await request.json()) as Record<string, unknown>,
    );
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Form alanlarını kontrol edin.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const reference = createQuoteId();
    const apiKey = process.env.RESEND_API_KEY;
    const notificationEmail =
      process.env.QUOTE_NOTIFICATION_EMAIL ?? company.email;

    if (apiKey && notificationEmail) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Onur Makine İletişim <info@onurmakinekalip.com>",
          to: [notificationEmail],
          reply_to: parsed.data.email,
          subject: `${reference} — ${parsed.data.subject}`,
          html: `
            <h1>Yeni iletişim mesajı</h1>
            <p><strong>Referans:</strong> ${reference}</p>
            <p><strong>Ad soyad:</strong> ${escapeHtml(parsed.data.fullName)}</p>
            <p><strong>E-posta:</strong> ${escapeHtml(parsed.data.email)}</p>
            <p><strong>Telefon:</strong> ${escapeHtml(parsed.data.phone || "Belirtilmedi")}</p>
            <p><strong>Konu:</strong> ${escapeHtml(parsed.data.subject)}</p>
            <p>${escapeHtml(parsed.data.message).replace(/\n/g, "<br>")}</p>
          `,
        }),
      });
      if (!response.ok) throw new Error("email");
    }

    return NextResponse.json({
      ok: true,
      reference,
      message: "Mesajınız alındı. En kısa sürede sizinle iletişime geçeceğiz.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Mesajınız şu anda gönderilemedi. Lütfen telefon veya e-posta ile ulaşın.",
      },
      { status: 500 },
    );
  }
}
