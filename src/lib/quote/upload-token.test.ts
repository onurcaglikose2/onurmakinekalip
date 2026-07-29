import { describe, expect, it } from "vitest";
import { createUploadToken, verifyUploadToken } from "./upload-token";

const plan = {
  quoteId: "OMK-2026-000123",
  mode: "demo" as const,
  files: [
    {
      originalName: "parca.step",
      storageKey: "demo/OMK-2026-000123/parca.step",
      size: 1024,
      type: "application/octet-stream",
    },
  ],
};

describe("upload plan token", () => {
  it("imzalı dosya planını doğrular", () => {
    const token = createUploadToken({ ...plan, now: 1_000 });
    expect(verifyUploadToken(token, 2_000)).toMatchObject({
      quoteId: plan.quoteId,
      mode: "demo",
      files: plan.files,
    });
  });

  it("değiştirilmiş veya süresi dolmuş tokenı reddeder", () => {
    const token = createUploadToken({ ...plan, now: 1_000 });
    expect(verifyUploadToken(`${token}x`, 2_000)).toBeNull();
    expect(verifyUploadToken(token, 1_000 + 16 * 60 * 1000)).toBeNull();
  });
});
