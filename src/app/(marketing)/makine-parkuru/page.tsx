import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { CtaSection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getVisibleMachineSpecs, machinery } from "@/content/machinery";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Makine Parkuru",
  description:
    "3 CNC işleme merkezi ve 2 yardımcı torna/freze tezgâhıyla büyük parça, hassas parça ve seri üretim altyapımızı inceleyin.",
  path: "/makine-parkuru",
  keywords: [
    "CNC makine parkuru",
    "büyük CNC tezgahı",
    "İkitelli CNC",
    "CNC işleme merkezi",
  ],
});

export default function MachineryPage() {
  return (
    <>
      <PageHero
        eyebrow="Makine parkuru"
        title="Her tezgâhın görevi net, kapasite kullanımı esnek"
        description="Büyük işleme alanı gerektiren özel parçaları ayrı; küçük, detaylı ve tekrarlı parçaları ayrı üretim düzeninde ele alıyoruz."
        current="Makine Parkuru"
        index="02"
        sideTitle="Üretim altyapısı"
        sideItems={[
          "3 CNC işleme merkezi",
          "1 yardımcı torna",
          "1 yardımcı freze",
        ]}
      />
      <section className="machine-summary">
        <Container>
          <div>
            <strong>3</strong>
            <span>CNC merkezi</span>
          </div>
          <p>
            CNC-01 geniş işleme alanı gereken parçalar için; CNC-02 ve CNC-03
            küçük, hassas ve tekrarlı parçalar için planlanır.
          </p>
          <div>
            <strong>2</strong>
            <span>Yardımcı tezgâh</span>
          </div>
          <p>
            Torna ve freze tezgâhları silindirik parçaları, ikinci
            operasyonları, numune ve bakım işlerini destekler.
          </p>
        </Container>
      </section>
      <section className="machine-details">
        <Container>
          {machinery.map((machine, index) => {
            const specs = getVisibleMachineSpecs(machine);
            return (
              <article
                id={machine.id}
                key={machine.id}
                className="machine-detail"
              >
                <div className="machine-detail-visual">
                  <Image
                    src={machine.images[0]}
                    alt={`${machine.name} için teknik görsel temsil`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                  <span>{machine.code}</span>
                </div>
                <div className="machine-detail-content">
                  <p className="machine-order">
                    0{index + 1} / {machine.code}
                  </p>
                  <h2>{machine.name}</h2>
                  <p className="machine-use">{machine.usage}</p>
                  <p>{machine.description}</p>
                  <div className="machine-application-grid">
                    <h3>Üretim rolü</h3>
                    <ul>
                      {machine.applications.map((application) => (
                        <li key={application}>
                          <CheckCircle2 size={16} aria-hidden="true" />
                          {application}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="machine-materials">
                    <span>Proje bazında değerlendirilen malzemeler</span>
                    <div>
                      {machine.materials.map((material) => (
                        <small key={material}>{material}</small>
                      ))}
                    </div>
                  </div>
                  {specs.length > 0 ? (
                    <dl className="machine-specs">
                      {specs.map((spec) => (
                        <div key={spec.label}>
                          <dt>{spec.label}</dt>
                          <dd>{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </div>
              </article>
            );
          })}
        </Container>
      </section>
      <section className="machine-fit-note">
        <Container>
          <span>PARÇA–TEZGÂH EŞLEŞMESİ</span>
          <h2>En büyük tezgâh değil, iş için doğru tezgâh seçilir</h2>
          <p>
            Parça ölçüsü tek başına yeterli değildir. Geometri, bağlama alanı,
            operasyon sayısı, malzeme ve üretim adedi birlikte değerlendirilerek
            uygun üretim yolu belirlenir.
          </p>
        </Container>
      </section>
      <CtaSection title="Parçanızın makine parkurumuza uygunluğunu birlikte değerlendirelim" />
    </>
  );
}
