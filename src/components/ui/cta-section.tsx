import { Container } from "./container";
import { ButtonLink } from "./button-link";
import { TrackedLink } from "@/components/layout/tracked-link";
import { company, companyMessages } from "@/content/company";
import { toWhatsAppUrl } from "@/lib/utils";

export function CtaSection({
  title = "Üretmek istediğiniz parçayı birlikte değerlendirelim",
  description = companyMessages.quote,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="cta-section">
      <div className="technical-grid" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="cta-inner">
          <div>
            <p className="eyebrow eyebrow-light">
              <span aria-hidden="true" />
              Projeniz için ilk adım
            </p>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="cta-actions">
            <ButtonLink href="/teklif-al" variant="primary" arrow>
              Teknik Resim Gönder
            </ButtonLink>
            <TrackedLink
              href={toWhatsAppUrl(company.whatsapp)}
              event="whatsapp_click"
              target="_blank"
              rel="noreferrer"
              className="button-link button-secondary"
            >
              <span>WhatsApp’tan Sor</span>
            </TrackedLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
