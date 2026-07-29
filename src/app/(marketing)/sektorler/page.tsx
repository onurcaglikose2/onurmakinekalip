import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaSection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { sectors } from "@/content/sectors";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Hizmet Verilen Sektörler",
  description:
    "Makine üretimi, otomasyon, bakım, kalıp, metal aksesuar, marpuç, ambalaj ve genel sanayi için CNC parça üretim çözümleri.",
  path: "/sektorler",
  keywords: [
    "sanayi yedek parça imalatı",
    "otomasyon parça üretimi",
    "marpuç metal parça üretimi",
    "makine parçası imalatı",
  ],
});

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Hizmet verilen sektörler"
        title="Sektör etiketinden önce parçanın işlevine bakıyoruz"
        description="Farklı işletmelerin ihtiyacı aynı tezgâhtan geçebilir; fakat malzeme, kullanım alanı, adet ve kontrol gereksinimi her projede yeniden değerlendirilir."
        current="Sektörler"
        index="04"
        sideTitle="Hizmet yaklaşımı"
        sideItems={[
          "Teknik gereksinime göre",
          "Sertifika iddiası olmadan",
          "Proje bazlı değerlendirme",
        ]}
      />
      <section className="sectors-section">
        <Container>
          <div className="sectors-intro">
            <span>10 / UYGULAMA ALANI</span>
            <p>
              Aşağıdaki sektörler mevcut CNC, torna ve freze kabiliyetlerimizle
              değerlendirilebilecek tipik ihtiyaç alanlarını gösterir.
            </p>
          </div>
          <div className="sectors-grid">
            {sectors.map((sector, index) => (
              <article key={sector.name}>
                <div className="sector-heading">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{sector.name}</h2>
                </div>
                <dl>
                  <div>
                    <dt>Tipik ihtiyaç</dt>
                    <dd>{sector.need}</dd>
                  </div>
                  <div>
                    <dt>Üretim yaklaşımı</dt>
                    <dd>{sector.solution}</dd>
                  </div>
                </dl>
                <div className="sector-parts">
                  <span>Örnek parçalar</span>
                  <ul>
                    {sector.parts.map((part) => (
                      <li key={part}>{part}</li>
                    ))}
                  </ul>
                </div>
                <div className="sector-capabilities">
                  {sector.capabilities.map((capability) => (
                    <small key={capability}>{capability}</small>
                  ))}
                </div>
                <Link href="/teklif-al">
                  Bu sektör için teklif alın
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="sector-boundary">
        <Container>
          <p className="eyebrow eyebrow-light">
            <span aria-hidden="true" />
            Teknik dürüstlük
          </p>
          <h2>
            Belgelendirme isteyen işler, gereksinimleri görülmeden kabul edilmez
          </h2>
          <p>
            Savunma, havacılık, medikal veya özel sertifikasyon gerektiren
            projelerde deneyim ya da belge iddiasında bulunmuyoruz. Her talep;
            teknik şartname, izlenebilirlik ve kontrol beklentisi görüldükten
            sonra değerlendirilir.
          </p>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
