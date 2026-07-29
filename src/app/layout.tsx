import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AnalyticsConsent } from "@/components/layout/analytics-consent";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { JsonLd } from "@/components/seo/json-ld";
import { company, companyMessages } from "@/content/company";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-body",
  display: "optional",
  fallback: ["Arial", "sans-serif"],
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-ext-wght-normal.woff2",
      style: "normal",
      weight: "300 700",
    },
    {
      path: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
      style: "normal",
      weight: "300 700",
    },
  ],
  variable: "--font-display",
  display: "optional",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.domain),
  title: {
    default: `${company.legalName} | CNC İşleme ve Talaşlı İmalat`,
    template: `%s | ${company.shortName}`,
  },
  description: companyMessages.shortDescription,
  applicationName: company.legalName,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  category: "manufacturing",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0f14",
  colorScheme: "dark light",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${company.domain}/#organization`,
  name: company.legalName,
  url: company.domain,
  logo: `${company.domain}/icon.svg`,
  description: companyMessages.shortDescription,
  foundingDate: company.foundedYear?.toString(),
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressLocality: company.district,
    addressRegion: company.city,
    addressCountry: "TR",
  },
  areaServed: company.serviceAreas.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  openingHours: company.schemaOpeningHours,
  knowsAbout: [
    "CNC fason imalat",
    "Büyük parça CNC işleme",
    "Hassas CNC frezeleme",
    "CNC torna",
    "Kalıp ve aparat üretimi",
    "Numuneye göre parça üretimi",
    "Seri CNC üretimi",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${company.domain}/#website`,
  url: company.domain,
  name: company.legalName,
  inLanguage: "tr-TR",
  publisher: { "@id": `${company.domain}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a className="skip-link" href="#main-content">
          Ana içeriğe geç
        </a>
        <JsonLd data={localBusinessJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
