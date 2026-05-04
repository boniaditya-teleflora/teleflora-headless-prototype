import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

export function Button({ children, href, variant = "primary" }: ButtonProps) {
  return (
    <Link href={href} className={`button button--${variant}`}>
      {children}
    </Link>
  );
}
