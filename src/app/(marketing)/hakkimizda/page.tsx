import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight, Check, GraduationCap, MapPin } from "lucide-react";
import { CtaSection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { company } from "@/content/company";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Hakkımızda",
  description:
    "İTÜ Gemi İnşa Mühendisliği mezunu Onur Çağlıköse tarafından kurulan Onur Makine Kalıp; CNC freze ve CNC torna ile metal parçalarda fason üretim yapar.",
  path: "/hakkimizda",
  keywords: [
    "Onur Makine Kalıp",
    "Onur Çağlıköse",
    "İkitelli CNC imalat",
    "İstanbul talaşlı imalat",
    "CNC fason üretim",
  ],
});

const values = [
  {
    title: "Mühendislik hassasiyeti",
    text: "Teknik resim, tolerans, malzeme ve kullanım koşullarını üretim öncesinde birlikte değerlendiririz.",
  },
  {
    title: "Zamanında teslimat",
    text: "Üretim planını kapasiteye göre oluşturur, taahhüt edilen termini şeffaf bir süreçle yönetiriz.",
  },
  {
    title: "Kalite odaklı üretim",
    text: "Kritik ölçüleri üretim boyunca takip eder, her partide tutarlı ve tekrarlanabilir sonuç hedefleriz.",
  },
  {
    title: "Doğrudan iletişim",
    text: "Teknik konuların üretim ekibine hızlı ve eksiksiz aktarılmasını sağlayan yalın bir iletişim kurarız.",
  },
  {
    title: "Güvenilir iş ortaklığı",
    text: "Tek seferlik ihtiyaçlardan düzenli tedarike kadar müşterilerimizle uzun vadeli çözüm ortaklığı kurarız.",
  },
];

const productionPoints = [
  "Teknik resim veya numuneye göre üretim",
  "Prototip, düşük adet ve seri üretim",
  "Malzeme, tolerans ve işlev odaklı değerlendirme",
  "Planlı üretim, ara kontrol ve termin takibi",
];

const sectors = [
  {
    title: "Kuyumculuk",
    text: "Hassas ölçü ve yüzey beklentisi olan küçük metal bileşenler.",
  },
  {
    title: "Makine",
    text: "Özel makine, bakım ve yedek parça ihtiyaçlarına yönelik üretim.",
  },
  {
    title: "Otomasyon",
    text: "Fikstür, bağlantı ve mekanik sistemlere özel CNC parçaları.",
  },
  {
    title: "Eşanjör",
    text: "Montaj geometrisine uygun bağlantı ve tamamlayıcı bileşenler.",
  },
  {
    title: "Rafineri",
    text: "Teknik şartnameye göre değerlendirilen projeye özel metal parçalar.",
  },
  {
    title: "Nargile",
    text: "Tekrarlı ölçü ve bağlantı uyumu gerektiren metal aksesuarlar.",
  },
  {
    title: "Sağlık",
    text: "Kalite ve izlenebilirlik beklentisi proje bazında ele alınan parçalar.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Mühendislik bakışıyla şekillenen üretim gücü"
        description="Onur Makine Kalıp, kurucusu Onur Çağlıköse’nin mühendislik altyapısını 11 yıllık talaşlı imalat deneyimiyle birleştirerek metal parçalarda güvenilir fason üretim çözümleri sunar."
        current="Hakkımızda"
        index="06"
        sideTitle="Bizi tanımlayanlar"
        sideItems={[
          "Kurucu mühendis vizyonu",
          "11 yıllık sektör deneyimi",
          "CNC freze ve CNC torna",
        ]}
      />

      <section className="about-founder">
        <Container>
          <div className="about-founder-heading">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Kurucumuz
            </p>
            <div>
              <span>01 / KURUCU MÜHENDİS</span>
              <h2>Onur Çağlıköse</h2>
            </div>
          </div>
          <div className="about-founder-layout">
            <div className="about-founder-panel">
              <div className="technical-grid" aria-hidden="true" />
              <span className="about-founder-code">F / 01</span>
              <span className="about-founder-monogram" aria-hidden="true">
                OÇ
              </span>
              <div className="about-founder-panel-footer">
                <div>
                  <strong>Kurucu</strong>
                  <span>Onur Makine Kalıp</span>
                </div>
                <div>
                  <MapPin size={16} aria-hidden="true" />
                  <span>İstanbul · 1991</span>
                </div>
              </div>
            </div>
            <div className="about-founder-copy">
              <p className="eyebrow">
                <span aria-hidden="true" />
                Kurucu mühendis vizyonu
              </p>
              <h3>Mühendislik disiplininden üretim sahasına</h3>
              <p className="about-founder-lead">
                1991 yılında İstanbul’da doğan Onur Çağlıköse, İstanbul Teknik
                Üniversitesi Gemi İnşa Mühendisliği eğitiminden gelen analitik
                yaklaşımını talaşlı imalat sahasındaki deneyimiyle birleştirerek
                Onur Makine Kalıp’ı kurdu.
              </p>
              <p>
                11 yıllık sektör deneyimi, üretilebilirlikten doğru proses
                seçimine; ölçü hassasiyetinden verimli iş planlamasına uzanan
                bütüncül bir yaklaşımı firma kültürünün merkezine taşıyor. Her
                proje, yalnızca işlenecek bir parça olarak değil; işlevi,
                malzemesi, toleransı, adedi ve teslim süresiyle birlikte ele
                alınıyor.
              </p>
              <div className="about-founder-credential">
                <GraduationCap size={26} aria-hidden="true" />
                <div>
                  <span>Mühendislik eğitimi</span>
                  <strong>İstanbul Teknik Üniversitesi</strong>
                  <small>Gemi İnşa Mühendisliği</small>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="about-production">
        <Container>
          <div className="about-production-grid">
            <div className="about-production-visual">
              <Image
                src="/images/machinery/cnc-large.svg"
                alt="CNC fason üretim kabiliyetini temsil eden teknik tezgâh görseli"
                fill
                sizes="(max-width: 1000px) 100vw, 55vw"
              />
              <span>CNC FREZE / CNC TORNA / FASON ÜRETİM</span>
            </div>
            <div className="about-production-copy">
              <p className="eyebrow">
                <span aria-hidden="true" />
                Üretim yaklaşımımız
              </p>
              <h2>Prototipten seri üretime aynı mühendislik hassasiyeti</h2>
              <p>
                CNC freze ve CNC torna tezgâhlarımızla metal parçalarda fason
                üretim gerçekleştiriyoruz. Prototipten düzenli seri üretime
                kadar her aşamada kalite, termin ve sürdürülebilir iş birliği
                odağımızı koruyoruz.
              </p>
              <ul>
                {productionPoints.map((point) => (
                  <li key={point}>
                    <Check size={16} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="about-capacity">
        <Container>
          <div>
            <strong>{company.experienceYears}</strong>
            <span>Yıllık sektör tecrübesi</span>
            <small>Talaşlı imalat</small>
          </div>
          <div>
            <strong>CNC</strong>
            <span>Freze + torna</span>
            <small>Metal parçalarda fason üretim</small>
          </div>
          <div>
            <strong>1→∞</strong>
            <span>Üretim modeli</span>
            <small>Prototipten seri üretime</small>
          </div>
          <div>
            <strong>7+</strong>
            <span>Ana uygulama alanı</span>
            <small>Farklı sektörlerde üretim</small>
          </div>
        </Container>
      </section>

      <section className="about-sectors">
        <Container>
          <div className="about-sectors-heading">
            <p className="eyebrow eyebrow-light">
              <span aria-hidden="true" />
              Sektörel deneyim
            </p>
            <div>
              <h2>Farklı sektörler, aynı üretim disiplini</h2>
              <p>
                Parçanın kullanım alanı değişse de yaklaşımımız değişmez: teknik
                gereksinimi doğru anlamak, uygun üretim yöntemini seçmek ve
                kaliteyi süreç boyunca takip etmek.
              </p>
            </div>
          </div>
          <div className="about-sectors-grid">
            {sectors.map((sector, index) => (
              <article key={sector.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <ArrowDownRight aria-hidden="true" />
                <h3>{sector.title}</h3>
                <p>{sector.text}</p>
              </article>
            ))}
          </div>
          <p className="about-sectors-note">
            Sektöre özel sertifikasyon, kalite dokümantasyonu ve izlenebilirlik
            talepleri teknik şartname üzerinden proje bazında değerlendirilir.
          </p>
        </Container>
      </section>

      <section className="about-values">
        <Container>
          <div className="about-values-heading">
            <span>05 / ÇALIŞMA İLKESİ</span>
            <h2>Güvenilir üretimi mümkün kılan ilkeler</h2>
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
