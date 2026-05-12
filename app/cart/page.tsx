import type { Metadata } from "next";

import { CartPage, type CartMockState, type CartVariant } from "@/components/cart/CartPages";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review mocked cart items, delivery information, promotions, and checkout summary."
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getVariant(value: string | string[] | undefined): CartVariant {
  return firstParam(value) === "modern" ? "modern" : "original";
}

function getState(value: string | string[] | undefined): CartMockState {
  return firstParam(value) === "empty" ? "empty" : "filled";
}

export default async function CartRoute({ searchParams }: PageProps) {
  const query = searchParams ? await searchParams : {};

  return <CartPage state={getState(query.state)} variant={getVariant(query.variant)} />;
}
