import { getBouquetCardsBySlugs } from "@/lib/api/product-catalog";
import type { BouquetProductSectionConfig } from "@/lib/api/types";
import { getCategoryHref } from "@/lib/config/category-routes";

export type HomeBouquetPromoSectionConfig = BouquetProductSectionConfig & {
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: string;
  tone: "birthday" | "congrats";
};

export const TF_BOUQUET_PROMO_SECTIONS: HomeBouquetPromoSectionConfig[] = [
  {
    id: "birthday-hooray",
    heading: "SEND A BIRTHDAY HOORAY",
    subtitle: "Celebrate their special day with fresh birthday flowers!",
    ctaLabel: "SHOP BIRTHDAY",
    ctaHref: getCategoryHref("birthday"),
    backgroundImage:
      "https://img.teleflora.com/images/o_0/l_backgrounds:2020_Birthday-1400x420,pg_1/w_1400,cs_no_cmyk,c_pad,g_south/f_auto,q_auto:eco,e_sharpen:200/backgrounds/2020_Birthday-1400x420/flowers",
    tone: "birthday",
    layout: "promo",
    theme: "birthday",
    cardsVisible: 3,
    scroll: true,
    products: getBouquetCardsBySlugs([
      "birthday-bash-bouquet",
      "telefloras-best-wishes-bouquet",
      "make-a-wish",
      "your-wish-is-granted-birthday-cake-bouquet",
      "telefloras-marvelous-mosaic-bouquet"
    ])
  },
  {
    id: "congratulations-bouquets",
    heading: "BOUQUETS TO SAY CONGRATS!",
    subtitle: "Celebrate each milestone with florist-arranged flowers.",
    ctaLabel: "SHOP CONGRATULATIONS",
    ctaHref: getCategoryHref("congratulations"),
    backgroundImage:
      "https://img.teleflora.com/images/o_0/l_backgrounds:Sapphire_1400x420,pg_1/w_1400,cs_no_cmyk,c_pad,g_south/f_auto,q_80,e_sharpen:200/backgrounds/Sapphire_1400x420/sapphire",
    tone: "congrats",
    layout: "promo",
    theme: "congrats",
    cardsVisible: 3,
    scroll: true,
    products: getBouquetCardsBySlugs([
      "telefloras-best-wishes-bouquet",
      "telefloras-sapphire-skies-bouquet",
      "telefloras-marvelous-mosaic-bouquet",
      "telefloras-desert-sunrise-bouquet",
      "telefloras-pink-rhapsody-bouquet"
    ])
  }
];

export const TRENDING_BOUQUETS_SECTION: BouquetProductSectionConfig = {
  id: "tf-trending-bouquets",
  heading: "TRENDING BOUQUETS",
  layout: "trending",
  theme: "trending",
  cardsVisible: 3,
  scroll: true,
  products: getBouquetCardsBySlugs([
    "telefloras-garden-whimsy-bouquet",
    "telefloras-pink-rhapsody-bouquet",
    "birthday-bash-bouquet",
    "telefloras-blue-belle-bouquet",
    "telefloras-watercolor-garden-bouquet"
  ])
};

export const DEAL_OF_THE_DAY_BOUQUET = getBouquetCardsBySlugs(["deal-of-the-day"])[0];

export const LOCAL_FLORIST_BOUQUETS = getBouquetCardsBySlugs([
  "telefloras-blue-belle-bouquet",
  "telefloras-pretty-daydream-bouquet",
  "telefloras-watercolor-garden-bouquet",
  "telefloras-pink-rhapsody-bouquet",
  "telefloras-amelia-bouquet"
]);
