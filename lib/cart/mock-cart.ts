export type MockCartVariantOption = {
  description: string;
  id: string;
  label: string;
  price: number;
  sku: string;
};

export type MockCartAddOn = {
  description: string;
  id: string;
  label: string;
  options?: MockCartAddOnOption[];
  placeholder?: string;
  price?: number;
};

export type MockCartAddOnOption = {
  id: string;
  label: string;
  price: number;
};

export type MockCartTipOption = {
  amount?: number;
  id: string;
  label: string;
};

export type MockCartDelivery = {
  date: string;
  method: string;
  recipient: string;
  zip: string;
};

export type MockCartItem = {
  addOns: MockCartAddOn[];
  currency: string;
  delivery: MockCartDelivery;
  href: string;
  id: string;
  image: string;
  imageAlt: string;
  message: string;
  name: string;
  quantity: number;
  selectedVariantId: string;
  selectedAddOns?: MockCartSelectedAddOn[];
  sku: string;
  unitPrice: number;
  variants: MockCartVariantOption[];
};

export type MockCartSelectedAddOn = {
  addOnId: string;
  label: string;
  optionId: string;
  optionLabel: string;
  price: number;
};

export type MockCartTotals = {
  grandTotal: number;
  merchandise: number;
  tax: number;
  tip: number;
};

export const mockPromoCode = "EMBCWS21B";

export const mockTipOptions: MockCartTipOption[] = [
  { id: "none", label: "No Tip", amount: 0 },
  { id: "tip-10", label: "10%", amount: 8.5 },
  { id: "tip-15", label: "15%", amount: 12.75 },
  { id: "other", label: "Other Amount" }
];

export const mockCartItems: MockCartItem[] = [
  {
    id: "cart-pretty-daydream",
    name: "Teleflora's Pretty Daydream Bouquet",
    href: "/product/telefloras-pretty-daydream-bouquet",
    image: "/images/products/pretty-daydream.svg",
    imageAlt: "Teleflora's Pretty Daydream Bouquet in a purple vase",
    sku: "T26M100C",
    selectedVariantId: "premium",
    quantity: 1,
    unitPrice: 84.99,
    currency: "USD",
    delivery: {
      date: "Friday, May 8",
      method: "Hand delivered by a local florist",
      recipient: "Mother's Day recipient",
      zip: "90064"
    },
    variants: [
      {
        id: "standard",
        label: "Standard",
        description: "Full and Lush",
        price: 64.99,
        sku: "T26M100A"
      },
      {
        id: "deluxe",
        label: "Deluxe",
        description: "Opulent floral display",
        price: 74.99,
        sku: "T26M100B"
      },
      {
        id: "premium",
        label: "Premium",
        description: "Luxurious and Majestic",
        price: 84.99,
        sku: "T26M100C"
      }
    ],
    addOns: [
      {
        id: "birthday-card",
        label: "Birthday Card",
        description: "Add a handwritten card with your message.",
        placeholder: "Select Quantity",
        price: 8.99,
        options: [
          {
            id: "handwritten",
            label: "Handwritten",
            price: 8.99
          }
        ]
      },
      {
        id: "mylar-balloons",
        label: "Mylar Balloons",
        description: "Add festive balloons to the delivery.",
        placeholder: "Select Quantity",
        price: 5.99,
        options: [
          {
            id: "MYLAR1",
            label: "1 Balloon",
            price: 5.99
          },
          {
            id: "MYLAR2",
            label: "2 Balloons",
            price: 10.99
          },
          {
            id: "MYLAR3",
            label: "3 Balloons",
            price: 15.99
          }
        ]
      },
      {
        id: "chocolates",
        label: "Chocolates",
        description: "Pair the bouquet with a classic chocolate gift.",
        placeholder: "Select Size",
        price: 9.99,
        options: [
          {
            id: "CHOC1",
            label: "Small Box",
            price: 9.99
          },
          {
            id: "CHOC2",
            label: "Medium Box",
            price: 19.99
          },
          {
            id: "CHOC3",
            label: "Large Box",
            price: 29.99
          }
        ]
      }
    ],
    message: "Happy Mother's Day. Thank you for everything you do."
  }
];

export function getMockCartItems(state: "filled" | "empty") {
  return state === "empty" ? [] : mockCartItems;
}

export function getMockCartTotals(items: MockCartItem[], tipAmount = 0): MockCartTotals {
  const merchandise = items.reduce((total, item) => {
    const addOnTotal = item.selectedAddOns?.reduce((addOnSum, addOn) => addOnSum + addOn.price, 0) ?? 0;
    return total + (item.unitPrice + addOnTotal) * item.quantity;
  }, 0);
  const tax = items.length ? 9.58 : 0;
  const tip = Number.isFinite(tipAmount) && tipAmount > 0 ? tipAmount : 0;
  const grandTotal = merchandise + tax + tip;

  return {
    grandTotal,
    merchandise,
    tax,
    tip
  };
}
