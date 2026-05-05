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
  lavender: { label: "Lavender", swatch: "#b497d6" },
  pastel: { label: "Pastel", swatch: "#f0bfd2" },
  white: { label: "White", swatch: "#ffffff" },
  purple: { label: "Purple", swatch: "#a859cd" },
  red: { label: "Red", swatch: "#e20000" },
  orange: { label: "Orange", swatch: "#ff7800" },
  pink: { label: "Pink", swatch: "#ff8ac1" },
  yellow: { label: "Yellow", swatch: "#ffd200" }
};

const categoryFilterKeys: CategoryFilterKey[] = ["price", "flower", "color"];

function toTitleCase(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function getFacetHref(catId: string | undefined, filters: CategoryFilterState) {
  const params = new URLSearchParams();

  if (catId) {
    params.set("catID", catId);
  }

  categoryFilterKeys.forEach((key) => {
    const value = filters[key];

    if (value) {
      params.set(key, value);
    }
  });

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

  const price = product.salePrice ?? product.price;

  if (priceFilter === "under-40") {
    return price < 40;
  }

  if (priceFilter === "40-60") {
    return price >= 40 && price < 60;
  }

  if (priceFilter === "60-80") {
    return price >= 60 && price < 80;
  }

  if (priceFilter === "80-100") {
    return price >= 80 && price < 100;
  }

  if (priceFilter === "over-100") {
    return price >= 100;
  }

  return false;
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

function matchesProductCategoryFilters(product: ProductSummary, filters: CategoryFilterState) {
  const metadata = getProductFilterMetadata(product);

  return (
    matchesPriceFilter(product, filters.price) &&
    matchesMetadataFilter(metadata.flower, filters.flower) &&
    matchesMetadataFilter(metadata.color, filters.color)
  );
}

export function filterProductsByCategoryFilters(products: ProductSummary[], filters: CategoryFilterState) {
  return products.filter((product) => matchesProductCategoryFilters(product, filters));
}

function getFacetCandidateValues(products: ProductSummary[], param: CategoryFilterKey, selectedValue?: string) {
  const values = new Set<string>();

  if (param === "price") {
    priceFacetDefinitions.forEach((option) => values.add(option.value));
  }

  products.forEach((product) => {
    const metadata = getProductFilterMetadata(product);

    if (param === "flower") {
      metadata.flower.forEach((value) => values.add(value));
    }

    if (param === "color") {
      metadata.color.forEach((value) => values.add(value));
    }
  });

  if (selectedValue) {
    values.add(selectedValue);
  }

  return Array.from(values);
}

function getFacetOptionLabel(param: CategoryFilterKey, value: string) {
  if (param === "price") {
    return priceFacetDefinitions.find((option) => option.value === value)?.label ?? toTitleCase(value);
  }

  if (param === "flower") {
    return flowerFacetLabels[value] ?? toTitleCase(value);
  }

  return colorFacetLabels[value]?.label ?? toTitleCase(value);
}

function getFacetTitle(param: CategoryFilterKey) {
  if (param === "price") {
    return "Price Ranges";
  }

  if (param === "flower") {
    return "Flower Type";
  }

  return "Color";
}

function getOptionSortIndex(param: CategoryFilterKey, value: string) {
  if (param === "price") {
    const optionIndex = priceFacetDefinitions.findIndex((option) => option.value === value);

    return optionIndex === -1 ? Number.MAX_SAFE_INTEGER : optionIndex;
  }

  return 0;
}

function buildFacetOptions(products: ProductSummary[], filters: CategoryFilterState, catId: string | undefined, param: CategoryFilterKey) {
  const selectedValue = filters[param];

  return getFacetCandidateValues(products, param, selectedValue)
    .map((value) => {
      const optionFilters = {
        ...filters,
        [param]: value
      };
      const count = products.filter((product) => matchesProductCategoryFilters(product, optionFilters)).length;
      const colorDisplay = param === "color" ? colorFacetLabels[value] : undefined;

      return {
        label: getFacetOptionLabel(param, value),
        href: getFacetHref(catId, optionFilters),
        count,
        disabled: count === 0,
        ...(colorDisplay?.swatch ? { swatch: colorDisplay.swatch } : {})
      } satisfies CategoryFacetOption;
    })
    .filter((option) => option.count > 0 || getFacetOptionValue(option, param) === selectedValue)
    .sort((firstOption, secondOption) => {
      const firstValue = getFacetOptionValue(firstOption, param);
      const secondValue = getFacetOptionValue(secondOption, param);
      const firstSortIndex = getOptionSortIndex(param, firstValue);
      const secondSortIndex = getOptionSortIndex(param, secondValue);

      if (firstSortIndex !== secondSortIndex) {
        return firstSortIndex - secondSortIndex;
      }

      return firstOption.label.localeCompare(secondOption.label);
    });
}

export function buildCategoryFacets(products: ProductSummary[], catId?: string, filters: CategoryFilterState = {}): CategoryFacet[] {
  return categoryFilterKeys
    .map((param) => ({
      title: getFacetTitle(param),
      expanded: true,
      options: buildFacetOptions(products, filters, catId, param)
    }))
    .filter((facet) => facet.options.length);
}

export function getCategoryFilterModel(products: ProductSummary[], filters: CategoryFilterState, catId?: string) {
  return {
    products: filterProductsByCategoryFilters(products, filters),
    facets: buildCategoryFacets(products, catId, filters)
  };
}
