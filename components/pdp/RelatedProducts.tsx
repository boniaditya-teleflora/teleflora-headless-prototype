import { SectionHeading } from "@/components/shared/SectionHeading";
import type { ProductSummary } from "@/lib/api/types";

import { ProductGrid } from "../plp/ProductGrid";

type RelatedProductsProps = {
  products: ProductSummary[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="related-products">
      <SectionHeading
        eyebrow="You may also like"
        title="More arrangements for the same sentiment"
        description="Related items are driven by mock merchandising links now and can later come from recommendations or category rules."
      />
      <ProductGrid products={products} emptyTitle="No related products available." />
    </section>
  );
}
