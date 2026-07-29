import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { TrackedLink } from "./tracked-link";
import {
  company,
  companyFullAddress,
  companyMessages,
} from "@/content/company";
import {
  footerServices,
  legalNavigation,
  navigation,
} from "@/content/navigation";
import { toMailUrl, toPhoneUrl, toWhatsAppUrl } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Logo />
          <p>{companyMessages.shortDescription}</p>
          <div className="footer-coordinate" aria-hidden="true">
            AYKOSAN / İSTANBUL
          </div>
        </div>
        <div className="footer-column">
          <h2>Hızlı bağlantılar</h2>
          <nav aria-label="Footer navigasyon">
            {navigation.slice(1).map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/iletisim">İletişim</Link>
          </nav>
        </div>
        <div className="footer-column">
          <h2>Üretim hizmetleri</h2>
          <nav aria-label="Üretim hizmetleri">
            {footerServices.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-contact">
          <h2>Doğrudan iletişim</h2>
          <TrackedLink href={toPhoneUrl(company.phone)} event="phone_click">
            <Phone size={17} aria-hidden="true" />
            <span>{company.phone}</span>
          </TrackedLink>
          <TrackedLink href={toMailUrl(company.email)} event="email_click">
            <Mail size={17} aria-hidden="true" />
            <span>{company.email}</span>
          </TrackedLink>
          <TrackedLink
            href={toWhatsAppUrl(company.whatsapp)}
            event="whatsapp_click"
            target="_blank"
            rel="noreferrer"
          >
            <span className="wa-dot" aria-hidden="true" />
            <span>WhatsApp’tan yazın</span>
          </TrackedLink>
          <div>
            <MapPin size={17} aria-hidden="true" />
            <span>{companyFullAddress}</span>
          </div>
          <div>
            <Clock3 size={17} aria-hidden="true" />
            <span>{company.workingHours}</span>
          </div>
          <a
            className="footer-direction"
            href={
              process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyFullAddress)}`
            }
            target="_blank"
            rel="noreferrer"
          >
            Yol tarifi al →
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {company.legalName}. Tüm hakları
          saklıdır.
        </p>
        <nav aria-label="Yasal bağlantılar">
          {legalNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
