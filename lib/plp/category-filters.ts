import type { CategoryFacet, CategoryFacetOption, ProductSummary } from "@/lib/api/types";

export type CategoryFilterKey = "price" | "flower" | "color";

export type CategoryFilterState = Partial<Record<CategoryFilterKey, string>>;

type ProductFilterMetadata = {
  flower: string[];
  color: string[];
};

const legacyProductFilters: Record<string, ProductFilterMetadata> = {
  "red-roses": {
    flower: ["roses"],
    color: ["red"]
  },
  "spring-garden": {
    flower: ["roses", "tulips"],
    color: ["pink", "purple", "yellow"]
  },
  "orchid-grace": {
    flower: ["orchids"],
    color: ["white"]
  },
  "sunlit-tulips": {
    flower: ["tulips"],
    color: ["orange", "yellow"]
  },
  "telefloras-best-wishes-bouquet": {
    flower: ["roses", "lilies"],
    color: ["pink", "orange", "yellow"]
  },
  "birthday-bash-bouquet": {
    flower: ["carnations", "roses", "daisies"],
    color: ["pink", "yellow"]
  },
  "make-a-wish": {
    flower: ["daisies", "roses"],
    color: ["yellow", "pink"]
  },
  "how-sweet-it-is": {
    flower: ["daisies", "roses"],
    color: ["yellow", "orange"]
  },
  "your-wish-is-granted-birthday-cake-bouquet": {
    flower: ["carnations", "daisies", "roses"],
    color: ["white", "pink"]
  },
  "deal-of-the-day": {
    flower: ["roses", "carnations", "daisies"],
    color: ["pink", "yellow", "purple"]
  },
  "telefloras-birthday-sparkle-bouquet": {
    flower: ["roses", "lilies"],
    color: ["pink", "purple"]
  },
  "telefloras-marvelous-mosaic-bouquet": {
    flower: ["roses", "carnations"],
    color: ["purple", "pink"]
  },
  "telefloras-hummingbird-surprise-bouquet": {
    flower: ["roses", "daisies"],
    color: ["pink", "green"]
  },
  "telefloras-sweetest-mauve-bouquet": {
    flower: ["roses", "hydrangea"],
    color: ["purple", "pink"]
  },
  "telefloras-golden-mod-bouquet": {
    flower: ["roses", "alstroemeria"],
    color: ["yellow", "orange"]
  },
  "telefloras-sunset-sorbet-bouquet": {
    flower: ["roses", "carnations"],
    color: ["orange", "yellow", "pink"]
  },
  "telefloras-enchanting-garden-bouquet": {
    flower: ["hydrangea", "roses"],
    color: ["green", "white", "pink"]
  },
  "telefloras-gemstone-radiance-bouquet": {
    flower: ["roses", "lilies"],
    color: ["purple", "blue"]
  },
  "telefloras-playfully-yours-bouquet": {
    flower: ["carnations", "daisies"],
    color: ["pink", "yellow"]
  },
  "telefloras-sapphire-skies-bouquet": {
    flower: ["hydrangea", "roses"],
    color: ["blue", "white"]
  },
  "zen-artistry": {
    flower: ["orchids", "succulents"],
    color: ["green", "white"]
  },
  "your-special-day": {
    flower: ["roses", "lilies"],
    color: ["pink", "white"]
  },
  "telefloras-be-bright-bouquet": {
    flower: ["gerbera-daisies", "roses"],
    color: ["yellow", "orange"]
  },
  "telefloras-desert-sunrise-bouquet": {
    flower: ["alstroemeria", "roses"],
    color: ["orange", "yellow"]
  }
};

const facetParamByTitle: Record<string, CategoryFilterKey> = {
  "price ranges": "price",
  "flower type": "flower",
  color: "color"
};

const priceFacetDefinitions = [
  { label: "Under $40.00", value: "under-40" },
  { label: "$40.00 - $60.00", value: "40-60" },
  { label: "$60.00 - $80.00", value: "60-80" },
  { label: "$80.00 - $100.00", value: "80-100" },
  { label: "Over $100.00", value: "over-100" }
];

const flowerFacetLabels: Record<string, string> = {
  alstroemeria: "Alstroemeria",
  carnations: "Carnations",
  chrysanthemums: "Chrysanthemums",
  daisies: "Daisies",
  "gerbera-daisies": "Gerbera Daisies",
  hydrangea: "Hydrangea",
  lilies: "Lilies",
  orchids: "Orchids",
  roses: "Roses",
  succulents: "Succulents",
  tulips: "Tulips"
};

const colorFacetLabels: Record<string, { label: string; swatch: string }> = {
  blue: { label: "Blue", swatch: "#005ec8" },
  green: { label: "Green", swatch: "#04ac63" },
  white: { label: "White", swatch: "#ffffff" },
  purple: { label: "Purple", swatch: "#a859cd" },
  red: { label: "Red", swatch: "#e20000" },
  orange: { label: "Orange", swatch: "#ff7800" },
  pink: { label: "Pink", swatch: "#ff8ac1" },
  yellow: { label: "Yellow", swatch: "#ffd200" }
};

function getFacetHref(catId: string | undefined, param: CategoryFilterKey, value: string) {
  const params = new URLSearchParams();

  if (catId) {
    params.set("catID", catId);
  }

  params.set(param, value);

  return `?${params.toString()}`;
}

export function getFacetFilterParam(facet: CategoryFacet): CategoryFilterKey | undefined {
  return facetParamByTitle[facet.title.toLowerCase()];
}

export function getFacetDisplayLabel(facet: CategoryFacet) {
  if (facet.title.toLowerCase() === "price ranges") {
    return "Price Range";
  }

  if (facet.title.toLowerCase() === "flower type") {
    return "Flower";
  }

  return facet.title;
}

export function getFacetOptionValue(option: CategoryFacetOption, param: CategoryFilterKey) {
  const [, queryString = ""] = option.href.split("?");
  const value = new URLSearchParams(queryString).get(param);

  return value ?? option.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function hasActiveCategoryFilters(filters: CategoryFilterState) {
  return Boolean(filters.price || filters.flower || filters.color);
}

function matchesPriceFilter(product: ProductSummary, priceFilter?: string) {
  if (!priceFilter) {
    return true;
  }

  if (priceFilter === "under-40") {
    return product.price < 40;
  }

  if (priceFilter === "40-60") {
    return product.price >= 40 && product.price < 60;
  }

  if (priceFilter === "60-80") {
    return product.price >= 60 && product.price < 80;
  }

  if (priceFilter === "80-100") {
    return product.price >= 80 && product.price < 100;
  }

  if (priceFilter === "over-100") {
    return product.price >= 100;
  }

  return true;
}

function getProductFilterMetadata(product: ProductSummary): ProductFilterMetadata {
  return {
    flower: product.filters?.flower ?? legacyProductFilters[product.slug]?.flower ?? [],
    color: product.filters?.color ?? legacyProductFilters[product.slug]?.color ?? []
  };
}

function matchesMetadataFilter(values: string[], selectedValue?: string) {
  return !selectedValue || values.includes(selectedValue);
}

export function filterProductsByCategoryFilters(products: ProductSummary[], filters: CategoryFilterState) {
  return products.filter((product) => {
    const metadata = getProductFilterMetadata(product);

    return (
      matchesPriceFilter(product, filters.price) &&
      matchesMetadataFilter(metadata.flower, filters.flower) &&
      matchesMetadataFilter(metadata.color, filters.color)
    );
  });
}

export function buildCategoryFacets(products: ProductSummary[], catId?: string): CategoryFacet[] {
  const priceOptions = priceFacetDefinitions
    .map((option) => ({
      label: option.label,
      href: getFacetHref(catId, "price", option.value),
      count: products.filter((product) => matchesPriceFilter(product, option.value)).length
    }))
    .filter((option) => option.count > 0);
  const flowerCounts = new Map<string, number>();
  const colorCounts = new Map<string, number>();

  products.forEach((product) => {
    const metadata = getProductFilterMetadata(product);

    metadata.flower.forEach((value) => {
      flowerCounts.set(value, (flowerCounts.get(value) ?? 0) + 1);
    });

    metadata.color.forEach((value) => {
      colorCounts.set(value, (colorCounts.get(value) ?? 0) + 1);
    });
  });

  const flowerOptions = Object.entries(flowerFacetLabels)
    .map(([value, label]) => ({
      label,
      href: getFacetHref(catId, "flower", value),
      count: flowerCounts.get(value) ?? 0
    }))
    .filter((option) => option.count > 0);
  const colorOptions = Object.entries(colorFacetLabels)
    .map(([value, { label, swatch }]) => ({
      label,
      href: getFacetHref(catId, "color", value),
      count: colorCounts.get(value) ?? 0,
      swatch
    }))
    .filter((option) => option.count > 0);
  const facets: CategoryFacet[] = [];

  if (priceOptions.length) {
    facets.push({ title: "Price Ranges", expanded: true, options: priceOptions });
  }

  if (flowerOptions.length) {
    facets.push({ title: "Flower Type", expanded: true, options: flowerOptions });
  }

  if (colorOptions.length) {
    facets.push({ title: "Color", expanded: true, options: colorOptions });
  }

  return facets;
}
