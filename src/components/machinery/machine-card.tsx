import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TrackedInternalLink } from "@/components/layout/tracked-link";
import type { Machine } from "@/content/machinery";

export function MachineCard({
  machine,
  compact = false,
}: {
  machine: Machine;
  compact?: boolean;
}) {
  return (
    <article className={`machine-card${compact ? "machine-card-compact" : ""}`}>
      <div className="machine-card-image">
        <Image
          src={machine.images[0]}
          alt={`${machine.name} için teknik görsel temsil`}
          fill
          sizes={
            compact
              ? "(max-width: 768px) 100vw, 33vw"
              : "(max-width: 900px) 100vw, 50vw"
          }
        />
        <span>{machine.code}</span>
      </div>
      <div className="machine-card-body">
        <p>{machine.usage}</p>
        <h3>{machine.name}</h3>
        {!compact ? <p>{machine.description}</p> : null}
        <ul aria-label="Tipik parçalar">
          {machine.applications.slice(0, compact ? 3 : 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <TrackedInternalLink
          href={`/makine-parkuru#${machine.id}`}
          event="machine_detail_view"
          aria-label={`Teknik kullanımı incele — ${machine.name}`}
        >
          Teknik kullanımı incele
          <ArrowUpRight size={16} aria-hidden="true" />
        </TrackedInternalLink>
      </div>
    </article>
  );
}
