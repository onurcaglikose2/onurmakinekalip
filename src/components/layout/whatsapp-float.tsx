"use client";

import { MessageCircle } from "lucide-react";
import { company } from "@/content/company";
import { track } from "@/lib/analytics";
import { toWhatsAppUrl } from "@/lib/utils";

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={toWhatsAppUrl(company.whatsapp)}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp üzerinden üretim talebi sorun"
      onClick={() => track("whatsapp_click")}
    >
      <MessageCircle aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
