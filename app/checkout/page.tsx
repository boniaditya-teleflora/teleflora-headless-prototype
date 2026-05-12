import type { Metadata } from "next";

import {
  CheckoutPage,
  type CheckoutMockState,
  type CheckoutVariant
} from "@/components/checkout/CheckoutPages";
import { checkoutUiConfig } from "@/lib/checkout/mock-checkout";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Checkout Delivery Information",
  description: "Enter recipient, delivery address, delivery date, and gift message details."
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getVariant(value: string | string[] | undefined): CheckoutVariant {
  const requestedVariant = firstParam(value);

  if (requestedVariant === "original" || requestedVariant === "modern") {
    return requestedVariant;
  }

  return checkoutUiConfig.defaultVariant;
}

function getState(value: string | string[] | undefined): CheckoutMockState {
  return firstParam(value) === "empty" ? "empty" : "filled";
}

export default async function CheckoutRoute({ searchParams }: PageProps) {
  const query = searchParams ? await searchParams : {};

  return <CheckoutPage state={getState(query.state)} variant={getVariant(query.variant)} />;
}
