import Link from 'next/link';
import { Callout, EvidenceBadge, SimulatedTag } from '@/components/ui/primitives';
import { ChartSlot, IllustrationBlock } from '@/components/article/chart-slot';
import type { EvidenceLevel } from '@/lib/types';

/** Components available inside every MDX article. */
export const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="scroll-mt-44 mt-12 border-l-2 border-gold pl-4 font-display text-[1.45rem] leading-9 text-forest sm:text-[1.65rem]" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="scroll-mt-44 mt-8 font-display text-[1.15rem] leading-8 text-forest" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="my-4 text-[0.92rem] leading-[1.95] text-ink/90" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="my-4 list-disc space-y-2 pl-5 marker:text-gold" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="my-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-gold-deep" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="pl-1 text-[0.88rem] leading-[1.9] text-ink/85 [&>strong]:text-forest" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} className="my-6 border-l-2 border-gold bg-cream-deep/60 px-5 py-4 font-serif text-[1rem] italic leading-8 text-forest-700" />
  ),
  a: ({ href = '#', children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = href.startsWith('http');
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-forest underline decoration-gold decoration-1 underline-offset-4" {...props}>{children}</a>
    ) : (
      <Link href={href} className="font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">{children}</Link>
    );
  },
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong {...props} className="font-semibold text-forest" />,
  hr: () => <hr className="my-10 border-line" />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-line"><table {...props} className="w-full min-w-[440px] text-[0.82rem]" /></div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => <th {...props} className="bg-cream-deep px-3 py-2 text-left font-semibold text-forest" />,
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td {...props} className="border-t border-line px-3 py-2 align-top leading-7 text-ink/85" />,
  Figure: ({ name, caption }: { name: string; caption?: string }) => <IllustrationBlock name={name} caption={caption} />,
  Chart: ({ name, height = 260 }: { name: string; height?: number }) => (
    <div className="my-8"><ChartSlot name={name} height={height} /></div>
  ),
  Callout,
  EvidenceBadge: ({ level }: { level: EvidenceLevel }) => <EvidenceBadge level={level} />,
  SimulatedTag,
};
