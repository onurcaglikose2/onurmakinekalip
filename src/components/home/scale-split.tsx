import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

const panels = [
  {
    code: "L / 01",
    title: "Büyük parçalar için güçlü CNC kapasitesi",
    description:
      "1300 × 700 mm dik işleme merkezimizle makine parçaları, kalıp bileşenleri, aparatlar, fikstürler, plakalar, gövdeler ve özel sanayi parçaları üretiyoruz.",
    items: [
      "Büyük ölçülü parça işleme",
      "Tek parça ve düşük adet üretim",
      "Bakım ve yedek parça uygulamaları",
      "Teknik resme veya numuneye göre üretim",
    ],
    href: "/uretim-kabiliyetleri#buyuk-parca",
    link: "Büyük Parça Kabiliyetini Gör",
    image: "/images/machinery/cnc-large.svg",
    className: "scale-panel-large",
  },
  {
    code: "S / 02",
    title: "Dönel parçalarda ölçü ve tekrar tutarlılığı",
    description:
      "İki CNC torna tezgâhımızla mil, burç, pim, adaptör ve tekrarlı dönel parçalar üretiyor; seri işlerde ölçü, yüzey ve bağlantı uyumunun korunmasına odaklanıyoruz.",
    items: [
      "Mil, burç ve pimler",
      "Seri ve tekrarlı üretim",
      "İç ve dış çap operasyonları",
      "Bağlantı ve adaptör parçaları",
    ],
    href: "/uretim-kabiliyetleri#torna",
    link: "Torna Kabiliyetini Gör",
    image: "/images/machinery/lathe.svg",
    className: "scale-panel-precision",
  },
];

export function ScaleSplit() {
  return (
    <section className="scale-split" aria-label="Parça ölçeğine göre üretim">
      {panels.map((panel) => (
        <article key={panel.code} className={panel.className}>
          <Image
            src={panel.image}
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <div className="scale-panel-overlay" aria-hidden="true" />
          <div className="scale-panel-content">
            <span className="scale-code">{panel.code}</span>
            <h2>{panel.title}</h2>
            <p>{panel.description}</p>
            <ul>
              {panel.items.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href={panel.href}>
              {panel.link}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
