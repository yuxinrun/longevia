import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { evidenceLevels } from '@/content/evidence';
import type { EvidenceLevel } from '@/lib/types';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-forest text-cream-light hover:bg-forest-900 shadow-soft hover:shadow-card',
        outline: 'border border-forest/40 text-forest hover:bg-forest hover:text-cream-light',
        ghost: 'text-forest hover:bg-forest-50',
        gold: 'bg-gold text-forest-900 hover:bg-gold-deep hover:text-cream',
        light: 'border border-cream/60 bg-cream/95 text-forest hover:bg-white',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-7 text-sm sm:h-13 sm:px-8 sm:text-[0.95rem]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export function Badge({
  children, className, tone = 'neutral',
}: { children: React.ReactNode; className?: string; tone?: 'neutral' | 'forest' | 'gold' | 'outline' }) {
  const tones = {
    neutral: 'bg-cream-deep text-forest-700 border-line',
    forest: 'bg-forest text-cream-light border-forest',
    gold: 'bg-gold-light/60 text-forest-700 border-gold/40',
    outline: 'bg-transparent text-forest border-forest/30',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium', tones[tone], className)}>
      {children}
    </span>
  );
}

export function EvidenceBadge({ level, showLabel = true, className }: { level: EvidenceLevel; showLabel?: boolean; className?: string }) {
  const item = evidenceLevels[level];
  return (
    <span
      title={item.description}
      className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold', item.className, className)}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', item.dot)} aria-hidden="true" />
      {showLabel ? item.label : item.short}
    </span>
  );
}

export function SimulatedTag({ className, label = '模拟数据' }: { className?: string; label?: string }) {
  return (
    <span className={cn('simulated-label', className)} title="此图表使用示意性模拟数据，不代表真实人群研究结果">
      <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" aria-hidden="true" />
      {label}
    </span>
  );
}

export function Callout({
  kind = 'note', title, children, className,
}: { kind?: 'note' | 'warning'; title?: string; children: React.ReactNode; className?: string }) {
  const warning = kind === 'warning';
  return (
    <div className={cn('my-6 flex gap-3 rounded-r-lg border-l-2 p-4 text-sm leading-relaxed sm:p-5',
      warning ? 'border-gold-deep bg-gold-light/25 text-ink' : 'border-forest-600 bg-forest-50 text-forest-900', className)}>
      {warning ? <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" /> : <Info className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />}
      <div>
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <div className="[&>p]:my-0">{children}</div>
      </div>
    </div>
  );
}

export function SectionHeading({
  eyebrow, title, description, align = 'left', className, action, as = 'h2',
}: {
  eyebrow?: string; title: React.ReactNode; description?: string;
  align?: 'left' | 'center'; className?: string; action?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const Heading = as;
  return (
    <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center text-center', className)}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading className={cn('editorial-title text-[1.8rem] leading-tight sm:text-[2.25rem] lg:text-[2.6rem]', align === 'center' && 'max-w-3xl')}>
        {title}
      </Heading>
      {description && <p className={cn('max-w-2xl text-sm leading-7 text-muted sm:text-[0.95rem]', align === 'center' && 'mx-auto')}>{description}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px w-full bg-line', className)} />;
}

export function Stat({ value, label, hint }: { value: string; label: string; hint?: string }) {
  return (
    <div className="border-l-2 border-gold/60 pl-4">
      <p className="font-display text-2xl text-forest tabular sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium text-ink">{label}</p>
      {hint && <p className="mt-0.5 text-[0.7rem] text-muted">{hint}</p>}
    </div>
  );
}
