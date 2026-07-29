import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/content/projects";

export function ProjectsPreview() {
  return (
    <section className="projects-preview">
      <Container>
        <div className="projects-preview-head">
          <SectionHeading
            eyebrow="Üretim örnekleri"
            title="Kabiliyet, parça üzerinden okunur"
            description="Müşteri ve tolerans iddiası eklemeden; farklı malzeme, ölçek ve üretim tiplerini temsil eden başlangıç örnekleri."
          />
          <ButtonLink href="/uretim-ornekleri" variant="ghost" arrow>
            Tüm Örnekler
          </ButtonLink>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
