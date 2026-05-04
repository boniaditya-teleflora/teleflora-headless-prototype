"use client";

import { useMemo, useRef, useState } from "react";

import type { CategorySortOption } from "@/lib/api/types";
import type { CategoryFilterState } from "@/lib/plp/category-filters";

import { usePlpQueryUpdater } from "./usePlpQueryUpdater";

type SortBarProps = {
  options?: CategorySortOption[];
  selectedSort?: string;
  catId?: string;
  filters?: CategoryFilterState;
  zip?: string;
  deliveryDate?: string;
  onActivate?: () => void;
};

const DEFAULT_SORT_OPTIONS: CategorySortOption[] = [
  { label: "Bestsellers", value: "bestsellers" },
  { label: "Lowest Price", value: "price-low-high" },
  { label: "Highest Price", value: "price-high-low" }
];

export function SortBar({
  options = DEFAULT_SORT_OPTIONS,
  selectedSort = "bestsellers",
  catId,
  filters = {},
  zip,
  deliveryDate,
  onActivate
}: SortBarProps) {
  const sortSelectRef = useRef<HTMLSelectElement>(null);
  const selectedSortValue = options.some((option) => option.value === selectedSort)
    ? selectedSort
    : (options[0]?.value ?? "bestsellers");
  const [optimisticSort, setOptimisticSort] = useState({ selectedSort: selectedSortValue, value: selectedSortValue });
  const activeSort = optimisticSort.selectedSort === selectedSortValue ? optimisticSort.value : selectedSortValue;
  const defaultQueryParams = useMemo(
    () => ({
      catID: catId,
      price: filters.price,
      flower: filters.flower,
      color: filters.color,
      zip,
      deliveryDate
    }),
    [catId, deliveryDate, filters.color, filters.flower, filters.price, zip]
  );
  const updateQuery = usePlpQueryUpdater(defaultQueryParams);
  const selectedSortLabel = useMemo(
    () => options.find((option) => option.value === activeSort)?.label ?? options[0]?.label ?? "Featured",
    [activeSort, options]
  );

  function handleSortChange(value: string) {
    setOptimisticSort({ selectedSort: selectedSortValue, value });
    updateQuery({ sort: value });
  }

  function openSortSelect() {
    onActivate?.();

    const select = sortSelectRef.current;

    if (!select) {
      return;
    }

    const selectWithPicker = select as HTMLSelectElement & { showPicker?: () => void };

    select.focus();

    if (selectWithPicker.showPicker) {
      selectWithPicker.showPicker();
    } else {
      select.click();
    }
  }

  return (
    <div
      className="plp-sort"
      aria-label="Sort options"
      onFocusCapture={onActivate}
      onPointerDownCapture={onActivate}
    >
      <button
        type="button"
        className="plp-sort-btn"
        aria-controls="plp-sort-select"
        aria-label={`Sort by ${selectedSortLabel}`}
        aria-haspopup="listbox"
        onClick={openSortSelect}
      >
        <span className="plp-sort__label">{`Sort By: ${selectedSortLabel}`}</span>
        <span className="plp-sort-btn__icon" aria-hidden="true" />
      </button>
      <label className="sr-only" htmlFor="plp-sort-select">
        Sort By
      </label>
      <select
        ref={sortSelectRef}
        id="plp-sort-select"
        name="sort"
        tabIndex={-1}
        value={activeSort}
        onChange={(event) => handleSortChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
