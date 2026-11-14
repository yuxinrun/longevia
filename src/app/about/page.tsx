import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Badge, Callout } from '@/components/ui/primitives';
import { Illustration } from '@/components/illustrations';
import { BrandMark } from '@/components/illustrations/brand';
import { siteConfig } from '@/lib/seo';
import { coreConcepts } from '@/content/home';
import { evidenceCaveats, evidenceHierarchy, evidenceLevels, medicalDisclaimer } from '@/content/evidence';
import { quotes } from '@/content/quotes';
import { buildMetadata } from '@/lib/seo';
import type { EvidenceLevel } from '@/lib/types';

export const metadata: Metadata = buildMetadata({
  title: '关于本站',
  description: '了解 LONGEVIA 的品牌定位、编辑原则、四级证据标准、医疗安全要求与数据隐私政策。',
  path: '/about',
  keywords: ['关于 LONGEVIA', '证据标准', '医疗安全', '数据隐私'],
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="关于本站 / About"
        title="不追逐长生不老，也不贩卖抗衰焦虑"
        en="The Science of Aging and Longevity"
        description="LONGEVIA 是科学抗衰与健康长寿知识平台。我们用可靠证据帮助人们理解衰老、尽可能延长健康寿命（Healthspan），改善身体机能与生活质量。"
        crumbs={[{ label: '关于本站' }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="forest">{siteConfig.taglineEn}</Badge>
          <Badge tone="outline">{siteConfig.taglineZh}</Badge>
        </div>
      </PageHeader>

      <section className="section-pad bg-cream">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className="eyebrow">我们的定位</span>
            <h2 className="editorial-title mt-4 text-[1.9rem] sm:text-[2.5rem]">一个知识平台，而不是产品广告</h2>
            <p className="mt-5 text-[0.92rem] leading-8 text-ink/90">
              本站不是普通养生博客，也不是宣传抗衰产品的商业网站。我们集合衰老生物学、健康寿命与疾病预防、科学营养与代谢健康、运动与身体机能、睡眠与心理健康、专业书籍与权威机构、研究前沿、健康数据追踪和可视化工具。
            </p>
            <p className="mt-4 text-[0.92rem] leading-8 text-ink/90">
              我们不追逐长生不老的幻想，不贩卖抗衰焦虑，不盲目追逐所谓抗衰神药。用可靠证据帮助人们尽可能延长健康寿命、改善身体机能和生活质量。
            </p>
            <div className="mt-7 flex items-center gap-4 rounded-xl border border-line bg-cream-light p-5">
              <BrandMark size={52} />
              <div>
                <p className="font-display text-[1.15rem] tracking-[0.12em] text-forest">LONGEVIA</p>
                <p className="mt-1 text-xs text-muted">{siteConfig.chineseName} · {siteConfig.taglineAcademic}</p>
              </div>
            </div>
          </div>
          <div className="surface rounded-xl p-6 sm:p-8">
            <h3 className="font-display text-[1.3rem] text-forest">五个必须分清的概念</h3>
            <div className="mt-5 divide-y divide-line">
              {coreConcepts.map((c) => (
                <div key={c.en} className="grid gap-1 py-3 sm:grid-cols-[1fr_1fr] sm:gap-4">
                  <div><p className="font-display text-[1.02rem] text-forest">{c.en}</p><p className="text-xs text-muted">{c.zh}</p></div>
                  <p className="self-center text-[0.8rem] leading-6 text-ink/85">{c.desc}</p>
                </div>
              ))}
            </div>
            <Callout kind="note" title="始终强调" className="mt-5"><p>延长寿命与延长健康寿命，并不是完全相同的目标。本站关注的重点是后者。</p></Callout>
          </div>
        </div>
      </section>

      <section id="evidence-standard" className="section-pad scroll-mt-44 border-y border-line bg-cream-light">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="eyebrow">科学证据标准 / Evidence Standard</span>
              <h2 className="editorial-title mt-4 text-[1.9rem] sm:text-[2.5rem]">这是本站最重要的质量要求</h2>
              <p className="mt-5 text-[0.9rem] leading-8 text-muted">证据来源优先级从高到低如下；每篇文章尽可能提供作者、发表年份、期刊、DOI 或 PubMed 链接、研究对象、研究类型、主要发现、研究局限与实际意义。</p>
              <ol className="mt-6 space-y-2">
                {evidenceHierarchy.map((h) => (
                  <li key={h.rank} className="flex items-center gap-3 text-[0.84rem] text-ink/90">
                    <span className="font-display text-sm text-gold-deep tabular">{String(h.rank).padStart(2, '0')}</span>{h.type}
                  </li>
                ))}
              </ol>
              <div className="mt-7"><Illustration name="reliability" /></div>
            </div>
            <div className="space-y-5">
              <div className="surface rounded-xl p-6">
                <h3 className="font-display text-[1.25rem] text-forest">四级证据标签</h3>
                <div className="mt-4 space-y-3">
                  {(Object.keys(evidenceLevels) as EvidenceLevel[]).map((level) => (
                    <div key={level} className="rounded-lg border border-line bg-cream-light px-4 py-3">
                      <p className="flex items-center gap-2 text-[0.86rem] font-semibold text-forest"><span className={`h-1.5 w-1.5 rounded-full ${evidenceLevels[level].dot}`} />{evidenceLevels[level].label}</p>
                      <p className="mt-1 text-[0.78rem] leading-6 text-muted">{evidenceLevels[level].description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="surface rounded-xl p-6">
                <h3 className="font-display text-[1.25rem] text-forest">十条特别强调</h3>
                <ol className="mt-4 grid gap-2 sm:grid-cols-2">
                  {evidenceCaveats.map((c, i) => (
                    <li key={c} className="flex gap-2 text-[0.78rem] leading-6 text-ink/85">
                      <span className="font-display text-[0.7rem] text-gold-deep tabular">{String(i + 1).padStart(2, '0')}</span>{c}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <span className="eyebrow">医疗安全 / Safety</span>
            <h2 className="editorial-title mt-4 text-[1.8rem] sm:text-[2.2rem]">健康教育，不替代医疗</h2>
            <ul className="mt-6 space-y-3">
              {[
                medicalDisclaimer,
                '有症状或慢性病的人群应咨询专业医疗人员。',
                '药物、补剂和治疗方案需要考虑禁忌与相互作用。',
                '不提供自行使用处方药或实验性抗衰药物的方案。',
                '不建议自行进行极端饮食、长期禁食或不安全的干预。',
                '不宣传未经证实的干细胞治疗、血浆置换或所谓逆龄疗法。',
                '不将健康焦虑作为产品转化手段。',
              ].map((t) => (
                <li key={t} className="flex gap-3 border-b border-line pb-3 text-[0.86rem] leading-7 text-ink/90">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-forest-600" />{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <div id="privacy" className="surface scroll-mt-44 rounded-xl p-6">
              <h3 className="font-display text-[1.25rem] text-forest">数据隐私</h3>
              <ul className="mt-4 space-y-2.5 text-[0.82rem] leading-7 text-muted">
                <li>· 健康记录、打卡、活动、睡眠与训练数据默认保存在浏览器本地（localStorage）。</li>
                <li>· 未在明确授权的情况下上传任何个人健康数据；当前版本根本没有上传功能。</li>
                <li>· 提供数据导出、备份导入、删除全部数据与数据来源标记。</li>
                <li>· 架构预留后端 API、用户系统与同步扩展能力；未来启用同步需明确授权并公开用途。</li>
              </ul>
              <Link href="/lab" className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">前往数据实验室 <ArrowUpRight className="h-3 w-3" /></Link>
            </div>
            <div className="surface rounded-xl p-6">
              <h3 className="font-display text-[1.25rem] text-forest">内容、金句与技术</h3>
              <ul className="mt-4 space-y-2.5 text-[0.82rem] leading-7 text-muted">
                <li>· 全部金句为 LONGEVIA 编辑部原创，共 {quotes.length} 条；不伪造科学家名言，不把营销口号包装成研究结论。</li>
                <li>· 文章采用 MDX，内容以结构化数据管理，页面与业务逻辑分离，SVG 与 ECharts 均为独立组件库。</li>
                <li>· 所有示例图表数据明确标注为模拟数据，不伪装成真实人群研究结果。</li>
                <li>· 支持 PC、平板与手机，并提供 SEO 元数据、站点地图与结构化数据。</li>
              </ul>
            </div>
            <Callout kind="warning" title="纠误"><p>如发现内容、外链或参考来源有误，请以官方原始资料为准，并以此页面公布的原则审慎判断。本站持续修订内容并标注更新日期。</p></Callout>
          </div>
        </div>
      </section>
    </>
  );
}
