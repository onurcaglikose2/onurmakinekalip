"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type TurnstileApi = {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      theme: "light" | "dark";
      language: string;
    },
  ): string;
};

type TurnstileWindow = Window & { turnstile?: TurnstileApi };

export function TurnstileWidget({
  siteKey,
  onVerify,
}: {
  siteKey?: string;
  onVerify: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || widgetIdRef.current) return;
    const api = (window as TurnstileWindow).turnstile;
    if (!api) return;
    widgetIdRef.current = api.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      "expired-callback": () => onVerify(""),
      theme: "light",
      language: "tr",
    });
  }, [onVerify, siteKey]);

  useEffect(() => {
    renderWidget();
  }, [renderWidget]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div ref={containerRef} className="turnstile-container" />
    </>
  );
}
