"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  checkoutUiConfig,
  getCheckoutSnapshot,
  type CheckoutDeliveryDateOption,
  type CheckoutDeliveryInfo,
  type CheckoutMockState,
  type CheckoutOccasionOption,
  type CheckoutTotals,
  type CheckoutVariant
} from "@/lib/checkout/mock-checkout";
import type { MockCartItem } from "@/lib/cart/mock-cart";
import { formatPrice } from "@/lib/utils";

export type { CheckoutMockState, CheckoutVariant };

type CheckoutPageProps = {
  state: CheckoutMockState;
  variant: CheckoutVariant;
};

type CheckoutFormValues = CheckoutDeliveryInfo;
type CheckoutFieldName = keyof CheckoutFormValues;
type CheckoutErrors = Partial<Record<CheckoutFieldName, string>>;
type CheckoutSubmitStatus = "idle" | "error" | "ready";

const cartHref = "/cart";
const fieldLabels: Record<CheckoutFieldName, string> = {
  address1: "Street address",
  address2: "Apartment, suite, or room",
  cardMessage: "Card message",
  city: "City",
  deliveryDate: "Delivery date",
  locationType: "Delivery location",
  occasion: "Occasion",
  recipientFirstName: "Recipient first name",
  recipientLastName: "Recipient last name",
  recipientPhone: "Recipient phone",
  signature: "Signature",
  specialInstructions: "Special delivery instructions",
  state: "State",
  zip: "Recipient ZIP code"
};

const requiredFields: CheckoutFieldName[] = [
  "recipientFirstName",
  "recipientLastName",
  "recipientPhone",
  "address1",
  "city",
  "state",
  "zip",
  "deliveryDate",
  "occasion",
  "cardMessage",
  "signature"
];

function getCheckoutHref(variant: CheckoutVariant, state: CheckoutMockState) {
  return `/checkout?variant=${variant}&state=${state}`;
}

function validateCheckoutForm(values: CheckoutFormValues) {
  const errors: CheckoutErrors = {};

  requiredFields.forEach((fieldName) => {
    if (!values[fieldName].trim()) {
      errors[fieldName] = `${fieldLabels[fieldName]} is required.`;
    }
  });

  if (values.zip.trim() && !/^\d{5}(-\d{4})?$/.test(values.zip.trim())) {
    errors.zip = "Enter a valid 5-digit ZIP code.";
  }

  const phoneDigits = values.recipientPhone.replace(/\D/g, "");
  if (values.recipientPhone.trim() && phoneDigits.length < 10) {
    errors.recipientPhone = "Enter a valid phone number.";
  }

  if (values.cardMessage.length > 180) {
    errors.cardMessage = "Keep the card message under 180 characters.";
  }

  return errors;
}

function CheckoutSwitcher({ state, variant }: CheckoutPageProps) {
  return (
    <nav className="checkout-switcher" aria-label="Checkout page variants">
      <span className="checkout-switcher__label">Checkout view</span>
      <Link
        href={getCheckoutHref("original", state)}
        className={`checkout-switcher__link${variant === "original" ? " checkout-switcher__link--active" : ""}`}
        aria-current={variant === "original" ? "page" : undefined}
      >
        Original
      </Link>
      <Link
        href={getCheckoutHref("modern", state)}
        className={`checkout-switcher__link${variant === "modern" ? " checkout-switcher__link--active" : ""}`}
        aria-current={variant === "modern" ? "page" : undefined}
      >
        Modern
      </Link>
    </nav>
  );
}

function CheckoutProgress({ variant }: { variant: CheckoutVariant }) {
  return (
    <ol className={`checkout-progress checkout-progress--${variant}`} aria-label="Checkout progress">
      <li className="is-complete">
        <span>1</span>
        <strong>Cart</strong>
      </li>
      <li className="is-active" aria-current="step">
        <span>2</span>
        <strong>Delivery</strong>
      </li>
      <li>
        <span>3</span>
        <strong>Payment</strong>
      </li>
      <li>
        <span>4</span>
        <strong>Review</strong>
      </li>
    </ol>
  );
}

function FieldShell({
  children,
  error,
  helper,
  id,
  label,
  required
}: {
  children: (props: { describedBy?: string; invalid: boolean }) => ReactNode;
  error?: string;
  helper?: string;
  id: string;
  label: string;
  required?: boolean;
}) {
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`checkout-field${error ? " checkout-field--error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </label>
      {children({ describedBy, invalid: Boolean(error) })}
      {helper ? (
        <small id={helperId} className="checkout-field__helper">
          {helper}
        </small>
      ) : null}
      {error ? (
        <p id={errorId} className="checkout-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ErrorSummary({ errors }: { errors: CheckoutErrors }) {
  const entries = Object.entries(errors) as [CheckoutFieldName, string][];

  if (!entries.length) {
    return null;
  }

  return (
    <div className="checkout-error-summary" role="alert" aria-labelledby="checkout-error-summary-title">
      <h2 id="checkout-error-summary-title">Please check these details</h2>
      <ul>
        {entries.map(([fieldName, message]) => (
          <li key={fieldName}>
            <a href={`#checkout-${fieldName}`}>{message}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecipientInformationForm({
  errors,
  onChange,
  values
}: {
  errors: CheckoutErrors;
  onChange: (fieldName: CheckoutFieldName, value: string) => void;
  values: CheckoutFormValues;
}) {
  return (
    <section className="checkout-form-section" aria-labelledby="recipient-info-title">
      <div className="checkout-form-section__header">
        <span>Recipient</span>
        <h2 id="recipient-info-title">Who is receiving this gift?</h2>
      </div>
      <div className="checkout-field-grid checkout-field-grid--two">
        <FieldShell id="checkout-recipientFirstName" label="First name" error={errors.recipientFirstName} required>
          {({ describedBy, invalid }) => (
            <input
              id="checkout-recipientFirstName"
              name="recipientFirstName"
              autoComplete="given-name"
              value={values.recipientFirstName}
              onChange={(event) => onChange("recipientFirstName", event.target.value)}
              required
              aria-invalid={invalid}
              aria-describedby={describedBy}
            />
          )}
        </FieldShell>
        <FieldShell id="checkout-recipientLastName" label="Last name" error={errors.recipientLastName} required>
          {({ describedBy, invalid }) => (
            <input
              id="checkout-recipientLastName"
              name="recipientLastName"
              autoComplete="family-name"
              value={values.recipientLastName}
              onChange={(event) => onChange("recipientLastName", event.target.value)}
              required
              aria-invalid={invalid}
              aria-describedby={describedBy}
            />
          )}
        </FieldShell>
      </div>
      <FieldShell
        id="checkout-recipientPhone"
        label="Phone number"
        helper="Used only if the florist needs help completing delivery."
        error={errors.recipientPhone}
        required
      >
        {({ describedBy, invalid }) => (
          <input
            id="checkout-recipientPhone"
            name="recipientPhone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.recipientPhone}
            onChange={(event) => onChange("recipientPhone", event.target.value)}
            required
            aria-invalid={invalid}
            aria-describedby={describedBy}
          />
        )}
      </FieldShell>
    </section>
  );
}

function DeliveryAddressForm({
  errors,
  onChange,
  values
}: {
  errors: CheckoutErrors;
  onChange: (fieldName: CheckoutFieldName, value: string) => void;
  values: CheckoutFormValues;
}) {
  return (
    <section className="checkout-form-section" aria-labelledby="delivery-address-title">
      <div className="checkout-form-section__header">
        <span>Address</span>
        <h2 id="delivery-address-title">Where should we deliver?</h2>
      </div>
      <FieldShell id="checkout-address1" label="Street address" error={errors.address1} required>
        {({ describedBy, invalid }) => (
          <input
            id="checkout-address1"
            name="address1"
            autoComplete="address-line1"
            value={values.address1}
            onChange={(event) => onChange("address1", event.target.value)}
            required
            aria-invalid={invalid}
            aria-describedby={describedBy}
          />
        )}
      </FieldShell>
      <FieldShell id="checkout-address2" label="Apt, suite, room, or company" error={errors.address2}>
        {({ describedBy, invalid }) => (
          <input
            id="checkout-address2"
            name="address2"
            autoComplete="address-line2"
            value={values.address2}
            onChange={(event) => onChange("address2", event.target.value)}
            aria-invalid={invalid}
            aria-describedby={describedBy}
          />
        )}
      </FieldShell>
      <div className="checkout-field-grid checkout-field-grid--city">
        <FieldShell id="checkout-city" label="City" error={errors.city} required>
          {({ describedBy, invalid }) => (
            <input
              id="checkout-city"
              name="city"
              autoComplete="address-level2"
              value={values.city}
              onChange={(event) => onChange("city", event.target.value)}
              required
              aria-invalid={invalid}
              aria-describedby={describedBy}
            />
          )}
        </FieldShell>
        <FieldShell id="checkout-state" label="State" error={errors.state} required>
          {({ describedBy, invalid }) => (
            <input
              id="checkout-state"
              name="state"
              autoComplete="address-level1"
              maxLength={2}
              value={values.state}
              onChange={(event) => onChange("state", event.target.value.toUpperCase())}
              required
              aria-invalid={invalid}
              aria-describedby={describedBy}
            />
          )}
        </FieldShell>
        <FieldShell id="checkout-zip" label="ZIP code" error={errors.zip} required>
          {({ describedBy, invalid }) => (
            <input
              id="checkout-zip"
              name="zip"
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={10}
              value={values.zip}
              onChange={(event) => onChange("zip", event.target.value)}
              required
              aria-invalid={invalid}
              aria-describedby={describedBy}
            />
          )}
        </FieldShell>
      </div>
      <FieldShell id="checkout-locationType" label="Delivery location" error={errors.locationType}>
        {({ describedBy, invalid }) => (
          <select
            id="checkout-locationType"
            name="locationType"
            value={values.locationType}
            onChange={(event) => onChange("locationType", event.target.value)}
            aria-invalid={invalid}
            aria-describedby={describedBy}
          >
            <option>Residence</option>
            <option>Business</option>
            <option>Hospital</option>
            <option>Funeral home</option>
            <option>School</option>
          </select>
        )}
      </FieldShell>
    </section>
  );
}

function DeliveryDateSelector({
  dates,
  errors,
  onChange,
  values,
  variant
}: {
  dates: CheckoutDeliveryDateOption[];
  errors: CheckoutErrors;
  onChange: (fieldName: CheckoutFieldName, value: string) => void;
  values: CheckoutFormValues;
  variant: CheckoutVariant;
}) {
  if (variant === "original") {
    return (
      <section className="checkout-form-section" aria-labelledby="delivery-date-title">
        <div className="checkout-form-section__header">
          <span>Date</span>
          <h2 id="delivery-date-title">Delivery Date</h2>
        </div>
        <FieldShell id="checkout-deliveryDate" label="Select delivery date" error={errors.deliveryDate} required>
          {({ describedBy, invalid }) => (
            <select
              id="checkout-deliveryDate"
              name="deliveryDate"
              value={values.deliveryDate}
              onChange={(event) => onChange("deliveryDate", event.target.value)}
              required
              aria-invalid={invalid}
              aria-describedby={describedBy}
            >
              <option value="">Select delivery date</option>
              {dates.map((dateOption) => (
                <option key={dateOption.id} value={dateOption.value}>
                  {dateOption.label}
                </option>
              ))}
            </select>
          )}
        </FieldShell>
      </section>
    );
  }

  return (
    <section className="checkout-form-section" aria-labelledby="delivery-date-title">
      <div className="checkout-form-section__header">
        <span>Date</span>
        <h2 id="delivery-date-title">Choose a delivery date</h2>
      </div>
      <fieldset className={`checkout-date-options${errors.deliveryDate ? " checkout-date-options--error" : ""}`}>
        <legend className="sr-only">Select delivery date</legend>
        {dates.map((dateOption) => (
          <label key={dateOption.id} className="checkout-date-option">
            <input
              name="deliveryDate"
              type="radio"
              value={dateOption.value}
              checked={values.deliveryDate === dateOption.value}
              onChange={(event) => onChange("deliveryDate", event.target.value)}
              required
            />
            <span>
              <strong>{dateOption.label}</strong>
              <small>{dateOption.description}</small>
            </span>
          </label>
        ))}
      </fieldset>
      {errors.deliveryDate ? (
        <p className="checkout-field__error" role="alert">
          {errors.deliveryDate}
        </p>
      ) : null}
    </section>
  );
}

function OccasionMessageFields({
  errors,
  messageSuggestions,
  occasions,
  onChange,
  values
}: {
  errors: CheckoutErrors;
  messageSuggestions: string[];
  occasions: CheckoutOccasionOption[];
  onChange: (fieldName: CheckoutFieldName, value: string) => void;
  values: CheckoutFormValues;
}) {
  return (
    <section className="checkout-form-section" aria-labelledby="gift-message-title">
      <div className="checkout-form-section__header">
        <span>Message</span>
        <h2 id="gift-message-title">Add the occasion and card message</h2>
      </div>
      <FieldShell id="checkout-occasion" label="Occasion" error={errors.occasion} required>
        {({ describedBy, invalid }) => (
          <select
            id="checkout-occasion"
            name="occasion"
            value={values.occasion}
            onChange={(event) => onChange("occasion", event.target.value)}
            required
            aria-invalid={invalid}
            aria-describedby={describedBy}
          >
            <option value="">Select occasion</option>
            {occasions.map((occasion) => (
              <option key={occasion.value} value={occasion.value}>
                {occasion.label}
              </option>
            ))}
          </select>
        )}
      </FieldShell>
      <FieldShell
        id="checkout-cardMessage"
        label="Card message"
        helper={`${values.cardMessage.length}/180 characters`}
        error={errors.cardMessage}
        required
      >
        {({ describedBy, invalid }) => (
          <textarea
            id="checkout-cardMessage"
            name="cardMessage"
            maxLength={180}
            rows={4}
            value={values.cardMessage}
            onChange={(event) => onChange("cardMessage", event.target.value)}
            required
            aria-invalid={invalid}
            aria-describedby={describedBy}
          />
        )}
      </FieldShell>
      <div className="checkout-message-suggestions" aria-label="Card message suggestions">
        {messageSuggestions.map((message) => (
          <button key={message} type="button" onClick={() => onChange("cardMessage", message)}>
            {message}
          </button>
        ))}
      </div>
      <FieldShell id="checkout-signature" label="Signature" error={errors.signature} required>
        {({ describedBy, invalid }) => (
          <input
            id="checkout-signature"
            name="signature"
            value={values.signature}
            onChange={(event) => onChange("signature", event.target.value)}
            required
            aria-invalid={invalid}
            aria-describedby={describedBy}
          />
        )}
      </FieldShell>
      <FieldShell
        id="checkout-specialInstructions"
        label="Special delivery instructions"
        helper="We cannot guarantee a specific time, but the florist will use this note when planning delivery."
        error={errors.specialInstructions}
      >
        {({ describedBy, invalid }) => (
          <textarea
            id="checkout-specialInstructions"
            name="specialInstructions"
            rows={3}
            value={values.specialInstructions}
            onChange={(event) => onChange("specialInstructions", event.target.value)}
            aria-invalid={invalid}
            aria-describedby={describedBy}
          />
        )}
      </FieldShell>
    </section>
  );
}

function SummaryRow({ amount, currency, label }: { amount: number; currency: string; label: string }) {
  return (
    <div className="checkout-summary-row">
      <span>{label}</span>
      <strong>{formatPrice(amount, currency)}</strong>
    </div>
  );
}

function SummaryRows({ currency, totals }: { currency: string; totals: CheckoutTotals }) {
  return (
    <div className="checkout-summary__rows">
      <SummaryRow label="Merchandise" amount={totals.merchandise} currency={currency} />
      <SummaryRow label="Delivery" amount={totals.delivery} currency={currency} />
      <SummaryRow label="Service" amount={totals.service} currency={currency} />
      <SummaryRow label="Tax" amount={totals.tax} currency={currency} />
      {totals.tip > 0 ? <SummaryRow label="Tip" amount={totals.tip} currency={currency} /> : null}
    </div>
  );
}

function OrderSummary({
  className,
  currency,
  items,
  selectedDate,
  summaryId,
  totals,
  variant
}: {
  className?: string;
  currency: string;
  items: MockCartItem[];
  selectedDate?: CheckoutDeliveryDateOption;
  summaryId: string;
  totals: CheckoutTotals;
  variant: CheckoutVariant;
}) {
  const primaryItem = items[0];
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <aside className={["checkout-summary", `checkout-summary--${variant}`, className].filter(Boolean).join(" ")} aria-labelledby={summaryId}>
      <div className="checkout-summary__header">
        <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
        <h2 id={summaryId}>Order Summary</h2>
      </div>
      {primaryItem ? (
        <article className="checkout-summary__item">
          <Image src={primaryItem.image} alt={primaryItem.imageAlt} width={72} height={72} />
          <div>
            <h3>{primaryItem.name}</h3>
            <p>Item #{primaryItem.sku}</p>
            <p>{selectedDate?.label ?? primaryItem.delivery.date}</p>
          </div>
          <strong>{formatPrice(primaryItem.unitPrice, currency)}</strong>
        </article>
      ) : null}
      <SummaryRows currency={currency} totals={totals} />
      <div className="checkout-summary__total">
        <span>Estimated Total</span>
        <strong>{formatPrice(totals.grandTotal, currency)}</strong>
      </div>
      <p className="checkout-summary__note">Delivery fees, taxes, and availability remain confirmed before payment.</p>
    </aside>
  );
}

function MobileSummaryDrawer({
  currency,
  items,
  selectedDate,
  totals,
  variant
}: {
  currency: string;
  items: MockCartItem[];
  selectedDate?: CheckoutDeliveryDateOption;
  totals: CheckoutTotals;
  variant: CheckoutVariant;
}) {
  return (
    <details className="checkout-mobile-summary">
      <summary>
        <span>Order summary</span>
        <strong>{formatPrice(totals.grandTotal, currency)}</strong>
      </summary>
      <OrderSummary
        currency={currency}
        items={items}
        selectedDate={selectedDate}
        summaryId={`${variant}-checkout-mobile-summary-title`}
        totals={totals}
        variant={variant}
      />
    </details>
  );
}

function CheckoutActions({ variant }: { variant: CheckoutVariant }) {
  return (
    <div className="checkout-actions">
      <Link href={`${cartHref}?variant=${variant}`} className="checkout-actions__secondary">
        Back to Cart
      </Link>
      <button type="submit" className="checkout-actions__primary">
        Continue to Payment
      </button>
    </div>
  );
}

function CheckoutForm({
  currency,
  dates,
  errors,
  formStatus,
  items,
  messageSuggestions,
  occasions,
  onChange,
  onSubmit,
  selectedDate,
  totals,
  values,
  variant
}: {
  currency: string;
  dates: CheckoutDeliveryDateOption[];
  errors: CheckoutErrors;
  formStatus: CheckoutSubmitStatus;
  items: MockCartItem[];
  messageSuggestions: string[];
  occasions: CheckoutOccasionOption[];
  onChange: (fieldName: CheckoutFieldName, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  selectedDate?: CheckoutDeliveryDateOption;
  totals: CheckoutTotals;
  values: CheckoutFormValues;
  variant: CheckoutVariant;
}) {
  const statusMessage =
    formStatus === "ready"
      ? "Delivery details saved. Continue to payment is ready."
      : formStatus === "error"
        ? "Please correct the highlighted fields before continuing."
        : "";

  return (
    <form
      className={`checkout-form checkout-form--${variant}`}
      action={checkoutUiConfig.submitAction}
      method="post"
      noValidate
      onSubmit={onSubmit}
    >
      <input type="hidden" name="_dyncharset" value="UTF-8" />
      <input type="hidden" name="checkoutStep" value="delivery" />
      <input type="hidden" name="checkoutUiVariant" value={variant} />

      <ErrorSummary errors={errors} />
      {statusMessage ? (
        <p className={`checkout-submit-status checkout-submit-status--${formStatus}`} role={formStatus === "error" ? "alert" : "status"} aria-live="polite">
          {statusMessage}
        </p>
      ) : null}

      <RecipientInformationForm errors={errors} onChange={onChange} values={values} />
      <DeliveryAddressForm errors={errors} onChange={onChange} values={values} />
      <DeliveryDateSelector dates={dates} errors={errors} onChange={onChange} values={values} variant={variant} />
      <OccasionMessageFields
        errors={errors}
        messageSuggestions={messageSuggestions}
        occasions={occasions}
        onChange={onChange}
        values={values}
      />
      <MobileSummaryDrawer currency={currency} items={items} selectedDate={selectedDate} totals={totals} variant={variant} />
      <CheckoutActions variant={variant} />
    </form>
  );
}

function CheckoutEmpty() {
  return (
    <section className="checkout-empty">
      <EmptyState
        title="Your cart is empty"
        description="Add a bouquet before entering delivery information."
        action={<Button href={cartHref}>Return to Cart</Button>}
      />
    </section>
  );
}

function CheckoutShell({ state, variant }: CheckoutPageProps) {
  const snapshot = useMemo(() => getCheckoutSnapshot(state), [state]);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [formStatus, setFormStatus] = useState<CheckoutSubmitStatus>("idle");
  const [values, setValues] = useState<CheckoutFormValues>(snapshot.info);
  const selectedDate = snapshot.deliveryDates.find((dateOption) => dateOption.value === values.deliveryDate);

  function handleChange(fieldName: CheckoutFieldName, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value
    }));
    setErrors((currentErrors) => {
      if (!currentErrors[fieldName]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[fieldName];
      return nextErrors;
    });
    setFormStatus("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCheckoutForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setFormStatus("error");
      return;
    }

    const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
    analyticsWindow.dataLayer?.push({
      checkoutStep: "delivery",
      checkoutVariant: variant,
      event: "checkout_delivery_continue",
      recipientZip: values.zip,
      selectedDeliveryDate: values.deliveryDate
    });
    setFormStatus("ready");
  }

  if (!snapshot.items.length) {
    return <CheckoutEmpty />;
  }

  return (
    <section className={`checkout-${variant}`} aria-labelledby={`${variant}-checkout-title`}>
      <div className={`checkout-${variant}__hero`}>
        <div>
          <p className="checkout-page__eyebrow">Checkout</p>
          <h1 id={`${variant}-checkout-title`}>Delivery Information</h1>
          <p>Confirm the recipient, delivery date, and card message before payment.</p>
        </div>
      </div>
      <CheckoutProgress variant={variant} />
      <div className={`checkout-${variant}__layout`}>
        <div className={`checkout-${variant}__main`}>
          <CheckoutForm
            currency={snapshot.currency}
            dates={snapshot.deliveryDates}
            errors={errors}
            formStatus={formStatus}
            items={snapshot.items}
            messageSuggestions={snapshot.messageSuggestions}
            occasions={snapshot.occasions}
            onChange={handleChange}
            onSubmit={handleSubmit}
            selectedDate={selectedDate}
            totals={snapshot.totals}
            values={values}
            variant={variant}
          />
        </div>
        <OrderSummary
          className="checkout-summary--desktop"
          currency={snapshot.currency}
          items={snapshot.items}
          selectedDate={selectedDate}
          summaryId={`${variant}-checkout-summary-title`}
          totals={snapshot.totals}
          variant={variant}
        />
      </div>
    </section>
  );
}

export function CheckoutPage({ state, variant }: CheckoutPageProps) {
  return (
    <div className={`checkout-page checkout-page--${variant}`}>
      <Container className="checkout-page__container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shopping Cart", href: cartHref },
            { label: "Delivery Information" }
          ]}
        />
        <CheckoutSwitcher state={state} variant={variant} />
        <CheckoutShell state={state} variant={variant} />
      </Container>
    </div>
  );
}
