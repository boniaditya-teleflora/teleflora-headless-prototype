"use client";

import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";

import type { ProductAddOn, ProductPageData, ProductVariant } from "@/lib/api/types";
import { addMiniCartItem, MINI_CART_OPEN_EVENT } from "@/lib/cart/mini-cart";
import { formatPrice } from "@/lib/utils";

type PurchasePanelProps = {
  product: ProductPageData;
};

type AvailabilityState = "idle" | "checking" | "available" | "unavailable" | "error";

function getFallbackVariants(product: ProductPageData): ProductVariant[] {
  return [
    {
      id: "standard",
      label: "Standard",
      description: "Full and fresh",
      price: product.price,
      sku: product.sku
    }
  ];
}

function getAddOnOptions(addOn: ProductAddOn) {
  if (addOn.options?.length) {
    return addOn.options;
  }

  return typeof addOn.price === "number"
    ? [
        {
          id: addOn.id,
          label: addOn.label,
          price: addOn.price
        }
      ]
    : [];
}

function getAddOnTotal(addOns: ProductAddOn[], selectedAddOnValues: Record<string, string>) {
  return addOns.reduce((total, addOn) => {
    const selectedOption = getAddOnOptions(addOn).find((option) => option.id === selectedAddOnValues[addOn.id]);
    return total + (selectedOption?.price ?? 0);
  }, 0);
}

export function PurchasePanel({ product }: PurchasePanelProps) {
  const variants = useMemo(() => (product.variants?.length ? product.variants : getFallbackVariants(product)), [product]);
  const addOns = useMemo(() => product.addOns ?? [], [product.addOns]);
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? "standard");
  const [selectedAddOnValues, setSelectedAddOnValues] = useState<Record<string, string>>({});
  const [recipientZip, setRecipientZip] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [availabilityState, setAvailabilityState] = useState<AvailabilityState>("idle");
  const [cartState, setCartState] = useState<"idle" | "added">("idle");
  const availabilityTimer = useRef<number | null>(null);
  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId) ?? variants[0];
  const addOnTotal = getAddOnTotal(addOns, selectedAddOnValues);
  const configuredTotal = (selectedVariant?.price ?? product.price) + addOnTotal;
  const canAddToCart = availabilityState === "available" && Boolean(deliveryDate) && Boolean(selectedVariant);
  const isChecking = availabilityState === "checking";

  useEffect(() => {
    return () => {
      if (availabilityTimer.current) {
        window.clearTimeout(availabilityTimer.current);
      }
    };
  }, []);

  function checkAvailability() {
    setCartState("idle");

    if (!/^\d{5}$/.test(recipientZip.trim())) {
      setAvailabilityState("error");
      return;
    }

    setAvailabilityState("checking");

    if (availabilityTimer.current) {
      window.clearTimeout(availabilityTimer.current);
    }

    availabilityTimer.current = window.setTimeout(() => {
      setAvailabilityState(recipientZip.trim() === "00000" ? "unavailable" : "available");
    }, 500);
  }

  function handleAddToCart(event: MouseEvent<HTMLButtonElement>) {
    const cartImage = selectedVariant?.image ?? product.image ?? product.images[0];
    const selectedAddOnSignature = Object.entries(selectedAddOnValues)
      .filter(([, value]) => Boolean(value))
      .sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey))
      .map(([key, value]) => `${key}:${value}`)
      .join("|");

    setCartState("added");
    addMiniCartItem({
      currency: product.currency,
      deliveryDate,
      href: product.href ?? `/product/${product.slug}`,
      id: [product.slug, selectedVariant?.id ?? "standard", selectedAddOnSignature || "no-addons", recipientZip.trim(), deliveryDate].join("-"),
      image: cartImage?.src,
      imageAlt: cartImage?.alt ?? product.name,
      name: product.name,
      quantity: 1,
      recipientZip: recipientZip.trim(),
      unitPrice: configuredTotal,
      variantLabel: selectedVariant?.label
    });
    window.dispatchEvent(new CustomEvent(MINI_CART_OPEN_EVENT, { detail: { trigger: event.currentTarget } }));
  }

  return (
    <aside className="purchase-panel">
      <div className="purchase-panel__header">
        <p className="purchase-panel__eyebrow">Customize and deliver</p>
        <h2>Select size</h2>
        <p>Choose the presentation that best fits the moment.</p>
      </div>

      <fieldset className="purchase-panel__variants">
        <legend className="sr-only">Select bouquet size</legend>
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariant?.id;

          return (
            <button
              key={variant.id}
              type="button"
              className={`purchase-panel__variant${isSelected ? " purchase-panel__variant--selected" : ""}`}
              aria-pressed={isSelected}
              onClick={() => {
                setSelectedVariantId(variant.id);
                setCartState("idle");
              }}
            >
              <span>
                <strong>{variant.label}</strong>
              </span>
              <span>{formatPrice(variant.price, product.currency)}</span>
            </button>
          );
        })}
      </fieldset>


      {addOns.length ? (
      <div className="purchase-panel__section">
        <h2>Add something extra</h2>
        <div className="purchase-panel__addons" id="addExtraContainer">
          {addOns.map((addOn) => {
            const labelId = `addon-${addOn.id}-label`;
            const selectId = `addon-${addOn.id}-select`;
            const options = getAddOnOptions(addOn);

            return (
            <div
              key={addOn.id}
              className="purchase-panel__addon-row addOnWrapDivClass"
              role="region"
              aria-labelledby={labelId}
            >
              <label id={labelId} className="purchase-panel__addon-label" htmlFor={selectId}>
                {addOn.label}
              </label>
              <div className="purchase-panel__addon-select-wrap">
                <select
                  data-productid={addOn.id}
                  data-showspecialmessage="false"
                  name={`addOnItems.${addOn.id}`}
                  id={selectId}
                  className="purchase-panel__addon-select addOnProduct"
                  aria-label={`Add on ${addOn.label}`}
                  value={selectedAddOnValues[addOn.id] ?? ""}
                  onChange={(event) => {
                    setSelectedAddOnValues((currentValues) => ({
                      ...currentValues,
                      [addOn.id]: event.target.value
                    }));
                    setCartState("idle");
                  }}
                >
                  <option value="">Select {addOn.label}</option>
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label} - {formatPrice(option.price, product.currency)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            );
          })}
        </div>
      </div>
      ) : null}

      <div className="purchase-panel__section">
        <h2>Delivery details</h2>
        <div className="purchase-panel__fields">
          <label>
            <span>Recipient ZIP Code</span>
            <input
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="Recipient ZIP"
              value={recipientZip}
              onChange={(event) => {
                setRecipientZip(event.target.value);
                setAvailabilityState("idle");
                setCartState("idle");
              }}
              maxLength={5}
            />
          </label>
          <label>
            <span>Delivery Date</span>
            <input
              type="date"
              value={deliveryDate}
              onChange={(event) => {
                setDeliveryDate(event.target.value);
                setCartState("idle");
              }}
            />
          </label>
        </div>
        <button type="button" className="purchase-panel__availability-button" onClick={checkAvailability} disabled={isChecking}>
          {isChecking ? "Checking..." : "Check availability"}
        </button>
        <p className={`purchase-panel__status purchase-panel__status--${availabilityState}`} aria-live="polite">
          {availabilityState === "idle" ? product.deliveryNote : null}
          {availabilityState === "checking" ? "Checking local florist coverage..." : null}
          {availabilityState === "available" ? "Good news. This arrangement is available for this ZIP code." : null}
          {availabilityState === "unavailable" ? "This arrangement is unavailable for that ZIP. Try another recipient ZIP." : null}
          {availabilityState === "error" ? "Enter a valid 5-digit ZIP code to check delivery." : null}
        </p>
      </div>

      <div className="purchase-panel__total">
        <span>Estimated item total</span>
        <strong>{formatPrice(configuredTotal, product.currency)}</strong>
        <small>Taxes, delivery, and upgrades are calculated at checkout.</small>
      </div>

      <div className="purchase-panel__actions">
        <button
          type="button"
          className="purchase-panel__cart-button"
          disabled={!canAddToCart}
          onClick={handleAddToCart}
        >
          {cartState === "added" ? "Added" : "Add to cart"}
        </button>
      </div>
      {!canAddToCart ? <p className="purchase-panel__hint">Check delivery availability and choose a date to continue.</p> : null}
    </aside>
  );
}
