import { EmptyState } from "@/components/shared/EmptyState";
import type { ProductSummary } from "@/lib/api/types";

import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: ProductSummary[];
  emptyTitle?: string;
  variant?: "standard" | "category";
};

export function ProductGrid({
  products,
  emptyTitle = "No products found.",
  variant = "standard"
}: ProductGridProps) {
  if (!products.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description="Try another category, swap future filters, or reconnect the upstream catalog feed."
      />
    );
  }

  return (
    <div className={`product-grid product-grid--${variant}`}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} variant={variant} />
      ))}
    </div>
  );
}
