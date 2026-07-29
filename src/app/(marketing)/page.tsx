import type { Metadata } from "next";
import { AboutFaq } from "@/components/home/about-faq";
import { CapabilitiesOverview } from "@/components/home/capabilities-overview";
import { CapacityStrip } from "@/components/home/capacity-strip";
import { Hero } from "@/components/home/hero";
import { MachineryPreview } from "@/components/home/machinery-preview";
import { MaterialsProcess } from "@/components/home/materials-process";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { QualitySeries } from "@/components/home/quality-series";
import { ScaleSplit } from "@/components/home/scale-split";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaSection } from "@/components/ui/cta-section";
import { company } from "@/content/company";
import { faq } from "@/content/faq";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "CNC İşleme ve Talaşlı İmalat",
  description:
    "İstanbul İkitelli’de büyük parça CNC işleme, hassas CNC freze, torna, kalıp, aparat ve teknik resme göre tek parçadan seri üretime imalat.",
  path: "/",
  keywords: [
    "CNC fason imalat",
    "İstanbul CNC imalat",
    "İkitelli CNC fason imalat",
    "büyük parça CNC işleme",
    "teknik resme göre parça üretimi",
  ],
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CNC işleme ve talaşlı imalat",
  provider: { "@id": `${company.domain}/#organization` },
  areaServed: company.serviceAreas,
  serviceType: [
    "Büyük parça CNC işleme",
    "Hassas CNC frezeleme",
    "CNC torna",
    "Kalıp, aparat ve fikstür üretimi",
    "Numuneye göre parça üretimi",
    "Seri üretim",
  ],
  description:
    "Teknik resme veya numuneye göre tek parça, prototip, düşük adet ve seri CNC parça üretimi.",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={servicesJsonLd} />
      <Hero />
      <CapacityStrip />
      <ScaleSplit />
      <CapabilitiesOverview />
      <MachineryPreview />
      <ProjectsPreview />
      <MaterialsProcess />
      <QualitySeries />
      <AboutFaq />
      <CtaSection />
    </>
  );
}
