import { expect, test } from "@playwright/test";

test("ana sayfa açılıyor", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Büyük Parçada Güç.*Küçük Parçada Hassasiyet/,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Teknik Resim Gönder" }).first(),
  ).toBeVisible();
});

test("ana sayfa hedef responsive genişliklerde taşma yapmıyor", async ({
  page,
}) => {
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 800 : 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasHorizontalOverflow, `${width}px görünümünde yatay taşma`).toBe(
      false,
    );
  }
});

test("mobil menü açılıp kapanıyor", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menüyü aç" });
  await trigger.click();
  await expect(
    page.getByRole("navigation", { name: "Mobil navigasyon" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Menüyü kapat" }).click();
  await expect(trigger).toBeVisible();
});

test("üretim kabiliyetleri ve makine parkuru sayfaları açılıyor", async ({
  page,
}) => {
  await page.goto("/uretim-kabiliyetleri");
  await expect(
    page.getByRole("heading", { level: 1, name: /Parçanın ihtiyacına göre/ }),
  ).toBeVisible();
  await page.goto("/makine-parkuru");
  await expect(
    page.getByRole("heading", { level: 1, name: /Her tezgâhın görevi net/ }),
  ).toBeVisible();
});

test("proje filtreleri çalışıyor", async ({ page }) => {
  await page.goto("/uretim-ornekleri");
  await page.getByRole("button", { name: /Torna/ }).click();
  await expect(page.getByText("2 üretim örneği gösteriliyor")).toBeVisible();
  await expect(
    page.getByRole("button", { name: /CNC işlenmiş mil ve aparat takımı/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Mil ve burç takımı/ }),
  ).toBeVisible();
});

test("teklif formu zorunlu alanları ve KVKK onayını doğruluyor", async ({
  page,
}) => {
  await page.goto("/teklif-al");
  await page.getByRole("button", { name: "Teklif Talebini Gönder" }).click();
  await expect(page.locator(".form-error-summary")).toContainText(
    "Lütfen işaretli zorunlu alanları kontrol edin.",
  );
  await expect(
    page.getByText(/KVKK aydınlatma metnini onaylamalısınız/),
  ).toBeVisible();
});

test("geçerli demo teklif formu başarı mesajı veriyor", async ({ page }) => {
  await page.goto("/teklif-al");
  await page.getByLabel(/Ad soyad/).fill("Ayşe Yılmaz");
  await page.getByLabel(/Firma adı/).fill("Örnek Makine");
  await page.getByLabel(/^Telefon/).fill("0555 123 45 67");
  await page.getByLabel(/^E-posta/).fill("ayse@example.com");
  await page.getByLabel(/Talep türü/).selectOption("Hassas CNC parça");
  await page.getByLabel(/Üretim adedi/).fill("25 adet");
  await page
    .getByLabel(/Üretim ihtiyacının açıklaması/)
    .fill("Teknik resimdeki bağlantı parçası için üretim talebidir.");
  await page.getByLabel("Teknik dosya seç").setInputFiles({
    name: "teknik-resim.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.4 demo teknik resim"),
  });
  await expect(page.getByText("teknik-resim.pdf")).toBeVisible();
  await page.getByLabel(/KVKK Aydınlatma Metni/).check();
  await page.getByRole("button", { name: "Teklif Talebini Gönder" }).click();
  await expect(page.getByText("Talebiniz alındı.")).toBeVisible();
  await expect(page.getByText(/^OMK-\d{4}-\d{6}$/)).toBeVisible();
});

test("özel 404 sayfası çalışıyor", async ({ page }) => {
  const response = await page.goto("/olmayan-bir-sayfa");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: /işleme alanımızın dışında/ }),
  ).toBeVisible();
});
