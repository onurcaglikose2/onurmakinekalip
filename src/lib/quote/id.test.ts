import { describe, expect, it } from "vitest";
import { createQuoteId } from "./id";

describe("createQuoteId", () => {
  it("OMK-yıl-altı hane formatında numara üretir", () => {
    const id = createQuoteId(new Date("2026-07-28T12:00:00Z"));
    expect(id).toMatch(/^OMK-2026-\d{6}$/);
  });

  it("verilen tarihin yılını kullanır", () => {
    expect(createQuoteId(new Date("2030-01-01")).slice(0, 8)).toBe("OMK-2030");
  });
});
