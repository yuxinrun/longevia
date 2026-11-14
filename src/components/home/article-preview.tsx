import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/article/article-card';
import { Illustration } from '@/components/illustrations';
import { Button, EvidenceBadge } from '@/components/ui/primitives';
import { formatDate } from '@/lib/utils';
import type { ArticleMeta } from '@/lib/types';

export function ArticlePreview({ articles }: { articles: ArticleMeta[] }) {
  if (!articles.length) {
    return (
      <section className="section-pad bg-cream-light" aria-labelledby="articles-heading">
        <div className="container">
          <span className="eyebrow">深度文章 / Long Reads</span>
          <h2 id="articles-heading" className="editorial-title mt-4 text-[1.9rem] sm:text-[2.4rem]">首批深度文章</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            首批 30 篇深度文章正在按证据标准编辑。你仍可以先从各栏目的系统知识页面开始阅读。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild><Link href="/aging-science">浏览衰老科学 <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild variant="outline"><Link href="/research">查看研究前沿</Link></Button>
          </div>
        </div>
      </section>
    );
  }

  const [lead, ...rest] = articles;
  const cards = rest.slice(0, 4);

  return (
    <section className="section-pad bg-cream-light" aria-labelledby="articles-heading">
      <div className="container">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">深度文章 / Long Reads</span>
            <h2 id="articles-heading" className="editorial-title mt-4 text-[1.9rem] sm:text-[2.4rem] lg:text-[2.7rem]">把结论放回证据里</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              每篇文章都包含一句话结论、核心概念、研究证据、实际意义、常见误区、研究局限与可追溯的参考文献。
            </p>
          </div>
          <Link href="/articles" className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">
            浏览全部文章 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
          <Link href={`/articles/${lead.slug}`} className="group surface surface-hover flex flex-col overflow-hidden rounded-xl">
            <div className="relative flex items-center justify-center bg-cream-deep px-8 py-8 sm:py-10">
              <div className="w-full max-w-[320px]"><Illustration name={lead.illustration ?? 'dna'} /></div>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-forest px-2.5 py-0.5 text-[0.7rem] font-medium text-cream">编辑精选</span>
                <EvidenceBadge level={lead.evidence} />
                <span className="text-xs text-muted">{lead.category}</span>
              </div>
              <h3 className="mt-4 font-display text-[1.45rem] leading-9 text-forest sm:text-[1.7rem]">{lead.title}</h3>
              <p className="mt-3 border-l-2 border-gold pl-4 text-[0.9rem] leading-7 text-forest-700">{lead.conclusion}</p>
              <p className="mt-4 text-[0.85rem] leading-7 text-muted">{lead.description}</p>
              <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
                <span>{formatDate(lead.date)} · {lead.readingMinutes} 分钟阅读</span>
                <ArrowRight className="h-4 w-4 text-gold-deep transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <div className="grid gap-5 sm:grid-cols-2">
            {cards.map((a) => <ArticleCard key={a.slug} article={a} compact />)}
          </div>
        </div>
      </div>
    </section>
  );
}
