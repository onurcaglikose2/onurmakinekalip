"use client";

import Link from "next/link";
import { RefreshCcw } from "lucide-react";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="error-page">
      <div className="technical-grid" aria-hidden="true" />
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <span className="error-code">ERR</span>
        <p>İŞLEM KESİNTİSİ</p>
        <h1>Bu sayfa şu anda beklenen şekilde çalışmıyor.</h1>
        <p>
          İşlemi yeniden deneyebilir veya ana sayfaya dönerek devam
          edebilirsiniz.
        </p>
        <div>
          <button type="button" onClick={reset}>
            <RefreshCcw size={17} aria-hidden="true" />
            Yeniden Dene
          </button>
          <Link href="/">Ana Sayfaya Dön</Link>
        </div>
      </div>
    </section>
  );
}
