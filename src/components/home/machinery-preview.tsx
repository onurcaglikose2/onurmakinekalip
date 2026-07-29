import { MachineCard } from "@/components/machinery/machine-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { machinery } from "@/content/machinery";

export function MachineryPreview() {
  return (
    <section className="machinery-preview">
      <Container>
        <div className="machinery-preview-head">
          <SectionHeading
            eyebrow="Makine parkuru"
            title="Büyük parçaya alan, seri parçaya ritim"
            description="Üç CNC merkezi ile iki yardımcı tezgâh, farklı ölçekteki işleri aynı üretim çatısı altında değerlendirmemizi sağlar."
            tone="light"
          />
          <ButtonLink href="/makine-parkuru" variant="secondary" arrow>
            Tüm Parkuru İncele
          </ButtonLink>
        </div>
        <div className="machinery-preview-grid">
          {machinery.slice(0, 3).map((machine) => (
            <MachineCard key={machine.id} machine={machine} compact />
          ))}
        </div>
        <div className="aux-machinery">
          {machinery.slice(3).map((machine) => (
            <div key={machine.id}>
              <span>{machine.code}</span>
              <strong>{machine.name}</strong>
              <p>{machine.usage}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
