import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const trustItems = [
  "Teknik resme göre üretim",
  "Numuneye göre parça üretimi",
  "Tek parça ve seri üretim",
  "Türkiye geneli hizmet",
];

export function Hero() {
  return (
    <section className="home-hero">
      <div className="technical-grid" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-machine-art" aria-hidden="true">
        <Image
          src="/images/machinery/cnc-large.svg"
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="(max-width: 900px) 100vw, 56vw"
        />
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <Container className="hero-container">
        <div className="hero-content">
          <p className="eyebrow eyebrow-light">
            <span aria-hidden="true" />
            CNC İşleme • Torna • Freze • Özel Üretim
          </p>
          <h1>
            Büyük Parçada <em>Güç.</em>
            <br />
            Küçük Parçada <em>Hassasiyet.</em>
          </h1>
          <p className="hero-description">
            3 CNC işleme merkezi ve 2 yardımcı torna/freze tezgâhımızla; teknik
            resme veya numuneye göre tek parçadan seri üretime kadar talaşlı
            imalat çözümleri sunuyoruz.
          </p>
          <Reveal className="hero-actions" delay={0.1}>
            <ButtonLink href="/teklif-al" variant="primary" arrow>
              Teknik Resim Gönder
            </ButtonLink>
            <ButtonLink href="/makine-parkuru" variant="secondary">
              Makine Parkurunu İncele
            </ButtonLink>
          </Reveal>
          <div className="hero-meta">
            <span>DATUM / İST—01</span>
            <span>ÜRETİM / 01—SERİ</span>
          </div>
        </div>
      </Container>
      <div className="hero-trust">
        <Container>
          {trustItems.map((item) => (
            <div key={item}>
              <Check size={15} aria-hidden="true" />
              {item}
            </div>
          ))}
          <a href="#kapasite" aria-label="Kapasite bölümüne ilerle">
            <ChevronDown aria-hidden="true" />
          </a>
        </Container>
      </div>
    </section>
  );
}
