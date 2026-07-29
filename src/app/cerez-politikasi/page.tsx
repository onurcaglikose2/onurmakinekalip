import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { company } from "@/content/company";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Çerez Politikası",
  description:
    "Onur Makine Kalıp web sitesinde zorunlu ve isteğe bağlı analitik çerezlerin kullanımına ilişkin açıklamalar ve tercih yönetimi.",
  path: "/cerez-politikasi",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Çerez ve tercih yönetimi"
      title="Çerez Politikası"
      description="Sitenin çalışması için gereken teknik kayıtlar ile yalnızca onayınızla kullanılan analitik çerezleri açıklar."
      sections={[
        {
          title: "Çerez nedir?",
          paragraphs: [
            "Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınızda saklanabilen küçük metin kayıtlarıdır. Site işlevlerini sürdürmek, tercihleri hatırlamak veya onay verilmesi halinde kullanım istatistikleri oluşturmak için kullanılabilir.",
          ],
        },
        {
          title: "Zorunlu teknolojiler",
          paragraphs: [
            "Güvenlik, form gönderimi, istek oranı sınırlaması ve çerez tercihinizin hatırlanması gibi temel işlevler için gereken kayıtlar zorunlu niteliktedir. Bunlar pazarlama profili oluşturmak amacıyla kullanılmaz.",
          ],
          items: [
            "Analitik tercih kaydı",
            "Form güvenliği ve bot koruması",
            "Oturum ve teknik güvenlik kayıtları",
          ],
        },
        {
          title: "Analitik çerezler",
          paragraphs: [
            "Google Analytics 4 yalnızca geçerli ölçüm kimliği tanımlanmışsa ve analitik çerezlere açık onay verirseniz yüklenir. Bu ölçüm; sayfa görüntüleme, teklif formu etkileşimi ve iletişim bağlantısı tıklamaları gibi site performansını anlamaya yönelik olayları içerebilir.",
            "Analitik tercih verilmeden üçüncü taraf analitik betiği yüklenmez.",
          ],
        },
        {
          title: "Pazarlama çerezleri",
          paragraphs: [
            "İlk sürümde reklam hedefleme veya yeniden pazarlama çerezi kullanılmaz. Gelecekte böyle bir teknoloji eklenirse politika ve tercih arayüzü güncellenir; açık onay olmadan etkinleştirilmez.",
          ],
        },
        {
          title: "Tercihinizi yönetme",
          paragraphs: [
            "Site üzerindeki çerez bildiriminden analitik çerezleri kabul edebilir veya reddedebilirsiniz. Tarayıcınızın site verileri bölümünden kaydedilmiş tercihi silerek seçim ekranının yeniden gösterilmesini sağlayabilirsiniz.",
            "Tarayıcı ayarları üzerinden çerezleri tümden engellemek mümkündür; ancak bazı zorunlu işlevler beklenen şekilde çalışmayabilir.",
          ],
        },
        {
          title: "Üçüncü taraflar",
          paragraphs: [
            "Analitik etkinleştirildiğinde ilgili sağlayıcının kendi gizlilik ve saklama koşulları da uygulanabilir. Harita, video veya sosyal medya içeriği gibi üçüncü taraf bileşenler, gerekli tercih ve yapılandırma olmadan otomatik olarak yüklenmez.",
          ],
        },
        {
          title: "İletişim",
          paragraphs: [
            `Çerez kullanımıyla ilgili sorularınızı ${company.email} adresine iletebilirsiniz.`,
          ],
        },
      ]}
    />
  );
}
