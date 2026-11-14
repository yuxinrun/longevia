import Link from 'next/link';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { Badge, EvidenceBadge } from '@/components/ui/primitives';
import { formatDate } from '@/lib/utils';
import type { ArticleMeta } from '@/lib/types';

export function ArticleCard({ article, compact = false }: { article: ArticleMeta; compact?: boolean }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group surface surface-hover flex h-full flex-col rounded-xl p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="outline">{article.category}</Badge>
        <EvidenceBadge level={article.evidence} showLabel={false} />
      </div>
      <h3 className={`mt-4 font-display leading-7 text-forest ${compact ? 'text-[1.02rem]' : 'text-[1.15rem]'}`}>
        {article.title}
      </h3>
      {!compact && article.conclusion && (
        <p className="mt-2.5 border-l-2 border-gold/60 pl-3 text-[0.82rem] leading-6 text-forest-700">
          {article.conclusion}
        </p>
      )}
      <p className="mt-3 text-[0.82rem] leading-7 text-muted">{article.description}</p>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3.5 pt-4 text-[0.72rem] text-muted">
        <span className="flex items-center gap-3">
          <span>{formatDate(article.date)}</span>
          <span className="flex items-center gap-1"><Clock3 className="h-3 w-3" />{article.readingMinutes} 分钟</span>
        </span>
        <ArrowUpRight className="h-4 w-4 text-gold-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
