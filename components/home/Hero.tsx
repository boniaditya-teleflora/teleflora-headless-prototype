import type { CSSProperties } from "react";
import Link from "next/link";

import type { HomePageData } from "@/lib/api/types";
import { resolveCategoryHref } from "@/lib/config/category-routes";

import { Container } from "../layout/Container";

type HeroProps = {
  hero: HomePageData["hero"];
};

function splitHeroHeading(heading: string) {
  const [firstWord, ...rest] = heading.split(" ");

  return {
    primary: firstWord,
    secondary: rest.join(" ")
  };
}

export function Hero({ hero }: HeroProps) {
  const heading = splitHeroHeading(hero.heading);
  const heroStyle = {
    "--hero-background-image": `url("${hero.image.src}")`
  } as CSSProperties;

  return (
    <section className="hero-section" style={heroStyle} aria-label={hero.image.alt}>
      <Container className="hero-grid">
        <div className="hero-copy" aria-labelledby="homepage-hero-heading">
          <div className="hero-content">
            <h1 id="homepage-hero-heading" className="hero-heading">
              <span className="hero-heading__primary">{heading.primary}</span>
              {heading.secondary ? <span className="hero-heading__secondary">{heading.secondary}</span> : null}
            </h1>
            <p className="lead">{hero.subheading}</p>
            <Link href={resolveCategoryHref(hero.primaryCta.href)} className="hero-cta">
              {hero.primaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
