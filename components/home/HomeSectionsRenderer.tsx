import type { CSSProperties, ElementType } from "react";

import Image from "next/image";
import Link from "next/link";

import { BouquetProductGrid } from "@/components/home/BouquetProductRail";
import type { BouquetProduct, HomePageData, HomepageSection, MediaAsset } from "@/lib/api/types";
import { resolveCategoryHref } from "@/lib/config/category-routes";

type HomeSectionsRendererProps = {
  sections: HomePageData["homepageSections"];
  bouquetCollections: HomePageData["bouquetCollections"];
  promoteFirstHeading?: boolean;
};

type ProductSourceMap = Map<string, BouquetProduct[]>;

type PromoSplitSection = Extract<HomepageSection, { type: "promoSplit" }>;
type BouquetGridSection = Extract<HomepageSection, { type: "bouquetGrid" }>;
type SubscriptionPromoSection = Extract<HomepageSection, { type: "subscriptionPromo" }>;
type GalleryStripSection = Extract<HomepageSection, { type: "galleryStrip" }>;

function getProducts(section: BouquetGridSection | GalleryStripSection, sources: ProductSourceMap) {
  if ("products" in section && section.products?.length) {
    return section.products;
  }

  return section.bouquetsSourceKey ? sources.get(section.bouquetsSourceKey) ?? [] : [];
}

function SectionHeading({
  id,
  as: HeadingTag = "h2",
  children,
  className
}: {
  id: string;
  as?: ElementType;
  children: string;
  className?: string;
}) {
  return (
    <HeadingTag id={id} className={className}>
      {children}
    </HeadingTag>
  );
}

function ResponsiveImage({
  image,
  className,
  sizes,
  priority = false
}: {
  image: MediaAsset;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={760}
      height={420}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

function PromoSplitBanner({ section, isFirst }: { section: PromoSplitSection; isFirst: boolean }) {
  const titleId = `${section.id}-title`;
  const image = section.imagePosition === "left" ? section.leftImage : section.rightImage;
  const style = {
    "--home-promo-decoration": section.backgroundImage ? `url("${section.backgroundImage}")` : undefined
  } as CSSProperties;

  return (
    <section
      className={`home-promo-split home-promo-split--${section.theme} home-promo-split--media-${
        section.imagePosition ?? "right"
      }`}
      style={style}
      aria-labelledby={titleId}
    >
      <div className="home-promo-split__copy">
        <SectionHeading id={titleId} as={isFirst ? "h1" : "h2"} className="home-promo-split__title">
          {section.title}
        </SectionHeading>
        <p>
          {section.copy}
          {section.inlineLink ? (
            <>
              {" "}
              <Link href={resolveCategoryHref(section.inlineLink.href)}>{section.inlineLink.label}</Link>
            </>
          ) : null}
        </p>
        {section.ctaLabel && section.ctaHref ? (
          <Link href={resolveCategoryHref(section.ctaHref)} className="home-promo-split__cta">
            {section.ctaLabel}
          </Link>
        ) : null}
        {section.brandText ? <span className="home-promo-split__brand">{section.brandText}</span> : null}
      </div>
      {image ? (
        <div className="home-promo-split__media">
          <ResponsiveImage
            image={image}
            className="home-promo-split__image"
            sizes="(max-width: 720px) 100vw, 50vw"
            priority={isFirst}
          />
        </div>
      ) : null}
    </section>
  );
}

function BouquetShowcaseSection({ section, sources }: { section: BouquetGridSection; sources: ProductSourceMap }) {
  const titleId = `${section.id}-title`;
  const products = getProducts(section, sources);

  if (!products.length) {
    return null;
  }

  return (
    <section className={`home-bouquet-showcase home-bouquet-showcase--${section.theme}`} aria-labelledby={titleId}>
      <header className="home-bouquet-showcase__header">
        <SectionHeading id={titleId} className="home-bouquet-showcase__title">
          {section.title}
        </SectionHeading>
        {section.subtitle ? <p>{section.subtitle}</p> : null}
        {section.ctaLabel && section.ctaHref ? (
          <Link href={resolveCategoryHref(section.ctaHref)} className="home-bouquet-showcase__cta">
            {section.ctaLabel}
          </Link>
        ) : null}
      </header>
      <BouquetProductGrid
        products={products}
        variant={section.theme === "trending" ? "trending" : "showcase"}
        className="home-bouquet-showcase__grid"
      />
    </section>
  );
}

function SubscriptionPromoSection({ section }: { section: SubscriptionPromoSection }) {
  const titleId = `${section.id}-title`;

  return (
    <section className="home-subscription-promo" aria-labelledby={titleId}>
      <div className="home-subscription-promo__media">
        <ResponsiveImage
          image={section.leftImage}
          className="home-subscription-promo__image"
          sizes="(max-width: 720px) 100vw, 50vw"
        />
      </div>
      <div className="home-subscription-promo__copy">
        {section.brandText ? <span className="home-subscription-promo__brand">{section.brandText}</span> : null}
        <SectionHeading id={titleId} className="home-subscription-promo__title">
          {section.title}
        </SectionHeading>
        <p>{section.copy}</p>
        <Link href={resolveCategoryHref(section.ctaHref)} className="home-subscription-promo__cta">
          {section.ctaLabel}
        </Link>
      </div>
    </section>
  );
}

function GalleryStripSection({ section, sources }: { section: GalleryStripSection; sources: ProductSourceMap }) {
  const titleId = `${section.id}-title`;
  const sourceProducts = getProducts(section, sources);
  const images =
    section.galleryImages?.map((image) => ({
      href: image.href ? resolveCategoryHref(image.href) : "#",
      image
    })) ??
    sourceProducts.map((product) => ({
      href: resolveCategoryHref(product.href),
      image: {
        src: product.image,
        alt: product.alt
      }
    }));

  if (!images.length) {
    return null;
  }

  return (
    <section className="home-gallery-strip" aria-labelledby={titleId}>
      <SectionHeading id={titleId} className="home-gallery-strip__title">
        {section.title}
      </SectionHeading>
      <div className="home-gallery-strip__grid">
        {images.slice(0, 5).map(({ href, image }) => (
          <Link key={image.src} href={href} className="home-gallery-strip__item">
            <Image src={image.src} alt={image.alt} width={280} height={210} sizes="(max-width: 720px) 44vw, 18vw" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function PageSection({
  section,
  sources,
  isFirst
}: {
  section: HomepageSection;
  sources: ProductSourceMap;
  isFirst: boolean;
}) {
  switch (section.type) {
    case "promoSplit":
      return <PromoSplitBanner section={section} isFirst={isFirst} />;
    case "bouquetGrid":
      return <BouquetShowcaseSection section={section} sources={sources} />;
    case "subscriptionPromo":
      return <SubscriptionPromoSection section={section} />;
    case "galleryStrip":
      return <GalleryStripSection section={section} sources={sources} />;
    default:
      return null;
  }
}

export function HomeSectionsRenderer({ sections, bouquetCollections, promoteFirstHeading = false }: HomeSectionsRendererProps) {
  if (!sections.length) {
    return null;
  }

  const sources = new Map(bouquetCollections.sections.map((collection) => [collection.id, collection.products]));

  return (
    <div className="home-sections">
      {sections.map((section, index) => (
        <PageSection
          key={section.id}
          section={section}
          sources={sources}
          isFirst={promoteFirstHeading && index === 0}
        />
      ))}
    </div>
  );
}
