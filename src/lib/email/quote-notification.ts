import { company } from "@/content/company";
import type { StoredFile } from "@/lib/storage";
import type { QuoteFormValues } from "@/lib/validation/quote";

type NotificationInput = {
  quoteId: string;
  form: QuoteFormValues;
  files: StoredFile[];
  createdAt: string;
};

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

export async function sendQuoteNotification(input: NotificationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const notificationEmail =
    process.env.QUOTE_NOTIFICATION_EMAIL ?? company.quoteEmail;

  if (!apiKey || !notificationEmail) return { mode: "demo" as const };

  const { form, files, quoteId, createdAt } = input;
  const fileList =
    files.length > 0
      ? files
          .map((file) =>
            file.secureUrl
              ? `<li><a href="${escapeHtml(file.secureUrl)}">${escapeHtml(file.originalName)}</a></li>`
              : `<li>${escapeHtml(file.originalName)} (güvenli depoda)</li>`,
          )
          .join("")
      : "<li>Dosya eklenmedi</li>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Onur Makine Teklif <teklif@onurmakinekalip.com>",
      to: [notificationEmail],
      reply_to: form.email,
      subject: `${quoteId} — ${form.requestType}`,
      html: `
        <h1>Yeni teklif talebi: ${escapeHtml(quoteId)}</h1>
        <p><strong>Gönderim:</strong> ${escapeHtml(createdAt)}</p>
        <p><strong>Ad soyad:</strong> ${escapeHtml(form.fullName)}</p>
        <p><strong>Firma:</strong> ${escapeHtml(form.companyName)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(form.phone)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(form.email)}</p>
        <p><strong>Talep:</strong> ${escapeHtml(form.requestType)}</p>
        <p><strong>Adet:</strong> ${escapeHtml(form.quantity)}</p>
        <p><strong>Malzeme:</strong> ${escapeHtml(form.material || "Belirtilmedi")}</p>
        <p><strong>Termin:</strong> ${escapeHtml(form.deliveryDate || "Belirtilmedi")}</p>
        <p><strong>Açıklama:</strong><br>${escapeHtml(form.description).replace(/\n/g, "<br>")}</p>
        <p><strong>Dosyalar:</strong></p><ul>${fileList}</ul>
      `,
    }),
  });

  if (!response.ok) throw new Error("Bildirim e-postası gönderilemedi.");
  return { mode: "resend" as const };
}
