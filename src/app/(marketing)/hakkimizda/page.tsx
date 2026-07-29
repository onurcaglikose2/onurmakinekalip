import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { CtaSection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { company } from "@/content/company";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Hakkımızda",
  description:
    "Onur Makine Kalıp; İstanbul İkitelli’de ustalık, CNC teknolojisi ve küçük işletme çevikliğini birleştiren üretim ortağıdır.",
  path: "/hakkimizda",
  keywords: [
    "Onur Makine Kalıp",
    "İkitelli CNC imalat",
    "İstanbul talaşlı imalat",
  ],
});

const values = [
  {
    title: "Teknik dürüstlük",
    text: "Yapabildiğimiz işi somut kabiliyetle anlatır, doğrulanmamış değer veya sertifika iddiası kullanmayız.",
  },
  {
    title: "Ölçü ve iş takibi",
    text: "Parçanın kritik noktalarını ve üretim sırasını proje gereksinimine göre izleriz.",
  },
  {
    title: "Hızlı iletişim",
    text: "Talepler, gereksiz iletişim katmanları olmadan doğrudan üretim ekibine ulaşır.",
  },
  {
    title: "Esnek üretim",
    text: "Tek bakım parçasından düzenli seri işe kadar farklı üretim modellerini değerlendiririz.",
  },
  {
    title: "Uzun vadeli iş ortaklığı",
    text: "Bir parçanın yanında, sonraki üretim ve bakım ihtiyaçlarını da anlayan ilişki kurmayı önemseriz.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Ustalıkla CNC teknolojisinin aynı atölyedeki karşılığı"
        description="Onur Makine Kalıp, talaşlı imalat alanındaki saha tecrübesini CNC işleme teknolojisiyle birleştiren İstanbul merkezli çevik bir üretim işletmesidir."
        current="Hakkımızda"
        index="06"
        sideTitle="Konumlandırma"
        sideItems={[
          "Küçük ve çevik yapı",
          "Doğrudan üretim iletişimi",
          "Büyük ve küçük parça",
        ]}
      />
      <section className="about-story">
        <Container>
          <div className="about-story-copy">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Üretim yaklaşımımız
            </p>
            <h2>
              Küçük yapı, karar ve üretim arasında daha kısa mesafe demektir
            </h2>
            <div className="about-copy-columns">
              <p>
                Büyük sanayi parçalarından küçük ve tekrarlı bileşenlere kadar
                farklı ölçeklerde üretim yapar; teknik resim, numune veya
                kullanım ihtiyacına göre projeye özel çözümler geliştiririz.
              </p>
              <p>
                Üç CNC merkezi ile iki yardımcı tezgâhımızı dev bir fabrika
                görüntüsü yaratmak için değil; doğru işi doğru üretim düzenine
                yönlendirmek için kullanırız.
              </p>
            </div>
          </div>
          <div className="about-workshop-visual">
            <Image
              src="/images/machinery/cnc-large.svg"
              alt="Atölyenin büyük parça CNC kabiliyetini temsil eden teknik görsel"
              fill
              sizes="(max-width: 900px) 100vw, 70vw"
            />
            <span>ATÖLYE / BÜYÜK CNC / TEKNİK TEMSİL</span>
          </div>
        </Container>
      </section>
      <section className="about-capacity">
        <Container>
          <div>
            <strong>{company.foundedYear}</strong>
            <span>Kuruluş yılı</span>
            <small>Yayın öncesi doğrulanacaktır</small>
          </div>
          <div>
            <strong>{company.experienceYears}</strong>
            <span>Yıllık sektör tecrübesi</span>
            <small>Talaşlı imalat sahası</small>
          </div>
          <div>
            <strong>3+2</strong>
            <span>Üretim tezgâhı</span>
            <small>CNC + yardımcı tezgâh</small>
          </div>
          <div>
            <strong>1→∞</strong>
            <span>Üretim modeli</span>
            <small>Tek parçadan seriye</small>
          </div>
        </Container>
      </section>
      <section className="about-timeline">
        <Container>
          <div className="timeline-heading">
            <p className="eyebrow eyebrow-light">
              <span aria-hidden="true" />
              Gelişim çizgisi
            </p>
            <h2>Ustalık, kapasite ve tekrar disiplini</h2>
          </div>
          <ol>
            <li>
              <span>01</span>
              <ArrowDownRight aria-hidden="true" />
              <h3>Saha tecrübesi</h3>
              <p>
                Talaşlı imalat, bakım parçası ve özel üretim ihtiyaçlarında
                uygulamaya dayalı bilgi birikimi.
              </p>
            </li>
            <li>
              <span>02</span>
              <ArrowDownRight aria-hidden="true" />
              <h3>CNC kapasitesi</h3>
              <p>
                Büyük işleme alanı ile küçük hassas parça düzeninin aynı
                atölyede bir araya gelmesi.
              </p>
            </li>
            <li>
              <span>03</span>
              <ArrowDownRight aria-hidden="true" />
              <h3>Tekrarlı üretim</h3>
              <p>
                Marpuç metal bileşenleriyle gelişen ölçü, bağlantı ve parti
                tutarlılığı disiplini.
              </p>
            </li>
            <li>
              <span>04</span>
              <ArrowDownRight aria-hidden="true" />
              <h3>Çevik üretim ortağı</h3>
              <p>
                Teknik resimden numuneye, tek parçadan seriye talepleri doğrudan
                değerlendiren yapı.
              </p>
            </li>
          </ol>
        </Container>
      </section>
      <section className="about-values">
        <Container>
          <div className="about-values-heading">
            <span>05 / DEĞER</span>
            <h2>İşin kendisini anlatan çalışma ilkeleri</h2>
          </div>
          <div className="values-list">
            {values.map((value, index) => (
              <article key={value.title}>
                <span>0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
