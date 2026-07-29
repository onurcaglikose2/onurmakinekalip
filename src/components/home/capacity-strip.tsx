import { Container } from "@/components/ui/container";
import { company } from "@/content/company";
import { machinery } from "@/content/machinery";

const items = [
  {
    value: String(
      machinery.filter((machine) => machine.category.includes("cnc")).length,
    ),
    label: "CNC İşleme Merkezi",
    detail: "Büyük + hassas üretim",
  },
  {
    value: String(
      machinery.filter(
        (machine) =>
          machine.category === "lathe" || machine.category === "mill",
      ).length,
    ),
    label: "Torna / Freze",
    detail: "Yardımcı operasyon",
  },
  {
    value: company.experienceYears ?? "—",
    label: "Yıllık Tecrübe",
    detail: "Talaşlı imalat",
  },
  { value: "1→∞", label: "Üretim Esnekliği", detail: "Tek parçadan seriye" },
  { value: "S→L", label: "Parça Ölçeği", detail: "Küçükten büyüğe" },
];

export function CapacityStrip() {
  return (
    <section id="kapasite" className="capacity-section">
      <Container>
        <div className="capacity-intro">
          <span>KAPASİTE / ÖZET</span>
          <p>
            Her tezgâhı, en verimli olduğu parça ölçeği ve üretim tipinde
            kullanıyoruz.
          </p>
        </div>
        <div className="capacity-grid">
          {items.map((item, index) => (
            <article key={item.label}>
              <span>0{index + 1}</span>
              <strong>{item.value}</strong>
              <h2>{item.label}</h2>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
