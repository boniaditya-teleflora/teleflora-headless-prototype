"use client";

import Image from "next/image";
import { type ReactNode, type RefObject, useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { getCategoryHref } from "@/lib/config/category-routes";
import {
  getMiniCartSubtotal,
  MINI_CART_OPEN_EVENT,
  MINI_CART_UPDATED_EVENT,
  readMiniCartItems,
  type MiniCartItem
} from "@/lib/cart/mini-cart";
import { formatPrice } from "@/lib/utils";

type HeaderActionPanelType = "login" | "cart";

type HeaderActionPanelShellProps = {
  children: ReactNode;
  description: string;
  isClosing: boolean;
  onClose: () => void;
  panelRef: RefObject<HTMLElement | null>;
  panelType: HeaderActionPanelType;
  title: string;
};

const closeAnimationMs = 180;
const headerActionPanelIdPrefix = "header-action-panel";
const headerActionTriggerSelector = "[data-header-action]";
const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true" && element.offsetParent !== null
  );
}

function HeaderActionPanelShell({ children, description, isClosing, onClose, panelRef, panelType, title }: HeaderActionPanelShellProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelId = `${headerActionPanelIdPrefix}-${panelType}`;

  return (
    <div className={`header-action-panel-root header-action-panel-root--${panelType}${isClosing ? " header-action-panel-root--closing" : ""}`}>
      <button type="button" className="header-action-panel__backdrop" aria-label="Close" onClick={onClose} />
      <section
        id={panelId}
        ref={panelRef}
        className={`header-action-panel header-action-panel--${panelType}`}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
      >
        <div className="header-action-panel__surface">
          <div className="header-action-panel__header">
            <div>
              <h2 id={titleId}>{title}</h2>
              <p id={descriptionId}>{description}</p>
            </div>
            <button type="button" className="header-action-panel__close" aria-label="Close" onClick={onClose}>
              Close
            </button>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}

function LoginPanelContent() {
  return (
    <form className="header-action-panel__form" onSubmit={(event) => event.preventDefault()}>
      <label className="header-action-panel__field">
        <span>Email or Username</span>
        <input data-panel-initial-focus type="text" name="username" autoComplete="username" />
      </label>
      <label className="header-action-panel__field">
        <span>Password</span>
        <input type="password" name="password" autoComplete="current-password" />
      </label>
      <button type="submit" className="header-action-panel__primary">
        Login
      </button>
      <div className="header-action-panel__link-row">
        <a href="/account/forgot-password">Forgot Password?</a>
        <a href="/account/create">Create New Account</a>
      </div>
    </form>
  );
}

function CartPanelContent({ items, onClose }: { items: MiniCartItem[]; onClose: () => void }) {
  const hasItems = items.length > 0;
  const subtotalCurrency = items[0]?.currency ?? "USD";
  const subtotal = getMiniCartSubtotal(items);

  return (
    <div className="header-action-panel__cart">
      {hasItems ? (
        <>
          <ul className="header-action-panel__cart-items" aria-label="Cart items">
            {items.map((item) => (
              <li className="header-action-panel__cart-item" key={item.id}>
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.name}
                    className="header-action-panel__cart-image"
                    width={72}
                    height={72}
                    unoptimized
                  />
                ) : (
                  <div className="header-action-panel__cart-image header-action-panel__cart-image--empty" aria-hidden="true" />
                )}
                <div className="header-action-panel__cart-details">
                  {item.href ? (
                    <a href={item.href} className="header-action-panel__cart-name">
                      {item.name}
                    </a>
                  ) : (
                    <p className="header-action-panel__cart-name">{item.name}</p>
                  )}
                  {item.variantLabel ? <p className="header-action-panel__cart-meta">{item.variantLabel}</p> : null}
                  {item.recipientZip ? <p className="header-action-panel__cart-meta">Recipient ZIP: {item.recipientZip}</p> : null}
                  {item.deliveryDate ? <p className="header-action-panel__cart-meta">Delivery: {item.deliveryDate}</p> : null}
                  <p className="header-action-panel__cart-meta">Qty: {item.quantity}</p>
                </div>
                <p className="header-action-panel__cart-price">{formatPrice(item.unitPrice * item.quantity, item.currency)}</p>
              </li>
            ))}
          </ul>
          <div className="header-action-panel__subtotal">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal, subtotalCurrency)}</strong>
          </div>
        </>
      ) : (
        <div className="header-action-panel__cart-empty">
          <p className="header-action-panel__cart-message">Your cart is empty.</p>
          <p>Add an arrangement to see items and subtotal here.</p>
        </div>
      )}
      <div className="header-action-panel__actions">
        <button type="button" className="header-action-panel__secondary" data-panel-initial-focus={!hasItems ? "" : undefined} onClick={onClose}>
          Continue Shopping
        </button>
        {hasItems ? (
          <a href="/cart" className="header-action-panel__primary" data-panel-initial-focus>
            View Cart / Checkout
          </a>
        ) : (
          <a href={getCategoryHref("flowers")} className="header-action-panel__primary">
            Shop Flowers
          </a>
        )}
      </div>
    </div>
  );
}

export function HeaderActionPanels() {
  const [activePanel, setActivePanel] = useState<HeaderActionPanelType | null>(null);
  const [activeTrigger, setActiveTrigger] = useState<HTMLElement | null>(null);
  const [cartItems, setCartItems] = useState<MiniCartItem[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closePanel = useCallback(
    (options: { returnFocus?: boolean } = {}) => {
      if (!activePanel || isClosing) {
        return;
      }

      const triggerToFocus = activeTrigger;
      clearCloseTimer();
      setIsClosing(true);
      closeTimerRef.current = window.setTimeout(() => {
        setActivePanel(null);
        setActiveTrigger(null);
        setIsClosing(false);

        if (options.returnFocus) {
          triggerToFocus?.focus();
        }
      }, closeAnimationMs);
    },
    [activePanel, activeTrigger, clearCloseTimer, isClosing]
  );

  const openPanel = useCallback(
    (panelType: HeaderActionPanelType, trigger: HTMLElement | null = null) => {
      clearCloseTimer();
      setIsClosing(false);
      setActiveTrigger(trigger);

      if (panelType === "cart") {
        setCartItems(readMiniCartItems());
      }

      setActivePanel(panelType);
    },
    [clearCloseTimer]
  );

  const togglePanel = useCallback(
    (panelType: HeaderActionPanelType, trigger: HTMLElement) => {
      if (activePanel === panelType && !isClosing) {
        closePanel({ returnFocus: true });
        return;
      }

      openPanel(panelType, trigger);
    },
    [activePanel, closePanel, isClosing, openPanel]
  );

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const trigger = target.closest<HTMLElement>(headerActionTriggerSelector);
      const action = trigger?.dataset.headerAction;

      if (trigger && (action === "login" || action === "cart")) {
        event.preventDefault();
        togglePanel(action, trigger);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [togglePanel]);

  useEffect(() => {
    function handleCartUpdated() {
      setCartItems(readMiniCartItems());
    }

    function handleCartOpen(event: Event) {
      const trigger = event instanceof CustomEvent && event.detail?.trigger instanceof HTMLElement ? event.detail.trigger : null;

      setCartItems(readMiniCartItems());
      openPanel("cart", trigger);
    }

    window.addEventListener(MINI_CART_UPDATED_EVENT, handleCartUpdated);
    window.addEventListener(MINI_CART_OPEN_EVENT, handleCartOpen);

    return () => {
      window.removeEventListener(MINI_CART_UPDATED_EVENT, handleCartUpdated);
      window.removeEventListener(MINI_CART_OPEN_EVENT, handleCartOpen);
    };
  }, [openPanel]);

  useEffect(() => {
    if (!activePanel || isClosing) {
      return;
    }

    function handleDocumentKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel({ returnFocus: true });
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusableElements = getFocusableElements(panelRef.current);

      if (!focusableElements.length) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => document.removeEventListener("keydown", handleDocumentKeyDown);
  }, [activePanel, closePanel, isClosing]);

  useEffect(() => {
    const triggers = document.querySelectorAll<HTMLElement>(headerActionTriggerSelector);

    triggers.forEach((trigger) => {
      const action = trigger.dataset.headerAction;
      const panelId = action === "login" || action === "cart" ? `${headerActionPanelIdPrefix}-${action}` : "";

      if (panelId) {
        trigger.setAttribute("aria-controls", panelId);
      }

      trigger.setAttribute("aria-expanded", activePanel === action && !isClosing ? "true" : "false");
    });

    return () => {
      triggers.forEach((trigger) => {
        trigger.setAttribute("aria-expanded", "false");
      });
    };
  }, [activePanel, isClosing]);

  useEffect(() => {
    if (!activePanel || isClosing) {
      return;
    }

    document.body.classList.add("header-action-panel-lock");

    const focusFrame = window.requestAnimationFrame(() => {
      const initialFocus =
        panelRef.current?.querySelector<HTMLElement>("[data-panel-initial-focus]") ?? panelRef.current?.querySelector<HTMLElement>(focusableSelector);
      initialFocus?.focus();
    });

    return () => {
      document.body.classList.remove("header-action-panel-lock");
      window.cancelAnimationFrame(focusFrame);
    };
  }, [activePanel, isClosing]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
      document.body.classList.remove("header-action-panel-lock");
    };
  }, [clearCloseTimer]);

  if (!activePanel) {
    return null;
  }

  return createPortal(
    <HeaderActionPanelShell
      description={
        activePanel === "cart"
          ? "Review your cart options or keep browsing Teleflora arrangements."
          : "Access your account to manage orders, saved recipients, and delivery details."
      }
      isClosing={isClosing}
      onClose={() => closePanel({ returnFocus: true })}
      panelRef={panelRef}
      panelType={activePanel}
      title={activePanel === "cart" ? "Cart" : "Log In to Teleflora"}
    >
      {activePanel === "cart" ? <CartPanelContent items={cartItems} onClose={() => closePanel({ returnFocus: true })} /> : <LoginPanelContent />}
    </HeaderActionPanelShell>,
    document.body
  );
}
