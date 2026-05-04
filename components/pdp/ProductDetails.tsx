import type { ProductPageData } from "@/lib/api/types";

import { ProductDetailsTabs } from "./ProductDetailsTabs";

type ProductDetailsProps = {
  product: ProductPageData;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const details = product.details;

  return (
    <section className="product-details-panel" aria-labelledby="product-details-title">
      <div className="product-details-panel__intro">
        <p className="eyebrow">Product details</p>
        <h2 id="product-details-title">Designed for a beautiful hand delivery</h2>
        <p>{details?.description ?? product.shortDescription}</p>
      </div>
      <ProductDetailsTabs
        description={details?.description ?? product.shortDescription}
        orientation={details?.orientation}
        vase={details?.vase}
      />
      <section className="substitution-policy" aria-labelledby="substitution-policy-title">
        <h3 id="substitution-policy-title" className="substitution-policy__title">
          SUBSTITUTION POLICY &ndash; <em>Always deliver the freshest flowers!</em>
        </h3>
        <p className="substitution-policy__text">
          Please note the bouquet pictured reflects our original design. If the exact flowers or
          container in this arrangement are not available, our local florists will create a
          beautiful bouquet with the freshest available flowers.
        </p>
      </section>
    </section>
  );
}
