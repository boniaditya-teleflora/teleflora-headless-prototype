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
    products: [
      {
        id: "birthday-bash-bouquet",
        name: "Birthday Bash Bouquet",
        price: "$64.99",
        href: getCategoryHref("birthday"),
        image:
          "https://img.teleflora.com/images/o_0/l_flowers:TEV75-5A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/TEV75-5A/TeleflorasCitrusSunsetBouquet",
        alt: "Birthday Bash Bouquet"
      },
      {
        id: "spring-favorites",
        name: "Spring Favorites",
        price: "$69.99",
        href: getCategoryHref("birthday"),
        image:
          "https://img.teleflora.com/images/o_0/l_flowers:T26M210A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/T26M210A/TeleflorasGardenWhimsyBouquet",
        alt: "Spring Favorites bouquet"
      },
      {
        id: "best-wishes-bouquet",
        name: "Teleflora's Best Wishes Bouquet",
        price: "$59.99",
        href: getCategoryHref("birthday"),
        image:
          "https://img.teleflora.com/images/o_0/l_flowers:T26M400A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/T26M400A/TeleflorasWatercolorGardenBouquet",
        alt: "Teleflora's Best Wishes Bouquet"
      },
      {
        id: "birthday-cake-bouquet",
        name: "Your Wish Is Granted Birthday Cake Bouquet",
        price: "$64.99",
        href: getCategoryHref("birthday"),
        image:
          "https://img.teleflora.com/images/o_0/l_flowers:TEV68-1A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/TEV68-1A/TeleflorasSpreadSunshineBouquet",
        alt: "Your Wish Is Granted Birthday Cake Bouquet"
      },
      {
        id: "colors-of-the-rainbow",
        name: "Colors Of The Rainbow Bouquet",
        price: "$104.99",
        href: getCategoryHref("birthday"),
        image:
          "https://img.teleflora.com/images/o_0/l_flowers:TEV67-8A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/TEV67-8A/TeleflorasCatchTheSunBouquet",
        alt: "Colors Of The Rainbow Bouquet"
      }
    ]
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
    products: [
      {
        id: "beautiful-in-blue",
        name: "Beautiful in Blue Bouquet",
        price: "$59.99",
        href: getCategoryHref("congratulations"),
        image:
          "https://img.teleflora.com/images/o_0/l_flowers:T26M200A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/T26M200A/TeleflorasBlueBelleBouquet",
        alt: "Beautiful in Blue Bouquet"
      },
      {
        id: "pastel-party-bouquet",
        name: "Teleflora's Pastel Party Bouquet",
        price: "$49.99",
        href: getCategoryHref("congratulations"),
        image:
          "https://img.teleflora.com/images/o_0/l_flowers:TEV70-6A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/TEV70-6A/TeleflorasPastelPartyBouquet",
        alt: "Teleflora's Pastel Party Bouquet"
      },
      {
        id: "mid-mod-brights",
        name: "Teleflora's Mid Mod Brights Bouquet",
        price: "$59.99",
        href: getCategoryHref("congratulations"),
        image:
          "https://img.teleflora.com/images/o_0/l_flowers:TEV69-9A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/TEV69-9A/TeleflorasModMagnifiqueBouquet",
        alt: "Teleflora's Mid Mod Brights Bouquet"
      },
      {
        id: "floral-buzz",
        name: "Teleflora's Floral Buzz Bouquet",
        price: "$49.99",
        href: getCategoryHref("congratulations"),
        image:
          "https://img.teleflora.com/images/o_0/l_flowers:T25F110A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/T25F110A/TeleflorasContemporaryBlossomsBouquet",
        alt: "Teleflora's Floral Buzz Bouquet"
      },
      {
        id: "desert-sunrise",
        name: "Teleflora's Desert Sunrise Bouquet",
        price: "$59.99",
        href: getCategoryHref("congratulations"),
        image:
          "https://img.teleflora.com/images/o_0/l_flowers:T24S100A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/T24S100A/TeleflorasLushGardenBouquet",
        alt: "Teleflora's Desert Sunrise Bouquet"
      }
    ]
  }
];

export const TRENDING_BOUQUETS_SECTION: BouquetProductSectionConfig = {
  id: "tf-trending-bouquets",
  heading: "TRENDING BOUQUETS",
  layout: "trending",
  theme: "trending",
  cardsVisible: 3,
  scroll: true,
  products: [
    {
      id: "trending-garden-whimsy",
      name: "Teleflora's Garden Whimsy Bouquet",
      price: "$69.99",
      href: getCategoryHref("flowers"),
      image:
        "https://img.teleflora.com/images/o_0/l_flowers:T26M210A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/T26M210A/TeleflorasGardenWhimsyBouquet",
      alt: "Teleflora's Garden Whimsy Bouquet"
    },
    {
      id: "trending-pink-rhapsody",
      name: "Teleflora's Pink Rhapsody Bouquet",
      price: "$54.99",
      href: getCategoryHref("flowers"),
      image:
        "https://img.teleflora.com/images/o_0/l_flowers:T26M300A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/T26M300A/TeleflorasPinkRhapsodyBouquet",
      alt: "Teleflora's Pink Rhapsody Bouquet"
    },
    {
      id: "trending-birthday-bash",
      name: "Birthday Bash Bouquet",
      price: "$64.99",
      href: getCategoryHref("birthday"),
      image:
        "https://img.teleflora.com/images/o_0/l_flowers:TEV75-5A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/TEV75-5A/TeleflorasCitrusSunsetBouquet",
      alt: "Birthday Bash Bouquet"
    },
    {
      id: "trending-blue-belle",
      name: "Teleflora's Blue Belle Bouquet",
      price: "$59.99",
      href: getCategoryHref("flowers"),
      image:
        "https://img.teleflora.com/images/o_0/l_flowers:T26M200A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/T26M200A/TeleflorasBlueBelleBouquet",
      alt: "Teleflora's Blue Belle Bouquet"
    },
    {
      id: "trending-watercolor-garden",
      name: "Teleflora's Watercolor Garden Bouquet",
      price: "$49.99",
      href: getCategoryHref("flowers"),
      image:
        "https://img.teleflora.com/images/o_0/l_flowers:T26M400A,pg_1/w_360,h_360,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/T26M400A/TeleflorasWatercolorGardenBouquet",
      alt: "Teleflora's Watercolor Garden Bouquet"
    }
  ]
};
