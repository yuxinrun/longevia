import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { ResearchExplorer } from '@/components/research/research-explorer';
import { ResearchComparisonChart } from '@/components/charts';
import { Illustration } from '@/components/illustrations';
import { Badge, Callout } from '@/components/ui/primitives';
import { evidenceHierarchy, evidenceLevels } from '@/content/evidence';
import { researchDisclaimers } from '@/content/research';
import { buildMetadata } from '@/lib/seo';
import type { EvidenceLevel } from '@/lib/types';

export const metadata: Metadata = buildMetadata({
  title: '研究前沿',
  description: '追踪衰老生物学、Senolytics、表观遗传时钟、NAD+、热量限制、微生物组与长寿临床试验等主题，明确区分基础研究、动物实验、观察性研究、随机对照试验与系统综述。',
  path: '/research',
  keywords: ['衰老研究', '长寿研究', 'Senolytics', '临床试验', '证据等级'],
});

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="研究前沿 / Research"
        title="把结论放回证据里"
        en="Following the Science, Carefully"
        description="研究主题追踪栏目。我们标注研究机构、作者、年份、研究类型、研究对象、是否为人体研究、临床应用证据与实际意义，并明确研究局限与争议。"
        crumbs={[{ label: '研究前沿' }]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="forest">{researchDisclaimers.length} 条阅读原则</Badge>
          <Badge tone="outline">区分研究类型</Badge>
          <Badge tone="outline">标注争议</Badge>
          <Badge tone="outline">不编造论文与 DOI</Badge>
        </div>
      </PageHeader>

      <section className="section-pad bg-cream" aria-labelledby="hierarchy-heading">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span className="eyebrow">证据来源优先级</span>
            <h2 id="hierarchy-heading" className="editorial-title mt-4 text-[1.8rem] sm:text-[2.3rem]">先看研究设计，再看结论</h2>
            <p className="mt-4 text-[0.88rem] leading-8 text-muted">不同类型研究能回答的问题不同。基础研究擅长提出机制假说，随机对照试验与系统综述更接近人体效应判断，临床指南把证据转化为实践建议。</p>
            <ol className="mt-6 space-y-2">
              {evidenceHierarchy.map((h) => (
                <li key={h.rank} className="flex gap-3 rounded-lg border border-line bg-cream-light px-4 py-3">
                  <span className="font-display text-sm text-gold-deep tabular">{String(h.rank).padStart(2, '0')}</span>
                  <span><span className="block text-[0.86rem] font-medium text-forest">{h.type}</span><span className="mt-0.5 block text-[0.75rem] leading-6 text-muted">{h.description}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-5">
            <div className="surface rounded-xl p-5"><Illustration name="evidencePyramid" /></div>
            <ResearchComparisonChart height={260} compact />
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-line bg-cream-light">
        <div className="container">
          <ResearchExplorer />
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="eyebrow">阅读原则 / Caveats</span>
            <h2 className="editorial-title mt-4 text-[1.7rem] sm:text-[2.1rem]">不要把新闻标题当成研究结论</h2>
            <ul className="mt-6 space-y-2.5">
              {researchDisclaimers.map((d, i) => (
                <li key={d} className="flex gap-3 border-b border-line pb-2.5 text-[0.85rem] leading-7 text-ink/90">
                  <span className="font-display text-sm text-gold-deep tabular">{String(i + 1).padStart(2, '0')}</span>{d}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="surface rounded-xl p-6">
              <h3 className="font-display text-[1.2rem] text-forest">四级证据标签</h3>
              <div className="mt-4 space-y-3">
                {(Object.keys(evidenceLevels) as EvidenceLevel[]).map((level) => (
                  <div key={level} className="flex gap-3">
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${evidenceLevels[level].dot}`} />
                    <p className="text-[0.8rem] leading-7"><strong className="font-semibold text-forest">{evidenceLevels[level].label}</strong>：{evidenceLevels[level].description}</p>
                  </div>
                ))}
              </div>
            </div>
            <Callout kind="warning" title="研究性干预不是健康建议">
              <p>动物实验不等于人体疗效，细胞实验不等于临床有效，生物标志物改善不等于延长寿命。本站不对研究性药物提供自行使用方案，也不宣传未经证实的干细胞治疗、血浆置换或所谓逆龄疗法。</p>
            </Callout>
            <div className="surface rounded-xl p-5"><Illustration name="benchToClinic" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
