import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, ExternalLink, Info, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { MobileToc, TableOfContents } from '@/components/article/table-of-contents';
import { ArticleCard } from '@/components/article/article-card';
import { IllustrationBlock } from '@/components/article/chart-slot';
import { mdxComponents } from '@/components/article/mdx-components';
import { Badge, Callout, EvidenceBadge } from '@/components/ui/primitives';
import { extractHeadings, rehypeSectionIds } from '@/lib/mdx';
import { getAllArticleSlugs, getArticle, getRelatedArticles } from '@/lib/content';
import { absoluteUrl, buildMetadata, jsonLd, siteConfig } from '@/lib/seo';
import { evidenceLevels, medicalDisclaimer } from '@/content/evidence';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return buildMetadata({ path: `/articles/${params.slug}`, noIndex: true });
  return buildMetadata({
    title: article.meta.title,
    description: `${article.meta.conclusion} ${article.meta.description}`.slice(0, 160),
    path: `/articles/${article.meta.slug}`,
    keywords: [...article.meta.tags, ...article.meta.keywords],
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const { meta, content } = article;
  const headings = extractHeadings(content);
  const tocItems = [
    ...headings,
    { id: 'references', label: '参考文献' },
    { id: 'related', label: '延伸阅读' },
  ];
  const related = getRelatedArticles(meta.related ?? [], meta.categoryHref, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    inLanguage: 'zh-CN',
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    author: { '@type': 'Organization', name: meta.author },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    mainEntityOfPage: absoluteUrl(`/articles/${meta.slug}`),
    keywords: [...meta.tags, ...meta.keywords].join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <PageHeader
        eyebrow={`深度文章 / ${meta.category}`}
        title={meta.title}
        description={meta.description}
        crumbs={[
          { label: '深度文章', href: '/articles' },
          { label: meta.category, href: meta.categoryHref },
          { label: meta.title },
        ]}
      >
        <div className="surface rounded-xl border-l-2 border-l-gold p-5 sm:p-6">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">一句话结论</p>
          <p className="mt-2 font-display text-[1.1rem] leading-8 text-forest sm:text-[1.25rem]">{meta.conclusion}</p>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.76rem] text-muted">
          <span>{meta.author}</span>
          <span className="h-3 w-px bg-line" />
          <span>{formatDate(meta.date)}</span>
          <span>{meta.readingMinutes} 分钟阅读</span>
          <span>适合：{meta.audience}</span>
          <EvidenceBadge level={meta.evidence} />
        </div>
      </PageHeader>

      <div className="container grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-14">
        <article className="min-w-0">
          {headings.length > 0 && <MobileToc items={tocItems} />}
          {meta.illustration && (
            <IllustrationBlock name={meta.illustration} caption="LONGEVIA 原创科学插画 · 概念示意，不代表真实测量数据" />
          )}

          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{ mdxOptions: { rehypePlugins: [rehypeSectionIds] } }}
          />

          <h2 id="references" className="scroll-mt-44 mt-14 border-l-2 border-gold pl-4 font-display text-[1.45rem] leading-8 text-forest sm:text-[1.7rem]">
            参考文献
          </h2>
          <p className="mt-5 flex items-start gap-2 text-[0.76rem] leading-6 text-muted">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
            以下为可核验的官方来源或公开发表文献。引用信息请以官方页面与原刊为准，本站不编造论文、DOI 或临床试验结果；文献用于解释证据背景，不构成医疗建议。
          </p>
          <ol className="mt-5 space-y-3">
            {meta.references.map((ref, i) => (
              <li key={i} className="border-l-2 border-line pl-4 text-[0.8rem] leading-7">
                <p className="text-ink/90">{String(i + 1).padStart(2, '0')}. {ref.citation}</p>
                {ref.note && <p className="mt-0.5 text-[0.74rem] text-muted">{ref.note}</p>}
                {ref.url && (
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-[0.74rem] font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">
                    查看来源 <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </li>
            ))}
          </ol>

          <h2 id="related" className="scroll-mt-44 mt-14 border-l-2 border-gold pl-4 font-display text-[1.45rem] leading-8 text-forest sm:text-[1.7rem]">
            延伸阅读
          </h2>
          {related.length ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((a) => <ArticleCard key={a.slug} article={a} compact />)}
            </div>
          ) : (
            <p className="mt-5 text-[0.85rem] text-muted">相关文章正在编辑中，可先浏览本站其他栏目。</p>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
            <p className="flex max-w-2xl items-start gap-2 text-[0.74rem] leading-6 text-muted">
              <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />{medicalDisclaimer}
            </p>
            <Link href="/articles" className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">
              <ArrowLeft className="h-3 w-3" /> 返回全部文章
            </Link>
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-[180px] space-y-4">
            {headings.length > 0 && <TableOfContents items={tocItems} />}
            <div className="surface rounded-xl p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">证据等级</p>
              <div className="mt-2"><EvidenceBadge level={meta.evidence} /></div>
              <p className="mt-2.5 text-xs leading-6 text-muted">{evidenceLevels[meta.evidence].description}</p>
              {meta.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {meta.tags.map((tag) => <Badge key={tag} tone="outline">{tag}</Badge>)}
                </div>
              )}
            </div>
            <Badge tone="outline">更新于 {formatDate(meta.updated ?? meta.date)}</Badge>
            <Link href={meta.categoryHref} className="block text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">
              进入「{meta.category}」栏目
            </Link>
          </div>
        </aside>
      </div>

      <Callout kind="note" title="关于本站图表" className="container mb-12">
        <p>文章中的图表若带有「模拟数据」标识，仅用于解释概念与交互方式，不代表真实人群研究结果。个人数据请在「长寿数据实验室」本地录入。</p>
      </Callout>
    </>
  );
}
