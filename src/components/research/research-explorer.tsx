'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, FlaskConical, Search } from 'lucide-react';
import { Badge, EvidenceBadge } from '@/components/ui/primitives';
import { researchItems, researchTopics } from '@/content/research';
import type { StudyType } from '@/lib/types';

const studyTypes: (StudyType | '全部类型')[] = [
  '全部类型', '系统综述 / Meta 分析', '随机对照试验', '队列研究 / 观察性研究',
  '临床指南 / 专家共识', '叙述性综述', '基础研究（细胞 / 动物）', '临床试验注册信息',
];

export function ResearchExplorer() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('全部主题');
  const [type, setType] = useState<(typeof studyTypes)[number]>('全部类型');
  const [humanOnly, setHumanOnly] = useState(false);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return researchItems.filter((r) =>
      (topic === '全部主题' || r.topic === topic) &&
      (type === '全部类型' || r.studyType === type) &&
      (!humanOnly || r.isHuman) &&
      (!q || `${r.title} ${r.topic} ${r.institution} ${r.findings}`.toLowerCase().includes(q)),
    );
  }, [query, topic, type, humanOnly]);

  return (
    <section aria-labelledby="research-explorer-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">研究主题追踪 / Research Tracker</span>
          <h2 id="research-explorer-heading" className="editorial-title mt-3 text-[1.7rem] sm:text-[2.1rem]">按研究类型与证据边界检索</h2>
        </div>
        <span className="text-xs text-muted">共 {list.length} 项主题</span>
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索研究主题、机构或关键词…" aria-label="搜索研究主题"
            className="w-full rounded-full border border-line bg-cream-light py-2.5 pl-9 pr-4 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <select value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="按主题筛选" className="rounded-full border border-line bg-cream-light px-4 py-2.5 text-sm text-forest outline-none focus:border-forest">
          <option>全部主题</option>{researchTopics.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value as typeof type)} aria-label="按研究类型筛选" className="rounded-full border border-line bg-cream-light px-4 py-2.5 text-sm text-forest outline-none focus:border-forest">
          {studyTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
        <button type="button" onClick={() => setHumanOnly(!humanOnly)} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm ${humanOnly ? 'border-forest bg-forest text-cream' : 'border-line text-forest'}`}>仅看人体研究</button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {list.map((r) => (
          <article key={r.id} className="surface flex flex-col rounded-xl p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="outline">{r.studyType}</Badge>
              <Badge tone="gold">{r.year}</Badge>
              <EvidenceBadge level={r.evidence} showLabel={false} />
              {r.isHuman ? <Badge tone="forest">人体研究</Badge> : <Badge tone="neutral">非人体 / 方法学</Badge>}
            </div>
            <h3 className="mt-4 font-display text-[1.15rem] leading-7 text-forest">{r.title}</h3>
            <p className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-gold-deep">{r.topic}</p>

            <dl className="mt-4 grid gap-2 text-[0.78rem] leading-6 sm:grid-cols-2">
              {[
                { label: '研究机构 / 来源', value: r.institution },
                { label: '作者', value: r.authors },
                { label: '研究对象', value: r.subjects },
                { label: '样本量', value: r.sampleSize ?? '未在本页列示，请以原始文献为准' },
                { label: '临床应用证据', value: r.clinicalApplication },
                { label: '主要发现', value: r.findings },
                { label: '研究局限', value: r.limitations },
                { label: '对普通人的实际意义', value: r.significance },
              ].map((f) => (
                <div key={f.label}>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-gold-deep">{f.label}</dt>
                  <dd className="mt-0.5 text-ink/85">{f.value}</dd>
                </div>
              ))}
            </dl>

            {r.controversial && (
              <p className="mt-4 border-l-2 border-gold-deep bg-gold-light/20 px-3 py-2 text-[0.76rem] leading-6 text-ink"><strong>争议提示：</strong>{r.controversial}</p>
            )}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
              <span className="text-[0.72rem] text-muted">{r.sourceName}</span>
              <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">
                查看官方来源 <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && <p className="mt-6 rounded-lg border border-dashed border-line p-10 text-center text-sm text-muted">没有匹配的研究主题，试试放宽筛选条件。</p>}
      <p className="mt-5 flex items-start gap-2 text-[0.74rem] leading-6 text-muted">
        <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
        本栏目为研究主题追踪，不列示未经核验的样本量、效应量或试验编号。新闻标题、机构新闻稿与注册信息都不是研究结论。
      </p>
    </section>
  );
}
