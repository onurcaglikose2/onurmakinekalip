import { z } from "zod";
import { sanitizeText } from "./quote";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Ad soyad gereklidir.").max(80),
  email: z.email("Geçerli bir e-posta adresi girin.").max(160),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().min(3, "Konu gereklidir.").max(120),
  message: z
    .string()
    .trim()
    .min(15, "Mesajınız en az 15 karakter olmalıdır.")
    .max(2000),
  kvkk: z.boolean().refine(Boolean, "KVKK onayı gereklidir."),
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function sanitizeContactInput(input: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      typeof value === "string" ? sanitizeText(value) : value,
    ]),
  );
}
