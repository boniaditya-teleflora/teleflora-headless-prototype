"use client";

import Image from "next/image";
import { type ReactNode, type RefObject, useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type HeaderActionPanelType = "login" | "cart";

type CartProductSummary = {
  image?: string;
  imageAlt?: string;
  name?: string;
  price?: string;
};

type HeaderActionPanelShellProps = {
  children: ReactNode;
  description: string;
  isClosing: boolean;
  panelRef: RefObject<HTMLElement | null>;
  panelType: HeaderActionPanelType;
  title: string;
};

const closeAnimationMs = 160;
const headerActionPanelId = "header-action-panel";
const headerActionAnchorSelector = ".header-action-anchor";
const headerIconSelector = ".header-icon-link";
const mobilePanelTopCustomProperty = "--header-action-panel-mobile-top";

function readCartSummary(trigger: HTMLElement): CartProductSummary | null {
  const { productAlt, productImage, productName, productPrice } = trigger.dataset;

  if (!productAlt && !productImage && !productName && !productPrice) {
    return null;
  }

  return {
    ...(productImage ? { image: productImage } : {}),
    ...(productAlt ? { imageAlt: productAlt } : {}),
    ...(productName ? { name: productName } : {}),
    ...(productPrice ? { price: productPrice } : {})
  };
}

function HeaderActionPanelShell({ children, description, isClosing, panelRef, panelType, title }: HeaderActionPanelShellProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <section
      id={headerActionPanelId}
      ref={panelRef}
      className={`header-action-panel header-action-panel--${panelType}${isClosing ? " header-action-panel--closing" : ""}`}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="header-action-panel__inner">
        <div className="header-action-panel__surface">
          <div className="header-action-panel__header">
            <h2 id={titleId}>{title}</h2>
            <p id={descriptionId}>{description}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
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

function CartPanelContent({ onClose, summary }: { onClose: () => void; summary: CartProductSummary | null }) {
  return (
    <div className="header-action-panel__cart">
      <p className="header-action-panel__cart-message">Product added to cart</p>
      {summary ? (
        <div className="header-action-panel__cart-summary">
          {summary.image ? (
            <Image
              src={summary.image}
              alt={summary.imageAlt ?? summary.name ?? "Cart product"}
              className="header-action-panel__cart-image"
              width={72}
              height={72}
              unoptimized
            />
          ) : null}
          <div>
            {summary.name ? <p className="header-action-panel__cart-name">{summary.name}</p> : null}
            {summary.price ? <p className="header-action-panel__cart-price">{summary.price}</p> : null}
          </div>
        </div>
      ) : null}
      <div className="header-action-panel__actions">
        <button type="button" className="header-action-panel__secondary" data-panel-initial-focus onClick={onClose}>
          Continue Shopping
        </button>
        <a href="/cart" className="header-action-panel__primary">
          View Cart / Checkout
        </a>
      </div>
    </div>
  );
}

export function HeaderActionPanels() {
  const [activePanel, setActivePanel] = useState<HeaderActionPanelType | null>(null);
  const [activeAnchor, setActiveAnchor] = useState<HTMLElement | null>(null);
  const [activeTrigger, setActiveTrigger] = useState<HTMLElement | null>(null);
  const [cartSummary, setCartSummary] = useState<CartProductSummary | null>(null);
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
        setActiveAnchor(null);
        setActiveTrigger(null);
        setCartSummary(null);
        setIsClosing(false);

        if (options.returnFocus) {
          triggerToFocus?.focus();
        }
      }, closeAnimationMs);
    },
    [activePanel, activeTrigger, clearCloseTimer, isClosing]
  );

  const openPanel = useCallback(
    (panelType: HeaderActionPanelType, trigger: HTMLElement) => {
      const anchor = trigger.closest<HTMLElement>(headerActionAnchorSelector) ?? trigger.parentElement;
      const headerBottom = trigger.closest<HTMLElement>(".site-header")?.getBoundingClientRect().bottom ?? 0;

      document.documentElement.style.setProperty(mobilePanelTopCustomProperty, `${Math.max(0, headerBottom)}px`);
      clearCloseTimer();
      setIsClosing(false);
      setActiveAnchor(anchor);
      setActiveTrigger(trigger);
      setCartSummary(panelType === "cart" ? readCartSummary(trigger) : null);
      setActivePanel(panelType);
    },
    [clearCloseTimer]
  );

  const togglePanel = useCallback(
    (panelType: HeaderActionPanelType, trigger: HTMLElement) => {
      if (activePanel === panelType && activeTrigger === trigger && !isClosing) {
        closePanel({ returnFocus: true });
        return;
      }

      openPanel(panelType, trigger);
    },
    [activePanel, activeTrigger, closePanel, isClosing, openPanel]
  );

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const trigger = target.closest<HTMLElement>(headerIconSelector);

      if (trigger) {
        event.preventDefault();
        togglePanel(trigger.classList.contains("header-icon-link--cart") ? "cart" : "login", trigger);
        return;
      }

      if (activePanel && panelRef.current && !panelRef.current.contains(target)) {
        closePanel();
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [activePanel, closePanel, togglePanel]);

  useEffect(() => {
    function handleDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && activePanel) {
        event.preventDefault();
        closePanel({ returnFocus: true });
      }
    }

    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => document.removeEventListener("keydown", handleDocumentKeyDown);
  }, [activePanel, closePanel]);

  useEffect(() => {
    if (!activePanel || !activeTrigger) {
      return;
    }

    function updateMobilePanelTop() {
      const headerBottom = activeTrigger?.closest<HTMLElement>(".site-header")?.getBoundingClientRect().bottom ?? 0;
      document.documentElement.style.setProperty(mobilePanelTopCustomProperty, `${Math.max(0, headerBottom)}px`);
    }

    updateMobilePanelTop();
    window.addEventListener("resize", updateMobilePanelTop);
    window.addEventListener("scroll", updateMobilePanelTop, { passive: true });

    return () => {
      window.removeEventListener("resize", updateMobilePanelTop);
      window.removeEventListener("scroll", updateMobilePanelTop);
    };
  }, [activePanel, activeTrigger]);

  useEffect(() => {
    const triggers = document.querySelectorAll<HTMLElement>(headerIconSelector);

    triggers.forEach((trigger) => {
      trigger.setAttribute("aria-controls", headerActionPanelId);
      trigger.setAttribute("aria-expanded", activePanel && activeTrigger === trigger && !isClosing ? "true" : "false");
    });

    return () => {
      triggers.forEach((trigger) => {
        trigger.setAttribute("aria-expanded", "false");
      });
    };
  }, [activePanel, activeTrigger, isClosing]);

  useEffect(() => {
    if (!activePanel || isClosing) {
      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      const initialFocus =
        panelRef.current?.querySelector<HTMLElement>("[data-panel-initial-focus]") ?? panelRef.current?.querySelector<HTMLElement>("button, a, input");
      initialFocus?.focus();
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [activePanel, activeTrigger, isClosing]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  if (!activePanel || !activeAnchor) {
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
      panelRef={panelRef}
      panelType={activePanel}
      title={activePanel === "cart" ? "Added to Cart" : "Log In to Teleflora"}
    >
      {activePanel === "cart" ? <CartPanelContent onClose={() => closePanel({ returnFocus: true })} summary={cartSummary} /> : <LoginPanelContent />}
    </HeaderActionPanelShell>,
    activeAnchor
  );
}
