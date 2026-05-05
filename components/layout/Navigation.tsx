"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { type CSSProperties, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

import { TelefloraLogo } from "@/components/layout/TelefloraLogo";
import { getCategoryHref } from "@/lib/config/category-routes";

type MegaMenuColumn = {
  title: string;
  links: Array<{
    href: string;
    label: string;
    swatch?: string;
  }>;
  cta?: {
    href: string;
    label: string;
  };
};

type MegaMenuConfig = {
  variant?: "mothers-day" | "birthday" | "gifts-food" | "flowers" | "occasions";
  columns: MegaMenuColumn[];
  cta: {
    href: string;
    label: string;
  };
  promoCard?: {
    href: string;
    image: {
      src: string;
      alt: string;
    };
    style?: "banner" | "subscription";
    brand?: string;
    headline: string[];
    ctaLabel?: string;
  };
  upcomingOccasions?: Array<{
    month: string;
    day: string;
    label: string;
    href?: string;
  }>;
};

type NavLink = {
  href: string;
  label: string;
  menuAlign?: "start" | "end";
  megaMenu?: MegaMenuConfig;
  desktopMegaMenu?: MegaMenuConfig;
  mobileMenu?: MegaMenuConfig;
  mobileOnly?: boolean;
};

type QuickShopOption = {
  label: string;
  value: string;
};

function categoryLink(categoryKey: string, label: string, swatch?: string): MegaMenuColumn["links"][number] {
  return {
    href: getCategoryHref(categoryKey),
    label,
    ...(swatch ? { swatch } : {})
  };
}

function categoryCta(categoryKey: string, label: string) {
  return {
    href: getCategoryHref(categoryKey),
    label
  };
}

const dealOfTheDayHref = "/product/deal-of-the-day";
const subscriptionsHref = "/subscriptions";
const dropdownPromoImageSrc =
  "https://img.teleflora.com/image/upload/e_sharpen:100/w_195/f_auto,q_auto/backgrounds/MDAY_Nav_T26M400A";

const navLinks: NavLink[] = [
  {
    href: getCategoryHref("mothers-day"),
    label: "Mother's Day",
    desktopMegaMenu: {
      variant: "mothers-day",
      columns: [
        {
          title: "Collections",
          links: [
            categoryLink("mothers-day", "MOTHER'S DAY BESTSELLERS"),
            categoryLink("roses", "MOTHER'S DAY ROSES"),
            categoryLink("tulips", "MOTHER'S DAY TULIPS"),
            categoryLink("plants", "MOTHER'S DAY PLANTS"),
            categoryLink("flowers", "LUXURY BOUQUETS"),
            categoryLink("gifts-food", "GIFTS & TREATS")
          ]
        }
      ],
      cta: categoryCta("mothers-day", "Shop All Mother's Day"),
      promoCard: {
        href: getCategoryHref("mothers-day"),
        style: "banner",
        image: {
          src: dropdownPromoImageSrc,
          alt: "Mother's Day floral arrangement"
        },
        headline: ["MOTHER'S DAY", "GIFTS UNDER $60"]
      }
    },
    megaMenu: {
      columns: [
        {
          title: "Featured",
          links: [
            categoryLink("mothers-day", "Mother's Day Flowers"),
            categoryLink("flower-bestsellers", "Best Sellers"),
            categoryLink("flowers", "Luxury Bouquets"),
            categoryLink("flowers-under-60", "Flowers Under $75")
          ]
        },
        {
          title: "Shop by Style",
          links: [
            categoryLink("roses", "Roses for Mom"),
            categoryLink("spring-flowers", "Spring Bouquets"),
            categoryLink("plants", "Plants for Mom"),
            categoryLink("same-day", "Same-Day Gifts")
          ]
        }
      ],
      cta: categoryCta("mothers-day", "Shop All Mother's Day")
    }
  },
  {
    href: getCategoryHref("birthday"),
    label: "Birthday",
    desktopMegaMenu: {
      variant: "birthday",
      columns: [
        {
          title: "Collections",
          links: [
            categoryLink("birthday", "BIRTHDAY BESTSELLERS"),
            categoryLink("birthday-flowers-for-her", "BIRTHDAY FOR HER"),
            categoryLink("birthday-flowers-for-him", "BIRTHDAY FOR HIM"),
            categoryLink("birthday-flowers-for-kids", "BIRTHDAY FOR KIDS"),
            categoryLink("birthday-flowers-sweet-16", "SWEET 16"),
            categoryLink("birthday-flowers-quinceanera", "QUINCEANERA")
          ]
        }
      ],
      cta: categoryCta("birthday", "Shop All Birthday"),
      promoCard: {
        href: getCategoryHref("birthday"),
        style: "subscription",
        image: {
          src: dropdownPromoImageSrc,
          alt: "Florist arranging bright flowers"
        },
        brand: "teleflora SUBSCRIPTIONS",
        headline: ["THE GIFT THAT", "KEEPS BLOOMING"],
        ctaLabel: "SHOP NOW"
      }
    },
    megaMenu: {
      columns: [
        {
          title: "Birthday Flowers",
          links: [
            categoryLink("birthday", "Birthday Best Sellers"),
            categoryLink("roses", "Birthday Roses"),
            categoryLink("birthday", "Bright Bouquets"),
            categoryLink("plants", "Birthday Plants")
          ]
        },
        {
          title: "Birthday Gifts",
          links: [
            categoryLink("birthday", "Flowers with Balloons"),
            categoryLink("gift-baskets", "Gift Baskets"),
            categoryLink("chocolate-covered-treats", "Sweet Treats"),
            categoryLink("same-day", "Same-Day Birthday")
          ]
        }
      ],
      cta: categoryCta("birthday", "Shop All Birthday")
    }
  },
  {
    href: getCategoryHref("sympathy"),
    label: "Sympathy",
    megaMenu: {
      columns: [
        {
          title: "For Services",
          links: [
            categoryLink("funeral-sprays-wreaths", "Funeral Sprays & Wreaths"),
            categoryLink("funeral-service-bouquets", "Funeral Service Bouquets"),
            categoryLink("funeral-casket-flowers", "Funeral Casket Flowers"),
            categoryLink("cremation-flowers", "Cremation Flowers")
          ]
        },
        {
          title: "For the Home",
          links: [
            categoryLink("sympathy", "Sympathy Bouquets"),
            categoryLink("sympathy-plants", "Sympathy Plants"),
            categoryLink("sympathy-floral-baskets", "Sympathy Floral Baskets"),
            categoryLink("pet-sympathy-gifts", "Pet Sympathy Gifts")
          ]
        }
      ],
      cta: categoryCta("sympathy", "Shop All Funeral & Sympathy")
    }
  },
  {
    href: getCategoryHref("occasions"),
    label: "Occasions",
    menuAlign: "end",
    desktopMegaMenu: {
      variant: "occasions",
      columns: [
        {
          title: "Featured Occasions",
          links: [
            categoryLink("anniversary", "ANNIVERSARY"),
            categoryLink("gifts-food", "CORPORATE GIFTING"),
            categoryLink("graduation", "GRADUATION"),
            categoryLink("just-because", "JUST BECAUSE"),
            categoryLink("mothers-day", "MOTHER'S DAY"),
            categoryLink("retirement", "RETIREMENT"),
            categoryLink("thank-you", "THANK YOU")
          ]
        },
        {
          title: "Featured Occasions",
          links: [
            categoryLink("congratulations", "CONGRATULATIONS"),
            categoryLink("get-well", "GET WELL"),
            categoryLink("im-sorry", "I'M SORRY"),
            categoryLink("love-romance", "LOVE & ROMANCE"),
            categoryLink("new-baby", "NEW BABY"),
            categoryLink("sympathy", "SYMPATHY & FUNERAL"),
            categoryLink("thinking-of-you", "THINKING OF YOU")
          ]
        }
      ],
      cta: categoryCta("occasions", "Shop All Occasions"),
      upcomingOccasions: [
        { month: "MAY", day: "10", label: "MOTHER'S DAY", href: getCategoryHref("mothers-day") },
        { month: "MAY", day: "25", label: "MEMORIAL DAY", href: getCategoryHref("memorial-day") }
      ]
    },
    megaMenu: {
      columns: [
        {
          title: "Everyday Occasions",
          links: [
            categoryLink("anniversary", "Anniversary"),
            categoryLink("thank-you", "Thank You"),
            categoryLink("congratulations", "Congratulations"),
            categoryLink("just-because", "Just Because")
          ]
        },
        {
          title: "Care + Support",
          links: [
            categoryLink("get-well", "Get Well"),
            categoryLink("new-baby", "New Baby"),
            categoryLink("im-sorry", "I'm Sorry"),
            categoryLink("thinking-of-you", "Thinking of You")
          ]
        }
      ],
      cta: categoryCta("occasions", "Shop All Occasions")
    }
  },
  {
    href: getCategoryHref("flowers"),
    label: "Flowers",
    menuAlign: "end",
    desktopMegaMenu: {
      variant: "flowers",
      columns: [
        {
          title: "Collections",
          links: [
            categoryLink("flower-bestsellers", "BESTSELLERS"),
            { href: dealOfTheDayHref, label: "DEAL OF THE DAY" },
            categoryLink("flowers-in-a-gift", "FLOWERS IN A GIFT"),
            categoryLink("flowers-under-60", "FLOWERS UNDER $60"),
            categoryLink("mothers-day", "MOTHER'S DAY FLOWERS"),
            categoryLink("new-arrivals", "NEW ARRIVALS"),
            categoryLink("plants", "PLANTS"),
            categoryLink("same-day", "SAME-DAY DELIVERY"),
            categoryLink("vases-containers", "SHOP BY VASE"),
            categoryLink("spring-flowers", "SPRING FLOWERS"),
            { href: subscriptionsHref, label: "SUBSCRIPTIONS" }
          ],
          cta: categoryCta("flowers", "Shop All Flowers")
        },
        {
          title: "Color",
          links: [
            categoryLink("blue-flowers", "BLUE FLOWERS", "#0067c8"),
            categoryLink("green-flowers", "GREEN FLOWERS", "#0aac6f"),
            categoryLink("neutral-flowers", "NEUTRAL FLOWERS", "#f3f0da"),
            categoryLink("orange-flowers", "ORANGE FLOWERS", "#ff7900"),
            categoryLink("pastel-flowers", "PASTEL FLOWERS", "#edc3c5"),
            categoryLink("pink-flowers", "PINK FLOWERS", "#f57fba"),
            categoryLink("purple-flowers", "PURPLE FLOWERS", "#9b55cf"),
            categoryLink("red-flowers", "RED FLOWERS", "#eb0000"),
            categoryLink("white-flowers", "WHITE FLOWERS", "#ffffff"),
            categoryLink("yellow-flowers", "YELLOW FLOWERS", "#ffcc00")
          ],
          cta: categoryCta("flowers-by-color", "Shop All Colors")
        },
        {
          title: "Flower Type",
          links: [
            categoryLink("alstroemeria", "ALSTROEMERIA"),
            categoryLink("carnations", "CARNATIONS"),
            categoryLink("chrysanthemums", "CHRYSANTHEMUMS"),
            categoryLink("daisies", "DAISIES"),
            categoryLink("lilies", "LILIES"),
            categoryLink("orchids", "ORCHIDS"),
            categoryLink("roses", "ROSES"),
            categoryLink("succulents", "SUCCULENTS"),
            categoryLink("sunflowers", "SUNFLOWERS"),
            categoryLink("tropicals", "TROPICALS"),
            categoryLink("tulips", "TULIPS")
          ],
          cta: categoryCta("flower-by-type", "Shop All Flower Types")
        }
      ],
      cta: categoryCta("flowers", "Shop All Flowers")
    },
    megaMenu: {
      columns: [
        {
          title: "Shop by Flower",
          links: [
            categoryLink("roses", "Roses"),
            categoryLink("tulips", "Tulips"),
            categoryLink("lilies", "Lilies"),
            categoryLink("orchids", "Orchids")
          ]
        },
        {
          title: "Shop by Color",
          links: [
            categoryLink("pink-flowers", "Pink Flowers"),
            categoryLink("white-flowers", "White Flowers"),
            categoryLink("yellow-flowers", "Yellow Flowers"),
            categoryLink("flowers", "Mixed Bouquets")
          ]
        }
      ],
      cta: categoryCta("flowers", "Shop All Flowers")
    }
  },
  {
    href: getCategoryHref("gifts-food"),
    label: "Gifts + Food",
    menuAlign: "end",
    desktopMegaMenu: {
      variant: "gifts-food",
      columns: [
        {
          title: "Collections",
          links: [
            categoryLink("gifts-food", "BEST-SELLING GIFTS"),
            categoryLink("chocolate-covered-treats", "CHOCOLATE COVERED TREATS"),
            categoryLink("food-gift-baskets", "FOOD GIFT BASKETS"),
            categoryLink("mothers-day", "MOTHER'S DAY GIFTS & TREATS"),
            categoryLink("new-baby-gifts", "NEW BABY GIFTS"),
            categoryLink("plants", "PLANTS"),
            categoryLink("spa-gifts", "SPA GIFTS"),
            { href: subscriptionsHref, label: "FLOWER SUBSCRIPTIONS" }
          ]
        }
      ],
      cta: categoryCta("gifts-food", "Shop All Gifts + Food"),
      promoCard: {
        href: subscriptionsHref,
        image: {
          src: "https://img.teleflora.com/image/upload/e_sharpen:100/w_195/f_auto,q_auto/backgrounds/MDAY_Nav_T26M400A",
          alt: "Florist arranging bright Mother's Day flowers"
        },
        brand: "teleflora SUBSCRIPTIONS",
        headline: ["GIVE MOM", "THE GIFT THAT", "KEEPS BLOOMING"],
        ctaLabel: "SHOP NOW"
      }
    },
    megaMenu: {
      columns: [
        {
          title: "Gifts",
          links: [
            categoryLink("gift-baskets", "Gift Baskets"),
            categoryLink("plants", "Plants"),
            categoryLink("birthday", "Balloons"),
            categoryLink("flowers-in-a-gift", "Keepsake Gifts")
          ]
        },
        {
          title: "Food",
          links: [
            categoryLink("chocolate-covered-treats", "Chocolate Gifts"),
            categoryLink("food-gift-baskets", "Fruit Baskets"),
            categoryLink("food-gift-baskets", "Gourmet Snacks"),
            categoryLink("food-gift-baskets", "Bakery Gifts")
          ]
        }
      ],
      cta: categoryCta("gifts-food", "Shop All Gifts + Food")
    }
  },
  {
    href: getCategoryHref("same-day"),
    label: "Same Day",
    mobileMenu: {
      columns: [
        {
          title: "Same-Day Delivery",
          links: [
            categoryLink("same-day", "SAME-DAY FLOWERS"),
            categoryLink("birthday", "BIRTHDAY FLOWERS"),
            categoryLink("get-well", "GET WELL FLOWERS"),
            categoryLink("sympathy", "SYMPATHY FLOWERS"),
            categoryLink("plants", "PLANTS")
          ]
        }
      ],
      cta: categoryCta("same-day", "Shop All Same Day")
    }
  }
];

const quickShopOptions: QuickShopOption[] = [
  { label: "Mother's Day Flowers", value: "mothers-day" },
  { label: "Birthday Flowers", value: "birthday" },
  { label: "Sympathy Flowers", value: "sympathy" },
  { label: "Get Well Flowers", value: "get-well" },
  { label: "Thank You Flowers", value: "thank-you" },
  { label: "Congratulations Flowers", value: "congratulations" }
];

function subscribeToDesktopNav(callback: () => void) {
  const mediaQuery = window.matchMedia("(min-width: 961px)");
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getDesktopNavSnapshot() {
  return window.matchMedia("(min-width: 961px)").matches;
}

function getServerDesktopNavSnapshot() {
  return false;
}

function subscribeToClientReady() {
  return () => undefined;
}

function getClientReadySnapshot() {
  return true;
}

function getServerClientReadySnapshot() {
  return false;
}

function getMobileMenu(link: NavLink) {
  return link.mobileMenu ?? link.desktopMegaMenu ?? link.megaMenu;
}

function getMobilePanelId(menuIdBase: string, label: string) {
  return `${menuIdBase}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-mobile-panel`;
}

function getMobileMenuColumns(menu: MegaMenuConfig) {
  return menu.columns.reduce<MegaMenuColumn[]>((columns, column) => {
    const existingColumn = columns.find((item) => item.title === column.title);

    if (existingColumn) {
      existingColumn.links = [...existingColumn.links, ...column.links];
      existingColumn.cta = existingColumn.cta ?? column.cta;
      return columns;
    }

    columns.push({
      ...column,
      links: [...column.links]
    });

    return columns;
  }, []);
}

function mobileMenuHasColumnCta(menu: MegaMenuConfig) {
  return getMobileMenuColumns(menu).some((column) => column.cta?.href === menu.cta.href && column.cta.label === menu.cta.label);
}

function MegaMenuLinkList({
  links,
  listClassName = "mega-menu__list",
  linkClassName = "mega-menu__link",
  showSwatches = false
}: {
  links: MegaMenuColumn["links"];
  listClassName?: string;
  linkClassName?: string;
  showSwatches?: boolean;
}) {
  return (
    <ul className={listClassName}>
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className={linkClassName}>
            {showSwatches && link.swatch ? <span className="mega-menu__swatch" style={{ backgroundColor: link.swatch }} aria-hidden="true" /> : null}
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MegaMenuColumn({ column }: { column: MegaMenuColumn }) {
  return (
    <div className="mega-menu__column">
      <h2 className="mega-menu-heading">{column.title}</h2>
      <MegaMenuLinkList links={column.links} />
    </div>
  );
}

function ColorSwatchList({ links }: { links: MegaMenuColumn["links"] }) {
  return <MegaMenuLinkList links={links} listClassName="mega-menu__list mega-menu__list--swatches" linkClassName="mega-menu__link mega-menu__link--swatch" showSwatches />;
}

function PromoCard({ promo }: { promo: NonNullable<MegaMenuConfig["promoCard"]> }) {
  const style = promo.style ?? "subscription";

  return (
    <Link href={promo.href} className={`mega-promo-card mega-promo-card--${style}`}>
      <span className="mega-promo-card__image">
        <Image src={promo.image.src} alt={promo.image.alt} width={250} height={145} sizes="250px" unoptimized />
      </span>
    </Link>
  );
}

function PromoMegaMenu({ menu, className }: { menu: MegaMenuConfig; className: string }) {
  const collections = menu.columns[0];

  if (!collections || !menu.promoCard) {
    return null;
  }

  return (
    <div className={`${className} promo-mega`}>
      <div className="promo-mega__collections">
        <h2 className="mega-menu-heading">{collections.title}</h2>
        <MegaMenuLinkList links={collections.links} listClassName="mega-menu__list promo-mega__list" linkClassName="mega-menu__link promo-mega__link" />
        <Link href={menu.cta.href} className="mega-menu__cta promo-mega__cta">
          {menu.cta.label}
        </Link>
      </div>
      <div className="promo-mega__promo">
        <PromoCard promo={menu.promoCard} />
      </div>
    </div>
  );
}

function GiftsFoodMegaMenu({ menu }: { menu: MegaMenuConfig }) {
  const collections = menu.columns[0];

  if (!collections || !menu.promoCard) {
    return null;
  }

  return (
    <div className="gifts-food-mega">
      <div className="gifts-food-mega__collections">
        <h2 className="mega-menu-heading">{collections.title}</h2>
        <MegaMenuLinkList links={collections.links} listClassName="mega-menu__list gifts-food-mega__list" linkClassName="mega-menu__link gifts-food-mega__link" />
      </div>
      <div className="gifts-food-mega__promo">
        <PromoCard promo={menu.promoCard} />
      </div>
    </div>
  );
}

function FlowersMegaMenu({ menu }: { menu: MegaMenuConfig }) {
  return (
    <div className="flowers-mega">
      {menu.columns.map((column) => {
        const hasSwatches = column.links.some((link) => Boolean(link.swatch));

        return (
          <div key={column.title} className="flowers-mega__column">
            <h2 className="mega-menu-heading">{column.title}</h2>
            {hasSwatches ? (
              <ColorSwatchList links={column.links} />
            ) : (
              <MegaMenuLinkList links={column.links} listClassName="mega-menu__list flowers-mega__list" linkClassName="mega-menu__link flowers-mega__link" />
            )}
            {column.cta ? (
              <Link href={column.cta.href} className="mega-menu__cta flowers-mega__cta">
                {column.cta.label}
              </Link>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function UpcomingOccasionCard({ occasion }: { occasion: NonNullable<MegaMenuConfig["upcomingOccasions"]>[number] }) {
  return (
    <div className="upcoming-occasion-card">
      <div className="upcoming-occasion-card__date" aria-hidden="true">
        <span className="upcoming-occasion-card__month">{occasion.month}</span>
        <span className="upcoming-occasion-card__day">{occasion.day}</span>
      </div>
      <span className="upcoming-occasion-card__label">{occasion.label}</span>
      <span className="sr-only">
        {occasion.month} {occasion.day}
      </span>
    </div>
  );
}

function OccasionsMegaMenu({ menu }: { menu: MegaMenuConfig }) {
  const featuredTitle = menu.columns[0]?.title ?? "Featured Occasions";

  return (
    <div className="occasions-mega">
      <div className="occasions-mega__featured">
        <h2 className="mega-menu-heading">{featuredTitle}</h2>
        <div className="occasions-mega__link-columns">
          {menu.columns.map((column, index) => (
            <MegaMenuLinkList
              key={`${column.title}-${index}`}
              links={column.links}
              listClassName="mega-menu__list occasions-mega__list"
              linkClassName="mega-menu__link occasions-mega__link"
            />
          ))}
        </div>
        <Link href={menu.cta.href} className="mega-menu__cta occasions-mega__cta">
          {menu.cta.label}
        </Link>
      </div>
      {menu.upcomingOccasions ? (
        <aside className="occasions-mega__upcoming" aria-label="Upcoming Occasions">
          <h2 className="mega-menu-heading">Upcoming Occasions</h2>
          <div className="occasions-mega__date-list">
            {menu.upcomingOccasions.map((occasion) => (
              <UpcomingOccasionCard key={`${occasion.month}-${occasion.day}-${occasion.label}`} occasion={occasion} />
            ))}
          </div>
        </aside>
      ) : null}
    </div>
  );
}

function MegaMenu({
  id,
  labelledBy,
  menu,
  onMouseEnter,
  onMouseLeave
}: {
  id: string;
  labelledBy: string;
  menu: MegaMenuConfig;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const variantClassName = menu.variant ? ` mega-menu--${menu.variant}` : "";
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [offsetX, setOffsetX] = useState(0);

  useLayoutEffect(() => {
    function updatePosition() {
      const menuElement = menuRef.current;
      const navItemElement = menuElement?.parentElement;

      if (!menuElement || !navItemElement) {
        return;
      }

      const viewportMargin = 16;
      const itemRect = navItemElement.getBoundingClientRect();
      const naturalLeft = itemRect.left;
      const naturalRight = naturalLeft + menuElement.offsetWidth;
      let nextOffset = 0;

      if (naturalRight > window.innerWidth - viewportMargin) {
        nextOffset = window.innerWidth - viewportMargin - naturalRight;
      }

      if (naturalLeft + nextOffset < viewportMargin) {
        nextOffset += viewportMargin - (naturalLeft + nextOffset);
      }

      setOffsetX(nextOffset);
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <div
      id={id}
      ref={menuRef}
      className={`mega-menu${variantClassName}`}
      role="region"
      aria-labelledby={labelledBy}
      style={{ "--mega-menu-offset-x": `${offsetX}px` } as CSSProperties}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {menu.variant === "mothers-day" ? <PromoMegaMenu menu={menu} className="mothers-day-mega" /> : null}
      {menu.variant === "birthday" ? <PromoMegaMenu menu={menu} className="birthday-mega" /> : null}
      {menu.variant === "gifts-food" ? <GiftsFoodMegaMenu menu={menu} /> : null}
      {menu.variant === "flowers" ? <FlowersMegaMenu menu={menu} /> : null}
      {menu.variant === "occasions" ? <OccasionsMegaMenu menu={menu} /> : null}
      {!menu.variant ? (
        <div className="mega-menu__generic">
          <div className="mega-menu__columns">
            {menu.columns.map((column) => (
              <MegaMenuColumn key={column.title} column={column} />
            ))}
          </div>
          <Link href={menu.cta.href} className="mega-menu__cta">
            {menu.cta.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function MobileMenuSection({
  link,
  isActive,
  panelId,
  onOpen,
  onNavigate
}: {
  link: NavLink;
  isActive: boolean;
  panelId: string;
  onOpen: () => void;
  onNavigate: () => void;
}) {
  const menu = getMobileMenu(link);

  if (!menu) {
    return (
      <Link href={link.href} className="mobile-menu__category-link" onClick={onNavigate}>
        {link.label}
      </Link>
    );
  }

  return (
    <button type="button" className="mobile-menu__category-button" aria-expanded={isActive} aria-controls={panelId} onClick={onOpen}>
      <span>{link.label}</span>
      <span className="mobile-menu__category-chevron" aria-hidden="true" />
    </button>
  );
}

function MobileMenuPanel({
  link,
  panelId,
  backButtonRef,
  onBack,
  onNavigate
}: {
  link: NavLink;
  panelId: string;
  backButtonRef: React.RefObject<HTMLButtonElement | null>;
  onBack: () => void;
  onNavigate: () => void;
}) {
  const menu = getMobileMenu(link);

  if (!menu) {
    return null;
  }

  const columns = getMobileMenuColumns(menu);
  const showMenuCta = !mobileMenuHasColumnCta(menu);

  return (
    <section id={panelId} className="mobile-menu-panel" aria-label={`${link.label} menu`}>
      <button type="button" ref={backButtonRef} className="mobile-menu-panel__back" onClick={onBack}>
        <span className="mobile-menu-panel__back-icon" aria-hidden="true" />
        <span>Main Menu</span>
      </button>

      <div className="mobile-menu-panel__groups">
        {columns.map((column) => (
          <section key={column.title} className="mobile-menu-panel__group">
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((item) => (
                <li key={`${column.title}-${item.label}`}>
                  <Link href={item.href} className={item.swatch ? "mobile-menu-panel__link mobile-menu-panel__link--swatch" : "mobile-menu-panel__link"} onClick={onNavigate}>
                    {item.swatch ? <span className="mobile-menu-panel__swatch" style={{ backgroundColor: item.swatch }} aria-hidden="true" /> : null}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {column.cta ? (
              <Link href={column.cta.href} className="mobile-menu-panel__shop-all" onClick={onNavigate}>
                {column.cta.label}
              </Link>
            ) : null}
          </section>
        ))}

        {menu.upcomingOccasions ? (
          <section className="mobile-menu-panel__group mobile-menu-panel__group--upcoming" aria-label="Upcoming Occasions">
            <h3>Upcoming Occasions</h3>
            <ul className="mobile-menu-panel__occasion-list">
              {menu.upcomingOccasions.map((occasion) => {
                const content = (
                  <>
                    <span className="mobile-menu-panel__date" aria-hidden="true">
                      <span>{occasion.month}</span>
                      <strong>{occasion.day}</strong>
                    </span>
                    <span>{occasion.label}</span>
                    <span className="sr-only">
                      {occasion.month} {occasion.day}
                    </span>
                  </>
                );

                return (
                  <li key={`${occasion.month}-${occasion.day}-${occasion.label}`}>
                    {occasion.href ? (
                      <Link href={occasion.href} className="mobile-menu-panel__occasion-link" onClick={onNavigate}>
                        {content}
                      </Link>
                    ) : (
                      <span className="mobile-menu-panel__occasion-link">{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {showMenuCta ? (
          <Link href={menu.cta.href} className="mobile-menu-panel__shop-all mobile-menu-panel__shop-all--primary" onClick={onNavigate}>
            {menu.cta.label}
          </Link>
        ) : null}

        {menu.promoCard ? (
          <Link href={menu.promoCard.href} className="mobile-menu-panel__promo" onClick={onNavigate}>
            <Image src={menu.promoCard.image.src} alt={menu.promoCard.image.alt} width={360} height={300} sizes="300px" unoptimized />
            <span className="sr-only">{menu.promoCard.ctaLabel ?? menu.promoCard.headline.join(" ")}</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function QuickShopPanel({ isExpanded, panelId, onToggle }: { isExpanded: boolean; panelId: string; onToggle: () => void }) {
  return (
    <section className="mobile-menu__section mobile-menu__section--quick-shop">
      <button
        type="button"
        className="mobile-menu__section-toggle"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>In a hurry?</span>
        <span className="mobile-menu__chevron" aria-hidden="true" />
      </button>
      {isExpanded ? (
        <form action={getCategoryHref("flowers")} id={panelId} className="mobile-menu__quick-shop">
          <label>
            <span>Occasion</span>
            <select name="occasion" defaultValue="">
              <option value="" disabled>
                Select occasion
              </option>
              {quickShopOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Delivery date</span>
            <input name="deliveryDate" type="date" />
          </label>
          <label>
            <span>Recipient ZIP</span>
            <input name="zip" inputMode="numeric" placeholder="Recipient Zip" />
          </label>
          <button type="submit">Quick Shop</button>
        </form>
      ) : null}
    </section>
  );
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);
}

export function Navigation({ activeLabel }: { activeLabel?: string }) {
  const menuIdBase = useId();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobilePanel, setActiveMobilePanel] = useState<string | null>(null);
  const [isQuickShopOpen, setIsQuickShopOpen] = useState(false);
  const isClientReady = useSyncExternalStore(subscribeToClientReady, getClientReadySnapshot, getServerClientReadySnapshot);
  const isDesktopNav = useSyncExternalStore(subscribeToDesktopNav, getDesktopNavSnapshot, getServerDesktopNavSnapshot);
  const isMobileDrawerOpen = isMobileMenuOpen && !isDesktopNav;
  const desktopNavLinks = navLinks.filter((link) => !link.mobileOnly);
  const activeMobileLink = navLinks.find((link) => link.label === activeMobilePanel);
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuCloseRef = useRef<HTMLButtonElement | null>(null);
  const mobilePanelBackRef = useRef<HTMLButtonElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);

  function closeMenu() {
    setOpenMenu(null);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
    setActiveMobilePanel(null);
    setIsQuickShopOpen(false);
  }

  useEffect(() => {
    if (!isMobileDrawerOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const returnFocusElement = mobileMenuButtonRef.current;
    document.body.style.overflow = "hidden";
    const firstDrawerControl =
      mobileDrawerRef.current?.querySelector<HTMLButtonElement | HTMLAnchorElement>(".mobile-menu__category-button, .mobile-menu__category-link") ?? mobileMenuCloseRef.current;
    firstDrawerControl?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      returnFocusElement?.focus();
    };
  }, [isMobileDrawerOpen]);

  useEffect(() => {
    if (isMobileDrawerOpen && activeMobilePanel) {
      mobilePanelBackRef.current?.focus();
    }
  }, [activeMobilePanel, isMobileDrawerOpen]);

  function handleMobileDrawerKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      closeMobileMenu();
      return;
    }

    if (event.key !== "Tab" || !mobileDrawerRef.current) {
      return;
    }

    const focusableElements = getFocusableElements(mobileDrawerRef.current);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) {
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  const mobileMenuShell = (
    <div className={`mobile-menu-shell${isMobileDrawerOpen ? " mobile-menu-shell--open" : ""}`} aria-hidden={!isMobileDrawerOpen} inert={!isMobileDrawerOpen}>
      <button type="button" className="mobile-menu-overlay" aria-label="Close menu" onClick={closeMobileMenu} tabIndex={isMobileDrawerOpen ? 0 : -1} />
      <div
        id={`${menuIdBase}-mobile-menu`}
        ref={mobileDrawerRef}
        className="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        onKeyDown={handleMobileDrawerKeyDown}
      >
        <div className="mobile-menu__header">
          <Link
            href="/"
            className="brand-mark brand-mark--mobile-header m-supernav-logo logo"
            aria-label="Teleflora home"
            title="Teleflora logo"
            onClick={closeMobileMenu}
          >
            <TelefloraLogo />
          </Link>
          <button type="button" ref={mobileMenuCloseRef} className="mobile-menu__close" aria-label="Close menu" onClick={closeMobileMenu}>
            <span aria-hidden="true" />
          </button>
        </div>

        <div className="mobile-menu__body">
          {activeMobileLink ? (
            <MobileMenuPanel
              link={activeMobileLink}
              panelId={getMobilePanelId(menuIdBase, activeMobileLink.label)}
              backButtonRef={mobilePanelBackRef}
              onBack={() => setActiveMobilePanel(null)}
              onNavigate={closeMobileMenu}
            />
          ) : (
            <div className="mobile-menu__main">
              <nav className="mobile-menu__category-list" aria-label="Shop categories">
                {navLinks.map((link) => (
                  <MobileMenuSection
                    key={link.label}
                    link={link}
                    panelId={getMobilePanelId(menuIdBase, link.label)}
                    isActive={activeMobilePanel === link.label}
                    onOpen={() => setActiveMobilePanel(link.label)}
                    onNavigate={closeMobileMenu}
                  />
                ))}
              </nav>

              <QuickShopPanel
                panelId={`${menuIdBase}-quick-shop-mobile-panel`}
                isExpanded={isQuickShopOpen}
                onToggle={() => setIsQuickShopOpen((currentValue) => !currentValue)}
              />

              <section className="mobile-menu__customer-service" aria-labelledby={`${menuIdBase}-mobile-customer-service`}>
                <h2 id={`${menuIdBase}-mobile-customer-service`}>Customer Service</h2>
                <nav className="mobile-menu__utility" aria-label="Customer Service links">
                  <Link href={getCategoryHref("flowers")} onClick={closeMobileMenu}>
                    HELP CENTER
                  </Link>
                  <Link href={getCategoryHref("flowers")} onClick={closeMobileMenu}>
                    E-MAIL US
                  </Link>
                  <a href="tel:8004935610">(800) 493-5610</a>
                  <Link href={getCategoryHref("flowers")} onClick={closeMobileMenu}>
                    INTERNATIONAL DELIVERY
                  </Link>
                </nav>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <nav aria-label="Primary" className="site-nav">
      <button
        type="button"
        ref={mobileMenuButtonRef}
        className="mobile-menu-button"
        aria-expanded={isMobileDrawerOpen}
        aria-controls={`${menuIdBase}-mobile-menu`}
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <span className="mobile-menu-button__icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <ul className="site-nav__list" aria-label="Desktop categories">
        {desktopNavLinks.map((link) => {
          const desktopMegaMenu = link.desktopMegaMenu ?? link.megaMenu;
          const hasMegaMenu = Boolean(desktopMegaMenu);
          const isOpen = isDesktopNav && openMenu === link.label;
          const isActive = isDesktopNav && (isOpen || (!openMenu && activeLabel === link.label));
          const menuId = `${menuIdBase}-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-menu`;
          const triggerId = `${menuId}-trigger`;

          return (
            <li
              key={link.label}
              className={[
                "site-nav__item",
                hasMegaMenu ? "site-nav__item--has-menu" : "",
                link.menuAlign === "end" ? "site-nav__item--menu-end" : ""
              ]
                .filter(Boolean)
                .join(" ")}
              onMouseEnter={() => (hasMegaMenu && isDesktopNav ? setOpenMenu(link.label) : closeMenu())}
              onMouseLeave={closeMenu}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  closeMenu();
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  closeMenu();
                  triggerRefs.current[link.label]?.focus();
                }
              }}
            >
              <Link
                id={hasMegaMenu ? triggerId : undefined}
                href={link.href}
                ref={(node) => {
                  triggerRefs.current[link.label] = node;
                }}
                className={`site-nav__link${isActive ? " site-nav__link--active" : ""}`}
                aria-expanded={hasMegaMenu && isDesktopNav ? isOpen : undefined}
                aria-controls={hasMegaMenu && isDesktopNav ? menuId : undefined}
                aria-haspopup={hasMegaMenu && isDesktopNav ? "true" : undefined}
                onFocus={() => {
                  if (hasMegaMenu && isDesktopNav) {
                    setOpenMenu(link.label);
                  }
                }}
              >
                <span>{link.label}</span>
                {hasMegaMenu ? <span className="site-nav__chevron" aria-hidden="true" /> : null}
              </Link>
              {hasMegaMenu && isDesktopNav && isOpen && desktopMegaMenu ? (
                <MegaMenu id={menuId} labelledBy={triggerId} menu={desktopMegaMenu} onMouseEnter={() => setOpenMenu(link.label)} onMouseLeave={closeMenu} />
              ) : null}
            </li>
          );
        })}
      </ul>

      {isClientReady ? createPortal(mobileMenuShell, document.body) : null}
    </nav>
  );
}
