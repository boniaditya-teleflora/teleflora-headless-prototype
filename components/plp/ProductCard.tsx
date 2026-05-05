import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/shared/Badge";
import { Price } from "@/components/shared/Price";
import type { ProductSummary } from "@/lib/api/types";

type ProductCardProps = {
  product: ProductSummary;
  variant?: "standard" | "category";
};

function getProductHref(product: ProductSummary) {
  return product.href ?? `/product/${product.slug}`;
}

export function ProductCard({ product, variant = "standard" }: ProductCardProps) {
  const productHref = getProductHref(product);
  const isCategoryCard = variant === "category";
  const displayPrice = product.salePrice ?? product.price;

  return (
    <Link href={productHref} className={`product-card product-card--${variant}`} aria-label={`View ${product.name}`}>
      <span className="product-card__image-link">
        <Image src={product.image.src} alt={product.image.alt} width={640} height={640} sizes={isCategoryCard ? "(max-width: 720px) 50vw, (max-width: 1200px) 30vw, 272px" : "(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 25vw"} className="product-card__image" />
      </span>
      <div className="product-card__content">
        <div className="product-card__badges">
          {product.badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>
        <span className="product-card__title">
          {product.name}
        </span>
        {!isCategoryCard ? <p className="product-card__description">{product.shortDescription}</p> : null}
        <div className="product-card__meta">
          <Price amount={displayPrice} currency={product.currency} />
          {product.salePrice ? <span className="sr-only">Original price {product.price}</span> : null}
          {isCategoryCard ? (
            <span className="product-card__price-tip" aria-label="Total price may vary depending on options selected.">
              i
            </span>
          ) : (
            <span className="product-card__buy">
              Buy now
            </span>
          )}
        </div>
        {!isCategoryCard ? <p className="product-card__delivery">{product.deliveryNote}</p> : <p className="sr-only">{product.deliveryNote}</p>}
      </div>
    </Link>
  );
}
