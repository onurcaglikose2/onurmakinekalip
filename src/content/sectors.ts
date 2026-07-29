export type Sector = {
  name: string;
  need: string;
  solution: string;
  parts: string[];
  capabilities: string[];
};

export const sectors: Sector[] = [
  {
    name: "Makine ve özel makine üretimi",
    need: "Projeye özel gövde, bağlantı ve hareket elemanları",
    solution:
      "Teknik resme göre büyük ve küçük ölçekli makine bileşenlerinin proje bazlı üretimi",
    parts: ["Gövde", "Plaka", "Mil", "Bağlantı parçası"],
    capabilities: ["Büyük parça CNC", "Hassas freze", "Torna"],
  },
  {
    name: "Otomasyon",
    need: "Mekanik sistemlere uyumlu özel ara parçalar ve bağlama elemanları",
    solution:
      "Montaj geometrisi ve bağlantı ilişkisi dikkate alınarak CNC işleme",
    parts: ["Adaptör", "Sensör braketi", "Taşıyıcı plaka", "Fikstür"],
    capabilities: ["Hassas freze", "Aparat ve fikstür"],
  },
  {
    name: "Bakım ve yedek parça",
    need: "Tedariki durmuş veya teknik resmi bulunmayan makine parçaları",
    solution:
      "Numune, kullanım yeri ve ölçüler üzerinden üretilebilirlik değerlendirmesi",
    parts: ["Aşınma parçası", "Burç", "Mil", "Makine bağlantısı"],
    capabilities: ["Numuneye göre üretim", "Torna", "Büyük parça CNC"],
  },
  {
    name: "Kalıp ve aparat",
    need: "Üretime özel bağlama, konumlandırma ve kontrol elemanları",
    solution:
      "Operasyon ihtiyacına göre tekil kalıp bileşeni, aparat ve fikstür üretimi",
    parts: ["Kalıp altlığı", "Bağlama çenesi", "Kontrol aparatı", "Fikstür"],
    capabilities: ["Kalıp ve aparat", "Büyük parça CNC"],
  },
  {
    name: "Metal aksesuar",
    need: "Görsel yüzey ve bağlantı uyumu isteyen küçük metal parçalar",
    solution:
      "Farklı tasarım ve ölçülerde küçük parça ile tekrarlı üretim desteği",
    parts: ["Bağlantı", "Kapak", "Adaptör", "Dekoratif metal parça"],
    capabilities: ["Hassas freze", "Seri üretim"],
  },
  {
    name: "Nargile ve marpuç üretimi",
    need: "Tekrarlı ölçü, diş ve bağlantı uyumu gerektiren metal bileşenler",
    solution:
      "Parti bazlı planlanan bağlantı ve adaptör parçalarının tekrarlı üretimi",
    parts: ["Marpuç bağlantısı", "Adaptör", "Metal uç", "Ara bileşen"],
    capabilities: ["Seri üretim", "Hassas freze", "Torna"],
  },
  {
    name: "Ambalaj makineleri",
    need: "Bakım, format değişimi ve mekanik sistem parçaları",
    solution:
      "Teknik resim veya numuneye göre makineye özel parça değerlendirmesi",
    parts: ["Kızak", "Taşıyıcı", "Mil", "Bağlantı plakası"],
    capabilities: ["Numuneye göre üretim", "Hassas freze", "Torna"],
  },
  {
    name: "Gıda makineleri",
    need: "Makine mekanizmasına özel, malzeme seçimi dikkatle ele alınan parçalar",
    solution:
      "Kullanım alanı ve malzeme bilgisiyle birlikte proje bazlı CNC işleme",
    parts: ["Taşıyıcı", "Kılavuz", "Bağlantı", "Makine elemanı"],
    capabilities: ["Hassas freze", "Torna"],
  },
  {
    name: "Otomotiv yan sanayi",
    need: "Tekrarlı üretim, aparat ve proses destek parçaları",
    solution: "Parça gereksinimine göre düşük veya orta adetli üretim planlama",
    parts: ["Kontrol aparatı", "Fikstür", "Bağlantı", "Prototip parça"],
    capabilities: ["Seri üretim", "Kalıp ve aparat"],
  },
  {
    name: "Genel sanayi",
    need: "Tek seferlik bakım işinden düzenli parça ihtiyacına uzanan talepler",
    solution:
      "Dik işleme ve CNC torna kapasitesini ihtiyaca göre eşleştiren esnek üretim",
    parts: ["Yedek parça", "Plaka", "Gövde", "Adaptör"],
    capabilities: ["Büyük parça CNC", "Hassas freze", "Torna"],
  },
];
