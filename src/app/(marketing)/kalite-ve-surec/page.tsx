import type { Metadata } from "next";
import {
  Check,
  MoveHorizontal,
  PackageCheck,
  Ruler,
  ScanLine,
} from "lucide-react";
import { CtaSection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Kalite ve Üretim Süreci",
  description:
    "Teknik inceleme, üretilebilirlik, operasyon planlama, ilk parça, süreç içi ölçüm, son kontrol ve teslimat yaklaşımımız.",
  path: "/kalite-ve-surec",
  keywords: [
    "CNC kalite kontrol",
    "ilk parça kontrolü",
    "teknik resme göre üretim süreci",
  ],
});

const processSteps = [
  {
    title: "Teknik inceleme",
    text: "Teknik resim, 3D model, numune veya parça fotoğrafı; malzeme, adet ve kullanım bilgisiyle birlikte incelenir.",
    output: "Netleştirilecek kritik bilgiler",
  },
  {
    title: "Üretilebilirlik değerlendirmesi",
    text: "Geometri, takım erişimi, bağlama alanları ve ihtiyaç duyulan operasyonlar üzerinden üretim yolu değerlendirilir.",
    output: "Uygun üretim yaklaşımı",
  },
  {
    title: "Operasyon planlama",
    text: "Referans yüzeyleri, işlem sırası, takım ve bağlama yöntemi parçanın gereksinimine göre planlanır.",
    output: "Takip edilebilir operasyon sırası",
  },
  {
    title: "İlk parça kontrolü",
    text: "Tekrarlı işlerde ilk parçanın belirlenen ölçü ve bağlantı noktaları kontrol edilerek üretime referans oluşturulur.",
    output: "Üretim için kontrol noktaları",
  },
  {
    title: "Süreç içi ölçüm",
    text: "Operasyonlar boyunca kritik ölçüler, yüzeyler ve bağlantı bölgeleri uygun ekipmanla izlenir.",
    output: "Ara kontrol kayıtları",
  },
  {
    title: "Son kontrol",
    text: "Teknik resim veya belirlenen kontrol planına göre son ölçü ve görsel yüzey kontrolleri tamamlanır.",
    output: "Teslimat öncesi değerlendirme",
  },
  {
    title: "Paketleme ve teslimat",
    text: "Parça yüzeyi, geometri ve sevkiyat şekli dikkate alınarak güvenli paketleme yöntemi seçilir.",
    output: "Teslimata hazır parça",
  },
];

const equipment = [
  { name: "Dijital kumpas", icon: MoveHorizontal },
  { name: "Mikrometre", icon: Ruler },
  { name: "Komparatör", icon: ScanLine },
  { name: "İç çap ölçüm ekipmanları", icon: MoveHorizontal },
  { name: "Mastarlar", icon: Check },
  { name: "Görsel yüzey kontrolü", icon: PackageCheck },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Kalite ve üretim süreci"
        title="Doğru parça, doğru hazırlıkla başlar"
        description="Üretim kalitesi yalnızca makinenin kabiliyetine değil; doğru teknik inceleme, takım seçimi, bağlama yöntemi ve süreç takibine bağlıdır."
        current="Kalite ve Üretim Süreci"
        index="05"
        sideTitle="Kontrol yaklaşımı"
        sideItems={[
          "İlk parça kontrolü",
          "Süreç içi ölçüm",
          "Proje bazlı kontrol planı",
        ]}
      />
      <section className="quality-process">
        <Container>
          <div className="quality-process-intro">
            <p className="eyebrow">
              <span aria-hidden="true" />7 aşamalı akış
            </p>
            <h2>Teknik veriden güvenli teslimata</h2>
            <p>
              Her proje aynı kontrol şablonuna zorlanmaz. Tolerans ve kalite
              kontrol planı, parçanın malzemesine, geometrisine ve teknik resim
              gereksinimlerine göre proje bazında değerlendirilir.
            </p>
          </div>
          <ol className="quality-process-list">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <small>
                  <Check size={14} aria-hidden="true" />
                  {step.output}
                </small>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="measurement-section">
        <Container>
          <div className="measurement-heading">
            <span>ÖLÇ / KARŞILAŞTIR / DOĞRULA</span>
            <h2>Ölçüm ekipmanı, parçanın gereksinimine göre seçilir</h2>
            <p>
              Sahip olunmayan CMM, lazer ölçüm sistemi veya sertifika iddiası
              kullanmadan; mevcut temel ölçüm araçlarıyla uygulanabilir kontrol
              planı kurulur.
            </p>
          </div>
          <div className="equipment-grid">
            {equipment.map(({ name, icon: Icon }, index) => (
              <article key={name}>
                <span>0{index + 1}</span>
                <Icon size={28} strokeWidth={1.4} aria-hidden="true" />
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="quality-principles">
        <Container>
          <div>
            <span>01</span>
            <h3>Ölçü iddiası teknik resimden gelir</h3>
            <p>
              Doğrulanmamış genel hassasiyet değerleri yerine parçanın kritik
              toleransları incelenir.
            </p>
          </div>
          <div>
            <span>02</span>
            <h3>Kontrol üretimin içine yerleşir</h3>
            <p>
              Sorunu yalnızca sonda aramak yerine, ilk parça ve ara kontrol
              noktaları operasyon planına eklenir.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>İletişim teknik ve doğrudandır</h3>
            <p>
              Üretimi etkileyen eksik veya çelişkili bilgiler, teklif ve
              planlama aşamasında netleştirilir.
            </p>
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
