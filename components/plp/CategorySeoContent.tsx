import type { CategorySeoBlock, CategorySeoContent as CategorySeoContentData } from "@/lib/api/types";

type CategorySeoContentProps = {
  content?: CategorySeoContentData;
};

function SeoHeading({ block }: { block: CategorySeoBlock }) {
  if (block.headingLevel === "h4") {
    return <h4>{block.heading}</h4>;
  }

  if (block.headingLevel === "h3") {
    return <h3>{block.heading}</h3>;
  }

  return <h2>{block.heading}</h2>;
}

export function CategorySeoContent({ content }: CategorySeoContentProps) {
  if (!content?.blocks.length) {
    return null;
  }

  return (
    <section className="plp-seo-content" aria-label="Category information">
      {content.faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(content.faqJsonLd)
          }}
        />
      ) : null}
      {content.blocks.map((block) => (
        <article key={block.heading} className="plp-seo-content__block">
          <SeoHeading block={block} />
          {block.bodyHtml ? <div dangerouslySetInnerHTML={{ __html: block.bodyHtml }} /> : null}
        </article>
      ))}
    </section>
  );
}
