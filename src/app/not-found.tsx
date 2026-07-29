import Link from "next/link";
import { ArrowLeft, FileUp } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="error-page">
      <div className="technical-grid" aria-hidden="true" />
      <Container>
        <span className="error-code">404</span>
        <p>KOORDİNAT BULUNAMADI / SAYFA YOK</p>
        <h1>Aradığınız sayfa işleme alanımızın dışında kaldı.</h1>
        <p>
          Bağlantı değişmiş veya adres hatalı olabilir. Ana sayfaya dönebilir ya
          da üretim talebinizi doğrudan paylaşabilirsiniz.
        </p>
        <div>
          <Link href="/">
            <ArrowLeft size={17} aria-hidden="true" />
            Ana Sayfaya Dön
          </Link>
          <Link href="/teklif-al">
            <FileUp size={17} aria-hidden="true" />
            Teknik Resim Gönder
          </Link>
        </div>
      </Container>
    </section>
  );
}
