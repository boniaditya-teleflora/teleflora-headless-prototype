import { Container } from "@/components/layout/Container";
import type { HomePageData } from "@/lib/api/types";
import { getCategoryHref } from "@/lib/config/category-routes";

type QuickShopProps = {
  quickShop: HomePageData["quickShop"];
};

export function QuickShop({ quickShop }: QuickShopProps) {
  return (
    <section className="quick-shop-section" aria-labelledby="quick-shop-heading">
      <Container>
        <form action={getCategoryHref("flowers")} className="quick-shop">
          <div className="quick-shop__intro">
            <p className="eyebrow">{quickShop.eyebrow}</p>
            <h2 id="quick-shop-heading">{quickShop.heading}</h2>
            <p>{quickShop.description}</p>
          </div>
          <label className="field-control">
            <span>Occasion</span>
            <select name="occasion" defaultValue="">
              <option value="" disabled>
                Select occasion
              </option>
              {quickShop.occasions.map((occasion) => (
                <option key={occasion} value={occasion.toLowerCase().replaceAll(" ", "-")}>
                  {occasion}
                </option>
              ))}
            </select>
          </label>
          <label className="field-control">
            <span>Delivery date</span>
            <select name="deliveryDate" defaultValue={quickShop.deliveryWindows[0]}>
              {quickShop.deliveryWindows.map((deliveryWindow) => (
                <option key={deliveryWindow} value={deliveryWindow.toLowerCase().replaceAll(" ", "-")}>
                  {deliveryWindow}
                </option>
              ))}
            </select>
          </label>
          <label className="field-control">
            <span>Recipient ZIP</span>
            <input name="zip" inputMode="numeric" placeholder={quickShop.zipPlaceholder} />
          </label>
          <button className="button button--primary quick-shop__submit" type="submit">
            Find bouquets
          </button>
        </form>
      </Container>
    </section>
  );
}
