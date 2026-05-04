import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/plp/ProductGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { ProductSummary } from "@/lib/api/types";

type FeaturedProductsProps = {
  eyebrow: string;
  title: string;
  description: string;
  products: ProductSummary[];
};

export function FeaturedProducts({
  eyebrow,
  title,
  description,
  products
}: FeaturedProductsProps) {
  return (
    <section className="section-block">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
