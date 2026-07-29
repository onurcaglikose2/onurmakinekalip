import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CapabilityIcon } from "@/components/capabilities/capability-icon";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilities } from "@/content/capabilities";

export function CapabilitiesOverview() {
  return (
    <section className="capabilities-overview">
      <Container>
        <div className="capabilities-header">
          <SectionHeading
            eyebrow="İhtiyaçtan üretim sonucuna"
            title="Tek bir hizmet listesi değil, ölçeğe göre işleyen üretim sistemi"
            description="Parçanın geometrisi, adedi ve kullanım amacı hangi tezgâhın, bağlama yönteminin ve kontrol akışının seçileceğini belirler."
          />
          <p className="section-counter">06 / KABİLİYET</p>
        </div>
        <div className="capabilities-list">
          {capabilities.map((capability, index) => (
            <Link
              key={capability.id}
              href={`/uretim-kabiliyetleri#${capability.id}`}
              className="capability-row"
            >
              <span className="capability-number">0{index + 1}</span>
              <span className="capability-icon">
                <CapabilityIcon name={capability.icon} size={29} />
              </span>
              <span className="capability-main">
                <small>{capability.eyebrow}</small>
                <strong>{capability.title}</strong>
              </span>
              <span className="capability-outcome">{capability.outcome}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
