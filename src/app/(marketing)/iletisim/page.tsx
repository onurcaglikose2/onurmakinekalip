import type { Metadata } from "next";
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { TrackedLink } from "@/components/layout/tracked-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { company } from "@/content/company";
import { toMailUrl, toPhoneUrl, toWhatsAppUrl } from "@/lib/utils";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "İletişim",
  description: `${company.legalName} iletişim bilgileri. ${company.address}, ${company.city}; telefon, WhatsApp, e-posta ve çalışma saatleri.`,
  path: "/iletisim",
  keywords: [
    "Onur Makine iletişim",
    "İkitelli CNC iletişim",
    "İstanbul CNC teklif",
  ],
});

export default function ContactPage() {
  const address = [company.address, company.district, company.city]
    .filter(Boolean)
    .join(", ");
  const mapsUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Üretim ihtiyacınızı doğrudan ekibimizle konuşun"
        description="Teknik resim, numune, bakım parçası veya seri üretim talebiniz için telefon, WhatsApp, e-posta ya da teklif formu üzerinden ulaşabilirsiniz."
        current="İletişim"
        index="08"
        sideTitle="Çalışma saatleri"
        sideItems={[
          company.workingHours ?? "",
          company.quoteResponseTarget ?? "",
        ]}
      />
      <section className="contact-section">
        <Container>
          <div className="contact-cards">
            <TrackedLink href={toPhoneUrl(company.phone)} event="phone_click">
              <span>01</span>
              <Phone aria-hidden="true" />
              <small>Telefon</small>
              <strong>{company.phone}</strong>
            </TrackedLink>
            <TrackedLink
              href={toWhatsAppUrl(company.whatsapp)}
              event="whatsapp_click"
              target="_blank"
              rel="noreferrer"
            >
              <span>02</span>
              <MessageCircle aria-hidden="true" />
              <small>WhatsApp</small>
              <strong>Üretim talebinizi yazın</strong>
            </TrackedLink>
            <TrackedLink href={toMailUrl(company.email)} event="email_click">
              <span>03</span>
              <Mail aria-hidden="true" />
              <small>Genel e-posta</small>
              <strong>{company.email}</strong>
            </TrackedLink>
            <TrackedLink
              href={toMailUrl(company.quoteEmail)}
              event="email_click"
            >
              <span>04</span>
              <Mail aria-hidden="true" />
              <small>Teklif e-postası</small>
              <strong>{company.quoteEmail}</strong>
            </TrackedLink>
          </div>
          <div className="contact-main">
            <div className="contact-location">
              <div className="location-graphic" aria-hidden="true">
                <div className="location-target">
                  <MapPin />
                </div>
                <span>İKİTELLİ / İSTANBUL</span>
              </div>
              <div className="location-details">
                <p className="eyebrow">
                  <span aria-hidden="true" />
                  Atölye konumu
                </p>
                <h2>{address}</h2>
                <p>
                  Atölye ziyareti ve parça teslimi için gelmeden önce telefonla
                  iletişime geçmenizi rica ederiz.
                </p>
                <div>
                  <Clock3 size={17} aria-hidden="true" />
                  <span>{company.workingHours}</span>
                </div>
                <a href={mapsUrl} target="_blank" rel="noreferrer">
                  <Navigation size={17} aria-hidden="true" />
                  Yol tarifi al
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
