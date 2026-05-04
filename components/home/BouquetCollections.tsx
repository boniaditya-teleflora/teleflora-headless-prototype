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

const DOTD_BANNER_MARKUP = `
  <div>
    <a onclick="addcookie('DOTD')" href="/deal-of-the-day/?prodID=prod220003">
      <picture>
        <source srcset="https://img.teleflora.com/image/upload/w_1400/f_auto,q_50/backgrounds/DOTD_H_1400x392-hp-desktop-may26" media="(min-width: 961px)">
        <source srcset="https://img.teleflora.com/image/upload/w_640/f_auto,q_50/backgrounds/DOTD_640x464-hp-mobile-may26" media="(max-width: 960px)">
        <img
          width="1400"
          height="392"
          data-src="https://img.teleflora.com/image/upload/w_1400/f_auto,q_50/backgrounds/DOTD_H_1400x392-hp-desktop-may26"
          alt="Deal of the Day - Seasonal fresh flowers at a special price"
          loading="lazy"
          class="lazyload"
          src="https://img.teleflora.com/image/upload/w_1400/f_auto,q_50/backgrounds/DOTD_H_1400x392-hp-desktop-may26">
      </picture>
    </a>
  </div>
`.trim();

const LOCAL_FLORIST_MARKUP = `
  <div class="olapic-slider-widget olapic-slider">
    <div class="olapic-slider-header">
      <h3>LOCAL FLORIST ARRANGED BOUQUETS</h3>
    </div>
    <div class="olapic-slider-body">
      <a class="olapic-nav-button olapic-nav-prev" href="#"></a>
      <div class="olapic-slider-wrapper">
        <div class="olapic-carousel-list-container" data-min-items-for-slider="">
          <ul class="olapic-carousel" style="display:inline-block">
            <li tabindex="0" onclick="subCatUgc();" id="pic1LI" class="instagram" data-olapic-photo-id="2641871736" style="background-image: url('https://img.teleflora.com/image/upload/f_auto,c_fill,g_auto,h_220,q_auto:best,w_220/olapic/T26M200A-blue_belle'); height: 200px; width: 200px;">
              <span class="olapic-type-IMAGE"><i></i></span>
              <a tabindex="0" id="pic1Anchor" class="olapic-item" href="https://www.teleflora.com/bouquet/telefloras-blue-belle-bouquet?prodID=P_T26M200A" title="This sweet blue Mother's Day flower arrangement is full of fresh spring charm.">
                <div class="olapic-user-info desktopTitle">
                  <span id="pic1title" class="olapic-user-name olapic-realname">Blue Belle</span>
                  <span class="shopthislook">Buy it</span>
                </div>
              </a>
            </li>
            <li tabindex="0" onclick="subCatUgc();" id="pic2LI" class="instagram" data-olapic-photo-id="2829042445" style="background-image: url('https://img.teleflora.com/image/upload/f_auto,c_fill,g_auto,h_220,q_auto:best,w_220/olapic/T26M310A-haute_pink'); height: 200px; width: 200px;">
              <span class="olapic-type-IMAGE"><i></i></span>
              <a tabindex="0" id="pic2Anchor" class="olapic-item" href="https://www.teleflora.com/bouquet/telefloras-haute-pink-bouquet?prodID=P_T26M310A" title="Celebrate Mom with a beautiful bouquet of pink and lavender blooms.">
                <div class="olapic-user-info desktopTitle">
                  <span id="pic2title" class="olapic-user-name olapic-realname">Haute Pink</span>
                  <span class="shopthislook">Buy it</span>
                </div>
              </a>
            </li>
            <li tabindex="0" onclick="subCatUgc();" id="pic3LI" class="instagram" data-olapic-photo-id="2552258289" style="background-image: url('https://img.teleflora.com/image/upload/f_auto,c_fill,g_auto,h_220,q_auto:best,w_220/olapic/T26M110A-painted-petals'); height: 200px; width: 200px;">
              <span class="olapic-type-IMAGE"><i></i></span>
              <a tabindex="0" id="pic3Anchor" class="olapic-item" href="https://www.teleflora.com/bouquet/telefloras-painted-petals-bouquet?prodID=P_T26M110A" title="Brighten her Mother's Day with a vibrant mix of pink and purple petals.">
                <div class="olapic-user-info desktopTitle">
                  <span id="pic3title" class="olapic-user-name olapic-realname">Painted Petals</span>
                  <span class="shopthislook">Buy it</span>
                </div>
              </a>
            </li>
            <li tabindex="0" onclick="subCatUgc();" id="pic4LI" class="instagram" data-olapic-photo-id="2829243176" style="background-image: url('https://img.teleflora.com/image/upload/f_auto,c_fill,g_auto,h_220,q_auto:best,w_220/olapic/T26M410A-dream_in_bloom'); height: 200px; width: 200px;">
              <span class="olapic-type-IMAGE"><i></i></span>
              <a tabindex="0" id="pic4Anchor" class="olapic-item" href="https://www.teleflora.com/bouquet/telefloras-dream-in-bloom-bouquet?prodID=P_T26M410A" title="Make Mom smile with fresh pastel blooms arranged in a garden-inspired vase.">
                <div class="olapic-user-info desktopTitle">
                  <span id="pic4title" class="olapic-user-name olapic-realname">Dream in Bloom</span>
                  <span class="shopthislook">Buy it</span>
                </div>
              </a>
            </li>
            <li tabindex="0" onclick="subCatUgc();" id="pic5LI" class="instagram" data-olapic-photo-id="2546271550" style="background-image: url('https://img.teleflora.com/image/upload/f_auto,c_fill,g_auto,h_220,q_auto:best,w_220/olapic/T26M500A-amelia'); height: 200px; width: 200px;">
              <span class="olapic-type-IMAGE"><i></i></span>
              <a tabindex="0" id="pic5Anchor" class="olapic-item" href="https://www.teleflora.com/bouquet/telefloras-amelia-bouquet?prodID=P_T26M500A" title="Delight Mom with a mix of pink and lavender blooms in Teleflora's Amelia Vase.">
                <div class="olapic-user-info desktopTitle">
                  <span id="pic5title" class="olapic-user-name olapic-realname">Amelia</span>
                  <span class="shopthislook">Buy it</span>
                </div>
              </a>
            </li>
          </ul>
          <div class="olapic-carousel-partial-container"></div>
        </div>
      </div>
      <a class="olapic-nav-button olapic-nav-next" href="#"></a>
    </div>
  </div>
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
  return <section id="dotd-banner-cart" dangerouslySetInnerHTML={{ __html: DOTD_BANNER_MARKUP }} />;
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
  return (
    <section
      id="local-florist-arranged-bouquets"
      className="local-florist-arranged-bouquets"
      dangerouslySetInnerHTML={{ __html: LOCAL_FLORIST_MARKUP }}
    />
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
