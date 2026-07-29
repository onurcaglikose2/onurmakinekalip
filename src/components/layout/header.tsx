"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { navigation } from "@/content/navigation";
import { company } from "@/content/company";
import { cn, toPhoneUrl, toWhatsAppUrl } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "site-header",
        (scrolled || pathname !== "/") && "site-header-solid",
      )}
    >
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Ana navigasyon">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={pathname === item.href ? "is-active" : undefined}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="header-phone"
            href={toPhoneUrl(company.phone)}
            onClick={() => track("phone_click")}
          >
            <Phone size={16} aria-hidden="true" />
            <span>{company.phone}</span>
          </a>
          <Link className="header-cta" href="/teklif-al" prefetch={false}>
            <Send size={16} aria-hidden="true" />
            Teknik Resim Gönder
          </Link>
          <button
            ref={triggerRef}
            className="menu-trigger"
            type="button"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div
        className={cn("mobile-menu-backdrop", open && "is-open")}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />
      <div
        id="mobile-menu"
        ref={panelRef}
        className={cn("mobile-menu", open && "is-open")}
        aria-hidden={!open}
      >
        <div className="mobile-menu-index">OMK / NAV</div>
        <nav aria-label="Mobil navigasyon">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              tabIndex={open ? 0 : -1}
              className={pathname === item.href ? "is-active" : undefined}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <a
            href={toPhoneUrl(company.phone)}
            tabIndex={open ? 0 : -1}
            onClick={() => track("phone_click")}
          >
            <Phone size={18} aria-hidden="true" />
            {company.phone}
          </a>
          <a
            href={toWhatsAppUrl(company.whatsapp)}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            onClick={() => track("whatsapp_click")}
          >
            WhatsApp’tan Sor
          </a>
          <Link
            href="/teklif-al"
            prefetch={false}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Teknik Resim Gönder
          </Link>
        </div>
      </div>
    </header>
  );
}
