import type { Metadata } from "next";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { CtaSection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Üretim Örnekleri",
  description:
    "Büyük plaka, çelik gövde, mil-burç, fikstür, marpuç bağlantısı ve numuneye göre bakım parçası CNC üretim örnekleri.",
  path: "/uretim-ornekleri",
  keywords: [
    "CNC parça örnekleri",
    "alüminyum CNC işleme",
    "çelik CNC işleme",
    "pirinç CNC işleme",
  ],
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Üretim örnekleri"
        title="Kabiliyeti parça, yöntem ve sonuç üzerinden inceleyin"
        description="Başlangıç galerisi; gerçek müşteri adı, tolerans veya teslim süresi iddiası kullanmadan farklı üretim sınıflarını gösterir."
        current="Üretim Örnekleri"
        index="03"
        sideTitle="Filtrelenebilir galeri"
        sideItems={["Büyük ve hassas parça", "Torna ve fikstür", "Seri üretim"]}
      />
      <section className="project-gallery-section">
        <Container>
          <div className="gallery-intro">
            <span>PARÇA / MALZEME / YÖNTEM</span>
            <p>
              Bir karta tıklayarak üretim ihtiyacını, uygulanan yaklaşımı ve
              sonucu inceleyebilirsiniz.
            </p>
          </div>
          <ProjectGallery />
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
