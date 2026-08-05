import { NextResponse } from "next/server";
import { capabilities } from "@/content/capabilities";
import {
  acceptedFileFormats,
  company,
  companyFullAddress,
  companyMessages,
  materials,
} from "@/content/company";
import { faq } from "@/content/faq";
import { machinery } from "@/content/machinery";

export async function GET() {
  const content = `# ${company.legalName} - CNC İşleme ve Talaşlı İmalat

> ${companyMessages.shortDescription}

## Şirket ve İletişim Bilgileri
- **Firma Ünvanı:** ${company.legalName} (${company.shortName})
- **Kuruluş & Tecrübe:** ${company.experienceYears} yılı aşkın sektör tecrübesi
- **Adres:** ${companyFullAddress}
- **Telefon & WhatsApp:** ${company.phone}
- **E-Posta:** ${company.email} (Teklif için: ${company.quoteEmail})
- **Çalışma Saatleri:** ${company.workingHours}
- **Hizmet Bölgeleri:** ${company.serviceAreas.join(", ")}
- **Üretim Tipleri:** ${company.productionTypes.join(", ")}

## Üretim Kabiliyetleri
${capabilities.map((c) => `- **${c.title}:** ${c.summary}`).join("\n")}

## Makine Parkuru ve Kapasite
${machinery.map((m) => `- **${m.name} (${m.code}):** ${m.description}`).join("\n")}

## İşlenen Malzemeler
${materials.map((mat) => `- **${mat.name}:** ${mat.note}`).join("\n")}

## Kabul Edilen 2D/3D Çizim ve Dosya Formatları
${acceptedFileFormats.join(", ")}

## Sıkça Sorulan Sorular (FAQ)
${faq.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}

---
*Teklif almak ve teknik detayları incelemek için: ${company.domain}/teklif-al*
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
