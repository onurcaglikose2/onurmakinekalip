"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { ProjectCard } from "./project-card";
import {
  projectFilters,
  projects,
  type ProductionProject,
  type ProjectCategory,
} from "@/content/projects";
import { track } from "@/lib/analytics";

type Filter = ProjectCategory | "all";

export function ProjectGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<ProductionProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!selected && dialog.open) {
      dialog.close();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const closeDialog = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <div className="project-filters" aria-label="Üretim örneği filtreleri">
        {projectFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            aria-pressed={filter === item.value}
            onClick={() => {
              setFilter(item.value);
              track("project_filter_use", { filter: item.value });
            }}
          >
            {item.label}
            <span>
              {item.value === "all"
                ? projects.length
                : projects.filter((project) => project.category === item.value)
                    .length}
            </span>
          </button>
        ))}
      </div>
      <p className="project-result-count" aria-live="polite">
        {filtered.length} üretim örneği gösteriliyor
      </p>
      <div className="projects-grid project-gallery-grid">
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpen={setSelected}
          />
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClose={closeDialog}
        onCancel={closeDialog}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
      >
        {selected ? (
          <div className="project-dialog-panel">
            <button
              className="project-dialog-close"
              type="button"
              onClick={closeDialog}
              aria-label="Proje detayını kapat"
            >
              <X aria-hidden="true" />
            </button>
            <div className="project-dialog-image">
              <Image
                src={selected.images[0]}
                alt={selected.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <span>{selected.scale}</span>
            </div>
            <div className="project-dialog-content">
              <p>
                {selected.material} / {selected.productionType}
              </p>
              <h2 id="project-dialog-title">{selected.title}</h2>
              <dl>
                <div>
                  <dt>Üretim yöntemi</dt>
                  <dd>{selected.method}</dd>
                </div>
                <div>
                  <dt>İhtiyaç</dt>
                  <dd>{selected.problem}</dd>
                </div>
                <div>
                  <dt>Uygulanan yaklaşım</dt>
                  <dd>{selected.solution}</dd>
                </div>
                <div>
                  <dt>Üretim sonucu</dt>
                  <dd>
                    <CheckCircle2 size={16} aria-hidden="true" />
                    {selected.result}
                  </dd>
                </div>
              </dl>
              <a href="/teklif-al">Benzer parça için teklif alın →</a>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
