export type Capability = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  outcome: string;
  applications: string[];
  machineIds: string[];
  icon: "maximize" | "scan" | "rotate" | "component" | "file" | "repeat";
  visual: "large" | "precision" | "lathe" | "fixture" | "sample" | "series";
};

export const capabilities: Capability[] = [
  {
    id: "buyuk-parca",
    title: "Büyük Parça CNC İşleme",
    eyebrow: "Geniş işleme alanı",
    summary:
      "Büyük kapasiteli CNC işleme merkezimiz, standart tezgâhlara sığmayan veya geniş işleme alanı gerektiren parçalar için kullanılır.",
    outcome:
      "Makine gövdesi, plaka ve özel sanayi parçalarında tek parça veya düşük adetli üretim ihtiyacını karşılar.",
    applications: [
      "Büyük makine parçaları ve gövdeler",
      "Plakalar ve kalıp altlıkları",
      "Aparat ve fikstür gövdeleri",
      "Bakım ve yedek parçalar",
    ],
    machineIds: ["dim-01"],
    icon: "maximize",
    visual: "large",
  },
  {
    id: "hassas-freze",
    title: "Hassas CNC Frezeleme",
    eyebrow: "Detay ve tekrar",
    summary:
      "Küçük ve orta ölçekli parçalarda cep, kanal, delik ve yüzey operasyonlarını kontrollü bir işleme planıyla yürütürüz.",
    outcome:
      "Bağlantı uyumu ve tekrar ölçüsü isteyen parçaların tekil veya seri üretimine uygun bir akış sağlar.",
    applications: [
      "Küçük ve orta ölçekli parçalar",
      "Kanal, cep ve delik operasyonları",
      "Bağlantı ve adaptör bileşenleri",
      "Tekrarlı ölçü gerektiren işler",
    ],
    machineIds: ["dim-01", "kalipci-freze-01"],
    icon: "scan",
    visual: "precision",
  },
  {
    id: "torna",
    title: "Torna İşlemleri",
    eyebrow: "Silindirik geometriler",
    summary:
      "İç ve dış çap, yüzey, kanal ve diş gibi torna operasyonlarını parçanın işlevine göre planlarız.",
    outcome:
      "Mil, burç, pim ve adaptör gibi dönel parçaların üretim veya tamamlayıcı operasyonlarını gerçekleştirir.",
    applications: [
      "Mil ve pimler",
      "Burçlar",
      "Adaptörler",
      "Dişli bağlantı parçaları",
    ],
    machineIds: ["cnc-torna-01", "cnc-torna-02", "manuel-torna-01"],
    icon: "rotate",
    visual: "lathe",
  },
  {
    id: "kalip-aparat",
    title: "Kalıp, Aparat ve Fikstür",
    eyebrow: "Üretime özel ekipman",
    summary:
      "Bağlama, konumlandırma, kontrol veya üretim amacıyla kullanılan özel ekipman parçalarını ihtiyaca göre işleriz.",
    outcome:
      "Üretim sürecini destekleyen, parçaya ve operasyona özel mekanik çözümler ortaya çıkarır.",
    applications: [
      "Üretim ve kontrol aparatları",
      "Bağlama fikstürleri",
      "Kalıp bileşenleri",
      "Özel ekipman parçaları",
    ],
    machineIds: ["dim-01", "kalipci-freze-01"],
    icon: "component",
    visual: "fixture",
  },
  {
    id: "numuneye-gore",
    title: "Numuneye Göre Üretim",
    eyebrow: "Teknik resmi olmayan parça",
    summary:
      "Aşınmış, kırılmış veya teknik resmi bulunmayan parçaları numune, kullanım yeri ve ihtiyaç üzerinden ön değerlendiririz.",
    outcome:
      "Bakım ve yedek parça ihtiyaçlarında ölçülendirme ile yeniden üretim için uygulanabilir bir yol oluşturur.",
    applications: [
      "Eski makine bakım parçaları",
      "Kırılmış veya aşınmış parçalar",
      "Teknik resmi bulunmayan bileşenler",
      "Üretilebilirlik ve ölçülendirme değerlendirmesi",
    ],
    machineIds: [
      "dim-01",
      "cnc-torna-01",
      "cnc-torna-02",
      "manuel-torna-01",
      "kalipci-freze-01",
    ],
    icon: "file",
    visual: "sample",
  },
  {
    id: "seri-uretim",
    title: "Seri ve Tekrarlı Üretim",
    eyebrow: "Parti tutarlılığı",
    summary:
      "İlk parça onayı, operasyon sırası ve parti bazlı kontrol yaklaşımıyla tekrarlı parçaları planlarız.",
    outcome:
      "Ölçü, bağlantı ve yüzey beklentisinin parti boyunca takip edilmesini sağlayan üretim disiplini sunar.",
    applications: [
      "Tekrarlı küçük parçalar",
      "Metal bağlantı ve adaptörler",
      "Marpuç metal bileşenleri",
      "Parti bazlı üretim",
    ],
    machineIds: ["dim-01", "cnc-torna-01", "cnc-torna-02"],
    icon: "repeat",
    visual: "series",
  },
];
