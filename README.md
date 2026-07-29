# Onur Makine Kalıp Kurumsal Web Sitesi

Onur Makine Kalıp için hazırlanmış production odaklı kurumsal web sitesidir. Site; büyük parça CNC işleme ile küçük/hassas ve tekrarlı üretim kabiliyetini açıkça ayırır, teknik güveni makine parkuru ve üretim süreci üzerinden kurar, ziyaretçiyi teknik dosya göndererek teklif almaya yönlendirir.

## Teknoloji yığını

- Next.js 16.2 / App Router
- React 19 ve TypeScript strict mode
- Tailwind CSS 4 + merkezi CSS tasarım tokenları
- Lucide Icons
- Framer Motion (ölçülü hero giriş hareketi)
- React Hook Form + Zod
- Vitest + Testing Library
- Playwright
- ESLint 9 ve Prettier
- Vercel uyumlu Node.js route handlers

## Sayfalar

| URL                     | İçerik                                   |
| ----------------------- | ---------------------------------------- |
| `/`                     | Ana satış sayfası                        |
| `/uretim-kabiliyetleri` | 6 üretim kabiliyeti                      |
| `/makine-parkuru`       | 1 DİM + 2 CNC torna + manuel torna/freze |
| `/uretim-ornekleri`     | Filtrelenebilir üretim galerisi          |
| `/sektorler`            | 10 sektör ve tipik parça ihtiyaçları     |
| `/kalite-ve-surec`      | 7 aşamalı üretim ve kontrol akışı        |
| `/hakkimizda`           | Şirket yaklaşımı, kapasite ve değerler   |
| `/teklif-al`            | Teknik dosya yüklemeli teklif formu      |
| `/iletisim`             | İletişim bilgileri ve kısa form          |
| `/kvkk`                 | KVKK aydınlatma taslağı                  |
| `/gizlilik-politikasi`  | Gizlilik politikası taslağı              |
| `/cerez-politikasi`     | Çerez politikası taslağı                 |

Özel 404, runtime hata ekranı, `sitemap.xml`, `robots.txt`, manifest ve dinamik Open Graph görseli dahildir.

## Yerel kurulum

Gereksinimler: Node.js 20.9 veya üzeri ve npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Site `http://localhost:3000` adresinde açılır. Harici servis anahtarları olmadan teklif ve iletişim formları demo modunda başarıyla çalışır; hassas veri kalıcı olarak yazılmaz.

## Komutlar

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
npm run start
npm run format
```

Playwright tarayıcısı ilk kez gerekiyorsa:

```bash
npx playwright install chromium
```

## Merkezi içerik yönetimi

Şirket ve sayfa verileri bileşenlerin içine dağılmamıştır:

- Şirket/NAP/iletişim: `src/content/company.ts`
- Menü ve footer: `src/content/navigation.ts`
- Üretim kabiliyetleri: `src/content/capabilities.ts`
- Makine parkuru: `src/content/machinery.ts`
- Üretim örnekleri: `src/content/projects.ts`
- Sektörler: `src/content/sectors.ts`
- SSS: `src/content/faq.ts`

Makine marka/model, eksen, hareket mesafesi, tabla, maksimum parça ve kontrol ünitesi alanları `src/content/machinery.ts` içinde şu anda `null` değerindedir. Gerçek bilgi eklendiğinde teknik tablo otomatik görünür; boş alanlar kullanıcıya gösterilmez.

## Yayın öncesi değiştirilmesi gereken varsayımlar

Site genelindeki doğrulanmış iletişim bilgileri:

- Telefon ve WhatsApp: `0531 957 30 50`
- Açık adres: `AYKOSAN Sanayi Sitesi 6'lı D Blok No:24 İOSB Başakşehir/İstanbul`

`src/content/company.ts` içindeki aşağıdaki bilgiler geçici varsayımdır ve gerçek yayın öncesi doğrulanmalıdır:

- Kuruluş yılı: `2012`
- Deneyim: `15+ yıl`
- Çalışma saatleri
- Aynı iş günü ön değerlendirme hedefi
- Genel ve teklif e-posta adreslerinin çalışan posta kutuları

Harita koordinatı henüz tanımlanmamıştır; yol tarifi bağlantısı doğrulanmış açık adresi Google Maps’te aratır. Koordinatlar `company.mapCoordinates` alanına eklendiğinde harita bileşeni ayrıca etkinleştirilebilir. Sertifika, makine ölçüsü, tolerans veya teslim süresi iddiası varsayımsal olarak eklenmemiştir.

KVKK, gizlilik ve çerez metinleri profesyonel başlangıç taslağıdır; gerçek veri akışı, hizmet sağlayıcılar ve şirket bilgileriyle birlikte yetkili hukuk danışmanı tarafından son kontrolden geçirilmelidir.

## Görselleri değiştirme

İlk sürümde sahte fabrika fotoğrafı yerine ölçeklenebilir teknik SVG kompozisyonları kullanılır. Kodda proje görselleri `TEMP_IMAGE` açıklamasıyla işaretlidir.

Gerçek görseller:

```text
public/images/hero/
public/images/machinery/
public/images/projects/
public/images/workshop/
public/videos/
```

klasörlerine AVIF/WebP olarak eklenir. Ardından `src/content/machinery.ts` ve `src/content/projects.ts` içindeki `images` yolları değiştirilir. Hero görsel/video yolu `src/components/home/hero.tsx` içinden güncellenir. Ayrıntılı çekim listesi [CONTENT-SHOOT-GUIDE.md](./CONTENT-SHOOT-GUIDE.md) dosyasındadır.

## Environment değişkenleri

Tüm örnekler `.env.example` dosyasındadır.

| Değişken                         | Amaç                                                     |
| -------------------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Canonical site adresi                                    |
| `NEXT_PUBLIC_GA_ID`              | GA4 ölçüm kimliği; yoksa script yüklenmez                |
| `NEXT_PUBLIC_GOOGLE_MAPS_URL`    | Doğrulanmış yol tarifi bağlantısı                        |
| `RESEND_API_KEY`                 | Teklif ve iletişim bildirim e-postaları                  |
| `QUOTE_NOTIFICATION_EMAIL`       | Bildirim alıcısı                                         |
| `QUOTE_UPLOAD_SIGNING_SECRET`    | Kısa ömürlü dosya planlarını imzalamak için sunucu sırrı |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile istemci anahtarı                    |
| `TURNSTILE_SECRET_KEY`           | Turnstile sunucu anahtarı                                |
| `SUPABASE_URL`                   | Supabase proje URL’si                                    |
| `SUPABASE_SERVICE_ROLE_KEY`      | Yalnızca sunucuda kullanılan Supabase anahtarı           |
| `SUPABASE_QUOTE_BUCKET`          | Private teklif dosyası bucket’ı                          |
| `R2_ENDPOINT` ve R2 anahtarları  | Supabase Storage yerine Cloudflare R2                    |

`SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `QUOTE_UPLOAD_SIGNING_SECRET` ve R2 gizli anahtarları `NEXT_PUBLIC_` öneki almamalıdır.

## Teklif formu nasıl çalışır?

1. React Hook Form ve Zod istemci alanlarını doğrular.
2. Dosya uzantısı, MIME türü, adet (en fazla 5) ve boyut (dosya başına 25 MB) istemcide kontrol edilir.
3. `/api/upload` dosya metadatasını ve etkinse Turnstile sonucunu sunucuda doğrular, `OMK-YYYY-000000` numarasını üretir ve private Supabase Storage veya R2 için kısa ömürlü imzalı yükleme hedefleri oluşturur.
4. Tarayıcı dosyaları `XMLHttpRequest` ile doğrudan private storage’a yükler ve gerçek toplam ilerlemeyi gösterir. Dosya içeriği Vercel Function gövdesinden geçmez.
5. `/api/quote` yalnızca küçük JSON formunu ve HMAC imzalı dosya planını alır; metni temizler, imzayı doğrular, honeypot ve IP bazlı oran sınırı uygular. Dosyasız talepte Turnstile burada, dosyalı talepte imzalı yükleme planı oluşturulmadan önce doğrulanır.
6. Storage adaptörü öncelikle Supabase, ardından R2 yapılandırmasını arar; hiçbiri yoksa dosyaları saklamayan demo adaptörüne geçer.
7. Supabase ayarlıysa teklif kaydı REST API üzerinden yazılır. Resend ayarlıysa şirkete yedi gün geçerli güvenli dosya bağlantıları içeren bildirim gider.
8. Kişisel veriler uygulama loglarına yazılmaz.

Doğrudan storage yüklemesi, Vercel Functions’ın [4,5 MB istek gövdesi sınırını](https://vercel.com/docs/functions/limitations#request-body-size) aşmadan prompttaki dosya başına 25 MB kuralını destekler. `QUOTE_UPLOAD_SIGNING_SECRET` için en az 32 bayt rastgele bir değer kullanın. Değer yoksa entegre modda mevcut storage sırrından türetilir; ayrı bir değer kullanılması önerilir.

### Supabase kurulumu

1. Supabase’de private bir bucket oluşturun; adını `SUPABASE_QUOTE_BUCKET` değerine yazın. Bucket seviyesinde 25 MB dosya sınırını ve kabul edilen MIME türlerini tanımlayın.
2. SQL Editor’da teklif tablosunu oluşturun:

```sql
create table public.quote_requests (
  id bigint generated by default as identity primary key,
  request_id text unique not null,
  full_name text not null,
  company_name text not null,
  phone text not null,
  email text not null,
  request_type text not null,
  quantity text not null,
  description text not null,
  material text,
  requested_delivery_date text,
  dimensions text,
  city text,
  sample_available boolean not null default false,
  confidentiality_requested boolean not null default false,
  contact_preference text,
  marketing_consent boolean not null default false,
  storage_mode text not null,
  files jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;
```

Tarayıcıdan tablo erişimi verilmez. Route handler service role ile çalışır.

### Cloudflare R2

`R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` ve `R2_BUCKET_NAME` tanımlandığında S3 uyumlu, AWS Signature V4 ile imzalanan private yükleme adaptörü kullanılır. Supabase Storage değişkenleri de doluysa öncelik Supabase’dedir. E-posta bağlantıları yedi gün süreli imzalanır.

Tarayıcıdan imzalı `PUT` yüklemesi için R2 bucket CORS ayarına production ve preview originlerini ekleyin:

```json
[
  {
    "AllowedOrigins": [
      "https://www.onurmakinekalip.com",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["Content-Type"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

### Resend

1. `onurmakinekalip.com` alan adını Resend’de doğrulayın.
2. API anahtarını `RESEND_API_KEY` olarak ekleyin.
3. Bildirim alıcısını `QUOTE_NOTIFICATION_EMAIL` ile tanımlayın.
4. `from` adreslerinin doğrulanmış alan adıyla eşleştiğini test edin.

### Cloudflare Turnstile

Site ve secret anahtarlarını env’e ekleyin. Anahtar yoksa doğrulama atlanır; anahtar varsa istemci widget’ı ve sunucu doğrulaması birlikte etkinleşir.

## GA4 ve çerez tercihi

`NEXT_PUBLIC_GA_ID` yoksa hiçbir Google Analytics scripti render edilmez. Değer varsa kullanıcıya çerez tercihi gösterilir ve GA4 yalnızca “Kabul et” seçiminden sonra yüklenir. Typed event helper `src/lib/analytics/index.ts` içindedir.

GA4 kurulumu:

1. GA4 web veri akışı oluşturun.
2. Ölçüm kimliğini Vercel env’e ekleyin.
3. Gerçek zamanlı raporda sayfa görüntüleme ve teklif olaylarını doğrulayın.
4. Gerekli olayları dönüşüm olarak işaretleyin.

## Search Console

1. Vercel’e alan adını bağladıktan sonra Search Console’da Domain property oluşturun.
2. DNS TXT kaydıyla doğrulayın.
3. `https://www.onurmakinekalip.com/sitemap.xml` adresini gönderin.
4. Canonical yönlendirmesi, robots ve sayfa index durumunu kontrol edin.

## Vercel deployment

1. Repoyu GitHub’a gönderin.
2. Vercel’de **Add New → Project** ile repoyu içe aktarın.
3. Framework Preset otomatik olarak Next.js seçilir; build komutu `npm run build` olmalıdır.
4. Gerekli env değerlerini Production ve Preview ortamlarına ekleyin.
5. İlk deployment sonrasında formları demo veya entegrasyon modunda test edin.
6. **Settings → Domains** üzerinden `onurmakinekalip.com` ve `www.onurmakinekalip.com` ekleyin.
7. Canonical yapı `www` kullandığı için kök alan adını `www` sürümüne 308 ile yönlendirin.

## Production kontrol listesi

- [x] Telefon, WhatsApp ve açık adres doğrulandı.
- [ ] Kuruluş yılı ve deneyim bilgisi doğrulandı.
- [ ] Makine marka/model ve gerçek teknik ölçüleri girildi.
- [ ] Gerçek fotoğraflar optimize edilip teknik SVG’lerle değiştirildi.
- [ ] KVKK/gizlilik/çerez metinleri hukuki kontrolden geçti.
- [ ] Resend alan adı ve gönderici adresi doğrulandı.
- [ ] Supabase/R2 bucket private ve erişim politikaları test edildi.
- [ ] R2 kullanılıyorsa yalnızca doğrulanmış site originlerini içeren CORS kuralı tanımlandı.
- [ ] Turnstile production anahtarları eklendi.
- [ ] Teklif ve iletişim formu gerçek alıcılarla test edildi.
- [ ] GA4 yalnızca onay sonrası yüklendiği doğrulandı.
- [ ] Search Console ve sitemap gönderildi.
- [ ] `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` başarılı.
- [ ] Playwright masaüstü ve mobil testleri başarılı.
- [ ] 360, 390, 768, 1024, 1440 ve 1920 px görsel kontrolleri yapıldı.
- [ ] Lighthouse performans, erişilebilirlik, iyi uygulamalar ve SEO kontrolleri yapıldı.
