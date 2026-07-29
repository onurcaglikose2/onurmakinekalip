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
  imageAlt: string;
  featured: boolean;
  visual: "plate" | "body" | "shaft" | "fixture" | "connector" | "sample";
};

// TEMP_IMAGE: SVG kullanan örnekler yeni üretim fotoğrafları geldikçe değiştirilecektir.
export const projects: ProductionProject[] = [
  {
    slug: "cnc-islenmis-mil-aparat-takimi",
    title: "CNC işlenmiş mil ve aparat takımı",
    category: "torna",
    material: "Çelik",
    method: "CNC torna ve tamamlayıcı freze operasyonları",
    productionType: "Takım / düşük adet",
    scale: "Uzun parça",
    problem:
      "Kademeli çap, diş ve bağlantı geometrilerinin aynı parça üzerinde işlenmesi.",
    solution:
      "Torna operasyonları; bağlantı ve sabitleme bölgelerindeki tamamlayıcı işlemlerle birlikte planlandı.",
    result: "Dört parçadan oluşan mil ve aparat takımı üretildi.",
    images: ["/images/projects/project-machined-shafts.webp"],
    imageAlt: "Siyah zeminde dört adet CNC işlenmiş uzun çelik mil ve aparat",
    featured: true,
    visual: "shaft",
  },
  {
    slug: "seri-uretim-frezelenmis-aluminyum-parcalar",
    title: "Seri üretim frezelenmiş parçalar",
    category: "seri-uretim",
    material: "Alüminyum",
    method: "CNC freze, delik ve yüzey operasyonları",
    productionType: "Seri üretim",
    scale: "Küçük parça",
    problem: "Aynı geometrinin çoklu parçalarda tekrarlı biçimde hazırlanması.",
    solution:
      "Referans yüzeyler, delik bölgeleri ve operasyon sırası parti boyunca aynı akışta takip edildi.",
    result:
      "İşlenmiş yüzeyleri ve bağlantı bölgeleri hazırlanmış parça serisi elde edildi.",
    images: ["/images/projects/project-series-milled-parts.webp"],
    imageAlt:
      "Siyah zeminde sıralanmış CNC frezelenmiş küçük alüminyum parçalar",
    featured: true,
    visual: "fixture",
  },
  {
    slug: "dairesel-baglanti-plakalari",
    title: "Dairesel bağlantı plakaları",
    category: "hassas-parca",
    material: "İşlenmiş metal",
    method: "CNC torna, kanal ve delik operasyonları",
    productionType: "Takım / düşük adet",
    scale: "Orta ve küçük parça",
    problem:
      "Dairesel yüzey, merkez çapı ve bağlantı kanallarının aynı parçada ilişkilendirilmesi.",
    solution:
      "Torna ile oluşturulan yüzeylere kanal ve delik operasyonları tamamlayıcı sırada uygulandı.",
    result: "Farklı çaplarda üç bağlantı plakası hazırlandı.",
    images: ["/images/projects/project-circular-plates.webp"],
    imageAlt:
      "Siyah zeminde farklı çaplarda üç CNC işlenmiş dairesel bağlantı plakası",
    featured: true,
    visual: "plate",
  },
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
    imageAlt: "Büyük alüminyum makine plakasını gösteren teknik illüstrasyon",
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
    imageAlt: "Çelik bağlantı gövdesini gösteren teknik illüstrasyon",
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
    imageAlt: "Mil ve burç takımını gösteren teknik illüstrasyon",
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
    imageAlt: "Bağlama fikstürü parçasını gösteren teknik illüstrasyon",
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
    imageAlt:
      "Marpuç metal bağlantı bileşenlerini gösteren teknik illüstrasyon",
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
    imageAlt: "Numuneye göre bakım parçasını gösteren teknik illüstrasyon",
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
