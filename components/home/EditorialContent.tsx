import { Container } from "@/components/layout/Container";
import type { HomePageData } from "@/lib/api/types";

type EditorialContentProps = {
  content: HomePageData["editorialContent"];
};

export function EditorialContent({ content }: EditorialContentProps) {
  return (
    <section className="section-block editorial-section">
      <Container>
        <div className="editorial-layout">
          <div className="editorial-copy">
            <p className="eyebrow">Flower delivery guide</p>
            <h2>{content.heading}</h2>
            <div className="editorial-copy__sections">
              {content.sections.map((section) => (
                <article key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="faq-panel">
            <p className="eyebrow">FAQ</p>
            {content.faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
