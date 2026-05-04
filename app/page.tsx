import { BouquetCollections } from "@/components/home/BouquetCollections";
import { Hero } from "@/components/home/Hero";
import { OccasionShortcuts } from "@/components/home/OccasionShortcuts";
import { getHomePageData } from "@/lib/api";

export const revalidate = 300;

export default async function HomePage() {
  const home = await getHomePageData();

  return (
    <>
      <Hero hero={home.hero} />
      <OccasionShortcuts shortcuts={home.occasionShortcuts} />
      <BouquetCollections collections={home.bouquetCollections} />
    </>
  );
}
