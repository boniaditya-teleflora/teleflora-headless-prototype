import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/shared/Badge";
import type { HomePageData } from "@/lib/api/types";

type PromoBannerProps = {
  blocks: HomePageData["promotions"];
};

export function PromoBanner({ blocks }: PromoBannerProps) {
  return (
    <section className="section-block section-block--soft">
      <Container>
        <div className="promo-grid">
          {blocks.map((block) => (
            <article key={block.title} className="promo-card">
              <div className="promo-card__icon">
                <Image src={block.icon.src} alt={block.icon.alt} width={72} height={72} />
              </div>
              <Badge>{block.kicker}</Badge>
              <h3>{block.title}</h3>
              <p>{block.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
