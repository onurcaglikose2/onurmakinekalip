import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  current,
  tone = "light",
}: {
  current: string;
  tone?: "light" | "dark";
}) {
  const items = [
    { name: "Ana Sayfa", path: "/" },
    { name: current, path: "" },
  ];

  return (
    <>
      <nav
        aria-label="Sayfa yolu"
        className={cn("breadcrumbs", tone === "dark" && "breadcrumbs-dark")}
      >
        <ol>
          <li>
            <Link href="/">Ana Sayfa</Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li aria-current="page">{current}</li>
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
