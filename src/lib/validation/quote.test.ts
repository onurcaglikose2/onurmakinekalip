import { describe, expect, it } from "vitest";
import {
  isValidPhone,
  maxFileSize,
  quoteSchema,
  sanitizeFileName,
  validateFile,
} from "./quote";

const validQuote = {
  fullName: "Ayşe Yılmaz",
  companyName: "Örnek Makine",
  phone: "0555 123 45 67",
  email: "ayse@example.com",
  requestType: "Hassas CNC parça" as const,
  quantity: "25 adet",
  description: "Teknik resimdeki bağlantı parçası için üretim talebidir.",
  material: "Alüminyum",
  deliveryDate: "",
  dimensions: "100 × 50 × 20 mm",
  city: "İstanbul",
  sampleAvailable: false,
  confidentiality: false,
  contactPreference: "E-posta" as const,
  kvkk: true,
  marketingConsent: false,
  website: "",
  turnstileToken: "",
};

describe("quoteSchema", () => {
  it("geçerli teklif verisini kabul eder", () => {
    expect(quoteSchema.safeParse(validQuote).success).toBe(true);
  });

  it("geçersiz e-posta ve KVKK onayını reddeder", () => {
    const result = quoteSchema.safeParse({
      ...validQuote,
      email: "gecersiz",
      kvkk: false,
    });
    expect(result.success).toBe(false);
  });
});

describe("telefon doğrulama", () => {
  it.each(["0555 123 45 67", "+90 555 123 45 67", "5551234567"])(
    "%s numarasını kabul eder",
    (phone) => expect(isValidPhone(phone)).toBe(true),
  );

  it("eksik numarayı reddeder", () => {
    expect(isValidPhone("555 12")).toBe(false);
  });
});

describe("dosya doğrulama", () => {
  it("geçerli PDF dosyasını kabul eder", () => {
    const file = new File(["drawing"], "parca.pdf", {
      type: "application/pdf",
    });
    expect(validateFile(file)).toEqual({ valid: true });
  });

  it("çalıştırılabilir dosyayı reddeder", () => {
    const file = new File(["binary"], "zararli.exe", {
      type: "application/x-msdownload",
    });
    expect(validateFile(file).valid).toBe(false);
  });

  it("25 MB üzerindeki dosyayı reddeder", () => {
    expect(
      validateFile({
        name: "parca.step",
        type: "application/octet-stream",
        size: maxFileSize + 1,
      }).valid,
    ).toBe(false);
  });

  it("dosya adını güvenli hale getirir", () => {
    expect(sanitizeFileName("../../Özel Parça (1).STEP")).toBe(
      "Ozel-Parca-1.step",
    );
  });
});
