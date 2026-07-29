export type CompanyInfo = {
  legalName: string;
  shortName: string;
  domain: string;
  foundedYear?: number;
  experienceYears?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  quoteEmail?: string;
  address?: string;
  district?: string;
  city?: string;
  country: string;
  workingHours?: string;
  schemaOpeningHours?: string;
  quoteResponseTarget?: string;
  serviceAreas: string[];
  productionTypes: string[];
  qualityApproach: string;
  mapCoordinates?: { lat: number; lng: number };
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    googleBusiness?: string;
  };
};

/**
 * Şirket ve iletişim bilgileri bu dosyadan merkezi olarak yönetilir.
 */
const contactPhone = "0531 957 30 50";

export const company: CompanyInfo = {
  legalName: "Onur Makine Kalıp",
  shortName: "Onur Makine",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.onurmakinekalip.com",
  experienceYears: "10",
  phone: contactPhone,
  whatsapp: contactPhone,
  email: "info@onurmakinekalip.com",
  quoteEmail: "teklif@onurmakinekalip.com",
  address: "AYKOSAN Sanayi Sitesi 6'lı D Blok No:24 İOSB",
  district: "Başakşehir",
  city: "İstanbul",
  country: "Türkiye",
  workingHours: "Pazartesi–Cumartesi 08.00–18.00",
  schemaOpeningHours: "Mo-Sa 08:00-18:00",
  quoteResponseTarget: "Aynı iş günü içinde ön değerlendirme",
  serviceAreas: ["İstanbul", "Marmara Bölgesi", "Türkiye geneli"],
  productionTypes: ["Tek parça", "Prototip", "Düşük adet", "Seri üretim"],
  qualityApproach: "Proje gereksinimine göre ölçüm, ara kontrol ve son kontrol",
};

export const companyFullAddress = [
  company.address,
  [company.district, company.city].filter(Boolean).join("/"),
]
  .filter(Boolean)
  .join(" ");

export const companyMessages = {
  shortDescription:
    "Onur Makine Kalıp; büyük sanayi parçalarından küçük ve tekrarlı bileşenlere kadar farklı ölçekte CNC işleme, torna, freze, kalıp, aparat ve özel parça üretimi gerçekleştirir.",
  valueProposition:
    "Küçük hassas parçalardan büyük sanayi parçalarına, teknik resimden üretime.",
  trust:
    "Parçayı yalnızca işlemekle kalmıyor; teknik resim, malzeme, kullanım alanı ve üretim adedini birlikte değerlendiriyoruz.",
  flexibility:
    "Tek parça bakım ihtiyacından düzenli seri üretime kadar farklı üretim modellerine uyum sağlıyoruz.",
  quote:
    "Teknik resminizi, 3D modelinizi veya numune fotoğrafınızı gönderin; üretilebilirlik, termin ve fiyat açısından değerlendirelim.",
};

export const acceptedFileFormats = [
  "PDF",
  "JPG",
  "PNG",
  "WEBP",
  "DXF",
  "DWG",
  "STEP",
  "STP",
  "IGES",
  "IGS",
  "ZIP",
] as const;

export const materials = [
  {
    name: "Alüminyum",
    note: "Hafif makine parçaları, plakalar ve gövdeler",
  },
  {
    name: "Karbon çeliği",
    note: "Dayanım gerektiren makine ve bağlantı elemanları",
  },
  {
    name: "Paslanmaz çelik",
    note: "Korozyon direnci istenen proje parçaları",
  },
  { name: "Pirinç", note: "Bağlantı, adaptör ve metal aksesuar parçaları" },
  { name: "Bronz", note: "Burç ve aşınma uygulamaları" },
  { name: "Bakır", note: "İletkenlik veya özel kullanım gerektiren parçalar" },
  {
    name: "Mühendislik plastikleri",
    note: "Geometri ve kullanım alanına göre değerlendirilen parçalar",
  },
] as const;
