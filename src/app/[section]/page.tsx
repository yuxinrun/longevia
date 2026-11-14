import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { ArticleCard } from '@/components/article/article-card';
import { Illustration } from '@/components/illustrations';
import { Badge, Callout, EvidenceBadge } from '@/components/ui/primitives';
import { ChartSlot } from '@/components/article/chart-slot';
import { sectionMeta } from '@/content/site';
import { getTopicsBySection, topicSectionSlugs } from '@/content/topics';
import { getArticlesByCategoryHref } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { medicalDisclaimer } from '@/content/evidence';

export function generateStaticParams() {
  return topicSectionSlugs.map((section) => ({ section }));
}

export function generateMetadata({ params }: { params: { section: string } }): Metadata {
  const meta = sectionMeta[params.section];
  if (!meta) return buildMetadata({ path: `/${params.section}`, noIndex: true });
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${params.section}`,
    keywords: [meta.en, meta.title, '循证健康知识'],
  });
}

const sectionCharts: Record<string, string> = {
  'aging-science': 'researchComparison',
  healthspan: 'healthspanConcept',
  nutrition: 'nutritionStructure',
  fitness: 'exerciseDistribution',
  'sleep-mind': 'sleepDuration',
  'longevity-practice': 'habitCompletion',
};

export default function SectionPage({ params }: { params: { section: string } }) {
  const meta = sectionMeta[params.section];
  if (!meta || !topicSectionSlugs.includes(params.section as typeof topicSectionSlugs[number])) notFound();
  const topics = getTopicsBySection(params.section);
  const articles = getArticlesByCategoryHref(`/${params.section}`, 6);

  return (
    <>
      <PageHeader
        eyebrow={`栏目总览 / ${meta.en}`}
        title={meta.title}
        en={meta.en}
        description={meta.description}
        crumbs={[{ label: meta.title }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="forest">{topics.length} 个知识专题</Badge>
          <Badge tone="outline">四级证据标注</Badge>
          <Badge tone="outline">参考文献可追溯</Badge>
        </div>
      </PageHeader>

      <section className="section-pad bg-cream" aria-labelledby="topics-heading">
        <div className="container">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">系统知识 / Knowledge Base</span>
              <h2 id="topics-heading" className="editorial-title mt-4 text-[1.8rem] sm:text-[2.2rem]">从基础概念到证据边界</h2>
            </div>
            <p className="max-w-md text-xs leading-6 text-muted">每个专题采用统一的 15 部分结构：结论、目录、核心概念、原理、证据、行动建议、误区、图表、局限、常见问题与参考文献。</p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {topics.map((topic) => (
              <Link key={topic.slug} href={`/${topic.section}/${topic.slug}`} className="group surface surface-hover flex flex-col overflow-hidden rounded-xl">
                <div className="flex h-[132px] items-center justify-center bg-cream-deep/60 px-8 transition-colors group-hover:bg-forest-50">
                  <div className="w-[150px]"><Illustration name={topic.illustration ?? 'dna'} /></div>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-gold-deep">{topic.en}</span>
                    <EvidenceBadge level={topic.evidence} showLabel={false} />
                  </div>
                  <h3 className="mt-3 font-display text-[1.18rem] leading-7 text-forest">{topic.title}</h3>
                  <p className="mt-2.5 border-l-2 border-gold/60 pl-3 text-[0.8rem] leading-6 text-forest-700">{topic.conclusion}</p>
                  <p className="mt-3 text-[0.82rem] leading-7 text-muted">{topic.lead}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-line pt-3.5 text-[0.72rem] text-muted">
                    <span>{topic.sections.length} 个章节 · {topic.references.length} 项参考来源</span>
                    <ArrowUpRight className="h-4 w-4 text-gold-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-line bg-cream-light" aria-labelledby="section-chart-heading">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <span className="eyebrow">栏目数据视角</span>
            <h2 id="section-chart-heading" className="editorial-title mt-4 text-[1.8rem] sm:text-[2.2rem]">用图表理解概念，不夸大结论</h2>
            <p className="mt-4 text-[0.9rem] leading-8 text-muted">
              此图表使用<strong className="font-semibold text-forest">模拟数据</strong>，仅用于演示图表交互与概念关系。真实个人记录请在「长寿数据实验室」中本地录入；本站不根据少量数据推断生物年龄、剩余寿命或疾病风险。
            </p>
            <Callout kind="note" title="证据与安全的边界" className="mt-6">
              <p>{medicalDisclaimer}</p>
            </Callout>
          </div>
          <ChartSlot name={sectionCharts[params.section]} height={300} />
        </div>
      </section>

      {articles.length > 0 && (
        <section className="section-pad bg-cream" aria-labelledby="section-articles-heading">
          <div className="container">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow">深度阅读</span>
                <h2 id="section-articles-heading" className="editorial-title mt-4 text-[1.8rem] sm:text-[2.2rem]">本栏目的深度文章</h2>
              </div>
              <Link href="/articles" className="inline-flex items-center gap-1 text-sm font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">
                全部文章 <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => <ArticleCard key={a.slug} article={a} compact />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
