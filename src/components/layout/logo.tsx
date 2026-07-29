import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  compact = false,
}: {
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      prefetch={false}
      className={cn(
        "brand-logo",
        tone === "dark" && "brand-logo-dark",
        compact && "brand-logo-compact",
      )}
    >
      <svg viewBox="0 0 44 44" role="img" aria-hidden="true">
        <path d="M5 5h27l7 7v27H12l-7-7z" />
        <path d="M13 14h18v16H13z" />
        <path d="M5 32h7V5M32 5v9h7" />
        <circle cx="22" cy="22" r="3.4" />
      </svg>
      {compact ? (
        <span className="sr-only">ONUR MAKİNE KALIP</span>
      ) : (
        <span>
          <strong>ONUR</strong>
          <small>MAKİNE KALIP</small>
        </span>
      )}
    </Link>
  );
}
