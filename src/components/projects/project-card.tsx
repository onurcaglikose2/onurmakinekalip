import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProductionProject } from "@/content/projects";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: ProductionProject;
  onOpen?: (project: ProductionProject) => void;
}) {
  const content = (
    <>
      <div className="project-card-image">
        <Image
          src={project.images[0]}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span>{project.scale}</span>
      </div>
      <div className="project-card-body">
        <p>
          {project.material} <span>•</span> {project.productionType}
        </p>
        <h3>{project.title}</h3>
        <div>
          <span>{project.method}</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </div>
      </div>
    </>
  );

  if (onOpen) {
    return (
      <button
        type="button"
        className="project-card project-card-button"
        onClick={() => onOpen(project)}
        aria-label={`${project.title} detaylarını aç`}
      >
        {content}
      </button>
    );
  }

  return <article className="project-card">{content}</article>;
}
