import Link from 'next/link';
import { ArrowUpRight, CalendarCheck2, Database, ShieldCheck } from 'lucide-react';
import { Hero, ConceptBand } from '@/components/home/hero';
import { KnowledgeEntries } from '@/components/home/knowledge-entries';
import { ScientificViews } from '@/components/home/scientific-views';
import { ResearchHighlights } from '@/components/home/research-highlights';
import { DataVisualization } from '@/components/home/data-visualization';
import { QuotesSection } from '@/components/home/quotes-section';
import { ArticlePreview } from '@/components/home/article-preview';
import { getFeaturedArticles } from '@/lib/content';
import { knowledgeEntries } from '@/content/home';
import { siteNotices } from '@/content/site';
import { jsonLd } from '@/lib/seo';

export default function HomePage() {
  const articles = getFeaturedArticles(6);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LONGEVIA 核心知识入口',
    itemListElement: knowledgeEntries.map((entry, i) => ({
      '@type': 'ListItem', position: i + 1, name: entry.title, description: entry.description,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Hero />
      <ConceptBand />
      <KnowledgeEntries />
      <ScientificViews />
      <ResearchHighlights />
      <DataVisualization />
      <QuotesSection />
      <ArticlePreview articles={articles} />

      <section className="border-t border-line bg-cream py-16 sm:py-20" aria-labelledby="next-heading">
        <div className="container">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">从今天开始 / Get Started</span>
              <h2 id="next-heading" className="editorial-title mt-4 text-[1.8rem] sm:text-[2.3rem]">不需要完美，只需要开始记录</h2>
            </div>
            <p className="max-w-md text-xs leading-6 text-muted">两个入口都不要求你设定夸张目标，也不会根据少量数据推断生物年龄或疾病风险。</p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <Link href="/longevity-practice/30-day-plan" className="group surface surface-hover flex items-start gap-5 rounded-xl p-6 sm:p-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest"><CalendarCheck2 className="h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="font-display text-[1.2rem] text-forest">30 天健康长寿入门计划</span>
                <span className="mt-2 block text-[0.85rem] leading-7 text-muted">四个阶段、每日小任务与科学解释，帮助你建立自己的健康基线。不承诺逆转衰老或改变生物年龄。</span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-forest">查看计划 <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </span>
            </Link>
            <Link href="/lab" className="group surface surface-hover flex items-start gap-5 rounded-xl p-6 sm:p-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest"><Database className="h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="font-display text-[1.2rem] text-forest">长寿数据实验室</span>
                <span className="mt-2 block text-[0.85rem] leading-7 text-muted">记录体重、腰围、睡眠与运动，查看长期趋势。数据默认保存在浏览器本地，可随时导出或删除。</span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-forest">进入实验室 <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </span>
            </Link>
          </div>
          <p className="mt-8 flex items-start gap-2 text-[0.74rem] leading-6 text-muted">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
            {siteNotices.educational} {siteNotices.privacy}
          </p>
        </div>
      </section>
    </>
  );
}
