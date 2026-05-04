"use client";

import Link from "next/link";
import { useMemo } from "react";

import type { CategoryPageData } from "@/lib/api/types";
import {
  type CategoryFilterKey,
  type CategoryFilterState,
  getFacetDisplayLabel,
  getFacetFilterParam,
  getFacetOptionValue,
  hasActiveCategoryFilters
} from "@/lib/plp/category-filters";

import { usePlpQueryUpdater } from "./usePlpQueryUpdater";

type CategoryFacet = NonNullable<CategoryPageData["facets"]>[number];

type CategoryFiltersProps = {
  id?: string;
  isMobileOpen?: boolean;
  categorySlug: string;
  catId?: string;
  facets?: CategoryPageData["facets"];
  filters?: CategoryFilterState;
  selectedSort?: string;
  zip?: string;
  deliveryDate?: string;
};

function getResetHref(categorySlug: string, catId?: string, selectedSort?: string, zip?: string, deliveryDate?: string) {
  const params = new URLSearchParams();

  if (catId) {
    params.set("catID", catId);
  }

  if (selectedSort) {
    params.set("sort", selectedSort);
  }

  if (zip) {
    params.set("zip", zip);
  }

  if (deliveryDate) {
    params.set("deliveryDate", deliveryDate);
  }

  const queryString = params.toString();

  return queryString ? `/category/${categorySlug}?${queryString}` : `/category/${categorySlug}`;
}

function CategoryFilterSelect({
  facet,
  param,
  selectedValue,
  onChange
}: {
  facet: CategoryFacet;
  param: CategoryFilterKey;
  selectedValue?: string;
  onChange: (param: CategoryFilterKey, value: string) => void;
}) {
  const label = getFacetDisplayLabel(facet);
  const selectId = `plp-filter-${param}`;

  return (
    <label className="plp-filter-select" htmlFor={selectId}>
      <span>{label}</span>
      <select
        key={`${param}-${selectedValue ?? "all"}`}
        id={selectId}
        name={param}
        defaultValue={selectedValue ?? ""}
        onChange={(event) => onChange(param, event.target.value)}
      >
        <option value="">{`All ${label}`}</option>
        {facet.options.map((option) => {
          const value = getFacetOptionValue(option, param);
          const countLabel = typeof option.count === "number" ? ` (${option.count})` : "";

          return (
            <option key={`${param}-${value}`} value={value}>
              {option.label}
              {countLabel}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export function CategoryFilters({
  id,
  isMobileOpen = false,
  categorySlug,
  catId,
  facets,
  filters = {},
  selectedSort,
  zip,
  deliveryDate
}: CategoryFiltersProps) {
  const defaultQueryParams = useMemo(
    () => ({
      catID: catId,
      sort: selectedSort,
      zip,
      deliveryDate
    }),
    [catId, deliveryDate, selectedSort, zip]
  );
  const updateQuery = usePlpQueryUpdater(defaultQueryParams);
  const filterFacets =
    facets
      ?.map((facet) => ({ facet, param: getFacetFilterParam(facet) }))
      .filter((item): item is { facet: CategoryFacet; param: CategoryFilterKey } => Boolean(item.param)) ?? [];
  const hasActiveFilters = hasActiveCategoryFilters(filters);

  function handleFilterChange(param: CategoryFilterKey, value: string) {
    updateQuery({ [param]: value || undefined });
  }

  if (!filterFacets.length) {
    return null;
  }

  return (
    <section id={id} className={`plp-filters${isMobileOpen ? " active" : ""}`} aria-labelledby="plp-filter-heading">
      <h2 className="sr-only" id="plp-filter-heading">
        Filter Results
      </h2>
      <div className="plp-filter-dropdowns">
        {filterFacets.map(({ facet, param }) => (
          <CategoryFilterSelect
            key={param}
            facet={facet}
            param={param}
            selectedValue={filters[param]}
            onChange={handleFilterChange}
          />
        ))}
        {hasActiveFilters ? (
          <div className="plp-filter-dropdowns__actions">
            <Link href={getResetHref(categorySlug, catId, selectedSort, zip, deliveryDate)}>Reset</Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
