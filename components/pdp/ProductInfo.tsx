import { Badge } from "@/components/shared/Badge";
import type { ProductPageData } from "@/lib/api/types";

import { PurchasePanel } from "./PurchasePanel";

type ProductInfoProps = {
  product: ProductPageData;
};

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <section className="info-panel">
      <div className="info-panel__eyebrow">
        <span>{product.category.title}</span>
        {product.badges.length ? (
          <div className="info-panel__badges">
            {product.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>
        ) : null}
      </div>
      <h1>{product.name}</h1>
      <div className="info-panel__rating" aria-label="Customer rating 4.8 out of 5">
        <span aria-hidden="true">{"\u2605\u2605\u2605\u2605\u2605"}</span>
        <strong>4.8</strong>
        <span>Florist favorite</span>
      </div>
      <PurchasePanel product={product} />
    </section>
  );
}
