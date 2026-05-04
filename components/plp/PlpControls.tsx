"use client";

import { useId, useState } from "react";

import type { CategoryPageData, CategorySortOption } from "@/lib/api/types";
import { type CategoryFilterState, getFacetFilterParam } from "@/lib/plp/category-filters";

import { CategoryFilters } from "./CategoryFilters";
import { DeliveryAvailabilityForm } from "./DeliveryAvailabilityForm";
import { SortBar } from "./SortBar";

type PlpControlsProps = {
  category: CategoryPageData;
  controlsCategory?: CategoryPageData;
  options?: CategorySortOption[];
  selectedSort?: string;
  catId?: string;
  filters?: CategoryFilterState;
  zip?: string;
  deliveryDate?: string;
};

export function PlpControls({
  category,
  controlsCategory = category,
  options,
  selectedSort,
  catId,
  filters,
  zip,
  deliveryDate
}: PlpControlsProps) {
  const filterPanelId = useId();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const hasFilterFacets = Boolean(controlsCategory.facets?.some((facet) => getFacetFilterParam(facet)));

  return (
    <div className="plp-controls">
      <DeliveryAvailabilityForm
        categorySlug={category.slug}
        catId={catId}
        selectedSort={selectedSort}
        filters={filters}
        initialZip={zip}
        initialDeliveryDate={deliveryDate}
      />
      <div className="plp-controls-wrapper">
        {hasFilterFacets ? (
          <button
            type="button"
            className="plp-filter-toggle"
            aria-controls={filterPanelId}
            aria-expanded={isFilterPanelOpen}
            onClick={() => setIsFilterPanelOpen((isOpen) => !isOpen)}
          >
            Filters
          </button>
        ) : null}
        <CategoryFilters
          id={filterPanelId}
          isMobileOpen={isFilterPanelOpen}
          categorySlug={category.slug}
          catId={catId ?? category.catId}
          facets={controlsCategory.facets}
          filters={filters}
          selectedSort={selectedSort}
          zip={zip}
          deliveryDate={deliveryDate}
        />
        <SortBar
          options={options ?? controlsCategory.sortOptions}
          selectedSort={selectedSort}
          catId={catId}
          filters={filters}
          zip={zip}
          deliveryDate={deliveryDate}
          onActivate={() => setIsFilterPanelOpen(false)}
        />
      </div>
    </div>
  );
}
