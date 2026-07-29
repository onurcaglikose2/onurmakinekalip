export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function digitsOnly(value?: string) {
  return value?.replace(/\D/g, "") ?? "";
}

export function toPhoneUrl(phone?: string) {
  if (!phone) return "#";
  const normalized = phone.trim().startsWith("+")
    ? `+${digitsOnly(phone)}`
    : digitsOnly(phone);
  return `tel:${normalized}`;
}

export function toWhatsAppUrl(phone?: string, message?: string) {
  const number = digitsOnly(phone);
  const text =
    message ??
    "Merhaba, CNC üretimi için fiyat ve üretilebilirlik bilgisi almak istiyorum.";
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(text)}`
    : "#";
}

export function toMailUrl(email?: string, subject?: string) {
  if (!email) return "#";
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

export function absoluteUrl(path = "") {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.onurmakinekalip.com";
  return new URL(path, base).toString();
}
