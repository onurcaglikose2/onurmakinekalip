import { z } from "zod";

export const requestTypes = [
  "Büyük parça CNC işleme",
  "Hassas CNC parça",
  "Torna işi",
  "Kalıp, aparat veya fikstür",
  "Seri üretim",
  "Marpuç veya metal aksesuar bileşeni",
  "Numuneye göre üretim",
  "Diğer",
] as const;

export const contactPreferences = [
  "Telefon",
  "E-posta",
  "WhatsApp",
  "Fark etmez",
] as const;

const phonePattern =
  /^(?:\+?90|0)?\s*\(?5\d{2}\)?(?:[\s.-]*\d{3})(?:[\s.-]*\d{2}){2}$/;

export const quoteSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalıdır.")
    .max(80, "Ad soyad en fazla 80 karakter olabilir."),
  companyName: z
    .string()
    .trim()
    .min(2, "Firma adı en az 2 karakter olmalıdır.")
    .max(120, "Firma adı en fazla 120 karakter olabilir."),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Geçerli bir Türkiye cep telefonu numarası girin."),
  email: z
    .email("Geçerli bir e-posta adresi girin.")
    .max(160, "E-posta adresi çok uzun."),
  requestType: z.enum(requestTypes, {
    error: "Talep türünü seçin.",
  }),
  quantity: z
    .string()
    .trim()
    .min(1, "Üretim adedini belirtin.")
    .max(60, "Üretim adedi bilgisi çok uzun."),
  description: z
    .string()
    .trim()
    .min(20, "İhtiyacınızı en az 20 karakterle açıklayın.")
    .max(3000, "Açıklama en fazla 3000 karakter olabilir."),
  material: z.string().trim().max(80).optional().or(z.literal("")),
  deliveryDate: z.string().trim().max(40).optional().or(z.literal("")),
  dimensions: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  sampleAvailable: z.boolean(),
  confidentiality: z.boolean(),
  contactPreference: z.enum(contactPreferences),
  kvkk: z
    .boolean()
    .refine(
      Boolean,
      "Teklif talebi için KVKK aydınlatma metnini onaylamalısınız.",
    ),
  marketingConsent: z.boolean(),
  website: z.string().max(0, "Geçersiz form gönderimi.").optional(),
  turnstileToken: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const maxFileCount = 5;
export const maxFileSize = 25 * 1024 * 1024;

export const allowedFileExtensions = [
  "pdf",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "dxf",
  "dwg",
  "step",
  "stp",
  "iges",
  "igs",
  "zip",
] as const;

const visualMimeTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/zip",
  "application/x-zip-compressed",
]);

const cadExtensions = new Set(["dxf", "dwg", "step", "stp", "iges", "igs"]);
const cadMimeTypes = new Set([
  "application/octet-stream",
  "application/acad",
  "application/dxf",
  "image/vnd.dwg",
  "application/step",
  "model/step",
  "model/iges",
  "",
]);

export type FileValidationResult =
  { valid: true } | { valid: false; message: string };

export function validateFile(
  file: Pick<File, "name" | "size" | "type">,
): FileValidationResult {
  const extension = file.name.toLowerCase().split(".").pop() ?? "";

  if (
    !allowedFileExtensions.includes(
      extension as (typeof allowedFileExtensions)[number],
    )
  ) {
    return {
      valid: false,
      message: `${file.name}: Dosya türü desteklenmiyor.`,
    };
  }

  if (file.size <= 0) {
    return { valid: false, message: `${file.name}: Dosya boş görünüyor.` };
  }

  if (file.size > maxFileSize) {
    return {
      valid: false,
      message: `${file.name}: Dosya 25 MB sınırını aşıyor.`,
    };
  }

  const mimeValid = cadExtensions.has(extension)
    ? cadMimeTypes.has(file.type)
    : visualMimeTypes.has(file.type);

  if (!mimeValid) {
    return {
      valid: false,
      message: `${file.name}: Dosya içeriği ile uzantısı eşleşmiyor.`,
    };
  }

  return { valid: true };
}

export function sanitizeFileName(fileName: string) {
  const parts = fileName.split(".");
  const extension = parts.length > 1 ? `.${parts.pop()?.toLowerCase()}` : "";
  const base = parts
    .join(".")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
  return `${base || "dosya"}${extension}`;
}

export function sanitizeText(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

export function isValidPhone(value: string) {
  return phonePattern.test(value.trim());
}
