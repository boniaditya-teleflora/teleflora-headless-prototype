import type { CategoryReference } from "@/lib/api/types";

export type CategoryGroup =
  | "flowers"
  | "flower-color"
  | "flower-type"
  | "occasions"
  | "birthday"
  | "sympathy"
  | "gifts-food"
  | "same-day"
  | "holidays"
  | "plants"
  | "seasonal";

export type CategoryConfig = {
  key: string;
  name: string;
  slug: string;
  catId: string;
  path: string;
  url: string;
  sourcePath: string;
  sourceUrl: string;
  parent?: string;
  group: CategoryGroup;
  megaMenuGroup?: string;
  breadcrumbLabel?: string;
  navigationLinks?: Array<{
    label: string;
    categoryKey: string;
  }>;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  mockFile?: string;
  aliases?: string[];
};

type CategoryConfigInput = Omit<CategoryConfig, "path" | "url" | "sourceUrl"> & {
  path?: string;
  url?: string;
  sourceUrl?: string;
};

function withComputedUrls(category: CategoryConfigInput): CategoryConfig {
  const path = category.path ?? `/category/${category.slug}`;
  const sourceUrl = category.sourceUrl ?? `${category.sourcePath}?catID=${category.catId}`;

  return {
    ...category,
    path,
    sourceUrl,
    url: category.url ?? `${path}?catID=${category.catId}`
  };
}

export const CATEGORY_CONFIG = {
  flowers: withComputedUrls({
    key: "flowers",
    name: "Flowers",
    slug: "flowers",
    catId: "cat1780001",
    sourcePath: "/all-flowers",
    group: "flowers",
    megaMenuGroup: "Flowers",
    mockFile: "category-flowers.json",
    aliases: ["all-flowers", "shop-all-flowers"]
  }),
  flowerBestsellers: withComputedUrls({
    key: "flower-bestsellers",
    name: "Bestsellers",
    slug: "flower-bestsellers",
    catId: "cat480011",
    sourcePath: "/everyday-arrangements/best-sellers",
    parent: "flowers",
    group: "flowers",
    megaMenuGroup: "Collections",
    aliases: ["bestsellers", "best-sellers"]
  }),
  flowersInAGift: withComputedUrls({
    key: "flowers-in-a-gift",
    name: "Flowers in a Gift",
    slug: "flowers-in-a-gift",
    catId: "cat480012",
    sourcePath: "/everyday-arrangements/teleflora-keepsakes",
    parent: "flowers",
    group: "flowers",
    megaMenuGroup: "Collections"
  }),
  flowersUnder60: withComputedUrls({
    key: "flowers-under-60",
    name: "Flowers Under $60",
    slug: "flowers-under-60",
    catId: "cat1860001",
    sourcePath: "/flowers-under-60",
    parent: "flowers",
    group: "flowers",
    megaMenuGroup: "Collections",
    aliases: ["flowers-under-75"]
  }),
  newArrivals: withComputedUrls({
    key: "new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    catId: "cat480009",
    sourcePath: "/everyday-arrangements/whats-new",
    parent: "flowers",
    group: "flowers",
    megaMenuGroup: "Collections",
    aliases: ["whats-new"]
  }),
  vasesContainers: withComputedUrls({
    key: "vases-containers",
    name: "Shop by Vase",
    slug: "vases-containers",
    catId: "cat210247",
    sourcePath: "/vases-containers",
    parent: "flowers",
    group: "flowers",
    megaMenuGroup: "Collections",
    aliases: ["shop-by-vase"]
  }),
  flowerByType: withComputedUrls({
    key: "flower-by-type",
    name: "Flower Type",
    slug: "flower-by-type",
    catId: "cat210139",
    sourcePath: "/flower-by-type",
    parent: "flowers",
    group: "flower-type",
    megaMenuGroup: "Flower Type"
  }),
  flowersByColor: withComputedUrls({
    key: "flowers-by-color",
    name: "Flowers by Color",
    slug: "flowers-by-color",
    catId: "cat210170",
    sourcePath: "/flowers-by-color",
    parent: "flowers",
    group: "flower-color",
    megaMenuGroup: "Color",
    aliases: ["colors"]
  }),
  blueFlowers: withComputedUrls({
    key: "blue-flowers",
    name: "Blue Flowers",
    slug: "blue-bouquets",
    catId: "cat210171",
    sourcePath: "/blue-bouquets",
    parent: "flowers-by-color",
    group: "flower-color",
    megaMenuGroup: "Color"
  }),
  greenFlowers: withComputedUrls({
    key: "green-flowers",
    name: "Green Flowers",
    slug: "green-bouquets",
    catId: "cat210172",
    sourcePath: "/green-bouquets",
    parent: "flowers-by-color",
    group: "flower-color",
    megaMenuGroup: "Color"
  }),
  neutralFlowers: withComputedUrls({
    key: "neutral-flowers",
    name: "Neutral Flowers",
    slug: "neutral-bouquets",
    catId: "cat1840005",
    sourcePath: "/neutral-bouquets",
    parent: "flowers-by-color",
    group: "flower-color",
    megaMenuGroup: "Color"
  }),
  orangeFlowers: withComputedUrls({
    key: "orange-flowers",
    name: "Orange Flowers",
    slug: "orange-bouquets",
    catId: "cat210173",
    sourcePath: "/orange-bouquets",
    parent: "flowers-by-color",
    group: "flower-color",
    megaMenuGroup: "Color"
  }),
  pastelFlowers: withComputedUrls({
    key: "pastel-flowers",
    name: "Pastel Flowers",
    slug: "pastel-bouquets",
    catId: "cat1900001",
    sourcePath: "/pastel-bouquets",
    parent: "flowers-by-color",
    group: "flower-color",
    megaMenuGroup: "Color"
  }),
  pinkFlowers: withComputedUrls({
    key: "pink-flowers",
    name: "Pink Flowers",
    slug: "pink-bouquets",
    catId: "cat210174",
    sourcePath: "/pink-bouquets",
    parent: "flowers-by-color",
    group: "flower-color",
    megaMenuGroup: "Color"
  }),
  purpleFlowers: withComputedUrls({
    key: "purple-flowers",
    name: "Purple Flowers",
    slug: "purple-bouquets",
    catId: "cat210175",
    sourcePath: "/purple-bouquets",
    parent: "flowers-by-color",
    group: "flower-color",
    megaMenuGroup: "Color"
  }),
  redFlowers: withComputedUrls({
    key: "red-flowers",
    name: "Red Flowers",
    slug: "red-bouquets",
    catId: "cat210176",
    sourcePath: "/red-bouquets",
    parent: "flowers-by-color",
    group: "flower-color",
    megaMenuGroup: "Color"
  }),
  whiteFlowers: withComputedUrls({
    key: "white-flowers",
    name: "White Flowers",
    slug: "white-bouquets",
    catId: "cat210177",
    sourcePath: "/white-bouquets",
    parent: "flowers-by-color",
    group: "flower-color",
    megaMenuGroup: "Color"
  }),
  yellowFlowers: withComputedUrls({
    key: "yellow-flowers",
    name: "Yellow Flowers",
    slug: "yellow-bouquets",
    catId: "cat210178",
    sourcePath: "/yellow-bouquets",
    parent: "flowers-by-color",
    group: "flower-color",
    megaMenuGroup: "Color"
  }),
  alstroemeria: withComputedUrls({
    key: "alstroemeria",
    name: "Alstroemeria",
    slug: "alstroemeria",
    catId: "cat210141",
    sourcePath: "/alstroemeria",
    parent: "flower-by-type",
    group: "flower-type",
    megaMenuGroup: "Flower Type"
  }),
  carnations: withComputedUrls({
    key: "carnations",
    name: "Carnations",
    slug: "carnations",
    catId: "cat210144",
    sourcePath: "/carnations",
    parent: "flower-by-type",
    group: "flower-type",
    megaMenuGroup: "Flower Type"
  }),
  chrysanthemums: withComputedUrls({
    key: "chrysanthemums",
    name: "Chrysanthemums",
    slug: "chrysanthemums",
    catId: "cat210145",
    sourcePath: "/chrysanthemums",
    parent: "flower-by-type",
    group: "flower-type",
    megaMenuGroup: "Flower Type"
  }),
  daisies: withComputedUrls({
    key: "daisies",
    name: "Daisies",
    slug: "daisies",
    catId: "cat210146",
    sourcePath: "/daisies",
    parent: "flower-by-type",
    group: "flower-type",
    megaMenuGroup: "Flower Type"
  }),
  lilies: withComputedUrls({
    key: "lilies",
    name: "Lilies",
    slug: "lilies",
    catId: "cat210153",
    sourcePath: "/lilies",
    parent: "flower-by-type",
    group: "flower-type",
    megaMenuGroup: "Flower Type"
  }),
  orchids: withComputedUrls({
    key: "orchids",
    name: "Orchids",
    slug: "orchids",
    catId: "cat210155",
    sourcePath: "/orchids",
    parent: "flower-by-type",
    group: "flower-type",
    megaMenuGroup: "Flower Type"
  }),
  roses: withComputedUrls({
    key: "roses",
    name: "Roses",
    slug: "roses",
    catId: "cat210157",
    sourcePath: "/roses",
    parent: "flower-by-type",
    group: "flower-type",
    megaMenuGroup: "Flower Type"
  }),
  succulents: withComputedUrls({
    key: "succulents",
    name: "Succulents",
    slug: "succulents",
    catId: "cat1750007",
    sourcePath: "/all-plants/succulents",
    parent: "plants",
    group: "plants",
    megaMenuGroup: "Flower Type"
  }),
  sunflowers: withComputedUrls({
    key: "sunflowers",
    name: "Sunflowers",
    slug: "sunflowers",
    catId: "cat210167",
    sourcePath: "/sunflowers",
    parent: "flower-by-type",
    group: "flower-type",
    megaMenuGroup: "Flower Type"
  }),
  tropicals: withComputedUrls({
    key: "tropicals",
    name: "Tropicals",
    slug: "tropical-flowers",
    catId: "cat210169",
    sourcePath: "/tropical-flowers",
    parent: "flower-by-type",
    group: "flower-type",
    megaMenuGroup: "Flower Type",
    aliases: ["tropical-flowers"]
  }),
  tulips: withComputedUrls({
    key: "tulips",
    name: "Tulips",
    slug: "tulips",
    catId: "cat210168",
    sourcePath: "/tulips",
    parent: "flower-by-type",
    group: "flower-type",
    megaMenuGroup: "Flower Type"
  }),
  plants: withComputedUrls({
    key: "plants",
    name: "Plants",
    slug: "all-plants",
    catId: "cat210180",
    sourcePath: "/all-plants",
    parent: "flowers",
    group: "plants",
    megaMenuGroup: "Collections",
    aliases: ["all-plants"]
  }),
  springFlowers: withComputedUrls({
    key: "spring-flowers",
    name: "Spring Flowers",
    slug: "spring-flowers",
    catId: "cat210195",
    sourcePath: "/spring-flowers",
    parent: "flowers",
    group: "seasonal",
    megaMenuGroup: "Collections",
    aliases: ["spring"]
  }),
  summerFlowers: withComputedUrls({
    key: "summer-flowers",
    name: "Summer Flowers",
    slug: "summer-flowers",
    catId: "cat210192",
    sourcePath: "/summer-flowers",
    parent: "flowers",
    group: "seasonal"
  }),
  fallFlowers: withComputedUrls({
    key: "fall-flowers",
    name: "Fall Flowers",
    slug: "fall-flowers",
    catId: "cat210194",
    sourcePath: "/fall-flowers",
    parent: "flowers",
    group: "seasonal"
  }),
  winterFlowers: withComputedUrls({
    key: "winter-flowers",
    name: "Winter Flowers",
    slug: "winter-flowers",
    catId: "cat210193",
    sourcePath: "/winter-flowers",
    parent: "flowers",
    group: "seasonal"
  }),
  seasonalFlowers: withComputedUrls({
    key: "seasonal-flowers",
    name: "All Seasons",
    slug: "seasonal-flowers",
    catId: "cat210191",
    sourcePath: "/seasonal-flowers",
    parent: "flowers",
    group: "seasonal"
  }),
  occasions: withComputedUrls({
    key: "occasions",
    name: "Occasions",
    slug: "occasions",
    catId: "cat210050",
    sourcePath: "/occasions",
    group: "occasions",
    megaMenuGroup: "Occasions"
  }),
  anniversary: withComputedUrls({
    key: "anniversary",
    name: "Anniversary",
    slug: "anniversary-flowers",
    catId: "cat440206",
    sourcePath: "/anniversary-flowers",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions"
  }),
  birthday: withComputedUrls({
    key: "birthday",
    name: "Birthday Flowers",
    breadcrumbLabel: "Birthday",
    slug: "birthday-flowers",
    catId: "cat210012",
    sourcePath: "/birthday-flowers",
    parent: "occasions",
    group: "birthday",
    megaMenuGroup: "Birthday",
    mockFile: "category-birthday-flowers.json",
    aliases: ["birthday-flowers"]
  }),
  birthdayForHer: withComputedUrls({
    key: "birthday-flowers-for-her",
    name: "Birthday Flowers For Her",
    slug: "birthday-flowers-for-her",
    catId: "cat210014",
    sourcePath: "/birthday-flowers/for-her",
    parent: "birthday",
    group: "birthday",
    megaMenuGroup: "Collections"
  }),
  birthdayForHim: withComputedUrls({
    key: "birthday-flowers-for-him",
    name: "Birthday Flowers For Him",
    slug: "birthday-flowers-for-him",
    catId: "cat210041",
    sourcePath: "/birthday-flowers/for-him",
    parent: "birthday",
    group: "birthday",
    megaMenuGroup: "Collections"
  }),
  birthdayForKids: withComputedUrls({
    key: "birthday-flowers-for-kids",
    name: "Birthday For Kids",
    slug: "birthday-flowers-for-kids",
    catId: "cat210059",
    sourcePath: "/birthday-flowers/for-kids",
    parent: "birthday",
    group: "birthday",
    megaMenuGroup: "Collections"
  }),
  birthdaySweet16: withComputedUrls({
    key: "birthday-flowers-sweet-16",
    name: "Sweet 16 Birthday Flowers",
    slug: "birthday-flowers-sweet-16",
    catId: "cat210061",
    sourcePath: "/birthday-flowers/sweet-16",
    parent: "birthday",
    group: "birthday",
    megaMenuGroup: "Collections"
  }),
  birthdayQuinceanera: withComputedUrls({
    key: "birthday-flowers-quinceanera",
    name: "Quinceanera Birthday Flowers",
    slug: "birthday-flowers-quinceanera",
    catId: "cat210060",
    sourcePath: "/birthday-flowers/quinceanera",
    parent: "birthday",
    group: "birthday",
    megaMenuGroup: "Collections",
    aliases: ["birthday-flowers-quinceanera"]
  }),
  congratulations: withComputedUrls({
    key: "congratulations",
    name: "Congratulations Flowers",
    slug: "congratulations-flowers",
    catId: "cat210066",
    sourcePath: "/congratulations-flowers",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions"
  }),
  getWell: withComputedUrls({
    key: "get-well",
    name: "Get Well Flowers",
    slug: "get-well-flowers",
    catId: "cat210073",
    sourcePath: "/get-well-flowers",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions"
  }),
  graduation: withComputedUrls({
    key: "graduation",
    name: "Graduation",
    slug: "graduation-flowers",
    catId: "cat210077",
    sourcePath: "/graduation-flowers",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions"
  }),
  imSorry: withComputedUrls({
    key: "im-sorry",
    name: "I'm Sorry",
    slug: "im-sorry-flowers",
    catId: "cat210082",
    sourcePath: "/im-sorry-flowers",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions",
    aliases: ["i'm-sorry"]
  }),
  justBecause: withComputedUrls({
    key: "just-because",
    name: "Just Because",
    slug: "just-because-flowers",
    catId: "cat210085",
    sourcePath: "/just-because-flowers",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions"
  }),
  loveRomance: withComputedUrls({
    key: "love-romance",
    name: "Love & Romance",
    slug: "love-romance-flowers",
    catId: "cat210087",
    sourcePath: "/love-romance-flowers",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions"
  }),
  newBaby: withComputedUrls({
    key: "new-baby",
    name: "New Baby",
    slug: "new-baby-flowers",
    catId: "cat210097",
    sourcePath: "/new-baby-flowers",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions"
  }),
  retirement: withComputedUrls({
    key: "retirement",
    name: "Retirement",
    slug: "retirement-gifts",
    catId: "cat1790003",
    sourcePath: "/retirement-gifts",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions"
  }),
  thankYou: withComputedUrls({
    key: "thank-you",
    name: "Thank You Flowers",
    slug: "thank-you-flowers",
    catId: "cat210110",
    sourcePath: "/thank-you-flowers",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions"
  }),
  thinkingOfYou: withComputedUrls({
    key: "thinking-of-you",
    name: "Thinking of You",
    slug: "thinking-of-you-flowers",
    catId: "cat210115",
    sourcePath: "/thinking-of-you-flowers",
    parent: "occasions",
    group: "occasions",
    megaMenuGroup: "Featured Occasions"
  }),
  housewarming: withComputedUrls({
    key: "housewarming",
    name: "Housewarming",
    slug: "housewarming-gifts",
    catId: "cat210081",
    sourcePath: "/housewarming-gifts",
    parent: "occasions",
    group: "occasions"
  }),
  sympathy: withComputedUrls({
    key: "sympathy",
    name: "Sympathy Flowers",
    slug: "sympathy-flowers",
    catId: "cat210130",
    sourcePath: "/sympathy-flowers/sympathy-bouquets",
    parent: "occasions",
    group: "sympathy",
    megaMenuGroup: "Sympathy",
    aliases: ["sympathy-bouquets", "funeral-sympathy"]
  }),
  sympathyPlants: withComputedUrls({
    key: "sympathy-plants",
    name: "Sympathy Plants",
    slug: "sympathy-plants",
    catId: "cat210129",
    sourcePath: "/sympathy-flowers/sympathy-plants",
    parent: "sympathy",
    group: "sympathy",
    megaMenuGroup: "For the Home"
  }),
  sympathyFloralBaskets: withComputedUrls({
    key: "sympathy-floral-baskets",
    name: "Sympathy Floral Baskets",
    slug: "sympathy-floral-baskets",
    catId: "cat210131",
    sourcePath: "/sympathy-flowers/floral-baskets",
    parent: "sympathy",
    group: "sympathy",
    megaMenuGroup: "For the Home"
  }),
  petSympathyGifts: withComputedUrls({
    key: "pet-sympathy-gifts",
    name: "Pet Sympathy Gifts",
    slug: "pet-sympathy-gifts",
    catId: "cat1800002",
    sourcePath: "/sympathy-flowers/sympathy-bouquets/pet-sympathy-gifts",
    parent: "sympathy",
    group: "sympathy",
    megaMenuGroup: "For the Home"
  }),
  funeralSpraysWreaths: withComputedUrls({
    key: "funeral-sprays-wreaths",
    name: "Funeral Sprays & Wreaths",
    slug: "funeral-sprays-wreaths",
    catId: "cat210122",
    sourcePath: "/sympathy-funeral/funeral-flowers/standing-sprays-wreaths",
    parent: "sympathy",
    group: "sympathy",
    megaMenuGroup: "For Services"
  }),
  funeralServiceBouquets: withComputedUrls({
    key: "funeral-service-bouquets",
    name: "Funeral Service Bouquets",
    slug: "funeral-service-bouquets",
    catId: "cat210124",
    sourcePath: "/sympathy-funeral/funeral-flowers/funeral-bouquets",
    parent: "sympathy",
    group: "sympathy",
    megaMenuGroup: "For Services"
  }),
  funeralCasketFlowers: withComputedUrls({
    key: "funeral-casket-flowers",
    name: "Funeral Casket Flowers",
    slug: "funeral-casket-flowers",
    catId: "cat480016",
    sourcePath: "/sympathy-funeral/funeral-flowers/casket-flowers",
    parent: "sympathy",
    group: "sympathy",
    megaMenuGroup: "For Services"
  }),
  cremationFlowers: withComputedUrls({
    key: "cremation-flowers",
    name: "Cremation Flowers",
    slug: "cremation-flowers",
    catId: "cat480017",
    sourcePath: "/sympathy-funeral/funeral-flowers/photo-urn-tributes",
    parent: "sympathy",
    group: "sympathy",
    megaMenuGroup: "For Services"
  }),
  giftsFood: withComputedUrls({
    key: "gifts-food",
    name: "Gifts + Food",
    slug: "gifts-food",
    catId: "cat1980003",
    sourcePath: "/bestsellers",
    group: "gifts-food",
    megaMenuGroup: "Gifts + Food",
    aliases: ["gift-bestsellers", "best-selling-gifts"]
  }),
  giftBaskets: withComputedUrls({
    key: "gift-baskets",
    name: "Gift Baskets",
    slug: "all-gift-baskets",
    catId: "cat540005",
    sourcePath: "/all-gift-baskets",
    parent: "gifts-food",
    group: "gifts-food",
    megaMenuGroup: "Collections"
  }),
  foodGiftBaskets: withComputedUrls({
    key: "food-gift-baskets",
    name: "Food Gift Baskets",
    slug: "gift-baskets",
    catId: "cat1680001",
    sourcePath: "/gift-baskets",
    parent: "gifts-food",
    group: "gifts-food",
    megaMenuGroup: "Collections"
  }),
  chocolateCoveredTreats: withComputedUrls({
    key: "chocolate-covered-treats",
    name: "Chocolate Covered Treats",
    slug: "chocolate-covered-treats",
    catId: "cat1500009",
    sourcePath: "/chocolate-covered-treats",
    parent: "gifts-food",
    group: "gifts-food",
    megaMenuGroup: "Collections"
  }),
  newBabyGifts: withComputedUrls({
    key: "new-baby-gifts",
    name: "New Baby Gifts",
    slug: "new-baby-gifts",
    catId: "cat2190016",
    sourcePath: "/new-baby-gifts",
    parent: "gifts-food",
    group: "gifts-food",
    megaMenuGroup: "Collections"
  }),
  spaGifts: withComputedUrls({
    key: "spa-gifts",
    name: "Spa Gifts",
    slug: "spa-gifts",
    catId: "cat2190017",
    sourcePath: "/spa-gifts",
    parent: "gifts-food",
    group: "gifts-food",
    megaMenuGroup: "Collections"
  }),
  sameDay: withComputedUrls({
    key: "same-day",
    name: "Same-Day Flower Delivery",
    slug: "same-day-flower-delivery",
    catId: "cat480085",
    sourcePath: "/everyday-arrangements/same-day-flower-delivery",
    parent: "flowers",
    group: "same-day",
    megaMenuGroup: "Same Day",
    aliases: ["same-day-flower-delivery"]
  }),
  mothersDay: withComputedUrls({
    key: "mothers-day",
    name: "Mother's Day Flowers",
    slug: "mothers-day-flowers",
    catId: "cat210089",
    sourcePath: "/mothers-day-flowers",
    parent: "occasions",
    group: "holidays",
    megaMenuGroup: "Mother's Day",
    navigationLinks: [
      { label: "Mother's Day Roses", categoryKey: "roses" },
      { label: "Mother's Day Tulips", categoryKey: "tulips" },
      { label: "Mother's Day Plants", categoryKey: "plants" },
      { label: "Luxury Bouquets", categoryKey: "flowers" },
      { label: "Gifts & Treats", categoryKey: "gifts-food" },
      { label: "Mexican Mother's Day", categoryKey: "mexican-mothers-day" }
    ],
    aliases: ["mothers-day-flowers"]
  }),
  mexicanMothersDay: withComputedUrls({
    key: "mexican-mothers-day",
    name: "Mexican Mother's Day",
    slug: "mexican-mothers-day",
    catId: "cat210095",
    sourcePath: "/mothers-day-flowers/mexican-mothers-day",
    parent: "mothers-day",
    group: "holidays"
  }),
  valentinesDay: withComputedUrls({
    key: "valentines-day",
    name: "Valentine's Day Flowers",
    slug: "valentines-day-flowers",
    catId: "cat210019",
    sourcePath: "/valentines-day-flowers",
    parent: "occasions",
    group: "holidays"
  }),
  easter: withComputedUrls({
    key: "easter",
    name: "Easter Flowers",
    slug: "easter-flowers",
    catId: "cat210067",
    sourcePath: "/easter-flowers",
    parent: "occasions",
    group: "holidays"
  }),
  fathersDay: withComputedUrls({
    key: "fathers-day",
    name: "Father's Day",
    slug: "fathers-day-gifts",
    catId: "cat210071",
    sourcePath: "/fathers-day-gifts",
    parent: "occasions",
    group: "holidays"
  }),
  memorialDay: withComputedUrls({
    key: "memorial-day",
    name: "Memorial Day",
    slug: "memorial-day-flowers",
    catId: "cat210088",
    sourcePath: "/memorial-day-flowers",
    parent: "occasions",
    group: "holidays"
  }),
  thanksgiving: withComputedUrls({
    key: "thanksgiving",
    name: "Thanksgiving Flowers",
    slug: "thanksgiving-flowers",
    catId: "cat210111",
    sourcePath: "/thanksgiving-flowers",
    parent: "occasions",
    group: "holidays"
  }),
  christmas: withComputedUrls({
    key: "christmas",
    name: "Christmas Flowers",
    slug: "christmas-flowers",
    catId: "cat210045",
    sourcePath: "/christmas-flowers",
    parent: "occasions",
    group: "holidays"
  })
} as const;

export type CategoryKey = keyof typeof CATEGORY_CONFIG;

export const CATEGORY_ENTRIES = Object.values(CATEGORY_CONFIG);

function normalizeCategoryLookup(value: string) {
  const trimmedValue = value.trim();
  const withoutOrigin = trimmedValue.replace(/^https?:\/\/[^/]+/i, "");
  const [pathOrKey] = withoutOrigin.split("?");

  return decodeURIComponent(pathOrKey)
    .replace(/^\/category\//, "")
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();
}

export function getCategoryConfig(keyOrSlug: string): CategoryConfig | undefined {
  const normalizedValue = normalizeCategoryLookup(keyOrSlug);

  return CATEGORY_ENTRIES.find((category) => {
    const sourcePath = category.sourcePath.replace(/^\/+|\/+$/g, "").toLowerCase();

    return (
      category.key.toLowerCase() === normalizedValue ||
      category.slug.toLowerCase() === normalizedValue ||
      category.catId.toLowerCase() === normalizedValue ||
      sourcePath === normalizedValue ||
      category.aliases?.some((alias) => alias.toLowerCase() === normalizedValue)
    );
  });
}

export function getCategoryHref(keyOrSlug: string) {
  return getCategoryConfig(keyOrSlug)?.url ?? `/category/${normalizeCategoryLookup(keyOrSlug) || keyOrSlug}`;
}

export function resolveCategoryHref(href: string) {
  return getCategoryConfig(href)?.url ?? href;
}

export function getCategoryPath(keyOrSlug: string) {
  return getCategoryConfig(keyOrSlug)?.path ?? `/category/${normalizeCategoryLookup(keyOrSlug) || keyOrSlug}`;
}

export function getCategoryCatId(keyOrSlug: string) {
  return getCategoryConfig(keyOrSlug)?.catId;
}

export function getCategoryMockFile(keyOrSlug: string) {
  return getCategoryConfig(keyOrSlug)?.mockFile;
}

export function getCanonicalCategorySlug(keyOrSlug: string) {
  return getCategoryConfig(keyOrSlug)?.slug ?? normalizeCategoryLookup(keyOrSlug);
}

export function getCategoryChildren(keyOrSlug: string): CategoryConfig[] {
  const category = getCategoryConfig(keyOrSlug);

  if (!category) {
    return [];
  }

  return CATEGORY_ENTRIES.filter((item) => item.parent === category.key);
}

export function getCategorySubcategoryLinks(keyOrSlug: string) {
  const category = getCategoryConfig(keyOrSlug);

  if (category?.navigationLinks?.length) {
    return category.navigationLinks.map((item) => ({
      label: item.label,
      href: getCategoryHref(item.categoryKey)
    }));
  }

  return getCategoryChildren(keyOrSlug).map((childCategory) => ({
    label: childCategory.name,
    href: childCategory.url
  }));
}

export function getCategoryNavigationRoot(keyOrSlug: string) {
  const category = getCategoryConfig(keyOrSlug);

  if (!category) {
    return undefined;
  }

  if (getCategoryChildren(category.key).length) {
    return category;
  }

  let parent = category.parent ? getCategoryConfig(category.parent) : undefined;

  while (parent) {
    if (getCategoryChildren(parent.key).length) {
      return parent;
    }

    parent = parent.parent ? getCategoryConfig(parent.parent) : undefined;
  }

  return category;
}

export function getCategoryBreadcrumbs(keyOrSlug: string): CategoryReference[] {
  const category = getCategoryConfig(keyOrSlug);
  const breadcrumbs: CategoryReference[] = [];
  const seenKeys = new Set<string>();
  let parent = category?.parent ? getCategoryConfig(category.parent) : undefined;

  while (parent && !seenKeys.has(parent.key)) {
    seenKeys.add(parent.key);
    breadcrumbs.unshift({
      slug: parent.slug,
      title: parent.breadcrumbLabel ?? parent.name,
      href: parent.url,
      catId: parent.catId
    });
    parent = parent.parent ? getCategoryConfig(parent.parent) : undefined;
  }

  return breadcrumbs;
}
