import { Breadcrumbs, type Crumb } from '@/components/layout/breadcrumbs';
import { cn } from '@/lib/utils';

export function PageHeader({
  eyebrow, title, en, description, crumbs, children, className, compact = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  en?: string;
  description?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <header className={cn('border-b border-line bg-cream-light', compact ? 'py-8' : 'py-10 sm:py-14', className)}>
      <div className="container">
        <Breadcrumbs items={crumbs} className="mb-7" />
        <div className="max-w-4xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className={cn('editorial-title mt-4 leading-[1.25]', compact ? 'text-[1.9rem] sm:text-[2.3rem]' : 'text-[2.1rem] sm:text-[2.9rem] lg:text-[3.3rem]')}>
            {title}
          </h1>
          {en && <p className="mt-2 font-serif text-[0.95rem] italic text-gold-deep sm:text-[1.05rem]">{en}</p>}
          {description && <p className="mt-5 max-w-3xl text-[0.92rem] leading-8 text-muted sm:text-[1rem]">{description}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </header>
  );
}
