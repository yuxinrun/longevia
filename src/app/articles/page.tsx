import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { ArticleExplorer } from '@/components/article/article-explorer';
import { Badge, Callout } from '@/components/ui/primitives';
import { getAllArticles } from '@/lib/content';
import { absoluteUrl, buildMetadata, jsonLd } from '@/lib/seo';
import { evidenceLevels, medicalDisclaimer } from '@/content/evidence';
import type { EvidenceLevel } from '@/lib/types';

export const metadata: Metadata = buildMetadata({
  title: '深度文章',
  description: 'LONGEVIA 深度文章：每篇都给出一句话结论、核心概念、研究证据、实际意义、常见误区、研究局限与可追溯参考文献。',
  path: '/articles',
  keywords: ['深度文章', '循证解读', '抗衰研究解读', 'Long Reads'],
});

export default function ArticlesPage() {
  const articles = getAllArticles();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LONGEVIA 深度文章',
    numberOfItems: articles.length,
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: a.title,
      url: absoluteUrl(`/articles/${a.slug}`),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <PageHeader
        eyebrow="Long Reads / 深度文章"
        title="把结论放回证据里"
        en="Long Reads"
        description="这里不收集「逆龄奇迹」。每篇文章先给出一句话结论，再拆开概念、研究类型、适用人群与证据边界，最后附上可核验的参考来源。"
        crumbs={[{ label: '深度文章' }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="forest">{articles.length} 篇首批文章</Badge>
          <Badge tone="outline">四级证据标注</Badge>
          <Badge tone="outline">参考文献可追溯</Badge>
          <Badge tone="outline">不推断个人寿命</Badge>
        </div>
      </PageHeader>

      <section className="section-pad bg-cream">
        <div className="container">
          <ArticleExplorer articles={articles} />
        </div>
      </section>

      <section className="section-pad border-t border-line bg-cream-light">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="eyebrow">编辑标准 / Editorial Policy</span>
              <h2 className="editorial-title mt-4 text-[1.7rem] sm:text-[2rem]">一篇文章必须回答的六个问题</h2>
              <ol className="mt-6 space-y-3">
                {[
                  '结论是什么：用一句话说清能被证据支持到什么程度。',
                  '概念是什么：区分机制、生物标志物与临床结局。',
                  '证据来自哪里：说明研究类型、是否有人体数据、样本与局限。',
                  '对普通人意味着什么：只给出不超出证据的行动建议。',
                  '哪些说法是误区：把营销语言与研究发现分开。',
                  '还不知道什么：明确列出争议与尚未验证的部分。',
                ].map((item, i) => (
                  <li key={item} className="flex gap-3 rounded-lg border border-line bg-cream-light px-4 py-3">
                    <span className="font-display text-sm text-gold-deep tabular">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[0.85rem] leading-7 text-ink">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <span className="eyebrow">证据标签 / Evidence Levels</span>
              <h2 className="editorial-title mt-4 text-[1.7rem] sm:text-[2rem]">四级标签，不把「有研究」说成「已证实」</h2>
              <div className="mt-6 space-y-3">
                {(Object.keys(evidenceLevels) as EvidenceLevel[]).map((level) => (
                  <div key={level} className="surface rounded-lg p-4">
                    <p className="font-display text-[0.95rem] text-forest">{evidenceLevels[level].label}</p>
                    <p className="mt-1.5 text-[0.8rem] leading-7 text-muted">{evidenceLevels[level].description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Callout kind="warning" title="阅读边界" className="mt-10">
            <p>动物实验不等于人体疗效，细胞实验不等于临床有效，生物标志物改善不等于延长寿命，相关性不等于因果关系。本站不根据个人记录推断生物年龄、剩余寿命或疾病风险，也不提供处方药与研究性抗衰方案。</p>
          </Callout>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="flex max-w-3xl items-start gap-2 text-[0.74rem] leading-6 text-muted">
              <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />{medicalDisclaimer}
            </p>
            <Link href="/research" className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">
              查看研究前沿 <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
