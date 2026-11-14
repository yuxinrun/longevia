import { List } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TocItem { id: string; label: string; level?: 2 | 3 }

export function TableOfContents({ items, className, title = '目录导航' }: { items: TocItem[]; className?: string; title?: string }) {
  return (
    <nav aria-label={title} className={cn('surface rounded-xl p-5', className)}>
      <p className="mb-3 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
        <List className="h-3.5 w-3.5" /> {title}
      </p>
      <ol className="space-y-2.5 border-l border-line">
        {items.map((item, i) => (
          <li key={item.id} className={cn('pl-3.5', item.level === 3 && 'pl-6')}>
            <a href={`#${item.id}`} className="group flex gap-2 text-[0.8rem] leading-6 text-ink/75 transition-colors hover:text-forest">
              <span className="font-display text-[0.68rem] text-muted/70 tabular">{String(i + 1).padStart(2, '0')}</span>
              <span className="group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function MobileToc({ items }: { items: TocItem[] }) {
  return (
    <details className="surface rounded-xl p-4 lg:hidden">
      <summary className="cursor-pointer list-none text-[0.8rem] font-semibold text-forest">目录导航 · 共 {items.length} 节</summary>
      <ol className="mt-3 space-y-2 border-t border-line pt-3">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="block py-0.5 text-[0.8rem] text-muted hover:text-forest">{item.label}</a>
          </li>
        ))}
      </ol>
    </details>
  );
}
