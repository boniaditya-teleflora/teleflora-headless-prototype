import { formatPrice } from "@/lib/utils";

type PriceProps = {
  amount: number;
  currency: string;
  size?: "default" | "large";
};

export function Price({ amount, currency, size = "default" }: PriceProps) {
  return <span className={`price price--${size}`}>{formatPrice(amount, currency)}</span>;
}
