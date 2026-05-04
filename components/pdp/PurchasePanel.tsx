"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { ProductPageData, ProductVariant } from "@/lib/api/types";
import { getCategoryHref } from "@/lib/config/category-routes";
import { formatPrice } from "@/lib/utils";

type PurchasePanelProps = {
  product: ProductPageData;
};

type AvailabilityState = "idle" | "checking" | "available" | "unavailable" | "error";

type AddOnDropdownOption = {
  label: string;
  value: string;
  price?: number;
};

type AddOnDropdown = {
  key: string;
  label: string;
  labelId: string;
  selectId: string;
  hiddenInputName: string;
  selectName: string;
  productId: string;
  ariaLabel: string;
  options: AddOnDropdownOption[];
};

const ADD_ON_DROPDOWNS: AddOnDropdown[] = [
  {
    key: "mylar",
    label: "Mylar Balloons",
    labelId: "addon-mylar-label",
    selectId: "addon-mylar-select",
    hiddenInputName: "_D:/atg/commerce/order/purchase/CartModifierFormHandler.addOnItems.AP_MYLAR1",
    selectName: "/atg/commerce/order/purchase/CartModifierFormHandler.addOnItems.AP_MYLAR1",
    productId: "AP_MYLAR1",
    ariaLabel: "Add on Mylar Balloons",
    options: [
      { label: "Select Quantity", value: "" },
      { label: "1 Balloon - $5.99", value: "MYLAR1", price: 5.99 },
      { label: "2 Balloons - $10.99", value: "MYLAR2", price: 10.99 },
      { label: "3 Balloons - $15.99", value: "MYLAR3", price: 15.99 }
    ]
  },
  {
    key: "plush",
    label: "Stuffed Animal",
    labelId: "addon-plush-label",
    selectId: "addon-plush-select",
    hiddenInputName: "_D:/atg/commerce/order/purchase/CartModifierFormHandler.addOnItems.AP_PLUSH1",
    selectName: "/atg/commerce/order/purchase/CartModifierFormHandler.addOnItems.AP_PLUSH1",
    productId: "AP_PLUSH1",
    ariaLabel: "Add on Stuffed Animal",
    options: [
      { label: "Select Size", value: "" },
      { label: "Small - $9.99", value: "PLUSH1", price: 9.99 },
      { label: "Medium - $19.99", value: "PLUSH2", price: 19.99 },
      { label: "Large - $29.99", value: "PLUSH3", price: 29.99 }
    ]
  },
  {
    key: "chocolates",
    label: "Chocolates",
    labelId: "addon-chocolates-label",
    selectId: "addon-chocolates-select",
    hiddenInputName: "_D:/atg/commerce/order/purchase/CartModifierFormHandler.addOnItems.AP_CHOC1",
    selectName: "/atg/commerce/order/purchase/CartModifierFormHandler.addOnItems.AP_CHOC1",
    productId: "AP_CHOC1",
    ariaLabel: "Add on Chocolates",
    options: [
      { label: "Select Size", value: "" },
      { label: "Small Box - $9.99", value: "CHOC1", price: 9.99 },
      { label: "Medium Box - $19.99", value: "CHOC2", price: 19.99 },
      { label: "Large Box - $29.99", value: "CHOC3", price: 29.99 }
    ]
  }
];

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

function getAddOnTotal(selectedAddOnValues: Record<string, string>) {
  return ADD_ON_DROPDOWNS.reduce((total, addOn) => {
    const selectedOption = addOn.options.find((option) => option.value === selectedAddOnValues[addOn.productId]);
    return total + (selectedOption?.price ?? 0);
  }, 0);
}

export function PurchasePanel({ product }: PurchasePanelProps) {
  const variants = useMemo(() => (product.variants?.length ? product.variants : getFallbackVariants(product)), [product]);
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? "standard");
  const [selectedAddOnValues, setSelectedAddOnValues] = useState<Record<string, string>>({});
  const [recipientZip, setRecipientZip] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [availabilityState, setAvailabilityState] = useState<AvailabilityState>("idle");
  const [cartState, setCartState] = useState<"idle" | "added">("idle");
  const availabilityTimer = useRef<number | null>(null);
  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId) ?? variants[0];
  const addOnTotal = getAddOnTotal(selectedAddOnValues);
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


      <div className="purchase-panel__section">
        <h2>Add something extra</h2>
        <div className="purchase-panel__addons" id="addExtraContainer">
          {ADD_ON_DROPDOWNS.map((addOn) => (
            <div
              key={addOn.key}
              className="purchase-panel__addon-row addOnWrapDivClass"
              role="region"
              aria-labelledby={addOn.labelId}
            >
              <input name={addOn.hiddenInputName} type="hidden" defaultValue=" " />
              <label id={addOn.labelId} className="purchase-panel__addon-label" htmlFor={addOn.selectId}>
                {addOn.label}
              </label>
              <div className="purchase-panel__addon-select-wrap">
                <select
                  data-productid={addOn.productId}
                  data-showspecialmessage="false"
                  name={addOn.selectName}
                  id={addOn.selectId}
                  className="purchase-panel__addon-select addOnProduct"
                  aria-label={addOn.ariaLabel}
                  value={selectedAddOnValues[addOn.productId] ?? ""}
                  onChange={(event) => {
                    setSelectedAddOnValues((currentValues) => ({
                      ...currentValues,
                      [addOn.productId]: event.target.value
                    }));
                    setCartState("idle");
                  }}
                >
                  {addOn.options.map((option) => (
                    <option key={option.value || option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

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
          onClick={() => setCartState("added")}
        >
          {cartState === "added" ? "Added" : "Add to cart"}
        </button>
      </div>
      {!canAddToCart ? <p className="purchase-panel__hint">Check delivery availability and choose a date to continue.</p> : null}
    </aside>
  );
}
