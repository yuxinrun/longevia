'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Search, ShieldAlert } from 'lucide-react';
import { Illustration } from '@/components/illustrations';
import { Badge, EvidenceBadge } from '@/components/ui/primitives';
import { mechanisms, mechanismFrameworkNote } from '@/content/mechanisms';
import { supplementBottomLine, supplements } from '@/content/supplements';
import { evidenceLevels } from '@/content/evidence';
import type { EvidenceLevel } from '@/lib/types';

const mechanismFields = [
  { key: 'definition', label: '基本定义' },
  { key: 'process', label: '发生机制' },
  { key: 'impact', label: '对人体的潜在影响' },
  { key: 'research', label: '相关研究' },
  { key: 'example', label: '普通人可以理解的例子' },
  { key: 'lifestyle', label: '相关生活方式研究' },
  { key: 'limitations', label: '当前研究局限' },
] as const;

export function MechanismDatabase() {
  const [open, setOpen] = useState<string>(mechanisms[0].id);
  const [onlyDisputed, setOnlyDisputed] = useState(false);
  const [level, setLevel] = useState<'all' | EvidenceLevel>('all');
  const list = useMemo(
    () => mechanisms.filter((m) => (!onlyDisputed || m.disputed) && (level === 'all' || m.evidence === level)),
    [onlyDisputed, level],
  );

  return (
    <section className="scroll-mt-44" aria-labelledby="mechanism-db-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">机制数据库 / Interactive</span>
          <h2 id="mechanism-db-heading" className="editorial-title mt-3 text-[1.5rem] sm:text-[1.9rem]">十二个机制，逐项拆解</h2>
        </div>
        <span className="text-xs text-muted">共 {list.length} 项</span>
      </div>
      <p className="mt-4 text-[0.83rem] leading-7 text-muted">{mechanismFrameworkNote}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => setOnlyDisputed(false)} className={`rounded-full border px-3 py-1.5 text-xs ${!onlyDisputed ? 'border-forest bg-forest text-cream' : 'border-line text-forest'}`}>全部机制</button>
        <button type="button" onClick={() => setOnlyDisputed(true)} className={`rounded-full border px-3 py-1.5 text-xs ${onlyDisputed ? 'border-forest bg-forest text-cream' : 'border-line text-forest'}`}>仅看存在争议</button>
        <span className="mx-1 h-6 w-px bg-line" />
        {(['all', 'moderate', 'limited'] as const).map((l) => (
          <button key={l} type="button" onClick={() => setLevel(l)} className={`rounded-full border px-3 py-1.5 text-xs ${level === l ? 'border-gold bg-gold-light/50 text-forest' : 'border-line text-muted'}`}>
            {l === 'all' ? '全部证据等级' : evidenceLevels[l].label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {list.map((m) => (
          <div key={m.id} className="surface overflow-hidden rounded-xl">
            <button
              type="button"
              onClick={() => setOpen(open === m.id ? '' : m.id)}
              aria-expanded={open === m.id}
              className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5"
            >
              <span className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="font-display text-[1.02rem] text-forest">{m.name}</span>
                <span className="font-serif text-xs italic text-muted">{m.en}</span>
                <EvidenceBadge level={m.evidence} showLabel={false} />
                {m.disputed && <Badge tone="gold">存在争议</Badge>}
              </span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-muted transition-transform ${open === m.id ? 'rotate-180' : ''}`} />
            </button>
            {open === m.id && (
              <div className="border-t border-line p-4 sm:p-5">
                <div className="grid gap-5 md:grid-cols-[180px_1fr]">
                  <figure className="self-start rounded-lg bg-cream-deep/60 p-3">
                    <Illustration name={m.illustration} />
                    <figcaption className="mt-1 text-center text-[0.68rem] text-muted">原创机制示意图</figcaption>
                  </figure>
                  <dl className="space-y-3">
                    {mechanismFields.map((f) => (
                      <div key={f.key}>
                        <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">{f.label}</dt>
                        <dd className="mt-1 text-[0.84rem] leading-7 text-ink/90">{m[f.key]}</dd>
                      </div>
                    ))}
                    <div className="rounded-lg border border-line bg-cream-light px-3 py-2">
                      <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">现阶段证据</dt>
                      <dd className="mt-1 text-[0.82rem] leading-7 text-ink/90">{evidenceLevels[m.evidence].label} · {evidenceLevels[m.evidence].description}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="mt-5 text-sm text-muted">当前筛选条件下没有条目。</p>}
    </section>
  );
}

const supplementFields = [
  { key: 'mechanism', label: '① 作用机制假说' },
  { key: 'preclinical', label: '② 细胞 / 动物研究' },
  { key: 'human', label: '③ 人体研究' },
  { key: 'clinicalOutcomes', label: '④ 临床结局证据' },
  { key: 'safety', label: '⑤ 安全性' },
  { key: 'interactions', label: '⑥ 药物相互作用' },
  { key: 'suitableFor', label: '⑦ 适用人群' },
  { key: 'limitations', label: '⑧ 研究局限' },
] as const;

export function SupplementDatabase() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<'all' | EvidenceLevel>('all');
  const [open, setOpen] = useState<string>('nmn');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return supplements.filter((s) =>
      (level === 'all' || s.evidence === level) &&
      (!q || `${s.name} ${s.en} ${s.mechanism} ${s.human}`.toLowerCase().includes(q)),
    );
  }, [query, level]);

  return (
    <section className="scroll-mt-44" aria-labelledby="supplement-db-heading">
      <span className="eyebrow">证据评估数据库 / Interactive</span>
      <h2 id="supplement-db-heading" className="editorial-title mt-3 text-[1.5rem] sm:text-[1.9rem]">常见抗衰补剂，逐项评估</h2>
      <p className="mt-4 text-[0.84rem] leading-7 text-muted">{supplementBottomLine}</p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索补剂名称或关键词…" aria-label="搜索补剂"
            className="w-full rounded-full border border-line bg-cream-light py-2.5 pl-9 pr-4 text-sm text-forest outline-none transition-colors focus:border-forest"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {(['all', ...(Object.keys(evidenceLevels) as EvidenceLevel[])] as ('all' | EvidenceLevel)[]).map((l) => (
            <button key={l} type="button" onClick={() => setLevel(l)} className={`rounded-full border px-3 py-1.5 text-xs ${level === l ? 'border-forest bg-forest text-cream' : 'border-line text-forest'}`}>
              {l === 'all' ? '全部' : evidenceLevels[l].short}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">共 {list.length} 项 · 展开查看九字段评估</p>

      <div className="mt-4 space-y-3">
        {list.map((s) => (
          <div key={s.id} className="surface overflow-hidden rounded-xl">
            <button type="button" onClick={() => setOpen(open === s.id ? '' : s.id)} aria-expanded={open === s.id} className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5">
              <span className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="font-display text-[1.02rem] text-forest">{s.name}</span>
                <span className="font-serif text-xs italic text-muted">{s.en}</span>
                <EvidenceBadge level={s.evidence} showLabel={false} />
                <Badge tone={s.extendsHumanLifespan === '尚无证据' ? 'outline' : 'gold'}>延寿证据：{s.extendsHumanLifespan}</Badge>
              </span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-muted transition-transform ${open === s.id ? 'rotate-180' : ''}`} />
            </button>
            {open === s.id && (
              <div className="border-t border-line p-4 sm:p-5">
                <dl className="grid gap-3 sm:grid-cols-2">
                  {supplementFields.map((f) => (
                    <div key={f.key} className="rounded-lg border border-line bg-cream-light px-3.5 py-2.5">
                      <dt className="text-[0.72rem] font-semibold text-gold-deep">{f.label}</dt>
                      <dd className="mt-1 text-[0.82rem] leading-7 text-ink/90">{s[f.key]}</dd>
                    </div>
                  ))}
                  <div className="rounded-lg border border-gold/50 bg-gold-light/20 px-3.5 py-2.5 sm:col-span-2">
                    <dt className="text-[0.72rem] font-semibold text-gold-deep">⑨ 是否有证据证明延长人类寿命</dt>
                    <dd className="mt-1 text-[0.84rem] leading-7 text-forest">否。{s.extendsHumanLifespan}。机制合理、血液指标变化或动物寿命延长，均不能等同于人体寿命获益。</dd>
                  </div>
                </dl>
                <p className="mt-4 flex items-start gap-2 text-[0.73rem] leading-6 text-muted">
                  <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
                  本站不提供处方药、研究性药物或实验性抗衰药物的自行使用方案。补剂使用前请咨询医生或药师，尤其是正在用药或有慢性病者。
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="mt-5 rounded-lg border border-dashed border-line p-8 text-center text-sm text-muted">没有匹配的补剂，换个关键词试试。</p>}
    </section>
  );
}
