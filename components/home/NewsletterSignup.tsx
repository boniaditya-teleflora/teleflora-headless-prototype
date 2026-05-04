import { Container } from "@/components/layout/Container";
import type { HomePageData } from "@/lib/api/types";

type NewsletterSignupProps = {
  newsletter: HomePageData["newsletter"];
};

export function NewsletterSignup({ newsletter }: NewsletterSignupProps) {
  return (
    <section className="newsletter-section">
      <Container>
        <form className="newsletter-panel">
          <div>
            <p className="eyebrow">Join the club</p>
            <h2>{newsletter.heading}</h2>
            <p>{newsletter.description}</p>
          </div>
          <label className="newsletter-panel__field">
            <span>Email address</span>
            <input name="email" type="email" placeholder="you@example.com" />
          </label>
          <button className="button button--primary" type="submit">
            Sign up
          </button>
          <ul className="newsletter-panel__benefits" aria-label="Newsletter benefits">
            {newsletter.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </form>
      </Container>
    </section>
  );
}
