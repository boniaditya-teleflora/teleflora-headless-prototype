import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/plp/ProductGrid";
import { Button } from "@/components/shared/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { HomePageData } from "@/lib/api/types";

type ProductRailProps = {
  rail: HomePageData["productRails"][number];
};

export function ProductRail({ rail }: ProductRailProps) {
  return (
    <section className="section-block">
      <Container>
        <div className="section-heading-row">
          <SectionHeading eyebrow={rail.eyebrow} title={rail.heading} description={rail.description} />
          <Button href={rail.cta.href} variant="secondary">
            {rail.cta.label}
          </Button>
        </div>
        <ProductGrid products={rail.items} />
      </Container>
    </section>
  );
}
