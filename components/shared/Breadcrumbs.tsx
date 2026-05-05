import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {items.map((item) => (
            <li key={`${item.label}-${item.href ?? "current"}`}>
              {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <script
        dangerouslySetInnerHTML={{
          __html:
            '(() => { const nav = document.currentScript?.previousElementSibling; const list = nav?.querySelector("ol"); if (!list) return; const scroll = () => { list.scrollLeft = list.scrollWidth - list.clientWidth; }; scroll(); requestAnimationFrame(scroll); window.addEventListener("load", scroll, { once: true }); })();'
        }}
      />
    </>
  );
}
