import { getMockCartItems, getMockCartTotals, type MockCartItem } from "@/lib/cart/mock-cart";

export type CheckoutVariant = "original" | "modern";
export type CheckoutMockState = "filled" | "empty";

export type CheckoutDeliveryDateOption = {
  description: string;
  id: string;
  label: string;
  value: string;
};

export type CheckoutOccasionOption = {
  label: string;
  value: string;
};

export type CheckoutDeliveryInfo = {
  address1: string;
  address2: string;
  cardMessage: string;
  city: string;
  deliveryDate: string;
  locationType: string;
  occasion: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientPhone: string;
  signature: string;
  specialInstructions: string;
  state: string;
  zip: string;
};

export type CheckoutTotals = {
  delivery: number;
  grandTotal: number;
  merchandise: number;
  service: number;
  tax: number;
  tip: number;
};

export type CheckoutSnapshot = {
  currency: string;
  deliveryDates: CheckoutDeliveryDateOption[];
  info: CheckoutDeliveryInfo;
  items: MockCartItem[];
  messageSuggestions: string[];
  occasions: CheckoutOccasionOption[];
  totals: CheckoutTotals;
};

export const checkoutUiConfig = {
  defaultVariant: "modern",
  submitAction: "/checkout/billing_review.jsp"
} as const satisfies {
  defaultVariant: CheckoutVariant;
  submitAction: string;
};

export const checkoutDeliveryDateOptions: CheckoutDeliveryDateOption[] = [
  {
    id: "soonest",
    label: "Tuesday, May 12",
    value: "2026-05-12",
    description: "Soonest available hand delivery"
  },
  {
    id: "preferred",
    label: "Wednesday, May 13",
    value: "2026-05-13",
    description: "Recommended for the selected ZIP code"
  },
  {
    id: "weekend",
    label: "Saturday, May 16",
    value: "2026-05-16",
    description: "Weekend delivery, subject to florist availability"
  }
];

export const checkoutOccasionOptions: CheckoutOccasionOption[] = [
  { label: "Birthday", value: "birthday" },
  { label: "Mother's Day", value: "mothers-day" },
  { label: "Thank You", value: "thank-you" },
  { label: "Get Well", value: "get-well" },
  { label: "Sympathy", value: "sympathy" },
  { label: "Just Because", value: "just-because" }
];

export const checkoutMessageSuggestions = [
  "Wishing you a day filled with love and bright moments.",
  "Thinking of you and sending a little sunshine your way.",
  "Thank you for everything you do. You are appreciated."
];

export const mockCheckoutDeliveryInfo: CheckoutDeliveryInfo = {
  address1: "11444 W Olympic Blvd",
  address2: "4th Floor",
  cardMessage: "Happy Mother's Day. Thank you for everything you do.",
  city: "Los Angeles",
  deliveryDate: checkoutDeliveryDateOptions[1].value,
  locationType: "Residence",
  occasion: "mothers-day",
  recipientFirstName: "Morgan",
  recipientLastName: "Patel",
  recipientPhone: "3105550147",
  signature: "V.",
  specialInstructions: "Please call before delivery if nobody answers the door.",
  state: "CA",
  zip: "90064"
};

export function getCheckoutSnapshot(state: CheckoutMockState): CheckoutSnapshot {
  const items = getMockCartItems(state);
  const cartTotals = getMockCartTotals(items);
  const delivery = items.length ? 17.99 : 0;
  const service = items.length ? 4.99 : 0;
  const currency = items[0]?.currency ?? "USD";
  const primaryDelivery = items[0]?.delivery;

  return {
    currency,
    deliveryDates: checkoutDeliveryDateOptions,
    info: {
      ...mockCheckoutDeliveryInfo,
      cardMessage: items[0]?.message ?? mockCheckoutDeliveryInfo.cardMessage,
      zip: primaryDelivery?.zip ?? mockCheckoutDeliveryInfo.zip
    },
    items,
    messageSuggestions: checkoutMessageSuggestions,
    occasions: checkoutOccasionOptions,
    totals: {
      delivery,
      grandTotal: cartTotals.grandTotal + delivery + service,
      merchandise: cartTotals.merchandise,
      service,
      tax: cartTotals.tax,
      tip: cartTotals.tip
    }
  };
}
