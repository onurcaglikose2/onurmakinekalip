import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export function LegalPage({
  eyebrow,
  title,
  description,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="legal-hero">
        <Container>
          <Breadcrumbs current={title} tone="dark" />
          <p className="eyebrow eyebrow-light">
            <span aria-hidden="true" />
            {eyebrow}
          </p>
          <h1>{title}</h1>
          <p>{description}</p>
          <small>Son güncelleme: 28 Temmuz 2026</small>
        </Container>
      </section>
      <section className="legal-content">
        <Container>
          <aside>
            <span>İÇERİK</span>
            <nav aria-label={`${title} bölümleri`}>
              {sections.map((section, index) => (
                <a key={section.title} href={`#bolum-${index + 1}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>
          <article>
            {sections.map((section, index) => (
              <section key={section.title} id={`bolum-${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items?.length ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </Container>
      </section>
    </>
  );
}
