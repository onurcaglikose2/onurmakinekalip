import { describe, expect, it } from "vitest";
import { absoluteUrl, toMailUrl, toPhoneUrl, toWhatsAppUrl } from "./utils";

describe("iletişim URL yardımcıları", () => {
  it("telefon URL'sini normalize eder", () => {
    expect(toPhoneUrl("+90 555 123 45 67")).toBe("tel:+905551234567");
  });

  it("WhatsApp numarası ve mesajını kodlar", () => {
    const url = toWhatsAppUrl("+90 555 123 45 67", "Merhaba dünya");
    expect(url).toBe("https://wa.me/905551234567?text=Merhaba%20d%C3%BCnya");
  });

  it("e-posta konu satırını kodlar", () => {
    expect(toMailUrl("info@example.com", "Teklif talebi")).toContain(
      "subject=Teklif%20talebi",
    );
  });
});

describe("SEO URL helper", () => {
  it("canonical alan adıyla mutlak URL üretir", () => {
    expect(absoluteUrl("/makine-parkuru")).toBe(
      "https://www.onurmakinekalip.com/makine-parkuru",
    );
  });
});
