import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { company } from "@/content/company";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Gizlilik Politikası",
  description:
    "Onur Makine Kalıp web sitesinde iletişim, teklif, teknik dosya ve site kullanım verilerinin korunmasına ilişkin gizlilik politikası.",
  path: "/gizlilik-politikasi",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Veri ve dosya güvenliği"
      title="Gizlilik Politikası"
      description="Web sitesini kullandığınızda ve üretim talebi gönderdiğinizde paylaştığınız bilgilerin nasıl ele alındığını açıklar."
      sections={[
        {
          title: "Politikanın kapsamı",
          paragraphs: [
            `Bu politika, ${company.domain} üzerindeki ziyaret, iletişim ve teklif süreçlerini kapsar. Üçüncü taraf sitelere verilen bağlantıların kendi gizlilik koşulları geçerlidir.`,
          ],
        },
        {
          title: "Toplanan bilgiler",
          items: [
            "İletişim ve firma bilgileri",
            "Üretim talebine ilişkin teknik ve ticari bilgiler",
            "Yüklenen teknik resimler, modeller ve parça görselleri",
            "Onay verilmesi halinde anonimleştirilmiş site kullanım verileri",
            "Güvenlik, hata önleme ve oran sınırlaması için gereken sınırlı teknik kayıtlar",
          ],
        },
        {
          title: "Bilgilerin kullanımı",
          paragraphs: [
            "Bilgiler; talebinizi cevaplamak, üretilebilirlik ve teklif değerlendirmesi yapmak, iletişimi sürdürmek, kabul edilen işi yürütmek, sistem güvenliğini sağlamak ve yasal yükümlülükleri yerine getirmek amacıyla kullanılır.",
            "Teknik dosyalar reklam amacıyla kullanılmaz ve açık müşteri izni olmadan referans olarak yayımlanmaz.",
          ],
        },
        {
          title: "Teknik dosyalar",
          paragraphs: [
            "Teklif formuna eklenen dosyaların özel depolama alanında tutulması ve herkese açık URL ile sunulmaması esastır. Entegrasyonlar etkinleştirildiğinde erişim bağlantıları süreli ve yetkilendirilmiş biçimde oluşturulur.",
            "Dosya yükleme alanı çalıştırılabilir dosyaları kabul etmez; uzantı, içerik türü, dosya sayısı ve boyutu hem tarayıcıda hem sunucuda kontrol edilir.",
          ],
        },
        {
          title: "Hizmet sağlayıcılar",
          paragraphs: [
            "Barındırma, e-posta, özel dosya depolama, veritabanı, analitik ve güvenlik hizmetleri için teknik sağlayıcılardan yararlanılabilir. Yalnızca ilgili hizmetin yürütülmesi için gereken veriler paylaşılır ve erişim yetkileri sınırlandırılır.",
          ],
        },
        {
          title: "Güvenlik yaklaşımı",
          items: [
            "Gizli anahtarların istemci tarafına gönderilmemesi",
            "Form verilerinin doğrulanması ve zararlı içeriklerin temizlenmesi",
            "Dosya türü, boyutu ve adının güvenlik kontrolünden geçirilmesi",
            "İstek oranı sınırlaması ve bot doğrulama desteği",
            "Kişisel verilerin uygulama loglarına yazılmaması",
          ],
        },
        {
          title: "Saklama ve silme",
          paragraphs: [
            "Bilgiler işleme amacı ve mevzuatın gerektirdiği süre kadar saklanır. Teklifin devam etmemesi, yasal saklama gereği bulunmaması veya geçerli bir silme talebinin sonuçlandırılması halinde veriler güvenli yöntemlerle silinir, yok edilir ya da anonimleştirilir.",
          ],
        },
        {
          title: "İletişim",
          paragraphs: [
            `Gizlilik uygulamaları ve kişisel verilerinizle ilgili sorularınızı ${company.email} adresine iletebilirsiniz.`,
          ],
        },
      ]}
    />
  );
}
