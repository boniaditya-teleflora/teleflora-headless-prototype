import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import { getCategoryHref } from "@/lib/config/category-routes";

export default function NotFound() {
  return (
    <Container>
      <div className="not-found-wrap">
        <EmptyState
          title="We couldn&apos;t find that floral page."
          description="The prototype route may be missing or the mock item may have been removed."
          action={
            <Button href="/" variant="primary">
              Return home
            </Button>
          }
        />
        <p className="not-found-help">
          Looking for the main collection? Visit <Link href={getCategoryHref("flowers")}>Flowers</Link>.
        </p>
      </div>
    </Container>
  );
}
