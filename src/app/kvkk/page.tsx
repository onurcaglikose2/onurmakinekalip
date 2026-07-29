import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { company } from "@/content/company";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "Onur Makine Kalıp teklif ve iletişim süreçlerine ilişkin kişisel verilerin işlenmesi hakkında KVKK aydınlatma metni.",
  path: "/kvkk",
});

export default function KvkkPage() {
  return (
    <LegalPage
      eyebrow="6698 sayılı Kanun kapsamında"
      title="KVKK Aydınlatma Metni"
      description="Teklif ve iletişim talepleri kapsamında paylaşılan kişisel verilerin hangi amaçlarla ve hangi esaslara göre işlendiğini açıklar."
      sections={[
        {
          title: "Veri sorumlusu",
          paragraphs: [
            `${company.legalName}, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu sıfatıyla; teklif, iletişim ve üretim değerlendirme süreçlerinde paylaştığınız kişisel verileri aşağıdaki esaslarla işler.`,
            `Veri sorumlusuna ${company.email} e-posta adresi veya ${company.address}, ${company.city} adres bilgisi üzerinden ulaşabilirsiniz.`,
          ],
        },
        {
          title: "İşlenen kişisel veriler",
          items: [
            "Ad soyad, firma adı, şehir ve iletişim bilgileri",
            "Talep türü, üretim adedi, malzeme, ölçü, termin ve açıklama bilgileri",
            "Teknik resim, 3D model, parça fotoğrafı ve gönderilen diğer üretim dosyaları",
            "Numune durumu, gizlilik talebi ve tercih edilen iletişim kanalı",
            "Form güvenliği için sınırlı bağlantı ve işlem kayıtları",
          ],
        },
        {
          title: "İşleme amaçları",
          items: [
            "Üretilebilirlik, kapasite, fiyat ve termin değerlendirmesi yapmak",
            "Talep sahibiyle iletişim kurmak ve ek teknik bilgi istemek",
            "Teklif hazırlamak, sunmak ve teklif sürecini takip etmek",
            "Kabul edilen işlerde üretim, kontrol, teslimat ve finans süreçlerini yürütmek",
            "Bilgi ve sistem güvenliğini sağlamak, kötüye kullanımı önlemek",
            "Hukuki yükümlülükleri yerine getirmek ve uyuşmazlıklarda hakları korumak",
          ],
        },
        {
          title: "Hukuki sebepler ve toplama yöntemi",
          paragraphs: [
            "Kişisel veriler; web sitesi formları, e-posta, telefon, WhatsApp, yüz yüze görüşme ve gönderilen dosyalar aracılığıyla otomatik veya kısmen otomatik yollarla toplanabilir.",
            "Veriler; bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olma, veri sorumlusunun hukuki yükümlülüğü, bir hakkın tesisi, kullanılması veya korunması, ilgili kişinin temel haklarına zarar vermemek kaydıyla meşru menfaat ve gerekli hallerde açık rıza hukuki sebeplerine dayanılarak işlenir.",
          ],
        },
        {
          title: "Aktarım ve alıcı grupları",
          paragraphs: [
            "Veriler; yalnızca belirtilen amaçların gerektirdiği ölçüde barındırma, güvenli dosya depolama, e-posta, bilişim desteği, muhasebe, lojistik ve hukuki danışmanlık hizmeti sağlayan taraflarla; yetkili kamu kurumlarıyla ve işin yürütülmesi için gerekli tedarikçilerle paylaşılabilir.",
            "Yurt dışı aktarımı söz konusu olduğunda KVKK’nın ilgili hükümleri ve geçerli aktarım güvenceleri dikkate alınır. Yurt dışında sunucu kullanan bir hizmet etkinleştirilmeden önce gerekli hukuki değerlendirme yapılır.",
          ],
        },
        {
          title: "Saklama ve güvenlik",
          paragraphs: [
            "Kişisel veriler, teklif ve iş ilişkisinin yürütülmesi için gereken süre ile yasal yükümlülüklerden doğan saklama süreleri boyunca tutulur; amaç ve yükümlülük ortadan kalktığında uygun yöntemle silinir, yok edilir veya anonim hale getirilir.",
            "Teknik dosyaların herkese açık bağlantılarla yayımlanmaması, erişimin yetkili kişilerle sınırlandırılması ve gizli anahtarların sunucu tarafında tutulması hedeflenir.",
          ],
        },
        {
          title: "Haklarınız ve başvuru",
          paragraphs: [
            "KVKK’nın 11. maddesi kapsamında verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, aktarılan üçüncü kişileri bilme, düzeltme, silme veya yok etme isteme, otomatik sistem sonucuna itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz.",
            `Başvurunuzu kimliğinizi doğrulayacak bilgiler ve talebinizle birlikte ${company.email} adresine veya şirket adresine iletebilirsiniz. Başvurular yürürlükteki mevzuatta öngörülen usul ve sürelerde değerlendirilir.`,
          ],
        },
        {
          title: "Pazarlama izni",
          paragraphs: [
            "Teklif değerlendirmesi için verilen onay, elektronik pazarlama izni anlamına gelmez. Kampanya ve duyuru iletişimi için ayrı ve isteğe bağlı bir tercih alınır; bu tercih daha sonra geri çekilebilir.",
          ],
        },
      ]}
    />
  );
}
