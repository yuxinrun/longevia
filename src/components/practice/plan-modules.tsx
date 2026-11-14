'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { CalendarDays, Check, Info } from 'lucide-react';
import { Badge, Callout } from '@/components/ui/primitives';
import { ageGroups, lifestyleGroups, plan30Days } from '@/content/plans';
import { readJSON, STORAGE_KEYS, writeJSON } from '@/lib/storage';

const phaseNames = ['建立个人健康基线', '改善日常活动和运动习惯', '改善饮食和睡眠', '评估进展并建立长期计划'];
const phaseRanges = [[1, 7], [8, 14], [15, 21], [22, 30]];

export function Plan30Explorer() {
  const [phase, setPhase] = useState('0');
  const [day, setDay] = useState(1);
  const [done, setDone] = useState<number[]>(() => readJSON(STORAGE_KEYS.plan30, [] as number[]));
  const task = plan30Days[day - 1];

  const toggle = () => {
    const next = done.includes(day) ? done.filter((d) => d !== day) : [...done, day];
    setDone(next);
    writeJSON(STORAGE_KEYS.plan30, next);
  };

  return (
    <section className="scroll-mt-44" aria-labelledby="plan30-heading">
      <span className="eyebrow">30 天入门计划 / Interactive</span>
      <h2 id="plan30-heading" className="editorial-title mt-3 text-[1.5rem] sm:text-[1.9rem]">四个阶段，逐日查看任务</h2>
      <p className="mt-4 text-[0.84rem] leading-7 text-muted">点击阶段与日期查看当天任务。打卡仅用于回顾，可随时取消，不设强制目标，也不会给出健康评分。</p>

      <Tabs.Root value={phase} onValueChange={(v) => { setPhase(v); setDay(phaseRanges[Number(v)][0]); }} className="mt-6">
        <Tabs.List aria-label="计划阶段" className="scrollbar-thin flex gap-2 overflow-x-auto pb-2">
          {phaseNames.map((name, i) => (
            <Tabs.Trigger key={name} value={String(i)} className="shrink-0 rounded-full border border-line px-4 py-2 text-xs font-medium text-forest data-[state=active]:border-forest data-[state=active]:bg-forest data-[state=active]:text-cream">
              阶段 {i + 1} · {name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="mt-4 surface rounded-xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[0.78rem] font-medium text-muted">选择日期（第 {phaseRanges[Number(phase)][0]}–{phaseRanges[Number(phase)][1]} 天）</p>
            <span className="text-xs text-muted">已完成 {done.length} / 30 天 · 仅供参考</span>
          </div>
          <div className="scrollbar-thin mt-3 flex gap-1.5 overflow-x-auto pb-2">
            {Array.from({ length: phaseRanges[Number(phase)][1] - phaseRanges[Number(phase)][0] + 1 }, (_, i) => phaseRanges[Number(phase)][0] + i).map((d) => (
              <button
                key={d} type="button" onClick={() => setDay(d)}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs transition-colors ${day === d ? 'border-forest bg-forest text-cream' : done.includes(d) ? 'border-gold bg-gold-light/50 text-forest' : 'border-line text-forest'}`}
              >
                {d}
              </button>
            ))}
          </div>

          <article className="mt-5 border-t border-line pt-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="forest">第 {task.day} 天</Badge>
              <Badge tone="outline">阶段 {task.phase} · {task.phaseName}</Badge>
            </div>
            <h3 className="mt-4 font-display text-[1.3rem] text-forest">{task.theme}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { label: '今日行动', value: task.action },
                { label: '运动建议', value: task.exercise },
                { label: '饮食建议', value: task.nutrition },
                { label: '睡眠任务', value: task.sleep },
                { label: '记录项目', value: task.tracking },
                { label: '科学解释', value: task.science },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-line bg-cream-light px-3.5 py-2.5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">{item.label}</p>
                  <p className="mt-1 text-[0.82rem] leading-7 text-ink/90">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-3 rounded-lg border border-gold/40 bg-gold-light/20 px-3.5 py-2.5">
              <p className="flex items-start gap-2 text-[0.76rem] leading-6 text-ink">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />{task.safety}
              </p>
            </div>
            <button type="button" onClick={toggle} className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium transition-colors ${done.includes(day) ? 'border border-forest bg-forest-50 text-forest' : 'bg-forest text-cream hover:bg-forest-900'}`}>
              <Check className="h-3.5 w-3.5" />{done.includes(day) ? '已完成（点击取消）' : '标记今天已回顾'}
            </button>
          </article>
        </div>
      </Tabs.Root>

      <Callout kind="warning" title="30 天不能改变什么" className="mt-5">
        <p>本计划不承诺逆转衰老、改变生物年龄或延长寿命。短期生物标志物波动不等于真实衰老速度变化；任何任务都可以跳过或替换。</p>
      </Callout>
    </section>
  );
}

export function AgeLifestyleGrids() {
  return (
    <section className="scroll-mt-44" aria-labelledby="groups-heading">
      <span className="eyebrow">分人群导航 / Navigation Only</span>
      <h2 id="groups-heading" className="editorial-title mt-3 text-[1.5rem] sm:text-[1.9rem]">年龄分组只是索引，不是处方</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ageGroups.map((g) => (
          <div key={g.id} className="surface rounded-xl p-5">
            <p className="font-display text-[1.1rem] text-forest">{g.range}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-gold-deep"><CalendarDays className="h-3.5 w-3.5" />{g.focus}</p>
            <ul className="mt-3 space-y-1.5">
              {g.points.map((p) => <li key={p} className="flex gap-2 text-[0.8rem] leading-6 text-muted"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <h3 className="mt-10 font-display text-[1.3rem] text-forest">按生活方式寻找起点</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {lifestyleGroups.map((g) => (
          <div key={g.id} className="surface rounded-xl p-5">
            <p className="font-display text-[1.05rem] text-forest">{g.name}</p>
            <p className="mt-1 text-[0.74rem] text-muted">主要约束：{g.constraint}</p>
            <p className="mt-3 border-l-2 border-gold/60 pl-3 text-[0.82rem] leading-7 text-ink/90"><strong className="font-semibold text-forest">起步：</strong>{g.start}</p>
            <p className="mt-2 text-[0.76rem] leading-6 text-muted">{g.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[0.76rem] leading-6 text-muted">年龄与生活方式的分组均基于群体趋势，个体差异通常更大。具体方案请结合个人病史、功能状态与专业意见。</p>
    </section>
  );
}
