"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

type ProductDetailsTabsProps = {
  description?: string;
  orientation?: string;
  vase?: string;
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

const SIZE_GUIDE_IMAGE =
  "https://img.teleflora.com/images/o_0/l_flowers:T26M200C,pg_6/w_272,h_340,cs_no_cmyk,c_pad/f_auto,q_auto:eco,e_sharpen:150/flowers/T26M200C/Teleflora%27sBlueBelleBouquetPM";

const VASE_IMAGE = "https://assets.teleflora.com/assets/products/AE1_/26M200.jpg";

const sizeGuideItems = [
  {
    name: "Standard",
    code: "T26M200A",
    height: '13 3/4" H',
    heightLabel: "Height 13 3/4 inches",
    width: '15" W',
    widthLabel: "Width 15 inches",
    price: "$59.99",
    imageAlt: "Standard bouquet size"
  },
  {
    name: "Deluxe",
    code: "T26M200B",
    height: '13 3/4" H',
    heightLabel: "Height 13 3/4 inches",
    width: '14 3/4" W',
    widthLabel: "Width 14 3/4 inches",
    price: "$69.99",
    imageAlt: "Deluxe bouquet size"
  },
  {
    name: "Premium",
    code: "T26M200C",
    height: '13 3/4" H',
    heightLabel: "Height 13 3/4 inches",
    width: '14 3/4" W',
    widthLabel: "Width 14 3/4 inches",
    price: "$79.99",
    imageAlt: "Premium bouquet size"
  }
];

export function ProductDetailsTabs({
  description,
  orientation,
  vase
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
          <div className="vase-info__image-wrap">
            <Image
              className="vase-info__image"
              src={VASE_IMAGE}
              alt="Blue Belle Vase"
              width={340}
              height={340}
              sizes="(min-width: 768px) 260px, 70vw"
            />
          </div>

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
          {sizeGuideItems.map((size) => (
            <article className="size-guide__item" key={size.code}>
              <div className="size-guide__visual">
                <div className="size-guide__height" aria-label={size.heightLabel}>
                  <span>{size.height}</span>
                </div>

                <Image
                  className="size-guide__image"
                  src={SIZE_GUIDE_IMAGE}
                  alt={size.imageAlt}
                  width={272}
                  height={340}
                  sizes="(min-width: 721px) 220px, 70vw"
                  loading="lazy"
                  unoptimized
                />

                <div className="size-guide__width" aria-label={size.widthLabel}>
                  <span>{size.width}</span>
                </div>
              </div>

              <p className="size-guide__name">
                {size.name} - <span>{size.price}</span>
              </p>
              <p className="size-guide__code">{size.code}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
