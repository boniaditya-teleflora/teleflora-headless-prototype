import Link from "next/link";

import { TelefloraSeoAccordion, type SeoFaqItem } from "@/components/home/TelefloraSeoAccordion";
import { Container } from "@/components/layout/Container";

type InlineLink = {
  label: string;
  href: string;
};

type RichTextSegment = string | InlineLink;

type SeoContentBlock = {
  id: string;
  title: string;
  paragraphs: RichTextSegment[][];
};

const seoTitle = "Teleflora: Same-Day Local Flower Delivery & More";

const seoContentBlocks: SeoContentBlock[] = [
  {
    id: "flowers-online",
    title: "Flowers Online: Bouquets Arranged by Local Florists",
    paragraphs: [
      [
        "Teleflora is proud to offer beautiful flowers that are always arranged by expert local florists! We make it easy to order flowers online and we offer flower delivery right to your loved one’s door. If you need to order plants or flower arrangements last-minute, we have ",
        {
          label: "same-day flower delivery",
          href: "/same-day-flower-delivery?catID=cat480085"
        },
        " available. In some circumstances, pick-up from the florist may also be available."
      ]
    ]
  },
  {
    id: "order-flowers",
    title: "Order Flowers for Loved Ones for Any Occasion",
    paragraphs: [
      [
        "We will help you gift ",
        {
          label: "happy birthday flowers",
          href: "/birthday-flowers?catID=cat210012"
        },
        ", ",
        {
          label: "get well bouquets",
          href: "/get-well-flowers?catID=cat210073"
        },
        ", ",
        {
          label: "funeral flowers",
          href: "/funeral-sympathy-collection"
        },
        ", and order everyday beautiful florals or plants just because. With a huge variety of fresh, local flower arrangements, we're sure you'll be able to find the right flowers for just about anyone!"
      ],
      [
        "If you don't know what flowers to order, you can shop ",
        {
          label: "flowers by type",
          href: "/flower-by-type?catID=cat210139"
        },
        " and choose from roses, carnations, daisies, tulips, lilies, and more. Visit the ",
        {
          label: "meaning of flowers",
          href: "/meaning-of-flowers"
        },
        " glossary so you know exactly what you're saying with your online flower gifts."
      ]
    ]
  },
  {
    id: "online-deals",
    title: "Online Deals for Flowers Near You",
    paragraphs: [
      [
        "If you're looking for the best ",
        {
          label: "promo codes and deals",
          href: "/teleflora-coupon-promo-code"
        },
        " for online flowers or same-day delivery, we've got you covered! In addition to Teleflora coupons, we also have ",
        {
          label: "Deal of the Day",
          href: "/product/deal-of-the-day"
        },
        " bouquets. You pick a price and a local florist will create a one-of-a-kind flower arrangement with their own signature style using the season’s freshest blooms!"
      ]
    ]
  }
];

const seoFaqItems: SeoFaqItem[] = [
  {
    id: "best-local-flower-delivery",
    question: "Who Offers the Best Local Flower Delivery Online?",
    answer:
      "Teleflora has the best local flower delivery available because we work with over 10,000 local florists all around the country to bring you locally-arranged bouquets. So, know that every bouquet you order from us supports a small business near you or your loved one. We couldn’t do it without our amazing florists! If you choose bouquet delivery online, your gift will be hand-delivered to your recipient with the utmost care. In some circumstances, pick-up from the florist may also be available."
  },
  {
    id: "same-day-last-minute-gifts",
    question: "Do You Have Same-Day Flower Delivery for Last Minute Gifts?",
    answer:
      "Same-day delivery is available on many of our flower arrangements! So, whether you choose to send flowers in advance or need a last-minute gift delivery, we’ve got you covered with the freshest flowers available!"
  },
  {
    id: "sending-flowers-cost",
    question: "How Much Does Sending Flowers Online Cost?",
    answer:
      "We have fresh flower arrangements and plants for every budget and occasion, so you never have to worry about not being able to find something for your loved ones. Plus, our Deal of the Day bouquets allows you to name your own bouquet price for a one-of-a-kind arrangement."
  }
];

function renderRichText(segments: RichTextSegment[]) {
  return segments.map((segment, index) => {
    if (typeof segment === "string") {
      return segment;
    }

    return (
      <Link key={`${segment.href}-${segment.label}-${index}`} href={segment.href}>
        {segment.label}
      </Link>
    );
  });
}

export function TelefloraSeoContent() {
  return (
    <section
      id="teleflora-seo-content"
      className="teleflora-seo-content"
      aria-labelledby="teleflora-seo-content-title"
    >
      <Container className="teleflora-seo-content__container">
        <header className="teleflora-seo-content__header">
          <h2 id="teleflora-seo-content-title">{seoTitle}</h2>
        </header>

        <div className="teleflora-seo-content__layout">
          <div className="teleflora-seo-content__cards">
            {seoContentBlocks.map((block) => (
              <article key={block.id} className="teleflora-seo-content__card" aria-labelledby={`${block.id}-title`}>
                <h3 id={`${block.id}-title`}>{block.title}</h3>
                {block.paragraphs.map((paragraph, index) => (
                  <p key={index}>{renderRichText(paragraph)}</p>
                ))}
              </article>
            ))}
          </div>

          <section className="teleflora-seo-content__faq" aria-labelledby="teleflora-seo-content-faq-title">
            <h3 id="teleflora-seo-content-faq-title">Ordering Flowers Online: Frequently Asked Questions</h3>
            <TelefloraSeoAccordion items={seoFaqItems} />
          </section>
        </div>
      </Container>
    </section>
  );
}
