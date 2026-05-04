import Image from "next/image";
import Link from "next/link";

import { Price } from "@/components/shared/Price";
import type { BouquetCardItem } from "@/lib/api/types";

type BouquetGridVariant = "hero" | "theme" | "showcase" | "trending";

export type BouquetProductCardClasses = {
  card: string;
  imageLink: string;
  image: string;
  meta: string;
  price?: string;
  buy: string;
  name: string;
  badge?: string;
  description?: string;
};

export const BOUQUET_PRODUCT_CARD_CLASSES = {
  collection: {
    card: "bouquet-product-card",
    imageLink: "bouquet-product-card__image-link",
    image: "bouquet-product-card__image",
    meta: "bouquet-product-card__meta",
    buy: "bouquet-product-card__buy",
    name: "bouquet-product-card__name"
  },
  promo: {
    card: "tf-bouquet-promo__card",
    imageLink: "tf-bouquet-promo__image-link",
    image: "tf-bouquet-promo__image",
    meta: "tf-bouquet-promo__meta",
    price: "tf-bouquet-promo__price",
    buy: "tf-bouquet-promo__buy",
    name: "tf-bouquet-promo__name"
  },
  trending: {
    card: "tf-trending-bouquets__card",
    imageLink: "tf-trending-bouquets__image-link",
    image: "tf-trending-bouquets__image",
    meta: "tf-trending-bouquets__meta",
    price: "tf-trending-bouquets__price",
    buy: "tf-trending-bouquets__buy",
    name: "tf-trending-bouquets__name"
  }
} satisfies Record<string, BouquetProductCardClasses>;

const DEFAULT_IMAGE_SIZES = "(max-width: 520px) 80vw, (max-width: 720px) 45vw, (max-width: 1080px) 30vw, 190px";

function getBouquetLabel(product: BouquetCardItem) {
  return product.title ?? product.name;
}

function getBouquetHref(product: BouquetCardItem) {
  return product.ctaHref ?? product.href;
}

function BouquetProductPrice({ product, className }: { product: BouquetCardItem; className?: string }) {
  if (typeof product.price === "number") {
    return <Price amount={product.price} currency={product.currency ?? "USD"} />;
  }

  return <span className={className ?? "price price--default"}>{product.price}</span>;
}

export function BouquetProductCard({
  product,
  classes = BOUQUET_PRODUCT_CARD_CLASSES.collection,
  imageSizes = DEFAULT_IMAGE_SIZES,
  defaultCtaLabel = "Buy Now"
}: {
  product: BouquetCardItem;
  classes?: BouquetProductCardClasses;
  imageSizes?: string;
  defaultCtaLabel?: string;
}) {
  const label = getBouquetLabel(product);
  const href = getBouquetHref(product);

  return (
    <article className={classes.card}>
      <Link href={href} className={classes.imageLink} aria-label={`Shop ${label}`}>
        <Image
          src={product.image}
          alt={product.alt}
          width={360}
          height={360}
          sizes={imageSizes}
          className={classes.image}
        />
      </Link>
      <div className={classes.meta}>
        <BouquetProductPrice product={product} className={classes.price} />
        <Link href={href} className={classes.buy}>
          {product.ctaLabel ?? defaultCtaLabel}
        </Link>
      </div>
      <Link href={href} className={classes.name}>
        {label}
      </Link>
      {product.description && classes.description ? <p className={classes.description}>{product.description}</p> : null}
    </article>
  );
}

export function BouquetProductGrid({
  products,
  variant,
  id,
  className,
  classes = BOUQUET_PRODUCT_CARD_CLASSES.collection,
  imageSizes
}: {
  products: BouquetCardItem[];
  variant: BouquetGridVariant;
  id?: string;
  className?: string;
  classes?: BouquetProductCardClasses;
  imageSizes?: string;
}) {
  return (
    <div id={id} className={`bouquet-product-grid bouquet-product-grid--${variant}${className ? ` ${className}` : ""}`}>
      {products.map((product) => (
        <BouquetProductCard key={product.id} product={product} classes={classes} imageSizes={imageSizes} />
      ))}
    </div>
  );
}

export function BouquetProductRail({
  products,
  className,
  classes,
  imageSizes
}: {
  products: BouquetCardItem[];
  className: string;
  classes: BouquetProductCardClasses;
  imageSizes?: string;
}) {
  return (
    <div className={className}>
      {products.map((product) => (
        <BouquetProductCard key={product.id} product={product} classes={classes} imageSizes={imageSizes} />
      ))}
    </div>
  );
}
