import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";

const qualityItems = [
  "Teknik resim ve kritik ölçü incelemesi",
  "Uygun takım ve bağlama planı",
  "İlk parça kontrolü",
  "Süreç içi ölçüm",
  "Son ölçü ve görsel kontrol",
  "Güvenli paketleme",
];

const seriesItems = [
  "Tekrarlı ölçü kontrolü",
  "Bağlantı uyumu",
  "Seri üretim planlaması",
  "Markaya özel ölçü ve tasarım",
  "Yüzey işlemlerine uygun parça hazırlığı",
];

export function QualitySeries() {
  return (
    <section className="quality-series">
      <Container>
        <div className="quality-block">
          <div className="quality-visual" aria-hidden="true">
            <div className="measure-ring">
              <span>Ø</span>
              <i />
            </div>
            <div className="measure-line" />
            <small>ÖLÇ / KONTROL / KAYDET</small>
          </div>
          <div className="quality-content">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Kalite yaklaşımı
            </p>
            <h2>Kalite, son kontrolde değil üretimin her adımında başlar</h2>
            <p>
              Tolerans ve kalite kontrol planı; parçanın malzemesine,
              geometrisine ve teknik resim gereksinimlerine göre proje bazında
              belirlenir.
            </p>
            <ul>
              {qualityItems.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="series-block">
          <div className="series-content">
            <p className="eyebrow eyebrow-light">
              <span aria-hidden="true" />
              Seri üretim deneyimi
            </p>
            <h2>Tekrarlı üretimde ölçü, uyum ve yüzey tutarlılığı</h2>
            <p>
              Nargile marpuçlarında kullanılan metal bağlantı ve adaptör
              bileşenlerini farklı tasarım ve ölçülerde tekrarlı olarak
              üretiyoruz. Bu deneyim; parça uyumu, yüzey kalitesi ve seri üretim
              tutarlılığı isteyen diğer sektör projelerine de güçlü bir altyapı
              sağlar.
            </p>
            <ul>
              {seriesItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="series-image">
            <Image
              src="/images/projects/connector.svg"
              alt="Tekrarlı dizilmiş metal bağlantı bileşenlerinin teknik görsel temsili"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span>PARTİ / TEKRAR / BAĞLANTI</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
