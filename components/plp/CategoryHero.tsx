import { Container } from "@/components/layout/Container";
import type { CategoryPageData } from "@/lib/api/types";

type CategoryHeroProps = {
  category: CategoryPageData;
};

export function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="category-hero" aria-labelledby="category-heading">
      <Container>
        <div className="category-hero__copy">
          <h1 id="category-heading">{category.headerTitle ?? category.title}</h1>
          <p>{category.description}</p>
        </div>
      </Container>
    </section>
  );
}
