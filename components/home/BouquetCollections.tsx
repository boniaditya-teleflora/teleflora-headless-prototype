import { Fragment, type CSSProperties } from "react";

import Link from "next/link";

import {
  BOUQUET_PRODUCT_CARD_CLASSES,
  BouquetProductGrid,
  BouquetProductRail
} from "@/components/home/BouquetProductRail";
import { TelefloraSeoContent } from "@/components/home/TelefloraSeoContent";
import { Container } from "@/components/layout/Container";
import {
  DEAL_OF_THE_DAY_BOUQUET,
  LOCAL_FLORIST_BOUQUETS,
  TF_BOUQUET_PROMO_SECTIONS,
  TRENDING_BOUQUETS_SECTION,
  type HomeBouquetPromoSectionConfig
} from "@/lib/config/home-bouquet-sections";
import type { HomePageData } from "@/lib/api/types";
import { getCategoryHref } from "@/lib/config/category-routes";

type BouquetCollection = HomePageData["bouquetCollections"]["sections"][number];

type BouquetCollectionsProps = {
  collections: HomePageData["bouquetCollections"];
};

const HOLIDAY_BANNER_DESKTOP_IMAGE =
  "https://img.teleflora.com/image/upload/w_1400/f_auto,q_100/backgrounds/Mday26_VideoBanner_1400x270hi";
const HOLIDAY_BANNER_MOBILE_IMAGE =
  "https://img.teleflora.com/image/upload/w_500/f_auto,q_100/backgrounds/Mday26_VideoBanner_Email_500x500hi";
const HOLIDAY_BANNER_MARKUP = `
  <a class="holiday-banner-cart__link" href="/ifyouveworried#mday-video" onclick="addcookie('Wish')" aria-label="Make Mom Feel Seen">
    <picture>
      <source media="(max-width: 768px)" srcset="${HOLIDAY_BANNER_MOBILE_IMAGE}" width="500" height="500">
      <img class="holiday-banner-cart__image" src="${HOLIDAY_BANNER_DESKTOP_IMAGE}" width="1400" height="270" alt="Make Mom Feel Seen" loading="lazy" decoding="async">
    </picture>
  </a>
`.trim();

const SUBSCRIPTIONS_BANNER_DESKTOP_IMAGE =
  "https://img.teleflora.com/image/upload/w_1400/f_auto,q_50/backgrounds/Mday-TFSubscriptions_Desktop";
const SUBSCRIPTIONS_BANNER_MOBILE_IMAGE =
  "https://img.teleflora.com/image/upload/w_640/f_auto,q_50/backgrounds/Mday-TFSubscriptions_Mobile";
const SUBSCRIPTIONS_BANNER_MARKUP = `
  <a class="subscriptions-banner__link" href="/subscriptions" onclick="addcookie('Subscriptions')" aria-label="Teleflora Subscriptions - The gift that keeps blooming">
    <picture>
      <source media="(max-width: 960px)" srcset="${SUBSCRIPTIONS_BANNER_MOBILE_IMAGE}" width="640" height="464">
      <img class="subscriptions-banner__image" src="${SUBSCRIPTIONS_BANNER_DESKTOP_IMAGE}" width="1400" height="392" alt="Floral Subscriptions" loading="lazy" decoding="async">
    </picture>
  </a>
`.trim();

function getVisualVariant(theme: BouquetCollection["theme"]) {
  return theme === "hero-purple" ? "hero" : "theme";
}

function getCollectionCategoryHref(section: BouquetCollection) {
  return section.theme === "hero-purple" ? getCategoryHref("mothers-day") : getCategoryHref("flowers");
}

function getCollectionCta(section: BouquetCollection) {
  if (!section.cta) {
    return undefined;
  }

  return {
    ...section.cta,
    href: section.cta.href === "#" ? getCollectionCategoryHref(section) : section.cta.href
  };
}

function getCollectionProducts(section: BouquetCollection) {
  const categoryHref = getCollectionCategoryHref(section);

  return section.products.map((product) => ({
    ...product,
    href: product.href === "#" ? categoryHref : product.href
  }));
}

function CollectionBanner({ section, titleId }: { section: BouquetCollection; titleId: string }) {
  const visualVariant = getVisualVariant(section.theme);
  const cta = getCollectionCta(section);
  const style = {
    "--bouquet-banner-bg": section.backgroundColor,
    "--bouquet-banner-image": section.backgroundImage ? `url("${section.backgroundImage}")` : undefined
  } as CSSProperties;

  return (
    <header className={`bouquet-banner bouquet-banner--${visualVariant} bouquet-banner--${section.theme}`} style={style}>
      <div className="bouquet-banner__content">
        <h2 id={titleId} className="bouquet-banner__title">
          {section.title}
        </h2>
        {section.subtitle ? <p className="bouquet-banner__subtitle">{section.subtitle}</p> : null}
        {cta ? (
          <Link href={cta.href} className="bouquet-banner__cta">
            {cta.label}
          </Link>
        ) : null}
      </div>
    </header>
  );
}

function HolidayBannerCart() {
  return (
    <section
      id="holiday-banner-cart"
      className="holiday-banner-cart"
      dangerouslySetInnerHTML={{ __html: HOLIDAY_BANNER_MARKUP }}
    />
  );
}

function SubscriptionsBanner() {
  return (
    <section
      id="subscriptions-banner"
      className="subscriptions-banner"
      dangerouslySetInnerHTML={{ __html: SUBSCRIPTIONS_BANNER_MARKUP }}
    />
  );
}

function DotdBannerCart() {
  const href = DEAL_OF_THE_DAY_BOUQUET?.href ?? getCategoryHref("flowers");
  const label = DEAL_OF_THE_DAY_BOUQUET?.name ?? "Deal of the Day";

  return (
    <section id="dotd-banner-cart">
      <div>
        <Link href={href} aria-label={`Shop ${label}`}>
          <picture>
            <source
              srcSet="https://img.teleflora.com/image/upload/w_1400/f_auto,q_50/backgrounds/DOTD_H_1400x392-hp-desktop-may26"
              media="(min-width: 961px)"
            />
            <source
              srcSet="https://img.teleflora.com/image/upload/w_640/f_auto,q_50/backgrounds/DOTD_640x464-hp-mobile-may26"
              media="(max-width: 960px)"
            />
            <img
              width="1400"
              height="392"
              alt={`${label} - seasonal fresh flowers at a special price`}
              loading="lazy"
              className="lazyload"
              src="https://img.teleflora.com/image/upload/w_1400/f_auto,q_50/backgrounds/DOTD_H_1400x392-hp-desktop-may26"
            />
          </picture>
        </Link>
      </div>
    </section>
  );
}

function TrendingBouquetsSection() {
  const section = TRENDING_BOUQUETS_SECTION;

  return (
    <section id={section.id} className="tf-trending-bouquets" aria-labelledby="tf-trending-bouquets-title">
      <h2 id="tf-trending-bouquets-title" className="tf-trending-bouquets__title">
        {section.heading}
      </h2>
      <BouquetProductRail
        products={section.products}
        className="tf-trending-bouquets__grid"
        classes={BOUQUET_PRODUCT_CARD_CLASSES.trending}
        imageSizes="(max-width: 520px) 82vw, (max-width: 768px) 44vw, (max-width: 1080px) 30vw, 190px"
      />
    </section>
  );
}

function LocalFloristArrangedBouquets() {
  if (!LOCAL_FLORIST_BOUQUETS.length) {
    return null;
  }

  return (
    <section id="local-florist-arranged-bouquets" className="local-florist-arranged-bouquets">
      <div className="olapic-slider-widget olapic-slider">
        <div className="olapic-slider-header">
          <h3>LOCAL FLORIST ARRANGED BOUQUETS</h3>
        </div>
        <div className="olapic-slider-body">
          <span className="olapic-nav-button olapic-nav-prev" aria-hidden="true" />
          <div className="olapic-slider-wrapper">
            <div className="olapic-carousel-list-container">
              <ul className="olapic-carousel">
                {LOCAL_FLORIST_BOUQUETS.map((product) => {
                  const title = product.title ?? product.name;
                  const style = {
                    backgroundImage: `url("${product.image}")`
                  } as CSSProperties;

                  return (
                    <li key={product.id} tabIndex={0} className="instagram" style={style}>
                      <span className="olapic-type-IMAGE" aria-hidden="true">
                        <i />
                      </span>
                      <Link className="olapic-item" href={product.href} title={product.alt} aria-label={`Shop ${title}`}>
                        <div className="olapic-user-info desktopTitle">
                          <span className="olapic-user-name olapic-realname">{title}</span>
                          <span className="shopthislook">{product.ctaLabel ?? "Buy it"}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="olapic-carousel-partial-container" />
            </div>
          </div>
          <span className="olapic-nav-button olapic-nav-next" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function TfBouquetPromoSection({ section }: { section: HomeBouquetPromoSectionConfig }) {
  const titleId = `tf-bouquet-promo-${section.id}-title`;
  const style = {
    "--tf-bouquet-promo-bg": `url("${section.backgroundImage}")`
  } as CSSProperties;

  return (
    <section className={`tf-bouquet-promo__section tf-bouquet-promo__section--${section.tone}`} aria-labelledby={titleId}>
      <div className="tf-bouquet-promo__hero" style={style}>
        <div className="tf-bouquet-promo__content">
          <h2 id={titleId} className="tf-bouquet-promo__title">
            {section.heading}
          </h2>
          <p className="tf-bouquet-promo__subtitle">{section.subtitle}</p>
          <Link href={section.ctaHref} className="tf-bouquet-promo__cta">
            {section.ctaLabel}
          </Link>
        </div>
      </div>
      <BouquetProductRail
        products={section.products}
        className="tf-bouquet-promo__grid"
        classes={BOUQUET_PRODUCT_CARD_CLASSES.promo}
        imageSizes="(max-width: 520px) 82vw, (max-width: 768px) 44vw, (max-width: 1080px) 30vw, 190px"
      />
    </section>
  );
}

function TfBouquetPromo() {
  return (
    <div className="tf-bouquet-promo" aria-label="Promotional bouquet collections">
      {TF_BOUQUET_PROMO_SECTIONS.map((section) => (
        <Fragment key={section.id}>
          <TfBouquetPromoSection section={section} />
          {section.tone === "congrats" ? (
            <>
              <DotdBannerCart />
              <TrendingBouquetsSection />
              <SubscriptionsBanner />
              <LocalFloristArrangedBouquets />
              <TelefloraSeoContent />
            </>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

function BouquetCollectionSection({
  section,
  showHolidayBannerAfterGrid
}: {
  section: BouquetCollection;
  showHolidayBannerAfterGrid?: boolean;
}) {
  const titleId = `${section.id}-title`;
  const visualVariant = getVisualVariant(section.theme);

  return (
    <section className={`bouquet-collection bouquet-collection--${section.theme}`} aria-labelledby={titleId}>
      <CollectionBanner section={section} titleId={titleId} />
      <BouquetProductGrid
        id={showHolidayBannerAfterGrid ? "bouquet-product-grid" : undefined}
        products={getCollectionProducts(section)}
        variant={visualVariant}
      />
      {showHolidayBannerAfterGrid ? (
        <>
          <HolidayBannerCart />
          <TfBouquetPromo />
        </>
      ) : null}
    </section>
  );
}

export function BouquetCollections({ collections }: BouquetCollectionsProps) {
  if (!collections.sections.length) {
    return null;
  }

  return (
    <section className="bouquet-collections-section">
      <Container className="bouquet-collections-container">
        {collections.sections.map((section, index) => (
          <BouquetCollectionSection
            key={section.id}
            section={section}
            showHolidayBannerAfterGrid={index === collections.sections.length - 1}
          />
        ))}
      </Container>
    </section>
  );
}
