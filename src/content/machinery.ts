export type Machine = {
  id: string;
  code: string;
  name: string;
  category: "machining-center" | "cnc-lathe" | "manual-lathe" | "toolroom-mill";
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
    id: "dim-01",
    code: "DİM-01",
    name: "1300 × 700 mm Dik İşleme Merkezi",
    category: "machining-center",
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
      "1300 × 700 mm kapasitesiyle plaka, gövde, kalıp, aparat ve özel parça operasyonlarında kullanılan dik işleme merkezidir.",
    usage: "Dik işleme, kalıp ve özel parça üretimi",
    applications: [
      "Plaka ve gövdeler",
      "Kalıp parçaları",
      "Aparat ve fikstürler",
      "Özel sanayi parçaları",
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
    id: "cnc-torna-01",
    code: "CT-01",
    name: "CNC Torna",
    category: "cnc-lathe",
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
      "Mil, burç, pim, adaptör ve benzeri dönel parçaların kontrollü ve tekrarlı operasyonlarında kullanılan CNC tornadır.",
    usage: "Dönel parça ve seri torna operasyonları",
    applications: [
      "Mil ve pimler",
      "Burçlar",
      "Adaptörler",
      "Dişli bağlantı parçaları",
    ],
    materials: ["Çelik", "Paslanmaz çelik", "Alüminyum", "Pirinç", "Bronz"],
    images: ["/images/machinery/lathe.svg"],
    featured: true,
    visual: "lathe",
  },
  {
    id: "cnc-torna-02",
    code: "CT-02",
    name: "CNC Torna",
    category: "cnc-lathe",
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
      "Seri torna işlerinde kapasite paylaşımı, tekrarlı üretim ve tamamlayıcı operasyonlar için kullanılan ikinci CNC tornadır.",
    usage: "Seri üretim desteği ve CNC torna işlemleri",
    applications: [
      "Tekrarlı dönel parçalar",
      "Bağlantı elemanları",
      "İç ve dış çap işlemleri",
      "İkinci operasyonlar",
    ],
    materials: ["Çelik", "Paslanmaz çelik", "Alüminyum", "Pirinç", "Bronz"],
    images: ["/images/machinery/lathe.svg"],
    featured: true,
    visual: "lathe",
  },
  {
    id: "manuel-torna-01",
    code: "MT-01",
    name: "Manuel Torna",
    category: "manual-lathe",
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
      "Numune, bakım parçası ve tamamlayıcı iç-dış çap operasyonlarında kullanılan manuel torna tezgâhıdır.",
    usage: "Numune, bakım ve tamamlayıcı torna işlemleri",
    applications: ["Mil", "Burç", "Pim", "Bakım parçaları"],
    materials: ["Çelik", "Paslanmaz çelik", "Alüminyum", "Pirinç", "Bronz"],
    images: ["/images/machinery/lathe.svg"],
    featured: false,
    visual: "lathe",
  },
  {
    id: "kalipci-freze-01",
    code: "KF-01",
    name: "Kalıpçı Frezesi",
    category: "toolroom-mill",
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
      "Kalıp parçaları, kanal, delik, yüzey düzeltme ve tamamlayıcı freze operasyonlarında kullanılan kalıpçı frezesidir.",
    usage: "Kalıp, numune ve tamamlayıcı freze işlemleri",
    applications: [
      "Kalıp parçaları",
      "Kanal ve delik işlemleri",
      "Yüzey düzeltme",
      "İkinci operasyonlar",
    ],
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
