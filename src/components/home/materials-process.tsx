import { ArrowDownRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { materials } from "@/content/company";

const steps = [
  {
    title: "Dosyanızı paylaşın",
    description:
      "Teknik resminizi, 3D modelinizi, parça fotoğrafınızı veya numune bilgilerini bize iletin.",
  },
  {
    title: "Teknik değerlendirme",
    description:
      "Geometri, malzeme, üretim adedi ve ihtiyaç duyulan operasyonlar değerlendirilir.",
  },
  {
    title: "Teklif ve planlama",
    description:
      "Üretim yöntemi, tahmini termin ve fiyat bilgisi hazırlanarak paylaşılır.",
  },
  {
    title: "Üretim",
    description:
      "Parça, belirlenen operasyon planına göre işlenir ve süreç içinde kontrol edilir.",
  },
  {
    title: "Kontrol ve teslimat",
    description:
      "Son kontroller tamamlanır, ürün güvenli biçimde paketlenerek teslim edilir.",
  },
];

export function MaterialsProcess() {
  return (
    <>
      <section className="materials-section">
        <Container>
          <div className="materials-layout">
            <SectionHeading
              eyebrow="İşlenebilen malzemeler"
              title="Malzeme, parçanın işleviyle birlikte değerlendirilir"
              description="Malzeme seçimi ve işlenebilirlik, parçanın geometrisine, kullanım alanına ve teknik gereksinimlerine göre proje bazında değerlendirilir."
            />
            <div className="materials-list">
              {materials.map((material, index) => (
                <div key={material.name}>
                  <span>0{index + 1}</span>
                  <strong>{material.name}</strong>
                  <p>{material.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="process-section">
        <Container>
          <SectionHeading
            eyebrow="Üretim süreci"
            title="Dosyadan teslimata, beş açık adım"
            description="Hızlı geri dönüş; doğru girdilerin, net teknik değerlendirmenin ve takip edilebilir operasyon planının sonucudur."
            tone="light"
          />
          <ol className="process-list">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <ArrowDownRight aria-hidden="true" />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
