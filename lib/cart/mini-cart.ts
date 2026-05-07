export const MINI_CART_OPEN_EVENT = "teleflora:mini-cart-open";
export const MINI_CART_UPDATED_EVENT = "teleflora:mini-cart-updated";

export type MiniCartItem = {
  currency: string;
  deliveryDate?: string;
  href?: string;
  id: string;
  image?: string;
  imageAlt?: string;
  name: string;
  quantity: number;
  recipientZip?: string;
  unitPrice: number;
  variantLabel?: string;
};

const miniCartStorageKey = "teleflora-mini-cart";

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeCartItem(item: Partial<MiniCartItem>): MiniCartItem | null {
  if (!item.id || !item.name || typeof item.unitPrice !== "number" || !Number.isFinite(item.unitPrice)) {
    return null;
  }

  return {
    currency: item.currency ?? "USD",
    deliveryDate: item.deliveryDate,
    href: item.href,
    id: item.id,
    image: item.image,
    imageAlt: item.imageAlt,
    name: item.name,
    quantity: Math.max(1, Math.floor(item.quantity ?? 1)),
    recipientZip: item.recipientZip,
    unitPrice: item.unitPrice,
    variantLabel: item.variantLabel
  };
}

export function readMiniCartItems(): MiniCartItem[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(miniCartStorageKey);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.flatMap((item) => {
      const normalizedItem = normalizeCartItem(item);
      return normalizedItem ? [normalizedItem] : [];
    });
  } catch {
    return [];
  }
}

export function writeMiniCartItems(items: MiniCartItem[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(miniCartStorageKey, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(MINI_CART_UPDATED_EVENT, { detail: { items } }));
}

export function addMiniCartItem(item: MiniCartItem) {
  const items = readMiniCartItems();
  const existingItem = items.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    items.push(item);
  }

  writeMiniCartItems(items);
  return items;
}

export function getMiniCartSubtotal(items: MiniCartItem[]) {
  return items.reduce((subtotal, item) => subtotal + item.unitPrice * item.quantity, 0);
}
