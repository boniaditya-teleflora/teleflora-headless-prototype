import type { ReactNode } from "react";
import Link from "next/link";

import { AboutPageLinkActivation } from "@/components/about/AboutPageLinkActivation";
import { AboutSourceNavigation } from "@/components/about/AboutSourceNavigation";
import { Container } from "@/components/layout/Container";

const TELEFLORA_BASE_URL = "https://www.teleflora.com";
const ASSET_BASE_URL = "https://assets.teleflora.com";

const sourceHref = (pathname: string) => `${TELEFLORA_BASE_URL}${pathname}`;
const assetHref = (pathname: string) => `${ASSET_BASE_URL}${pathname}`;

const companyLogos = [
  {
    alt: "The Wonderful Company",
    href: "https://www.wonderful.com/",
    src: assetHref("/images/corporate-logos/The-Wonderful-Company.png"),
    title: "The Wonderful Company",
    wide: true
  },
  {
    alt: "Fiji Water",
    href: "https://www.fijiwater.com/",
    src: assetHref("/images/corporate-logos/Fiji-Water.png"),
    title: "Fiji Water",
    wide: false
  },
  {
    alt: "Justin Winery",
    href: "https://www.justinwine.com/",
    src: assetHref("/images/corporate-logos/Justin-Wines.png"),
    title: "Justin Wines",
    wide: false
  },
  {
    alt: "Landmark Vineyards",
    href: "https://www.landmarkwine.com/",
    src: assetHref("/images/corporate-logos/Landmark-Vineyards.png"),
    title: "Landmark Winery",
    wide: false
  },
  {
    alt: "Pom Wonderful",
    href: "https://www.pomwonderful.com/",
    src: assetHref("/images/corporate-logos/Pom-Wonderful.png"),
    title: "Pom Wonderful",
    wide: false
  },
  {
    alt: "Suterra",
    href: "https://www.suterra.com/",
    src: assetHref("/images/corporate-logos/Suterra.png"),
    title: "Suterra",
    wide: false
  },
  {
    alt: "Teleflora",
    href: "/",
    src: assetHref("/images/corporate-logos/Teleflora.png"),
    title: "Teleflora",
    wide: false
  },
  {
    alt: "Wonderful Almonds",
    href: "https://www.wonderfulpistachiosandalmonds.com/",
    src: assetHref("/images/corporate-logos/Wonderful-Almonds.png"),
    title: "Wonderful Almonds",
    wide: false
  },
  {
    alt: "Wonderful Halos",
    href: "https://www.halosfun.com/",
    src: assetHref("/images/corporate-logos/Wonderful-Halos.png"),
    title: "Wonderful Halos",
    wide: false
  },
  {
    alt: "Wonderful Pistachios",
    href: "https://www.wonderfulpistachios.com/",
    src: assetHref("/images/corporate-logos/Wonderful-Pistachios.png"),
    title: "Get Crackin' with Wonderful Pistachios",
    wide: false
  },
  {
    alt: "Wonderful Sweet Scarletts",
    href: "https://www.wonderfulcitrus.com/our-citrus/grapefruit.html",
    src: assetHref("/images/corporate-logos/Sweet-Scarletts.png"),
    title: "Wonderful Sweet Scarlett Texas Red Grapefruits",
    wide: false
  }
] as const;

function ExternalLink({
  children,
  href,
  target,
  title
}: {
  children: ReactNode;
  href: string;
  target?: "_blank";
  title?: string;
}) {
  return (
    <a href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined} title={title}>
      {children}
    </a>
  );
}

function AboutBreadcrumbs({ variant }: { variant: "original" | "modern" }) {
  return (
    <nav className={`about-breadcrumbs about-breadcrumbs--${variant}`} aria-label="Breadcrumb">
      <Link className="breadcrumbs-link" href="/">
        Home
      </Link>
      <span className="delimiter_breadcrumb_spacer" aria-hidden="true">
        &gt;
      </span>
      <span className="breadcrumbs-link" aria-current="page">
        Our Company
      </span>
    </nav>
  );
}

function AboutContactBox({ variant }: { variant: "original" | "modern" }) {
  return (
    <aside className={`about-contact about-contact--${variant}`} aria-labelledby={`about-contact-${variant}`}>
      <h5 id={`about-contact-${variant}`}>Contact Us</h5>
      <div className="about-contact__item about-contact__phone">800-493-5610</div>
      <div className="about-contact__item about-contact__email">
        <a href={sourceHref("/aboutUs/order_inquiry.jsp")}>Email Customer Service</a>
      </div>
      <div className="about-contact__item about-contact__address">
        <span className="about-contact__address-desktop">11444 West Olympic Blvd. 4th Floor Los Angeles, CA 90064</span>
        <span className="about-contact__address-mobile">11444 West Olympic Blvd. 10th Floor Los Angeles, CA 90064</span>
      </div>
      <a className="about-contact__back-to-top" href="#">
        Back to Top
      </a>
    </aside>
  );
}

function AboutIntroContent({ variant }: { variant: "original" | "modern" }) {
  return (
    <section className={`about-content-section about-content-section--intro about-content-section--${variant}`} aria-labelledby="our-company">
      <h2 id="our-company">Our Company</h2>
      <p>
        At Teleflora, we&apos;re proud to have been connecting customers with the nation&apos;s best florists for more than 81 years. Headquartered in Los
        Angeles, California, Teleflora has over 10,000 member florists throughout the U.S. and Canada, with an additional 20,000 affiliated florists
        outside North America. This extensive network, coupled with our commitment to exceptional customer service, means that when you send flowers
        from Teleflora, you can be confident that you&apos;re sending the best. As a service organization rather than a florist, Teleflora makes it easy to
        select beautiful florist-delivered products by investing in the most modern technology, seeking continuous innovation and improvement in
        services, and providing the best people in the business to ensure your confidence that your order will be placed easily and filled by a
        Teleflora florist quickly and professionally to your complete satisfaction.
      </p>
      <div className="about-teleflora-logo">
        <Link href="/" itemProp="url">
          <img alt="Teleflora logo" itemProp="logo" src={assetHref("/logo.jpg")} />
        </Link>
      </div>
    </section>
  );
}

function AboutSourceSections({ variant }: { variant: "original" | "modern" }) {
  return (
    <>
      <section className={`about-content-section about-content-section--${variant}`} id="teleflora-guarantee" aria-labelledby="teleflora-guarantee-title">
        <h5 id="teleflora-guarantee-title">The Teleflora Guarantee</h5>
        <p>
          Teleflora strives to satisfy you with every order. If you are not completely satisfied please don&apos;t hesitate to contact us. If you prefer,
          you can call Teleflora directly at 800-493-5610. With a network of florists committed to hand-making bouquets using the freshest flowers
          available, Teleflora lets you send flowers with confidence. And since every arrangement is personally delivered, same-day delivery is
          available on almost every order. If you have a question or comment about an order you placed on or received from Teleflora, please contact{" "}
          <a href={sourceHref("/aboutUs/order_inquiry.jsp")}>Teleflora&apos;s Customer Service</a>.
        </p>
      </section>

      <section className={`about-content-section about-content-section--${variant}`} id="teleflora-difference" aria-labelledby="teleflora-difference-title">
        <h5 id="teleflora-difference-title">Why Teleflora is Different</h5>
        <p>
          Some other online flower companies pre-package their flowers in nondescript cardboard boxes, which are loaded onto trucks and dropped at the
          recipient&apos;s door. Once they finally get inside, the flowers may be damaged or dehydrated. But a Teleflora bouquet is different. At Teleflora,
          we know that a truly exceptional gift of flowers relies on the expertise of a professional florist. All of our floral arrangements are
          artistically arranged by a local florist using only the freshest flowers available, and each gift is personally delivered in a vase - in most
          cases, the same day you place your order - to ensure that it arrives in premium condition, ready to be enjoyed immediately.{" "}
          <ExternalLink href={sourceHref("/info/the-teleflora-difference/")} target="_blank" title="The Teleflora Difference">
            More about The Teleflora Difference
          </ExternalLink>
          .
        </p>
      </section>

      <section
        className={`about-content-section about-content-section--${variant}`}
        id="flowers-in-a-gift-collection"
        aria-labelledby="flowers-in-a-gift-collection-title"
      >
        <h5 id="flowers-in-a-gift-collection-title">The &quot;Flowers in a Gift&quot; Collection</h5>
        <p>
          <img className="about-gift-symbol" alt="" src={assetHref("/images/flowers-in-gift-symbol.gif")} />
          Lynda Resnick, co-owner of Teleflora, pioneered the concept of collectible vases and containers for floral deliveries. The original
          &quot;Flowers in a Gift&quot; collection has expanded over the decades to include everything from coffee mugs to serving pitchers. Wherever you
          see the &quot;Flowers in a Gift&quot; symbol, you know your recipient isn&apos;t just getting flowers, he or she will also receive a keepsake they can
          treasure for years. View our{" "}
          <a href={sourceHref("/everyday-arrangements/teleflora-keepsakes?catID=cat480012")}>&quot;Flowers in a Gift&quot; collection</a>.
        </p>
      </section>

      <section
        className={`about-content-section about-content-section--${variant}`}
        id="supporting-our-florists"
        aria-labelledby="supporting-our-florists-title"
      >
        <h5 id="supporting-our-florists-title">Supporting Our Florists</h5>
        <p>
          <a href="http://www.findaflorist.com/">FindAFlorist.com</a> is the web&apos;s largest floral business directory. Teleflora florists are listed on
          FindAFlorist so that they can connect with customers looking for everything from custom bouquets to full-service wedding flower arrangements.
        </p>
        <p>
          <a href="https://www.myteleflora.com/">MyTeleflora.com</a> is the online resource for Teleflora florists. Florists can access tools designed to
          help make their business more profitable. Member florists can enroll in classes at Teleflora&apos;s Oklahoma Education Center, and use online
          tutorials to improve their creative skills. Through Teleflora&apos;s eFlorist tool, flower shops can build a web presence quickly and easily, with
          the support of the entire Teleflora network.
        </p>
      </section>

      <section className={`about-content-section about-content-section--${variant}`} id="charitable-giving" aria-labelledby="charitable-giving-title">
        <h5 id="charitable-giving-title">Charitable Giving</h5>
        <p>Teleflora is proud to support the following charitable organizations:</p>
        <ul className="about-content-list">
          <li>
            <ExternalLink href={sourceHref("/breast-cancer-research-foundation")} target="_blank" title="BCRF  - Breast Cancer Research Foundation">
              The Breast Cancer Research Foundation
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={sourceHref("/wish")} target="_blank" title="Make-A-Wish Foundation">
              Make-A-Wish Foundation
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={sourceHref("/make-someone-smile-week-flowers")} target="_blank" title="Make Someone Smile Week">
              Make Someone Smile Week
            </ExternalLink>{" "}
            – Launched by Teleflora in 2000, this program delivers over 40,000 Be Happy bouquets to hospital patients, children in foster care,
            residents of nursing homes. Make Someone Smile is one of the largest charitable outreach efforts in the floral industry.
          </li>
        </ul>
      </section>

      <section className={`about-content-section about-content-section--${variant}`} id="teleflora-affiliate" aria-labelledby="teleflora-affiliate-title">
        <h5 id="teleflora-affiliate-title">Teleflora&apos;s Affiliate Program</h5>
        <p>
          <a href={sourceHref("/info/teleflora-affiliate-program")}>Join our Affiliate Program</a> to unlock your revenue potential! Become an affiliate
          partner to earn generous commissions while sharing the joy of flowers with your audience.
        </p>
      </section>

      <section className={`about-content-section about-content-section--${variant}`} id="pr-contact" aria-labelledby="pr-contact-title">
        <h5 id="pr-contact-title">PR Contact</h5>
        <p>
          Email: <a href="mailto:TelefloraPR@Wonderful.com">TelefloraPR@Wonderful.com</a>
          <br />
          View our{" "}
          <a href={sourceHref("/press-releases")} title="Check out Teleflora Press Releases">
            Press Releases
          </a>{" "}
          and{" "}
          <a href={sourceHref("/media")} title={"Check out Teleflora's Media Page"}>
            Media Page
          </a>
        </p>
      </section>

      <section className={`about-content-section about-content-section--${variant}`} id="careers-at-teleflora" aria-labelledby="careers-at-teleflora-title">
        <h5 id="careers-at-teleflora-title">Careers at Teleflora</h5>
        <p>
          Come work for Teleflora and watch your career bloom! View our current job openings at Teleflora. Locations in Los Angeles, CA, Oklahoma City,
          OK Paragould, AR and Ontario, Canada.{" "}
          <ExternalLink
            href="https://careers.smartrecruiters.com/TheWonderfulCompany/teleflora"
            target="_blank"
            title="Teleflora Jobs and Caeers"
          >
            Apply now for Teleflora careers
          </ExternalLink>
          .
        </p>
      </section>

      <section className={`about-content-section about-content-section--${variant}`} id="our-sister-companies" aria-labelledby="our-sister-companies-title">
        <h5 id="our-sister-companies-title">Our Parent and Sister Companies:</h5>
        <div className="about-company-logos">
          {companyLogos.map((logo) => (
            <a
              className={logo.wide ? "about-company-logo about-company-logo--wide" : "about-company-logo"}
              href={logo.href}
              key={logo.alt}
              rel={logo.href.startsWith("http") ? "noreferrer" : undefined}
              target={logo.href.startsWith("http") ? "_blank" : undefined}
            >
              <img alt={logo.alt} src={logo.src} title={logo.title} />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

export function AboutOriginalPage() {
  return (
    <div className="about-page about-page--original" id="top">
      <AboutPageLinkActivation />
      <Container className="about-container">
        <AboutBreadcrumbs variant="original" />
        <h1 className="about-original__page-header">About Teleflora</h1>
      </Container>

      <section className="about-original__banner" aria-label="About Teleflora">
        <img src={assetHref("/images/banners/About-Us-Banner.jpg")} alt="" />
      </section>

      <Container className="about-container about-original__mobile-nav-wrap">
        <AboutSourceNavigation variant="original" mobile />
      </Container>

      <Container className="about-container about-original__layout">
        <AboutSourceNavigation variant="original" />
        <article className="about-original__content" itemScope itemType="https://schema.org/Organization">
          <AboutIntroContent variant="original" />
          <AboutSourceSections variant="original" />
        </article>
        <AboutContactBox variant="original" />
      </Container>
    </div>
  );
}

export function AboutModernPage() {
  return (
    <div className="about-page about-page--modern" id="top">
      <AboutPageLinkActivation />
      <section className="about-modern__hero" aria-label="About Teleflora">
        <img src={assetHref("/images/banners/About-Us-Banner.jpg")} alt="" />
        <Container className="about-container about-modern__hero-inner">
          <AboutBreadcrumbs variant="modern" />
          <h1>About Teleflora</h1>
        </Container>
      </section>

      <Container className="about-container about-modern__layout">
        <aside className="about-modern__rail">
          <AboutSourceNavigation variant="modern" />
          <AboutContactBox variant="modern" />
        </aside>

        <article className="about-modern__content" itemScope itemType="https://schema.org/Organization">
          <AboutIntroContent variant="modern" />
          <AboutSourceSections variant="modern" />
        </article>
      </Container>
    </div>
  );
}
