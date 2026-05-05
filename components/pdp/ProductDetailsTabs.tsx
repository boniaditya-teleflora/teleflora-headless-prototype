"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

import type { MediaAsset, ProductVariant } from "@/lib/api/types";
import { formatPrice } from "@/lib/utils";

type ProductDetailsTabsProps = {
  productName: string;
  description?: string;
  orientation?: string;
  vase?: string;
  vaseImage?: MediaAsset;
  variants?: ProductVariant[];
  sizeGuideImage?: MediaAsset;
  currency: string;
};

type TabKey = "description" | "vase" | "sizes";

const tabs: { key: TabKey; label: string; tabId: string; panelId: string }[] = [
  {
    key: "description",
    label: "Description",
    tabId: "tab-description",
    panelId: "panel-description"
  },
  {
    key: "vase",
    label: "Vase",
    tabId: "tab-vase",
    panelId: "panel-vase"
  },
  {
    key: "sizes",
    label: "Sizes",
    tabId: "tab-sizes",
    panelId: "panel-sizes"
  }
];

function getDimensionLabel(value: string | undefined, axis: "Height" | "Width") {
  return value ? `${axis} ${value.replace(/\bin\b/g, "inches")}` : `${axis} varies by local florist design`;
}

export function ProductDetailsTabs({
  productName,
  description,
  orientation,
  vase,
  vaseImage,
  variants = [],
  sizeGuideImage,
  currency
}: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.key === activeTab)
  );

  function activateTab(index: number, moveFocus = false) {
    const nextTab = tabs[index];
    setActiveTab(nextTab.key);

    if (moveFocus) {
      window.requestAnimationFrame(() => {
        tabRefs.current[index]?.focus();
      });
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let nextIndex = activeIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (activeIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateTab(nextIndex, true);
  }

  return (
    <div className="product-details-panel__grid product-details-tabs">
      <div className="product-details-tabs__list" role="tablist" aria-label="Product details">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              className={`product-details-tabs__tab${isActive ? " is-active" : ""}`}
              id={tab.tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={tab.panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => activateTab(index)}
              onKeyDown={handleKeyDown}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <section
        className={`product-details-tabs__panel product-details-tabs__panel--description${activeTab === "description" ? " is-active" : ""}`}
        id="panel-description"
        role="tabpanel"
        aria-labelledby="tab-description"
        hidden={activeTab !== "description"}
      >
        <div className="product-description">
          <p>{description || "Product description details are coming soon."}</p>
          {orientation ? (
            <ul className="product-description__attributes">
              <li>
                <strong>Orientation:</strong> {orientation}
              </li>
            </ul>
          ) : null}
        </div>
      </section>

      <section
        className={`product-details-tabs__panel product-details-tabs__panel--vase${activeTab === "vase" ? " is-active" : ""}`}
        id="panel-vase"
        role="tabpanel"
        aria-labelledby="tab-vase"
        hidden={activeTab !== "vase"}
      >
        <div className="vase-info">
          {vaseImage ? (
            <div className="vase-info__image-wrap">
              <Image
                className="vase-info__image"
                src={vaseImage.src}
                alt={vaseImage.alt}
                width={340}
                height={340}
                sizes="(min-width: 768px) 260px, 70vw"
              />
            </div>
          ) : null}

          <div className="vase-info__content">
            <h3 className="vase-info__title">VASE</h3>
            <p className="vase-info__text">
              {vase || "Delivered in a florist-selected vase that complements the arrangement."}
            </p>
          </div>
        </div>
      </section>

      <section
        className={`product-details-tabs__panel${activeTab === "sizes" ? " is-active" : ""}`}
        id="panel-sizes"
        role="tabpanel"
        aria-labelledby="tab-sizes"
        hidden={activeTab !== "sizes"}
      >
        <div className="product-details-tabs__sizes size-guide">
          {variants.map((variant) => {
            const image = variant.image ?? sizeGuideImage;

            return (
            <article className="size-guide__item" key={variant.sku}>
              <div className="size-guide__visual">
                <div className="size-guide__height" aria-label={getDimensionLabel(variant.height, "Height")}>
                  <span>{variant.height ?? "Florist selected"}</span>
                </div>

                {image ? (
                  <Image
                    className="size-guide__image"
                    src={image.src}
                    alt={image.alt}
                    width={272}
                    height={340}
                    sizes="(min-width: 721px) 220px, 70vw"
                    loading="lazy"
                    unoptimized
                  />
                ) : null}

                <div className="size-guide__width" aria-label={getDimensionLabel(variant.width, "Width")}>
                  <span>{variant.width ?? "Florist selected"}</span>
                </div>
              </div>

              <p className="size-guide__name">
                {variant.label} - <span>{formatPrice(variant.price, currency)}</span>
              </p>
              <p className="size-guide__code">{variant.sku}</p>
            </article>
            );
          })}
          {!variants.length ? <p>{productName} size details are selected by the local florist.</p> : null}
        </div>
      </section>
    </div>
  );
}
