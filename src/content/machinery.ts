export type Machine = {
  id: string;
  code: string;
  name: string;
  category: "large-cnc" | "precision-cnc" | "lathe" | "mill";
  brand: string | null;
  model: string | null;
  axes: number | null;
  travel: { x?: number; y?: number; z?: number } | null;
  tableSize: string | null;
  maxPartSize: string | null;
  maxPartWeight: string | null;
  spindleSpeed: string | null;
  controlUnit: string | null;
  description: string;
  usage: string;
  applications: string[];
  materials: string[];
  images: string[];
  featured: boolean;
  visual: "large" | "precision" | "lathe" | "mill";
};

// Teknik değerler gerçek makine etiketleri ve saha ölçüleri geldiğinde doldurulmalıdır.
// null alanlar arayüzde otomatik olarak gizlenir.
export const machinery: Machine[] = [
  {
    id: "cnc-01",
    code: "CNC-01",
    name: "Büyük Kapasiteli CNC İşleme Merkezi",
    category: "large-cnc",
    brand: null,
    model: null,
    axes: null,
    travel: null,
    tableSize: null,
    maxPartSize: null,
    maxPartWeight: null,
    spindleSpeed: null,
    controlUnit: null,
    description:
      "Geniş işleme alanı gerektiren büyük, tekil ve düşük adetli sanayi parçaları için ayrılmış ana CNC merkezidir.",
    usage: "Büyük parça ve proje bazlı özel üretim",
    applications: [
      "Büyük plaka ve gövdeler",
      "Kalıp parçaları",
      "Aparat ve fikstürler",
      "Özel sanayi ve bakım parçaları",
    ],
    materials: [
      "Alüminyum",
      "Çelik",
      "Paslanmaz çelik",
      "Mühendislik plastiği",
    ],
    images: ["/images/machinery/cnc-large.svg"],
    featured: true,
    visual: "large",
  },
  {
    id: "cnc-02",
    code: "CNC-02",
    name: "Hassas ve Seri Üretim CNC Merkezi",
    category: "precision-cnc",
    brand: null,
    model: null,
    axes: null,
    travel: null,
    tableSize: null,
    maxPartSize: null,
    maxPartWeight: null,
    spindleSpeed: null,
    controlUnit: null,
    description:
      "Küçük, detaylı ve tekrarlı parçaların kontrollü operasyonlarla işlenmesi için kullanılan kompakt CNC merkezidir.",
    usage: "Küçük hassas parça ve seri üretim",
    applications: [
      "Metal bağlantı parçaları",
      "Adaptörler",
      "Marpuç bileşenleri",
      "Tekrarlı küçük parçalar",
    ],
    materials: ["Alüminyum", "Pirinç", "Çelik", "Paslanmaz çelik"],
    images: ["/images/machinery/cnc-precision.svg"],
    featured: true,
    visual: "precision",
  },
  {
    id: "cnc-03",
    code: "CNC-03",
    name: "Hassas ve Seri Üretim CNC Merkezi",
    category: "precision-cnc",
    brand: null,
    model: null,
    axes: null,
    travel: null,
    tableSize: null,
    maxPartSize: null,
    maxPartWeight: null,
    spindleSpeed: null,
    controlUnit: null,
    description:
      "Seri üretim desteği, ikinci operasyonlar ve kapasite dengeleme için kullanılan kompakt CNC merkezidir.",
    usage: "Seri üretim desteği ve ikinci operasyon",
    applications: [
      "Küçük parça üretimi",
      "İkinci operasyonlar",
      "Farklı tasarım ve ölçüler",
      "Kapasite dengeleme",
    ],
    materials: ["Alüminyum", "Pirinç", "Çelik", "Mühendislik plastiği"],
    images: ["/images/machinery/cnc-precision.svg"],
    featured: true,
    visual: "precision",
  },
  {
    id: "tm-01",
    code: "TM-01",
    name: "Torna Tezgâhı",
    category: "lathe",
    brand: null,
    model: null,
    axes: null,
    travel: null,
    tableSize: null,
    maxPartSize: null,
    maxPartWeight: null,
    spindleSpeed: null,
    controlUnit: null,
    description:
      "Silindirik parçalar ile iç ve dış çap operasyonlarında kullanılan yardımcı üretim tezgâhıdır.",
    usage: "Dönel parça ve tamamlayıcı torna operasyonları",
    applications: ["Mil", "Burç", "Pim", "Silindirik gövdeler"],
    materials: ["Çelik", "Paslanmaz çelik", "Alüminyum", "Pirinç", "Bronz"],
    images: ["/images/machinery/lathe.svg"],
    featured: false,
    visual: "lathe",
  },
  {
    id: "fm-01",
    code: "FM-01",
    name: "Freze ve Yardımcı İşleme Tezgâhı",
    category: "mill",
    brand: null,
    model: null,
    axes: null,
    travel: null,
    tableSize: null,
    maxPartSize: null,
    maxPartWeight: null,
    spindleSpeed: null,
    controlUnit: null,
    description:
      "Delik, kanal, yüzey düzeltme ve ikinci operasyonlarda üretim akışını destekleyen yardımcı tezgâhtır.",
    usage: "Numune, bakım ve tamamlayıcı işlemler",
    applications: ["Delik", "Kanal", "Yüzey düzeltme", "İkinci operasyon"],
    materials: ["Alüminyum", "Çelik", "Pirinç", "Mühendislik plastiği"],
    images: ["/images/machinery/mill.svg"],
    featured: false,
    visual: "mill",
  },
];

export const machineTechnicalFields: Array<{
  key: keyof Machine;
  label: string;
}> = [
  { key: "brand", label: "Marka" },
  { key: "model", label: "Model" },
  { key: "axes", label: "Eksen" },
  { key: "tableSize", label: "Tabla ölçüsü" },
  { key: "maxPartSize", label: "Maksimum parça ölçüsü" },
  { key: "maxPartWeight", label: "Maksimum parça ağırlığı" },
  { key: "spindleSpeed", label: "Maksimum devir" },
  { key: "controlUnit", label: "Kontrol ünitesi" },
];

export function getVisibleMachineSpecs(machine: Machine) {
  const specs = machineTechnicalFields.flatMap(({ key, label }) => {
    const value = machine[key];
    return value !== null && value !== undefined && typeof value !== "object"
      ? [{ label, value: String(value) }]
      : [];
  });

  if (machine.travel) {
    const travel = Object.entries(machine.travel)
      .filter(
        (entry): entry is [string, number] => typeof entry[1] === "number",
      )
      .map(([axis, value]) => `${axis.toUpperCase()}: ${value} mm`)
      .join(" · ");
    if (travel)
      specs.splice(3, 0, { label: "Hareket mesafesi", value: travel });
  }

  return specs;
}
