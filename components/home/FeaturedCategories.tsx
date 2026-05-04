import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { HomePageData } from "@/lib/api/types";
import { getCategoryHref } from "@/lib/config/category-routes";

type FeaturedCategoriesProps = {
  categories: HomePageData["featuredCategories"];
};

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  return (
    <section className="section-block">
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title="Shop the moments people send most"
          description="Browse fresh flowers, designer favorites, and everyday gifts for every kind of send."
        />
        <div className="category-card-grid">
          {categories.map((category) => (
            <Link key={category.title} href={getCategoryHref(category.slug)} className="category-card">
              <div className="category-card__media">
                <Image src={category.image.src} alt={category.image.alt} width={640} height={480} />
              </div>
              <div className="category-card__content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
