"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const TELEFLORA_BASE_URL = "https://www.teleflora.com";

const sourceHref = (pathname: string) => `${TELEFLORA_BASE_URL}${pathname}`;

const sidebarNav = [
  {
    label: "Our Company",
    href: sourceHref("/info/about"),
    active: true,
    children: [
      { label: "The Teleflora Guarantee", href: "#teleflora-guarantee" },
      { label: "The Teleflora Difference", href: "#teleflora-difference" },
      { label: "Flowers in a Gift Collection", href: "#flowers-in-a-gift-collection" },
      { label: "Supporting Our Florists", href: "#supporting-our-florists" },
      { label: "Charitable Giving", href: "#charitable-giving" },
      { label: "Teleflora's Affiliate Program", href: "#teleflora-affiliate" },
      { label: "Our Sister Companies", href: "#our-sister-companies" }
    ]
  },
  { label: "Services", href: sourceHref("/info"), active: false },
  { label: "Security & Privacy", href: sourceHref("/info/securityprivacy"), active: false }
] as const;

type AboutSourceNavigationProps = {
  mobile?: boolean;
  variant: "original" | "modern";
};

function getHeaderOffset() {
  const header = document.querySelector<HTMLElement>(".site-header");
  return Math.ceil((header?.getBoundingClientRect().height ?? 0) + 18);
}

function getHashId(hash: string) {
  return hash.startsWith("#") ? hash.slice(1) : hash;
}

function activateSubListItem(link: HTMLAnchorElement) {
  const currentLi = link.closest<HTMLLIElement>("li");
  const parentList = currentLi?.parentElement;

  if (!currentLi || !parentList?.classList.contains("about-source-nav__sub-list")) {
    return;
  }

  Array.from(parentList.children).forEach((item) => {
    if (item instanceof HTMLLIElement) {
      item.classList.remove("is-active");
    }
  });
  currentLi.classList.add("is-active");
}

export function AboutSourceNavigation({ mobile = false, variant }: AboutSourceNavigationProps) {
  const sectionIds = useMemo(
    () =>
      sidebarNav
        .flatMap((item) => ("children" in item ? item.children : []))
        .map((item) => getHashId(item.href)),
    []
  );
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const pendingScrollTargetId = useRef<string | null>(null);

  const syncScrollOffset = useCallback(() => {
    const offset = getHeaderOffset();
    document.querySelectorAll<HTMLElement>(".about-page").forEach((page) => {
      page.style.setProperty("--about-scroll-offset", `${offset}px`);
    });
    return offset;
  }, []);

  const updateActiveFromScroll = useCallback(() => {
    const scrollOffset = syncScrollOffset();
    const pendingId = pendingScrollTargetId.current;

    if (pendingId) {
      const pendingTarget = document.getElementById(pendingId);

      if (pendingTarget && Math.abs(pendingTarget.getBoundingClientRect().top - scrollOffset) > 2) {
        setActiveId(pendingId);
        return;
      }

      pendingScrollTargetId.current = null;
    }

    const offset = scrollOffset + 8;
    let currentId = sectionIds[0];

    for (const sectionId of sectionIds) {
      const target = document.getElementById(sectionId);

      if (!target) {
        continue;
      }

      if (target.getBoundingClientRect().top - offset <= 0) {
        currentId = sectionId;
      } else {
        break;
      }
    }

    setActiveId(currentId);
  }, [sectionIds, syncScrollOffset]);

  useEffect(() => {
    let frameId = 0;
    const scheduleActiveUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveFromScroll);
    };
    const clearPendingActiveUpdate = () => {
      pendingScrollTargetId.current = null;
      scheduleActiveUpdate();
    };

    syncScrollOffset();
    frameId = window.requestAnimationFrame(() => {
      const initialHash = getHashId(window.location.hash);

      if (sectionIds.includes(initialHash)) {
        setActiveId(initialHash);
      }

      updateActiveFromScroll();
    });
    window.addEventListener("scroll", scheduleActiveUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveUpdate);
    window.addEventListener("hashchange", scheduleActiveUpdate);
    window.addEventListener("scrollend", scheduleActiveUpdate);
    window.addEventListener("wheel", clearPendingActiveUpdate, { passive: true });
    window.addEventListener("touchstart", clearPendingActiveUpdate, { passive: true });
    window.addEventListener("keydown", clearPendingActiveUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleActiveUpdate);
      window.removeEventListener("resize", scheduleActiveUpdate);
      window.removeEventListener("hashchange", scheduleActiveUpdate);
      window.removeEventListener("scrollend", scheduleActiveUpdate);
      window.removeEventListener("wheel", clearPendingActiveUpdate);
      window.removeEventListener("touchstart", clearPendingActiveUpdate);
      window.removeEventListener("keydown", clearPendingActiveUpdate);
    };
  }, [sectionIds, syncScrollOffset, updateActiveFromScroll]);

  function handleSubLinkClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const sectionId = getHashId(href);
    const target = document.getElementById(sectionId);

    activateSubListItem(event.currentTarget);
    pendingScrollTargetId.current = sectionId;
    setActiveId(sectionId);

    if (!target) {
      return;
    }

    event.preventDefault();
    syncScrollOffset();
    target.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
    window.history.pushState(null, "", href);
  }

  return (
    <nav
      className={[
        "about-source-nav",
        `about-source-nav--${variant}`,
        mobile ? "about-source-nav--mobile" : "about-source-nav--desktop"
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="About Teleflora navigation"
    >
      <ul>
        {sidebarNav.map((item) => (
          <li key={item.label} className={item.active ? "is-active" : undefined}>
            <a className="about-source-nav__primary-link" href={item.href} aria-current={item.active ? "page" : undefined}>
              {item.label}
            </a>
            {"children" in item ? (
              <ul className="about-source-nav__sub-list">
                {item.children.map((child) => {
                  const sectionId = getHashId(child.href);
                  const isActive = activeId === sectionId;

                  return (
                    <li key={child.href} className={isActive ? "is-active" : undefined}>
                      <a
                        className="about-source-nav__sub-link"
                        href={child.href}
                        aria-current={isActive ? "location" : undefined}
                        onClick={(event) => handleSubLinkClick(event, child.href)}
                      >
                        {child.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
