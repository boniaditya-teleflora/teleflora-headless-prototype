"use client";

import { useEffect } from "react";

function activateImmediateListParent(event: MouseEvent) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const link = target.closest<HTMLAnchorElement>(".about-page a");
  const parentItem = link?.parentElement;

  if (parentItem instanceof HTMLLIElement) {
    parentItem.classList.add("is-active");
  }
}

export function AboutPageLinkActivation() {
  useEffect(() => {
    const pages = document.querySelectorAll<HTMLElement>(".about-page");

    pages.forEach((page) => {
      page.addEventListener("click", activateImmediateListParent);
    });

    return () => {
      pages.forEach((page) => {
        page.removeEventListener("click", activateImmediateListParent);
      });
    };
  }, []);

  return null;
}
