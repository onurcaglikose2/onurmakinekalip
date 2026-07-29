import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { CapabilityIcon } from "@/components/capabilities/capability-icon";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaSection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { capabilities } from "@/content/capabilities";
import { company } from "@/content/company";
import { machinery } from "@/content/machinery";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Üretim Kabiliyetleri",
  description:
    "Büyük parça CNC işleme, hassas frezeleme, torna, kalıp-aparat, numuneye göre parça ve seri üretim kabiliyetlerini inceleyin.",
  path: "/uretim-kabiliyetleri",
  keywords: [
    "büyük parça CNC işleme",
    "hassas CNC işleme",
    "CNC freze hizmeti",
    "CNC torna hizmeti",
    "kalıp ve aparat üretimi",
  ],
});

const visualMap = {
  large: "/images/machinery/cnc-large.svg",
  precision: "/images/machinery/cnc-precision.svg",
  lathe: "/images/machinery/lathe.svg",
  fixture: "/images/projects/fixture.svg",
  sample: "/images/projects/sample.svg",
  series: "/images/projects/connector.svg",
};

export default function CapabilitiesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Onur Makine Kalıp üretim kabiliyetleri",
    itemListElement: capabilities.map((capability, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: capability.title,
        description: capability.summary,
        provider: { "@id": `${company.domain}/#organization` },
        areaServed: "Türkiye",
      },
    })),
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <PageHero
        eyebrow="Üretim kabiliyetleri"
        title="Parçanın ihtiyacına göre seçilen doğru üretim yolu"
        description="Büyük gövdeden küçük adaptöre, tek bakım parçasından tekrarlı üretime kadar her işi geometri, malzeme ve adet bilgisiyle birlikte değerlendiriyoruz."
        current="Üretim Kabiliyetleri"
        index="01"
        sideTitle="Kapsam"
        sideItems={[
          "Büyük ve küçük parça ayrımı",
          "Tek parçadan seri üretime",
          "Teknik resim veya numune",
        ]}
      />
      <section className="capability-details">
        <Container>
          <div className="detail-index-bar">
            <span>06 ÜRETİM KABİLİYETİ</span>
            <p>
              Her bölüm, hizmetin ne olduğunu değil hangi üretim ihtiyacını
              çözdüğünü açıklar.
            </p>
          </div>
          {capabilities.map((capability, index) => {
            const relatedMachines = machinery.filter((machine) =>
              capability.machineIds.includes(machine.id),
            );
            return (
              <article
                id={capability.id}
                key={capability.id}
                className="capability-detail"
              >
                <div className="capability-detail-image">
                  <Image
                    src={visualMap[capability.visual]}
                    alt={`${capability.title} için teknik görsel temsil`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                  <span>
                    0{index + 1} / {capability.eyebrow}
                  </span>
                </div>
                <div className="capability-detail-content">
                  <div className="capability-detail-title">
                    <CapabilityIcon name={capability.icon} size={32} />
                    <div>
                      <p>{capability.eyebrow}</p>
                      <h2>{capability.title}</h2>
                    </div>
                  </div>
                  <p className="detail-lead">{capability.summary}</p>
                  <p>{capability.outcome}</p>
                  <div className="detail-applications">
                    <h3>Tipik uygulamalar</h3>
                    <ul>
                      {capability.applications.map((application) => (
                        <li key={application}>
                          <Check size={15} aria-hidden="true" />
                          {application}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="related-machines">
                    <span>İlgili tezgâhlar</span>
                    {relatedMachines.map((machine) => (
                      <Link
                        key={machine.id}
                        href={`/makine-parkuru#${machine.id}`}
                      >
                        {machine.code}
                      </Link>
                    ))}
                  </div>
                  <Link className="detail-quote-link" href="/teklif-al">
                    Bu kabiliyet için teklif alın
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </Container>
      </section>
      <section className="answer-strip">
        <Container>
          <div>
            <span>TEKNİK RESİM YOKSA</span>
            <p>
              Numune, ölçü veya parça fotoğrafıyla ön değerlendirme yapılabilir.
            </p>
          </div>
          <div>
            <span>TEK PARÇA MÜMKÜN MÜ</span>
            <p>
              Teknik uygunluk ve üretim planına göre tek parça talepleri
              değerlendirilir.
            </p>
          </div>
          <div>
            <span>TEKLİF İÇİN GEREKENLER</span>
            <p>
              Parça verisi, malzeme, adet ve varsa teslim zamanı beklentisi.
            </p>
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
