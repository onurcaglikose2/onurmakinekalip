import type { Metadata } from "next";
import { Clock3, FileCheck2, LockKeyhole, MessagesSquare } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { acceptedFileFormats, company } from "@/content/company";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Teknik Resim Gönder — Teklif Al",
  description:
    "PDF, DXF, DWG, STEP veya parça fotoğrafınızı güvenli biçimde gönderin; CNC üretilebilirlik, termin ve fiyat değerlendirmesi alın.",
  path: "/teklif-al",
  keywords: [
    "CNC teklif al",
    "teknik resim gönder",
    "CNC parça fiyatı",
    "fason imalat teklifi",
  ],
});

const assurances = [
  {
    icon: FileCheck2,
    title: "Teknik ön değerlendirme",
    text: "Geometri, malzeme, adet ve gerekli operasyonlar birlikte incelenir.",
  },
  {
    icon: Clock3,
    title: company.quoteResponseTarget ?? "Hızlı ön değerlendirme",
    text: "Eksiksiz taleplerin üretilebilirlik değerlendirmesine hızlıca başlanır.",
  },
  {
    icon: LockKeyhole,
    title: "Özel ve güvenli dosyalar",
    text: "Dosyalar public alanda yayımlanmaz; yalnızca teklif süreci için kullanılır.",
  },
  {
    icon: MessagesSquare,
    title: "Doğrudan teknik iletişim",
    text: "Gereken ek bilgiler, üretim değerlendirmesini yapan ekip tarafından sorulur.",
  },
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Teknik resim gönder / teklif al"
        title="Parçanızı paylaşın, üretim yolunu birlikte netleştirelim"
        description="Dosyanızı ve temel üretim bilgilerini paylaşın. Parçanızı üretilebilirlik, malzeme, adet ve termin açısından inceleyerek sizinle iletişime geçelim."
        current="Teklif Al"
        index="07"
        sideTitle="Kabul edilen dosyalar"
        sideItems={[
          acceptedFileFormats.slice(0, 4).join(" / "),
          acceptedFileFormats.slice(4, 8).join(" / "),
          acceptedFileFormats.slice(8).join(" / "),
        ]}
      />
      <section className="quote-page-section">
        <Container>
          <div className="quote-layout">
            <aside className="quote-aside">
              <p className="eyebrow">
                <span aria-hidden="true" />
                Teklif akışı
              </p>
              <h2>Doğru teklif için doğru başlangıç verisi</h2>
              <p>
                Teknik resim, malzeme ve adet bilgisi en hızlı yoldur. Bunlar
                yoksa numune, yaklaşık ölçü ve kullanım alanı üzerinden ön
                değerlendirme yapılabilir.
              </p>
              <div className="quote-assurances">
                {assurances.map(({ icon: Icon, title, text }, index) => (
                  <div key={title}>
                    <span>0{index + 1}</span>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
              <div className="quote-direct">
                <span>Form yerine doğrudan paylaşmak isterseniz</span>
                <a href={`mailto:${company.quoteEmail}`}>
                  {company.quoteEmail}
                </a>
                <a href={`tel:${company.phone?.replace(/\s/g, "")}`}>
                  {company.phone}
                </a>
              </div>
            </aside>
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
