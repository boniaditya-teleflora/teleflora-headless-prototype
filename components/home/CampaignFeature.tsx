import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/shared/Button";
import type { HomePageData } from "@/lib/api/types";

type CampaignFeatureProps = {
  feature: HomePageData["campaignFeature"];
};

export function CampaignFeature({ feature }: CampaignFeatureProps) {
  return (
    <section className="section-block">
      <Container>
        <article className="campaign-feature">
          <div className="campaign-feature__media">
            <Image src={feature.image.src} alt={feature.image.alt} width={720} height={520} />
          </div>
          <div className="campaign-feature__copy">
            <p className="eyebrow">{feature.eyebrow}</p>
            <h2>{feature.heading}</h2>
            <p>{feature.description}</p>
            <ul className="campaign-feature__highlights" aria-label="Campaign highlights">
              {feature.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Button href={feature.cta.href}>{feature.cta.label}</Button>
          </div>
        </article>
      </Container>
    </section>
  );
}
