import Link from 'next/link';
import { ExternalLink, Info, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { MobileToc, TableOfContents, type TocItem } from '@/components/article/table-of-contents';
import { ChartSlot, IllustrationBlock } from '@/components/article/chart-slot';
import { ArticleCard } from '@/components/article/article-card';
import { Badge, Callout, EvidenceBadge } from '@/components/ui/primitives';
import { Illustration } from '@/components/illustrations';
import { sectionMeta } from '@/content/site';
import { evidenceLevels, medicalDisclaimer } from '@/content/evidence';
import { formatDate } from '@/lib/utils';
import type { ArticleMeta, TopicPage } from '@/lib/types';

function SectionTitle({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="scroll-mt-44 mt-14 border-l-2 border-gold pl-4 font-display text-[1.45rem] leading-8 text-forest sm:text-[1.7rem]">
      {title}
    </h2>
  );
}

export function TopicTemplate({
  topic, related = [], children,
}: {
  topic: TopicPage;
  related?: ArticleMeta[];
  children?: React.ReactNode;
}) {
  const meta = sectionMeta[topic.section];
  const tocItems: TocItem[] = [
    { id: 'concepts', label: '核心概念' },
    { id: 'principles', label: '深入解析' },
    ...topic.sections.map((s) => ({ id: s.id, label: s.title, level: 3 as const })),
    { id: 'evidence', label: '研究证据' },
    { id: 'significance', label: '实际意义' },
    { id: 'actions', label: '可执行的行动建议' },
    { id: 'misconceptions', label: '常见误区' },
    { id: 'visuals', label: '图表与 SVG 解释' },
    { id: 'limitations', label: '研究局限' },
    { id: 'faq', label: '常见问题' },
    { id: 'references', label: '参考文献' },
    { id: 'related', label: '相关文章' },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`${meta.eyebrow} / ${meta.en}`}
        title={topic.title}
        en={topic.en}
        crumbs={[
          { label: meta.title, href: `/${topic.section}` },
          { label: topic.title },
        ]}
      >
        <div className="surface rounded-xl border-l-2 border-l-gold p-5 sm:p-6">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">一句话结论</p>
          <p className="mt-2 font-display text-[1.1rem] leading-8 text-forest sm:text-[1.25rem]">{topic.conclusion}</p>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.76rem] text-muted">
          <span>适合谁阅读：{topic.audience}</span>
          <span className="h-3 w-px bg-line" />
          <span>更新于 {formatDate(topic.updated)}</span>
          <EvidenceBadge level={topic.evidence} />
        </div>
      </PageHeader>

      <div className="container grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-14">
        <div className="min-w-0">
          <MobileToc items={tocItems} />

          {/* 5. Core concepts */}
          <SectionTitle id="concepts" title="核心概念" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {topic.keyPoints.map((point, i) => (
              <div key={i} className="surface flex gap-3 rounded-lg p-4">
                <span className="font-display text-sm text-gold-deep tabular">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[0.85rem] leading-7 text-ink">{point}</p>
              </div>
            ))}
          </div>

          {/* 6. Principles / biology / evidence sections */}
          <SectionTitle id="principles" title="深入解析" />
          {topic.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-44 mt-10">
              <h3 className="font-display text-[1.2rem] leading-8 text-forest sm:text-[1.35rem]">{section.title}</h3>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-[0.9rem] leading-[1.95] text-ink/90">{p}</p>
              ))}
              {section.bullets && (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[0.86rem] leading-7 text-ink/85">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />{b}
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="mt-6 overflow-x-auto rounded-lg border border-line">
                  <table className="w-full min-w-[420px] text-[0.8rem]">
                    <thead><tr>{section.table.headers.map((h) => <th key={h} className="bg-cream-deep px-3 py-2.5 text-left font-semibold text-forest">{h}</th>)}</tr></thead>
                    <tbody>
                      {section.table.rows.map((row, i) => (
                        <tr key={i} className="border-t border-line">
                          {row.map((cell, j) => <td key={j} className="px-3 py-2.5 align-top leading-6 text-ink/85">{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.callout && <Callout kind={section.callout.kind} title={section.callout.title}>{section.callout.text}</Callout>}
              {section.illustration && (
                <figure className="mt-6 rounded-xl border border-line bg-cream-light p-4">
                  <div className="mx-auto max-w-[380px]"><Illustration name={section.illustration} /></div>
                  <figcaption className="mt-2 text-center text-[0.72rem] text-muted">原创科学示意图 · 概念解释，非测量数据</figcaption>
                </figure>
              )}
              {section.chart && <div className="mt-6"><ChartSlot name={section.chart} height={260} /></div>}
            </section>
          ))}

          {children && <div className="mt-12">{children}</div>}

          {/* 7. Evidence */}
          <SectionTitle id="evidence" title="研究证据" />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <EvidenceBadge level={topic.evidence} />
            <span className="text-[0.8rem] text-muted">{evidenceLevels[topic.evidence].description}</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(Object.keys(evidenceLevels) as (keyof typeof evidenceLevels)[]).map((level) => (
              <div key={level} className="flex items-start gap-2.5 rounded-lg border border-line px-3.5 py-2.5">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${evidenceLevels[level].dot}`} />
                <p className="text-[0.76rem] leading-6 text-muted"><strong className="font-semibold text-forest">{evidenceLevels[level].label}</strong>：{evidenceLevels[level].description}</p>
              </div>
            ))}
          </div>

          {/* 8. Significance */}
          <SectionTitle id="significance" title="实际意义" />
          <p className="mt-5 text-[0.9rem] leading-[1.95] text-ink/90">{topic.lead}</p>
          <Callout kind="note" title="阅读提醒">
            本页内容用于健康教育。动物实验不等于人体疗效，生物标志物改善不等于延长寿命，相关性不等于因果关系。
          </Callout>

          {/* 9. Actions */}
          <SectionTitle id="actions" title="可执行的行动建议" />
          <ol className="mt-6 space-y-3">
            {topic.actions.map((action, i) => (
              <li key={i} className="flex gap-3 rounded-lg border border-line bg-cream-light px-4 py-3">
                <span className="font-display text-sm text-gold-deep tabular">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[0.86rem] leading-7 text-ink">{action}</span>
              </li>
            ))}
          </ol>

          {/* 10. Misconceptions */}
          <SectionTitle id="misconceptions" title="常见误区" />
          <div className="mt-6 space-y-3">
            {topic.misconceptions.map((m) => (
              <div key={m.myth} className="grid gap-2 rounded-lg border border-line p-4 sm:grid-cols-2 sm:gap-5">
                <p className="text-[0.84rem] leading-7 text-muted"><span className="mr-1.5 font-semibold text-gold-deep">误区</span>{m.myth}</p>
                <p className="text-[0.84rem] leading-7 text-ink"><span className="mr-1.5 font-semibold text-forest">更准确的说法</span>{m.fact}</p>
              </div>
            ))}
          </div>

          {/* 11. Charts & SVG */}
          <SectionTitle id="visuals" title="图表与 SVG 解释" />
          <p className="mt-5 text-[0.86rem] leading-7 text-muted">
            复杂图示需要配套文字解释。下图为原创矢量示意或模拟数据图表，用于帮助理解概念，不代表真实人群研究结果，也不用于医学判断。
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <IllustrationBlock name={topic.illustration} />
            <ChartSlot name={topic.chart} height={260} />
          </div>

          {/* 12. Limitations */}
          <SectionTitle id="limitations" title="研究局限" />
          <Callout kind="warning" title="证据边界" className="mt-6"><p>{topic.limitations}</p></Callout>

          {/* 13. FAQ */}
          <SectionTitle id="faq" title="常见问题" />
          <div className="mt-6 space-y-2.5">
            {topic.faq.map((item) => (
              <details key={item.q} className="group rounded-lg border border-line bg-cream-light px-4 py-3">
                <summary className="cursor-pointer list-none text-[0.88rem] font-medium text-forest marker:hidden">
                  <span className="mr-2 font-display text-gold-deep">Q</span>{item.q}
                </summary>
                <p className="mt-2.5 border-t border-line pt-2.5 text-[0.84rem] leading-7 text-muted">
                  <span className="mr-2 font-display font-semibold text-forest">A</span>{item.a}
                </p>
              </details>
            ))}
          </div>

          {/* 14. References */}
          <SectionTitle id="references" title="参考文献" />
          <p className="mt-5 flex items-start gap-2 text-[0.76rem] leading-6 text-muted">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
            以下为可核验的官方来源或公开发表文献。具体书目与试验信息请以官方页面为准，本站不编造论文、DOI 或临床试验结果。
          </p>
          <ol className="mt-4 space-y-3">
            {topic.references.map((ref, i) => (
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

          {/* 15. Related articles */}
          <SectionTitle id="related" title="相关文章" />
          {related.length ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((a) => <ArticleCard key={a.slug} article={a} compact />)}
            </div>
          ) : (
            <p className="mt-5 text-[0.85rem] text-muted">相关文章正在编辑中，可先浏览本站其他栏目。</p>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
            <p className="flex items-start gap-2 text-[0.74rem] leading-6 text-muted">
              <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />{medicalDisclaimer}
            </p>
            <Link href={`/${topic.section}`} className="text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">返回{meta.title}栏目</Link>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-[180px] space-y-4">
            <TableOfContents items={tocItems} />
            <div className="border-l-2 border-gold/50 pl-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">证据标签</p>
              <p className="mt-1 text-xs leading-6 text-muted">{evidenceLevels[topic.evidence].label} · {evidenceLevels[topic.evidence].description}</p>
            </div>
            <Badge tone="outline">更新于 {formatDate(topic.updated)}</Badge>
          </div>
        </aside>
      </div>
    </>
  );
}
