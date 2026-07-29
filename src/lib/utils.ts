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
  const digits = digitsOnly(phone);
  const number =
    digits.length === 11 && digits.startsWith("0")
      ? `90${digits.slice(1)}`
      : digits.length === 10
        ? `90${digits}`
        : digits;
  const text =
    message ??
    "Merhaba size web siteniz üzerinden ulaşıyorum. CNC üretimi için fiyat ve üretilebilirlik bilgisi almak istiyorum.";
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
