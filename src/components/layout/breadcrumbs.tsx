import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { absoluteUrl, jsonLd } from '@/lib/seo';

export interface Crumb { label: string; href?: string }

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ label: '首页', href: '/' }, ...items];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.label,
      item: item.href ? absoluteUrl(item.href) : undefined,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <nav aria-label="面包屑导航" className={className}>
        <ol className="scrollbar-thin flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs text-muted">
          {all.map((item, i) => (
            <li key={`${item.label}-${i}`} className="flex shrink-0 items-center gap-1.5">
              {i === 0 && <Home className="h-3 w-3" aria-hidden="true" />}
              {i > 0 && <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden="true" />}
              {item.href && i < all.length - 1 ? (
                <Link href={item.href} className="transition-colors hover:text-forest">{item.label}</Link>
              ) : (
                <span className="font-medium text-forest" aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
