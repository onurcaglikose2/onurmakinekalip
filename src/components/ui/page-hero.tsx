import { Container } from "./container";
import { Breadcrumbs } from "./breadcrumbs";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  current: string;
  index?: string;
  sideTitle?: string;
  sideItems?: string[];
};

export function PageHero({
  eyebrow,
  title,
  description,
  current,
  index = "01",
  sideTitle,
  sideItems = [],
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="technical-grid" aria-hidden="true" />
      <Container className="relative z-10">
        <Breadcrumbs current={current} tone="dark" />
        <div className="page-hero-grid">
          <div>
            <p className="eyebrow eyebrow-light">
              <span aria-hidden="true" />
              {eyebrow}
            </p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <aside className="page-hero-aside" aria-label="Sayfa özeti">
            <span className="page-index">{index}</span>
            {sideTitle ? <strong>{sideTitle}</strong> : null}
            {sideItems.length ? (
              <ul>
                {sideItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </aside>
        </div>
      </Container>
    </section>
  );
}
