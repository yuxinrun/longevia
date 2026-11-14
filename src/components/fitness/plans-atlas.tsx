'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Check, TriangleAlert } from 'lucide-react';
import { Illustration } from '@/components/illustrations';
import { Badge } from '@/components/ui/primitives';
import { exerciseAtlas, trainingPlans } from '@/content/plans';

export function TrainingPlanExplorer() {
  const [active, setActive] = useState(trainingPlans[0].id);
  const plan = trainingPlans.find((p) => p.id === active) ?? trainingPlans[0];

  return (
    <section className="scroll-mt-44" aria-labelledby="plans-heading">
      <span className="eyebrow">五套训练计划 / Interactive</span>
      <h2 id="plans-heading" className="editorial-title mt-3 text-[1.5rem] sm:text-[1.9rem]">选择一套与当前能力匹配的计划</h2>
      <p className="mt-4 text-[0.84rem] leading-7 text-muted">每套计划包含动作、组数、次数、休息、强度、替代动作与安全提示。计划是可调整的起点，不是必须完成的硬性处方。</p>

      <Tabs.Root value={active} onValueChange={setActive} className="mt-6">
        <Tabs.List aria-label="训练计划" className="scrollbar-thin flex gap-2 overflow-x-auto pb-2">
          {trainingPlans.map((p) => (
            <Tabs.Trigger key={p.id} value={p.id} className="shrink-0 rounded-full border border-line px-4 py-2 text-xs font-medium text-forest transition-colors data-[state=active]:border-forest data-[state=active]:bg-forest data-[state=active]:text-cream">
              {p.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value={plan.id} className="mt-4 focus:outline-none">
          <div className="surface rounded-xl p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-[1.25rem] text-forest">{plan.name}</h3>
                <p className="mt-1 text-[0.82rem] text-muted">{plan.principle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="outline">{plan.audience}</Badge>
                <Badge tone="outline">{plan.frequency}</Badge>
                <Badge tone="outline">{plan.duration}</Badge>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[700px] text-[0.8rem]">
                <thead>
                  <tr className="border-b border-line text-left text-[0.72rem] uppercase tracking-wider text-muted">
                    <th className="pb-2 pr-3 font-semibold">动作</th>
                    <th className="pb-2 pr-3 font-semibold">组数</th>
                    <th className="pb-2 pr-3 font-semibold">次数</th>
                    <th className="pb-2 pr-3 font-semibold">休息</th>
                    <th className="pb-2 pr-3 font-semibold">强度</th>
                    <th className="pb-2 pr-3 font-semibold">替代动作</th>
                    <th className="pb-2 font-semibold">安全提示</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.sessions.map((s) => (
                    <tr key={s.name} className="border-b border-line/70 align-top">
                      <td className="py-3 pr-3 font-medium text-forest">{s.name}</td>
                      <td className="py-3 pr-3 text-ink/85">{s.sets}</td>
                      <td className="py-3 pr-3 text-ink/85">{s.reps}</td>
                      <td className="py-3 pr-3 text-ink/85">{s.rest}</td>
                      <td className="py-3 pr-3 text-ink/85">{s.intensity}</td>
                      <td className="py-3 pr-3 text-muted">{s.alternatives.join(' / ')}</td>
                      <td className="py-3 text-muted">{s.safety}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-[0.76rem] leading-6 text-muted">
              <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
              {plan.note} 如有慢性病、关节问题、近期手术或正在用药，请先咨询医生或物理治疗师。
            </p>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}

export function ExerciseAtlasGrid() {
  return (
    <section className="scroll-mt-44" aria-labelledby="atlas-heading">
      <span className="eyebrow">原创 SVG 动作图鉴 / Atlas</span>
      <h2 id="atlas-heading" className="editorial-title mt-3 text-[1.5rem] sm:text-[1.9rem]">十个动作，覆盖主要动作模式</h2>
      <p className="mt-4 text-[0.84rem] leading-7 text-muted">图示为原创矢量示意，用于说明动作模式与姿态，不能替代教练指导或康复评估。</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exerciseAtlas.map((ex) => (
          <article key={ex.key} className="surface flex flex-col rounded-xl p-4 sm:p-5">
            <div className="rounded-lg bg-cream-deep/60 p-3"><Illustration name={ex.illustration} /></div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <h3 className="font-display text-[1.1rem] text-forest">{ex.name}</h3>
              <Badge tone="outline">{ex.pattern}</Badge>
            </div>
            <ul className="mt-3 space-y-1.5">
              {ex.cues.map((c) => (
                <li key={c} className="flex gap-2 text-[0.78rem] leading-6 text-ink/85"><Check className="mt-1 h-3 w-3 shrink-0 text-forest-600" />{c}</li>
              ))}
            </ul>
            <dl className="mt-3 space-y-1.5 border-t border-line pt-3 text-[0.74rem] leading-6">
              <div><dt className="inline font-semibold text-gold-deep">常见错误：</dt><dd className="inline text-muted">{ex.mistake}</dd></div>
              <div><dt className="inline font-semibold text-gold-deep">替代动作：</dt><dd className="inline text-muted">{ex.alternatives.join(' / ')}</dd></div>
              <div><dt className="inline font-semibold text-gold-deep">安全提示：</dt><dd className="inline text-muted">{ex.safety}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
