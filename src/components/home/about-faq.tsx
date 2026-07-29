import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { faq } from "@/content/faq";

export function AboutFaq() {
  return (
    <>
      <section className="about-preview">
        <Container>
          <div className="about-preview-grid">
            <div>
              <p className="eyebrow">
                <span aria-hidden="true" />
                Onur Makine Kalıp
              </p>
              <h2>Mühendislik bakışı. Sahada karşılığı olan üretim.</h2>
            </div>
            <div>
              <p>
                İTÜ Gemi İnşa Mühendisliği mezunu Onur Çağlıköse tarafından
                kurulan Onur Makine Kalıp, 10 yıllık talaşlı imalat deneyimini
                CNC freze ve torna kabiliyetiyle birleştirir. Prototipten seri
                üretime kadar her projeyi mühendislik hassasiyeti, kalite ve
                zamanında teslimat odağıyla ele alırız.
              </p>
              <Link href="/hakkimizda">
                Onur Makine’yi Tanıyın
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <section className="faq-section">
        <Container>
          <div className="faq-layout">
            <div className="faq-intro">
              <p className="eyebrow">
                <span aria-hidden="true" />
                Sık sorulan sorular
              </p>
              <h2>Teklif öncesi bilmeniz gerekenler</h2>
              <p>
                Parçanız hakkında ilk değerlendirmeyi hızlandıracak temel
                yanıtları burada bulabilirsiniz.
              </p>
              <Link href="/iletisim">
                Farklı bir sorunuz mu var? <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="faq-list">
              {faq.map((item, index) => (
                <details key={item.question}>
                  <summary>
                    <span>0{index + 1}</span>
                    {item.question}
                    <Plus aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
