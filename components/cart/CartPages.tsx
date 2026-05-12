"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  getMockCartItems,
  getMockCartTotals,
  mockPromoCode,
  mockTipOptions,
  type MockCartAddOn,
  type MockCartItem,
  type MockCartSelectedAddOn,
  type MockCartTipOption,
  type MockCartTotals,
  type MockCartVariantOption
} from "@/lib/cart/mock-cart";
import { getCategoryHref } from "@/lib/config/category-routes";
import { formatPrice } from "@/lib/utils";

export type CartVariant = "original" | "modern";
export type CartMockState = "filled" | "empty";

type CartPageProps = {
  state: CartMockState;
  variant: CartVariant;
};

type SelectedCartVariants = Record<string, string>;
type SelectedCartAddOns = Record<string, Record<string, string>>;

type VariantSelectionChangeHandler = (itemId: string, variantId: string) => void;
type AddOnSelectionChangeHandler = (itemId: string, addOnId: string, optionId: string) => void;
type TipSelectionChangeHandler = (option: MockCartTipOption) => void;

const checkoutHref = "/checkout";
const flowersHref = getCategoryHref("flowers");
const customTipMaxAmount = 500;

function getItemCount(items: MockCartItem[]) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

function getCartHref(variant: CartVariant, state: CartMockState) {
  return `/cart?variant=${variant}&state=${state}`;
}

function getSelectedVariant(item: MockCartItem, selectedVariantId: string) {
  if (!item.variants.length) {
    return undefined;
  }

  return (
    item.variants.find((variantOption) => variantOption.id === selectedVariantId) ??
    item.variants.find((variantOption) => variantOption.id === item.selectedVariantId) ??
    item.variants[0]
  );
}

function getAddOnOptions(addOn: MockCartAddOn) {
  if (addOn.options?.length) {
    return addOn.options;
  }

  return typeof addOn.price === "number"
    ? [
        {
          id: addOn.id,
          label: `Add ${addOn.label}`,
          price: addOn.price
        }
      ]
    : [];
}

function getSelectedAddOns(item: MockCartItem, selectedAddOns: Record<string, string> | undefined): MockCartSelectedAddOn[] {
  if (!selectedAddOns) {
    return [];
  }

  return item.addOns.reduce<MockCartSelectedAddOn[]>((selectedItems, addOn) => {
    const selectedOptionId = selectedAddOns[addOn.id];
    const selectedOption = getAddOnOptions(addOn).find((option) => option.id === selectedOptionId);

    if (selectedOption && Number.isFinite(selectedOption.price)) {
      selectedItems.push({
        addOnId: addOn.id,
        label: addOn.label,
        optionId: selectedOption.id,
        optionLabel: selectedOption.label,
        price: selectedOption.price
      });
    }

    return selectedItems;
  }, []);
}

function getCartItemsWithSelectedOptions(
  items: MockCartItem[],
  selectedVariants: SelectedCartVariants,
  selectedAddOns: SelectedCartAddOns
) {
  return items.map((item) => {
    const selectedVariant = getSelectedVariant(item, selectedVariants[item.id] ?? item.selectedVariantId);
    const selectedPrice = selectedVariant?.price;

    return {
      ...item,
      selectedVariantId: selectedVariant?.id ?? item.selectedVariantId,
      selectedAddOns: getSelectedAddOns(item, selectedAddOns[item.id]),
      sku: selectedVariant?.sku ?? item.sku,
      unitPrice: typeof selectedPrice === "number" && Number.isFinite(selectedPrice) ? selectedPrice : item.unitPrice
    };
  });
}

function CartSwitcher({ state, variant }: CartPageProps) {
  return (
    <nav className="cart-switcher" aria-label="Cart page variants">
      <span className="cart-switcher__label">Cart view</span>
      <Link
        href={getCartHref("original", state)}
        className={`cart-switcher__link${variant === "original" ? " cart-switcher__link--active" : ""}`}
        aria-current={variant === "original" ? "page" : undefined}
      >
        Original
      </Link>
      <Link
        href={getCartHref("modern", state)}
        className={`cart-switcher__link${variant === "modern" ? " cart-switcher__link--active" : ""}`}
        aria-current={variant === "modern" ? "page" : undefined}
      >
        Modern
      </Link>
    </nav>
  );
}

function SummaryRow({
  amount,
  currency,
  label
}: {
  amount: number;
  currency: string;
  label: string;
}) {
  return (
    <div className="cart-summary-row">
      <span>{label}</span>
      <strong>{formatPrice(amount, currency)}</strong>
    </div>
  );
}

function PromoControl({ idPrefix, variant = "original" }: { idPrefix: string; variant?: CartVariant }) {
  return (
    <div className={`cart-promo cart-promo--${variant}`}>
      <label htmlFor={`${idPrefix}-promo-code`}>Promotional Code</label>
      <div className="cart-promo__control">
        <input id={`${idPrefix}-promo-code`} name="promo" defaultValue={mockPromoCode} />
        <button type="button">Apply</button>
      </div>
    </div>
  );
}

function TipSelector({
  customTipError,
  customTipInput = "",
  currency,
  idPrefix,
  onCustomTipApply,
  onCustomTipInputChange,
  onTipChange,
  options,
  selectedTipId = "none",
  variant
}: {
  customTipError?: string;
  customTipInput?: string;
  currency: string;
  idPrefix: string;
  onCustomTipApply?: () => void;
  onCustomTipInputChange?: (value: string) => void;
  onTipChange?: TipSelectionChangeHandler;
  options: MockCartTipOption[];
  selectedTipId?: string;
  variant: CartVariant;
}) {
  const isCustomTipSelected = selectedTipId === "other";
  const customInputId = `${idPrefix}-custom-tip`;

  return (
    <fieldset className={`cart-tip cart-tip--${variant}`}>
      <legend>Add a Tip</legend>
      <div className="cart-tip__options cart-tip__grid">
        {options.map((option) => {
          const isSelected = option.id === selectedTipId;
          const inputProps = onTipChange
            ? {
                checked: isSelected,
                onChange: () => onTipChange(option)
              }
            : {
                defaultChecked: option.id === "none"
              };

          return (
            <label key={option.id} className={`cart-tip__option${isSelected ? " is-active" : ""}`}>
              <input name={`${idPrefix}-tip`} type="radio" {...inputProps} />
              <span>
                <strong>{option.label}</strong>
                {typeof option.amount === "number" && option.amount > 0 ? <small>{formatPrice(option.amount, currency)}</small> : null}
              </span>
            </label>
          );
        })}
      </div>
      <div className={`cart-tip__custom${isCustomTipSelected ? " is-visible" : ""}`} aria-hidden={!isCustomTipSelected}>
        <label className="cart-tip__custom-label" htmlFor={customInputId}>
          Custom Tip:
        </label>
        <div className="cart-tip__custom-control">
          <span aria-hidden="true">$</span>
          <input
            id={customInputId}
            inputMode="decimal"
            pattern="[0-9]*\\.?[0-9]*"
            value={customTipInput}
            onChange={(event) => onCustomTipInputChange?.(event.target.value)}
            disabled={!isCustomTipSelected}
            aria-invalid={Boolean(customTipError)}
            aria-describedby={customTipError ? `${customInputId}-error` : undefined}
          />
        </div>
        <button type="button" onClick={onCustomTipApply} disabled={!isCustomTipSelected}>
          Apply
        </button>
        {customTipError ? (
          <p id={`${customInputId}-error`} className="cart-tip__custom-error">
            {customTipError}
          </p>
        ) : null}
      </div>
    </fieldset>
  );
}

function VariantOptions({
  currency,
  idPrefix,
  itemId,
  onVariantChange,
  options,
  selectedVariantId,
  variant
}: {
  currency: string;
  idPrefix: string;
  itemId: string;
  onVariantChange: VariantSelectionChangeHandler;
  options: MockCartVariantOption[];
  selectedVariantId: string;
  variant: CartVariant;
}) {
  if (!options.length) {
    return null;
  }

  return (
    <fieldset className={`cart-upgrade cart-upgrade--${variant}`}>
      <legend>Bouquet Upgrade</legend>
      <div className="cart-upgrade__options">
        {options.map((option) => (
          <label key={option.id} className="cart-upgrade__option">
            <input
              name={`${idPrefix}-upgrade`}
              type="radio"
              checked={option.id === selectedVariantId}
              onChange={() => onVariantChange(itemId, option.id)}
            />
            <span>
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </span>
            <b>{formatPrice(option.price, currency)}</b>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function OriginalAddOns({ addOns, currency }: { addOns: MockCartAddOn[]; currency: string }) {
  return (
    <section className="cart-original__extras" aria-labelledby="original-extras-title">
      <h3 id="original-extras-title">Add Something Extra</h3>
      <div className="cart-original__extras-grid">
        {addOns.map((addOn) => {
          const options = getAddOnOptions(addOn);

          return (
            <label key={addOn.id} className="cart-original__extra-field" htmlFor={`original-${addOn.id}`}>
              <span>{addOn.label}</span>
              <select id={`original-${addOn.id}`} name={`original-${addOn.id}`} defaultValue="">
                <option value="">Select One</option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label} - {formatPrice(option.price, currency)}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>
    </section>
  );
}

function OriginalOrderSummary({ currency, totals }: { currency: string; totals: MockCartTotals }) {
  return (
    <aside className="cart-original__summary" aria-labelledby="original-order-summary-title">
      <h2 id="original-order-summary-title">Order Summary</h2>
      <PromoControl idPrefix="original" />
      <div className="cart-original__summary-rows">
        <SummaryRow label="Merchandise Total" amount={totals.merchandise} currency={currency} />
        <SummaryRow label="Estimated Tax" amount={totals.tax} currency={currency} />
        <SummaryRow label="Tip" amount={totals.tip} currency={currency} />
      </div>
      <div className="cart-original__summary-total">
        <span>Order Total</span>
        <strong>{formatPrice(totals.grandTotal, currency)}</strong>
      </div>
      <div className="cart-original__buttons">
        <Link href={flowersHref} className="cart-original__keep-shopping">
          Keep Shopping
        </Link>
        <Link href={checkoutHref} className="cart-original__checkout">
          Continue to Checkout
        </Link>
      </div>
      <div className="cart-original__paypal" aria-label="PayPal checkout option">
        <span className="cart-original__paypal-mark">PayPal</span>
        <span>Checkout available after reviewing delivery details.</span>
      </div>
    </aside>
  );
}

function OriginalCartItem({
  customTipError,
  customTipInput,
  item,
  onCustomTipApply,
  onCustomTipInputChange,
  onTipChange,
  onVariantChange,
  selectedTipId
}: {
  customTipError: string;
  customTipInput: string;
  item: MockCartItem;
  onCustomTipApply: () => void;
  onCustomTipInputChange: (value: string) => void;
  onTipChange: TipSelectionChangeHandler;
  onVariantChange: VariantSelectionChangeHandler;
  selectedTipId: string;
}) {
  const selectedVariant = getSelectedVariant(item, item.selectedVariantId);

  return (
    <article className="cart-original__item">
      <div className="cart-original__title-bar">
        <h2>Item Details</h2>
        <span>Item Price</span>
      </div>

      <div className="cart-original__item-body">
        <Link href={item.href} className="cart-original__image-link" aria-label={`View ${item.name}`}>
          <Image src={item.image} alt={item.imageAlt} className="cart-original__image" width={180} height={180} priority />
        </Link>

        <div className="cart-original__details">
          <div className="cart-original__product-head">
            <div>
              <h3>
                <Link href={item.href}>{item.name}</Link>
              </h3>
              <p>Item #{item.sku}</p>
            </div>
            <strong>{formatPrice(item.unitPrice, item.currency)}</strong>
          </div>

          <dl className="cart-original__meta">
            <div>
              <dt>Variant</dt>
              <dd>{selectedVariant?.label ?? "Selected"}</dd>
            </div>
            <div>
              <dt>Quantity</dt>
              <dd>{item.quantity}</dd>
            </div>
            <div>
              <dt>Recipient ZIP</dt>
              <dd>{item.delivery.zip}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>{item.delivery.date}</dd>
            </div>
          </dl>

          <VariantOptions
            currency={item.currency}
            idPrefix={`original-${item.id}`}
            itemId={item.id}
            onVariantChange={onVariantChange}
            options={item.variants}
            selectedVariantId={item.selectedVariantId}
            variant="original"
          />

          <OriginalAddOns addOns={item.addOns} currency={item.currency} />
          <TipSelector
            currency={item.currency}
            customTipError={customTipError}
            customTipInput={customTipInput}
            idPrefix="original"
            onCustomTipApply={onCustomTipApply}
            onCustomTipInputChange={onCustomTipInputChange}
            onTipChange={onTipChange}
            options={mockTipOptions}
            selectedTipId={selectedTipId}
            variant="original"
          />
        </div>
      </div>
    </article>
  );
}

function OriginalCartPage({
  customTipError,
  customTipInput,
  items,
  onCustomTipApply,
  onCustomTipInputChange,
  onTipChange,
  onVariantChange,
  selectedTipId,
  totals
}: {
  customTipError: string;
  customTipInput: string;
  items: MockCartItem[];
  onCustomTipApply: () => void;
  onCustomTipInputChange: (value: string) => void;
  onTipChange: TipSelectionChangeHandler;
  onVariantChange: VariantSelectionChangeHandler;
  selectedTipId: string;
  totals: MockCartTotals;
}) {
  const currency = items[0]?.currency ?? "USD";

  if (!items.length) {
    return <CartEmpty variant="original" />;
  }

  return (
    <section className="cart-original" aria-labelledby="original-cart-title">
      <div className="cart-original__heading">
        <h1 id="original-cart-title">Shopping Cart</h1>
      </div>

      <div className="cart-original__layout">
        <div className="cart-original__items">
          {items.map((item) => (
            <OriginalCartItem
              key={item.id}
              customTipError={customTipError}
              customTipInput={customTipInput}
              item={item}
              onCustomTipApply={onCustomTipApply}
              onCustomTipInputChange={onCustomTipInputChange}
              onTipChange={onTipChange}
              onVariantChange={onVariantChange}
              selectedTipId={selectedTipId}
            />
          ))}
        </div>
        <OriginalOrderSummary currency={currency} totals={totals} />
      </div>
    </section>
  );
}

function ModernQuantityControl({ idPrefix, quantity }: { idPrefix: string; quantity: number }) {
  return (
    <div className="cart-modern__quantity">
      <label htmlFor={`${idPrefix}-quantity`}>Qty</label>
      <input id={`${idPrefix}-quantity`} name={`${idPrefix}-quantity`} type="number" min="1" defaultValue={quantity} />
    </div>
  );
}

function ModernAddOns({
  addOns,
  currency,
  itemId,
  onAddOnChange,
  selectedAddOns
}: {
  addOns: MockCartAddOn[];
  currency: string;
  itemId: string;
  onAddOnChange: AddOnSelectionChangeHandler;
  selectedAddOns: Record<string, string>;
}) {
  return (
    <section className="cart-modern-card cart-modern-addons" aria-labelledby="modern-addons-title">
      <div className="cart-modern-card__header">
        <h2 id="modern-addons-title">ADD SOMETHING EXTRA</h2>
      </div>
      <div className="cart-modern-addons__grid">
        {addOns.map((addOn) => {
          const options = getAddOnOptions(addOn);
          const selectId = `modern-${itemId}-${addOn.id}`;

          return (
            <label key={addOn.id} className="cart-modern-addons__field" htmlFor={selectId}>
              <span className="cart-modern-addons__label">{addOn.label}</span>
              <select
                id={selectId}
                className="cart-modern-addons__select"
                name={`modern-${addOn.id}`}
                value={selectedAddOns[addOn.id] ?? ""}
                onChange={(event) => onAddOnChange(itemId, addOn.id, event.target.value)}
              >
                <option value="">{addOn.placeholder ?? "Select Option"}</option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label} - {formatPrice(option.price, currency)}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>
    </section>
  );
}

function ModernPromoCard() {
  return (
    <section className="cart-modern-card" aria-labelledby="modern-promo-title">
      <div className="cart-modern-card__header">
        <h2 id="modern-promo-title">Promo Code</h2>
        <p>Apply an offer before checkout.</p>
      </div>
      <PromoControl idPrefix="modern" variant="modern" />
    </section>
  );
}

function ModernTipCard({
  currency,
  customTipError,
  customTipInput,
  onCustomTipApply,
  onCustomTipInputChange,
  onTipChange,
  selectedTipId
}: {
  currency: string;
  customTipError: string;
  customTipInput: string;
  onCustomTipApply: () => void;
  onCustomTipInputChange: (value: string) => void;
  onTipChange: TipSelectionChangeHandler;
  selectedTipId: string;
}) {
  return (
    <section className="cart-modern-card cart-modern-tip" aria-labelledby="modern-tip-title">
      <div className="cart-modern-card__header">
        <h2 id="modern-tip-title">Add a Tip</h2>
        <p>Tips go to the delivery professional.</p>
      </div>
      <TipSelector
        currency={currency}
        customTipError={customTipError}
        customTipInput={customTipInput}
        idPrefix="modern"
        onCustomTipApply={onCustomTipApply}
        onCustomTipInputChange={onCustomTipInputChange}
        onTipChange={onTipChange}
        options={mockTipOptions}
        selectedTipId={selectedTipId}
        variant="modern"
      />
    </section>
  );
}

function ModernCartItem({
  item,
  onVariantChange
}: {
  item: MockCartItem;
  onVariantChange: VariantSelectionChangeHandler;
}) {
  const selectedVariant = getSelectedVariant(item, item.selectedVariantId);

  return (
    <article className="cart-modern-card cart-modern__item">
      <Link href={item.href} className="cart-modern__image-link" aria-label={`View ${item.name}`}>
        <Image src={item.image} alt={item.imageAlt} className="cart-modern__image" width={188} height={188} priority />
      </Link>

      <div className="cart-modern__content">
        <div className="cart-modern__item-topline">
          <span>{selectedVariant?.label ?? "Selected"}</span>
          <span>Item #{item.sku}</span>
        </div>
        <div className="cart-modern__name-row">
          <h2>
            <Link href={item.href}>{item.name}</Link>
          </h2>
          <strong>{formatPrice(item.unitPrice, item.currency)}</strong>
        </div>
        <p>{item.delivery.method}</p>

        <div className="cart-modern__controls">
          <ModernQuantityControl idPrefix="modern-pretty-daydream" quantity={item.quantity} />
          <Link href={item.href}>Edit delivery</Link>
          <button type="button">Remove</button>
        </div>

        <VariantOptions
          currency={item.currency}
          idPrefix={`modern-${item.id}`}
          itemId={item.id}
          onVariantChange={onVariantChange}
          options={item.variants}
          selectedVariantId={item.selectedVariantId}
          variant="modern"
        />
      </div>
    </article>
  );
}

function ModernOrderSummary({
  currency,
  itemCount,
  totals
}: {
  currency: string;
  itemCount: number;
  totals: MockCartTotals;
}) {
  return (
    <aside className="cart-modern-summary" aria-labelledby="modern-order-summary-title">
      <div className="cart-modern-summary__header">
        <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
        <h2 id="modern-order-summary-title">Order Summary</h2>
      </div>
      <div className="cart-modern-summary__rows">
        <SummaryRow label="Merchandise" amount={totals.merchandise} currency={currency} />
        <SummaryRow label="Tax" amount={totals.tax} currency={currency} />
        <SummaryRow label="Tip" amount={totals.tip} currency={currency} />
      </div>
      <div className="cart-modern-summary__total">
        <span>Estimated Total</span>
        <strong>{formatPrice(totals.grandTotal, currency)}</strong>
      </div>
      <Link href={checkoutHref} className="cart-modern-summary__checkout">
        Continue to Checkout
      </Link>
      <p>Delivery availability is confirmed before payment.</p>
    </aside>
  );
}

function ModernCartPage({
  customTipError,
  customTipInput,
  items,
  onAddOnChange,
  onCustomTipApply,
  onCustomTipInputChange,
  onTipChange,
  onVariantChange,
  selectedAddOns,
  selectedTipId,
  totals
}: {
  customTipError: string;
  customTipInput: string;
  items: MockCartItem[];
  onAddOnChange: AddOnSelectionChangeHandler;
  onCustomTipApply: () => void;
  onCustomTipInputChange: (value: string) => void;
  onTipChange: TipSelectionChangeHandler;
  onVariantChange: VariantSelectionChangeHandler;
  selectedAddOns: SelectedCartAddOns;
  selectedTipId: string;
  totals: MockCartTotals;
}) {
  const currency = items[0]?.currency ?? "USD";
  const itemCount = getItemCount(items);
  const primaryItem = items[0];

  if (!items.length) {
    return <CartEmpty variant="modern" />;
  }

  return (
    <section className="cart-modern" aria-labelledby="modern-cart-title">
      <div className="cart-modern__hero">
        <div>
          <p className="cart-page__eyebrow">Shopping Cart</p>
          <h1 id="modern-cart-title">Review Your Cart</h1>
          <p>Premium flowers, optional extras, and checkout details in one place.</p>
        </div>
        <Link href={flowersHref} className="cart-modern__continue">
          Keep Shopping
        </Link>
      </div>

      <div className="cart-modern__layout">
        <div className="cart-modern__main">
          <div className="cart-modern__steps" aria-label="Checkout progress">
            <span className="cart-modern__step cart-modern__step--active">Cart</span>
            <span className="cart-modern__step">Delivery</span>
            <span className="cart-modern__step">Payment</span>
          </div>

          {items.map((item) => (
            <ModernCartItem key={item.id} item={item} onVariantChange={onVariantChange} />
          ))}
          <ModernAddOns
            addOns={primaryItem.addOns}
            currency={currency}
            itemId={primaryItem.id}
            onAddOnChange={onAddOnChange}
            selectedAddOns={selectedAddOns[primaryItem.id] ?? {}}
          />
          <ModernPromoCard />
          <ModernTipCard
            currency={currency}
            customTipError={customTipError}
            customTipInput={customTipInput}
            onCustomTipApply={onCustomTipApply}
            onCustomTipInputChange={onCustomTipInputChange}
            onTipChange={onTipChange}
            selectedTipId={selectedTipId}
          />
        </div>

        <ModernOrderSummary currency={currency} itemCount={itemCount} totals={totals} />
      </div>
    </section>
  );
}

function CartEmpty({ variant }: { variant: CartVariant }) {
  return (
    <section className={`cart-empty cart-empty--${variant}`}>
      <EmptyState
        title="Your cart is empty"
        description="Start with fresh flowers, plants, or keepsake gifts and your selections will appear here."
        action={<Button href={flowersHref}>Shop Flowers</Button>}
      />
    </section>
  );
}

export function CartPage({ state, variant }: CartPageProps) {
  const baseItems = useMemo(() => getMockCartItems(state), [state]);
  const [customTipAmount, setCustomTipAmount] = useState(0);
  const [customTipError, setCustomTipError] = useState("");
  const [customTipInput, setCustomTipInput] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedCartAddOns>({});
  const [selectedTipId, setSelectedTipId] = useState("none");
  const [selectedVariants, setSelectedVariants] = useState<SelectedCartVariants>({});
  const items = useMemo(
    () => getCartItemsWithSelectedOptions(baseItems, selectedVariants, selectedAddOns),
    [baseItems, selectedAddOns, selectedVariants]
  );
  const cartCurrency = items[0]?.currency ?? "USD";
  const selectedTipOption = mockTipOptions.find((option) => option.id === selectedTipId);
  const selectedTipAmount = selectedTipId === "other" ? customTipAmount : selectedTipOption?.amount ?? 0;
  const totals = useMemo(() => getMockCartTotals(items, selectedTipAmount), [items, selectedTipAmount]);

  function handleVariantChange(itemId: string, variantId: string) {
    setSelectedVariants((currentSelections) => {
      if (currentSelections[itemId] === variantId) {
        return currentSelections;
      }

      return {
        ...currentSelections,
        [itemId]: variantId
      };
    });
  }

  function handleAddOnChange(itemId: string, addOnId: string, optionId: string) {
    setSelectedAddOns((currentSelections) => {
      const currentItemSelections = currentSelections[itemId] ?? {};
      const nextItemSelections = { ...currentItemSelections };

      if (optionId) {
        nextItemSelections[addOnId] = optionId;
      } else {
        delete nextItemSelections[addOnId];
      }

      if (!Object.keys(nextItemSelections).length) {
        const remainingSelections = { ...currentSelections };
        delete remainingSelections[itemId];
        return remainingSelections;
      }

      return {
        ...currentSelections,
        [itemId]: nextItemSelections
      };
    });
  }

  function handleTipChange(option: MockCartTipOption) {
    setSelectedTipId(option.id);
    setCustomTipError("");

    if (option.id !== "other") {
      setCustomTipInput("");
      setCustomTipAmount(0);
    }
  }

  function handleCustomTipInputChange(value: string) {
    const [wholePart = "", ...decimalParts] = value.replace(/[^\d.]/g, "").split(".");
    const sanitizedValue = decimalParts.length
      ? `${wholePart}.${decimalParts.join("").slice(0, 2)}`
      : wholePart;

    setCustomTipInput(sanitizedValue);
    setCustomTipError("");
  }

  function handleCustomTipApply() {
    const parsedAmount = Number.parseFloat(customTipInput);

    if (!customTipInput || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setCustomTipError("Enter a valid tip amount.");
      return;
    }

    if (parsedAmount > customTipMaxAmount) {
      setCustomTipError(`Enter ${formatPrice(customTipMaxAmount, cartCurrency)} or less.`);
      return;
    }

    setCustomTipAmount(Math.round(parsedAmount * 100) / 100);
    setCustomTipError("");
  }

  return (
    <div className={`cart-page cart-page--${variant}`}>
      <Container className="cart-page__container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shopping Cart" }
          ]}
        />
        <CartSwitcher state={state} variant={variant} />
        {variant === "modern" ? (
          <ModernCartPage
            customTipError={customTipError}
            customTipInput={customTipInput}
            items={items}
            onAddOnChange={handleAddOnChange}
            onCustomTipApply={handleCustomTipApply}
            onCustomTipInputChange={handleCustomTipInputChange}
            onTipChange={handleTipChange}
            onVariantChange={handleVariantChange}
            selectedAddOns={selectedAddOns}
            selectedTipId={selectedTipId}
            totals={totals}
          />
        ) : (
          <OriginalCartPage
            customTipError={customTipError}
            customTipInput={customTipInput}
            items={items}
            onCustomTipApply={handleCustomTipApply}
            onCustomTipInputChange={handleCustomTipInputChange}
            onTipChange={handleTipChange}
            onVariantChange={handleVariantChange}
            selectedTipId={selectedTipId}
            totals={totals}
          />
        )}
      </Container>
    </div>
  );
}
