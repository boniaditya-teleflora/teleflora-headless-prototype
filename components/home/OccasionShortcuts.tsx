import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { HomePageData } from "@/lib/api/types";
import { getCategoryHref } from "@/lib/config/category-routes";

type OccasionShortcutsProps = {
  shortcuts: HomePageData["occasionShortcuts"];
};

function getShortcutLabel(key: string) {
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function OccasionShortcuts({ shortcuts }: OccasionShortcutsProps) {
  return (
    <section className="section-block">
      <Container>
        <SectionHeading
          eyebrow=""
          title=""
          description=""
        />
        <div className="occasion-grid">
          {shortcuts.map((shortcut) => (
            <Link key={shortcut.key} href={shortcut.href === "#" ? getCategoryHref(shortcut.key) : shortcut.href} className="occasion-tile" aria-label={`${getShortcutLabel(shortcut.key)} category`}>
              <Image
                src={shortcut.image}
                alt={`${getShortcutLabel(shortcut.key)} category`}
                width={276}
                height={189}
                sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 16vw"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
