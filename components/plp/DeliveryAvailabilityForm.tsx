"use client";

import { useId, useRef, useState } from "react";

import type { CategoryFilterState } from "@/lib/plp/category-filters";

type DeliveryAvailabilityFormProps = {
  categorySlug: string;
  catId?: string;
  selectedSort?: string;
  filters?: CategoryFilterState;
  initialZip?: string;
  initialDeliveryDate?: string;
};

export function DeliveryAvailabilityForm({
  categorySlug,
  catId,
  selectedSort,
  filters = {},
  initialZip = "",
  initialDeliveryDate = ""
}: DeliveryAvailabilityFormProps) {
  const formId = useId();
  const deliveryDateInputRef = useRef<HTMLInputElement>(null);
  const [zip, setZip] = useState(initialZip);
  const [deliveryDate, setDeliveryDate] = useState(initialDeliveryDate);
  const hasZip = zip.trim().length > 0;
  const canSubmit = hasZip && deliveryDate.trim().length > 0;
  const zipId = `${formId}-zip`;
  const deliveryDateId = `${formId}-delivery-date`;

  function openDeliveryDatePicker() {
    if (!hasZip) {
      return;
    }

    deliveryDateInputRef.current?.showPicker?.();
  }

  return (
    <form className="plp-availability-card" action={`/category/${categorySlug}`}>
      {catId ? <input type="hidden" name="catID" value={catId} /> : null}
      {selectedSort ? <input type="hidden" name="sort" value={selectedSort} /> : null}
      {filters.price ? <input type="hidden" name="price" value={filters.price} /> : null}
      {filters.flower ? <input type="hidden" name="flower" value={filters.flower} /> : null}
      {filters.color ? <input type="hidden" name="color" value={filters.color} /> : null}
      <p className="plp-availability-card__help">Show bouquets available in your recipient&apos;s area.</p>
      <div className="plp-availability-card__fields">
        <label className="sr-only" htmlFor={zipId}>
          Recipient Zip Code
        </label>
        <span className="plp-availability-card__input-field plp-availability-card__zip-field">
          <svg
            className="plp-availability-card__field-icon"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
          >
            <path d="m16.8 3.2-5.7 13.6-2.2-5.7-5.7-2.2 13.6-5.7Z" />
          </svg>
          <input
            id={zipId}
            name="zip"
            inputMode="numeric"
            maxLength={10}
            placeholder="Recipient Zip Code"
            value={zip}
            onChange={(event) => {
              const nextZip = event.target.value;
              setZip(nextZip);

              if (!nextZip.trim()) {
                setDeliveryDate("");
              }
            }}
          />
        </span>
        <label className="sr-only" htmlFor={deliveryDateId}>
          Delivery Date
        </label>
        <span className="plp-availability-card__input-field plp-availability-card__date-field">
          <svg
            className="plp-availability-card__field-icon"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M5.5 2.5v3M14.5 2.5v3M3.5 7.5h13M5 4h10a1.5 1.5 0 0 1 1.5 1.5V15A1.5 1.5 0 0 1 15 16.5H5A1.5 1.5 0 0 1 3.5 15V5.5A1.5 1.5 0 0 1 5 4Z" />
          </svg>
          <input
            ref={deliveryDateInputRef}
            id={deliveryDateId}
            name="deliveryDate"
            type="date"
            className={!deliveryDate ? "plp-availability-card__date-input--empty" : undefined}
            placeholder="Delivery Date"
            aria-label="Delivery Date"
            value={deliveryDate}
            disabled={!hasZip}
            onClick={openDeliveryDatePicker}
            onChange={(event) => setDeliveryDate(event.target.value)}
          />
          {!deliveryDate ? <span className="plp-availability-card__date-placeholder">Delivery Date</span> : null}
        </span>
        <button type="submit" disabled={!canSubmit}>
          GO
        </button>
      </div>
    </form>
  );
}
