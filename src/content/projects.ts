export type ProjectCategory =
  | "buyuk-parca"
  | "hassas-parca"
  | "torna"
  | "kalip-aparat"
  | "seri-uretim"
  | "marpuc";

export type ProductionProject = {
  slug: string;
  title: string;
  category: ProjectCategory;
  material: string;
  method: string;
  productionType: string;
  scale: string;
  problem: string;
  solution: string;
  result: string;
  images: string[];
  featured: boolean;
  visual: "plate" | "body" | "shaft" | "fixture" | "connector" | "sample";
};

// TEMP_IMAGE: Teknik SVG kompozisyonları gerçek üretim fotoğraflarıyla değiştirilecektir.
export const projects: ProductionProject[] = [
  {
    slug: "buyuk-aluminyum-makine-plakasi",
    title: "Büyük alüminyum makine plakası",
    category: "buyuk-parca",
    material: "Alüminyum",
    method: "CNC yüzey, cep ve delik operasyonları",
    productionType: "Tek parça / düşük adet",
    scale: "Büyük parça",
    problem:
      "Geniş yüzeyde birbiriyle ilişkili delik, cep ve bağlantı bölgelerinin aynı operasyon planında işlenmesi.",
    solution:
      "Bağlama noktaları ve operasyon sırası, geniş parçada konum ilişkisinin korunmasına göre planlandı.",
    result:
      "Montaja hazır bağlantı yüzeyleri ve kontrol edilebilir kritik bölgeler elde edildi.",
    images: ["/images/projects/plate.svg"],
    featured: true,
    visual: "plate",
  },
  {
    slug: "celik-baglanti-govdesi",
    title: "Çelik bağlantı gövdesi",
    category: "hassas-parca",
    material: "Karbon çeliği",
    method: "CNC freze ve delik operasyonları",
    productionType: "Düşük adet",
    scale: "Orta parça",
    problem:
      "Birden fazla bağlantı yüzeyinin ve delik grubunun montaj geometrisine uygun hazırlanması.",
    solution:
      "Referans yüzeyleri belirleyen kademeli bir işleme ve ölçüm sırası uygulandı.",
    result:
      "Montaj ilişkisi gözetilen, sonraki işlemlere hazır bir bağlantı gövdesi üretildi.",
    images: ["/images/projects/body.svg"],
    featured: true,
    visual: "body",
  },
  {
    slug: "mil-ve-burc-takimi",
    title: "Mil ve burç takımı",
    category: "torna",
    material: "Çelik ve bronz",
    method: "Torna, iç/dış çap ve yüzey operasyonları",
    productionType: "Tek parça / takım",
    scale: "Küçük parça",
    problem:
      "Birlikte çalışan mil ve burç parçalarında bağlantı ilişkisinin proje gereksinimine göre kurulması.",
    solution:
      "Parçalar aynı takım içinde değerlendirilerek ölçüm sırası ve işleme referansları belirlendi.",
    result:
      "Birbiriyle eşleşmesi kontrol edilmiş tamamlayıcı parça takımı hazırlandı.",
    images: ["/images/projects/shaft.svg"],
    featured: false,
    visual: "shaft",
  },
  {
    slug: "baglama-fiksturu-parcasi",
    title: "Bağlama fikstürü parçası",
    category: "kalip-aparat",
    material: "Alüminyum",
    method: "CNC frezeleme",
    productionType: "Tek parça",
    scale: "Orta parça",
    problem:
      "Üretim sırasında iş parçasını tekrarlı konumda tutacak özel bir bağlama bileşeni ihtiyacı.",
    solution:
      "Temas, sabitleme ve takım erişim bölgeleri aynı geometri üzerinde birlikte değerlendirildi.",
    result:
      "İlgili operasyona özel, erişilebilir bağlama bölgelerine sahip fikstür bileşeni üretildi.",
    images: ["/images/projects/fixture.svg"],
    featured: true,
    visual: "fixture",
  },
  {
    slug: "marpuc-metal-baglanti-bileseni",
    title: "Marpuç metal bağlantı bileşeni",
    category: "marpuc",
    material: "Pirinç",
    method: "CNC ve tamamlayıcı torna operasyonları",
    productionType: "Seri üretim",
    scale: "Küçük hassas parça",
    problem:
      "Farklı üretim partilerinde bağlantı uyumu ve yüzey hazırlığının takip edilmesi.",
    solution:
      "İlk parça kontrolü, operasyon sırası ve parti bazlı ölçüm noktaları tanımlandı.",
    result:
      "Bağlantı ve yüzey işlemi öncesi hazırlığı izlenebilir tekrarlı parçalar üretildi.",
    images: ["/images/projects/connector.svg"],
    featured: true,
    visual: "connector",
  },
  {
    slug: "numuneye-gore-bakim-parcasi",
    title: "Numuneye göre bakım parçası",
    category: "seri-uretim",
    material: "Çelik",
    method: "Ölçülendirme, CNC freze ve torna",
    productionType: "Tek parça",
    scale: "Küçük / orta parça",
    problem:
      "Teknik resmi bulunmayan, aşınmış bir makine parçasının işlevi korunarak yeniden üretilmesi.",
    solution:
      "Numunenin kullanım yeri, eşleşen yüzeyleri ve kritik ölçüleri üzerinden üretilebilirlik değerlendirildi.",
    result:
      "Kontrol noktaları belirlenmiş yeni bir bakım parçası üretim akışına alındı.",
    images: ["/images/projects/sample.svg"],
    featured: false,
    visual: "sample",
  },
];

export const projectFilters: Array<{
  label: string;
  value: ProjectCategory | "all";
}> = [
  { label: "Tümü", value: "all" },
  { label: "Büyük Parça", value: "buyuk-parca" },
  { label: "Hassas Parça", value: "hassas-parca" },
  { label: "Torna", value: "torna" },
  { label: "Kalıp ve Aparat", value: "kalip-aparat" },
  { label: "Seri Üretim", value: "seri-uretim" },
  { label: "Marpuç Bileşenleri", value: "marpuc" },
];
