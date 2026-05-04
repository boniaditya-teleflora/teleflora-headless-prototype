import Image from "next/image";

import type { ProductPageData } from "@/lib/api/types";

type ProductGalleryProps = {
  product: ProductPageData;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const featuredImage = product.images[0] ?? product.image;

  return (
    <section className="gallery-panel" aria-label={`${product.name} images`}>
      <div className="gallery-panel__featured">
        <Image src={featuredImage.src} alt={featuredImage.alt} width={900} height={900} priority />
      </div>
    </section>
  );
}
