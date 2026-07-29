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
    "1 adet 1300 × 700 mm dik işleme merkezi, 2 CNC torna, manuel torna ve kalıpçı frezesiyle üretim altyapımızı inceleyin.",
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
        description="Dik işleme, CNC torna, manuel torna ve kalıpçı freze operasyonlarını parçanın geometrisine ve üretim adedine göre planlıyoruz."
        current="Makine Parkuru"
        index="02"
        sideTitle="Üretim altyapısı"
        sideItems={[
          "1 adet 1300 × 700 mm dik işleme merkezi",
          "2 adet CNC torna",
          "1 manuel torna · 1 kalıpçı frezesi",
        ]}
      />
      <section className="machine-summary">
        <Container>
          <div>
            <strong>1</strong>
            <span>Dik işleme merkezi</span>
          </div>
          <p>
            1300 × 700 mm dik işleme merkezi; plaka, gövde, kalıp, aparat ve
            özel parça operasyonlarında kullanılır.
          </p>
          <div>
            <strong>4</strong>
            <span>Torna / freze tezgâhı</span>
          </div>
          <p>
            İki CNC torna, bir manuel torna ve bir kalıpçı frezesi; seri,
            tamamlayıcı, numune ve bakım operasyonlarını destekler.
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
