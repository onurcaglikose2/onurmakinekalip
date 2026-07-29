"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import Link from "next/link";

const consentKey = "omk-analytics-consent";
type Consent = "accepted" | "rejected" | null;

export function AnalyticsConsent() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const saved = window.localStorage.getItem(consentKey) as Consent;
      setConsent(saved);
      setReady(true);
    });
  }, []);

  if (!measurementId || !ready) return null;

  const decide = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(consentKey, value);
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {consent === null ? (
        <div
          className="cookie-consent"
          role="dialog"
          aria-label="Çerez tercihi"
          aria-live="polite"
        >
          <div>
            <strong>Analitik çerez tercihi</strong>
            <p>
              Site kullanımını anlamak için yalnızca onayınızla analitik çerez
              kullanırız. Ayrıntılar için{" "}
              <Link href="/cerez-politikasi">çerez politikasını</Link>{" "}
              inceleyebilirsiniz.
            </p>
          </div>
          <div>
            <button type="button" onClick={() => decide("rejected")}>
              Reddet
            </button>
            <button
              className="accept"
              type="button"
              onClick={() => decide("accepted")}
            >
              Kabul et
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
