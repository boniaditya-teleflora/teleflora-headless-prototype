import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/pdp/ProductGallery";
import { ProductDetails } from "@/components/pdp/ProductDetails";
import { ProductInfo } from "@/components/pdp/ProductInfo";
import { RelatedProducts } from "@/components/pdp/RelatedProducts";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { getProductBySlug, getProductSlugs, getRelatedProducts } from "@/lib/api";
import { generateProductMetadata, getProductStructuredData } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return generateProductMetadata({
      slug,
      name: "Product Not Found",
      shortDescription: "The requested arrangement is unavailable.",
      price: 0,
      currency: "USD",
      image: {
        src: "/images/og-placeholder.svg",
        alt: "Unavailable product placeholder"
      },
      images: [
        {
          src: "/images/og-placeholder.svg",
          alt: "Unavailable product placeholder"
        }
      ],
      category: { slug: "flowers", title: "Flowers" },
      badges: [],
      deliveryNote: "",
      messageNote: "",
      giftOptionsNote: "",
      sku: "unavailable",
      relatedProductSlugs: []
    });
  }

  return generateProductMetadata(product);
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.slug);
  const productSchema = getProductStructuredData(product);

  return (
    <div className="page-section">
      <div className="page-stack">
        <Script
          id={`product-schema-${product.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: product.category.title, href: `/category/${product.category.slug}` },
            { label: product.name }
          ]}
        />
        <section className="product-layout">
          <ProductGallery product={product} />
          <div className="product-summary">
            <ProductInfo product={product} />
          </div>
        </section>
        <ProductDetails product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
