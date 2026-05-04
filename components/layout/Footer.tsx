import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { footerConfig, type FooterLinkColumn } from "@/lib/config/footer";

type SocialIconName = (typeof footerConfig.social.links)[number]["icon"];
type StoreBadge = (typeof footerConfig.app.badges)[number];

function FooterSocialIcon({ icon }: { icon: SocialIconName }) {
  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" />
        <circle cx="12" cy="12" r="4" fill="none" />
        <circle cx="17" cy="7" r="1" stroke="none" />
      </svg>
    );
  }

  if (icon === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.8 3.8c.6 2.7 2.1 4.3 4.8 4.6v3.2c-1.8 0-3.2-.5-4.7-1.5v5.7c0 3.1-2.1 5-5.1 5-2.8 0-5-1.9-5-4.6 0-2.9 2.3-4.8 5.4-4.7v3.3c-1.3-.2-2.2.4-2.2 1.4 0 .9.7 1.5 1.7 1.5 1.2 0 1.9-.7 1.9-2.3V3.8h3.2Z" />
      </svg>
    );
  }

  if (icon === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.5" y="6.5" width="19" height="11" rx="3" stroke="none" />
        <path d="m10 9.5 5 2.5-5 2.5Z" fill="#ffffff" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.6 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.2H7.4V13h2.8v8h3.4Z" />
    </svg>
  );
}

function StoreIcon({ store }: { store: StoreBadge["store"] }) {
  if (store === "google") {
    return (
      <svg viewBox="0 0 28 30" aria-hidden="true">
        <path d="M3 2.4 17 15 3 27.6Z" fill="#00d084" />
        <path d="M17 15 21.7 10.8 25.8 13.1c1.6.9 1.6 2.9 0 3.8l-4.1 2.3Z" fill="#ffc400" />
        <path d="m3 2.4 18.7 8.4L17 15Z" fill="#1a73e8" />
        <path d="M3 27.6 17 15l4.7 4.2Z" fill="#ff3d00" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 28" aria-hidden="true">
      <path d="M17.5 14.8c0-3 2.5-4.4 2.6-4.5-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 .1-3.9 1.2-4.9 3-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3.1 1.5-.1 2.1-1 4-1s2.4 1 4 1c1.6 0 2.7-1.5 3.7-3 1.1-1.7 1.6-3.3 1.7-3.4-.1 0-3.4-1.3-3.4-5.1ZM14.5 5.9c.8-1 1.4-2.4 1.2-3.9-1.2 0-2.7.8-3.5 1.8-.8.9-1.5 2.4-1.3 3.8 1.4.1 2.8-.7 3.6-1.7Z" />
    </svg>
  );
}

function FooterSignupForm() {
  const { signup } = footerConfig;

  return (
    <section className="footer-utility footer-utility--signup" aria-labelledby="footer-signup-title">
      <h2 id="footer-signup-title">{signup.heading}</h2>
      <p>{signup.description}</p>
      <form className="footer-signup-form" action="#" method="post">
        <label className="sr-only" htmlFor="footer-email">
          Email address
        </label>
        <input id="footer-email" name="email" type="email" placeholder={signup.placeholder} autoComplete="email" />
        <button type="submit">{signup.buttonLabel}</button>
      </form>
    </section>
  );
}

function FooterSocialLinks() {
  const { social } = footerConfig;

  return (
    <section className="footer-utility footer-utility--social" aria-labelledby="footer-social-title">
      <h2 id="footer-social-title">{social.heading}</h2>
      <p>{social.description}</p>
      <ul className="footer-social-list" aria-label="Social links">
        {social.links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} aria-label={link.label} className="footer-social-link">
              <FooterSocialIcon icon={link.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FooterAppBadges() {
  const { app } = footerConfig;

  return (
    <section className="footer-utility footer-utility--app" aria-labelledby="footer-app-title">
      <h2 id="footer-app-title">{app.heading}</h2>
      <p>{app.description}</p>
      <div className="footer-app-badges">
        {app.badges.map((badge) => (
          <Link key={badge.store} href={badge.href} className="footer-store-badge" aria-label={`${badge.sublabel} ${badge.label}`}>
            <StoreIcon store={badge.store} />
            <span>
              <small>{badge.sublabel}</small>
              <strong>{badge.label}</strong>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FooterTopUtilityRow() {
  return (
    <div className="site-footer__utility-row">
      <FooterSignupForm />
      <FooterSocialLinks />
      <FooterAppBadges />
    </div>
  );
}

function FooterDivider() {
  return <div className="site-footer__divider" aria-hidden="true" />;
}

function TrustBadge() {
  return (
    <>
      <a href="#" aria-label="Shopper Approved trust badge">
        <Image
          className="footer-trust-badges__shopper"
          src="https://shopperapproved.com/award/images/31040-small.png"
          alt="Shopper Approved"
          width={120}
          height={60}
          loading="lazy"
        />
      </a>
      <a href="#" className="footer-trust-badges__bbb-link" aria-label="Better Business Bureau trust badge">
        <span className="footer-trust-badges__bbb-clip" aria-hidden="true">
          <Image
            className="footer-trust-badges__bbb"
            src="https://seal-sanjose.bbb.org/logo/ruhzbum/bbb-100002409.png"
            alt=""
            width={300}
            height={68}
            loading="lazy"
          />
        </span>
      </a>
    </>
  );
}

function FooterTrustSection() {
  return (
    <section className="site-footer__trust-section" aria-label="Trust badges">
      <div className="footer-trust-badges">
        <TrustBadge />
      </div>
    </section>
  );
}


function FooterLinkColumn({ column }: { column: FooterLinkColumn }) {
  return (
    <section className="site-footer__group" aria-labelledby={`footer-${column.title.toLowerCase().replaceAll(" ", "-")}`}>
      <h2 id={`footer-${column.title.toLowerCase().replaceAll(" ", "-")}`}>{column.title}</h2>
      <ul>
        {column.links.map((link) => (
          <li key={`${column.title}-${link.label}`}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FooterLinkColumns() {
  return (
    <nav className="site-footer__links" aria-label="Footer navigation">
      {footerConfig.linkColumns.map((column) => (
        <FooterLinkColumn key={column.title} column={column} />
      ))}
    </nav>
  );
}

function FooterLanguageSelector() {
  const { language } = footerConfig;

  return (
    <div className="site-footer__language">
      <label htmlFor="footer-language">{language.label}</label>
      <select id="footer-language" name="language" defaultValue={language.options[0]?.value}>
        {language.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FooterBottomLegal() {
  const { legal } = footerConfig;

  return (
    <div className="site-footer__legal">
      <Link href={legal.href}>{legal.label}</Link>
      <span className="site-footer__privacy-icon" aria-hidden="true">
        ✓
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__container">
        <FooterTopUtilityRow />
        <FooterDivider />
        <FooterTrustSection />
        <FooterDivider />
        <div className="site-footer__directory">
          <FooterLinkColumns />
          <FooterLanguageSelector />
        </div>
        <FooterBottomLegal />
      </Container>
    </footer>
  );
}
