"use client";

import { useState } from "react";

export type SeoFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function TelefloraSeoAccordion({ items }: { items: SeoFaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="teleflora-seo-accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `teleflora-seo-accordion-button-${item.id}`;
        const panelId = `teleflora-seo-accordion-panel-${item.id}`;

        return (
          <article key={item.id} className="teleflora-seo-accordion__item" data-state={isOpen ? "open" : "closed"}>
            <h4 className="teleflora-seo-accordion__heading">
              <button
                id={buttonId}
                type="button"
                className="teleflora-seo-accordion__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId((currentId) => (currentId === item.id ? null : item.id))}
              >
                <span>{item.question}</span>
                <span className="teleflora-seo-accordion__icon" aria-hidden="true" />
              </button>
            </h4>
            <div
              id={panelId}
              className="teleflora-seo-accordion__panel"
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <div className="teleflora-seo-accordion__panel-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
