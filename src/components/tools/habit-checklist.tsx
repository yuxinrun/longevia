'use client';

import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { HabitCompletionChart } from '@/components/charts';
import { dailyHabits } from '@/content/plans';
import { readJSON, STORAGE_KEYS, writeJSON } from '@/lib/storage';
import { todayISO } from '@/lib/utils';

type HabitMap = Record<string, string[]>;

export function DailyChecklist({ embedded = false }: { embedded?: boolean }) {
  const [date, setDate] = useState(todayISO());
  const [data, setData] = useState<HabitMap>(() => readJSON(STORAGE_KEYS.habits, {} as HabitMap));
  const checked = data[date] ?? [];

  const toggle = (id: string) => {
    const nextChecked = checked.includes(id) ? checked.filter((x) => x !== id) : [...checked, id];
    const next = { ...data, [date]: nextChecked };
    setData(next);
    writeJSON(STORAGE_KEYS.habits, next);
  };

  const rates = useMemo(() => {
    const days = Object.keys(data);
    return dailyHabits.map((h) => ({
      name: h.label,
      value: days.length ? Math.round((days.filter((d) => (data[d] ?? []).includes(h.id)).length / days.length) * 100) : 0,
    }));
  }, [data]);

  const hasData = Object.keys(data).length > 0;

  return (
    <section className={embedded ? 'scroll-mt-44' : 'surface scroll-mt-44 rounded-xl p-5 sm:p-7'} aria-labelledby="checklist-heading">
      {!embedded && (
        <>
          <span className="eyebrow">每日健康行动清单 / Checklist</span>
          <h2 id="checklist-heading" className="editorial-title mt-3 text-[1.5rem] sm:text-[1.9rem]">勾选今天实际完成的项目</h2>
          <p className="mt-3 text-[0.84rem] leading-7 text-muted">打卡只用于回顾习惯、发现模式，不设置强制目标，不因未完成而制造健康焦虑。数据默认保存在本地浏览器。</p>
        </>
      )}
      {embedded && <h2 id="checklist-heading" className="sr-only">今日打卡</h2>}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-[0.8rem] font-medium text-forest">
          日期
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-line bg-cream-light px-3 py-2 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <span className="text-xs text-muted">今日已选 {checked.length} / {dailyHabits.length} 项 · 无需全部完成</span>
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {dailyHabits.map((h) => (
          <button
            key={h.id} type="button" onClick={() => toggle(h.id)} aria-pressed={checked.includes(h.id)}
            className={`flex items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors ${checked.includes(h.id) ? 'border-forest bg-forest-50' : 'border-line bg-cream-light hover:border-forest/40'}`}
          >
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${checked.includes(h.id) ? 'border-forest bg-forest text-cream' : 'border-muted/60 bg-cream'}`}>
              {checked.includes(h.id) && <Check className="h-3.5 w-3.5" />}
            </span>
            <span>
              <span className="block text-[0.84rem] font-medium text-forest">{h.label}</span>
              <span className="mt-0.5 block text-[0.7rem] text-muted">{h.hint}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-7">
        {hasData ? (
          <HabitCompletionChart data={rates} simulated={false} height={260} />
        ) : (
          <div className="rounded-xl border border-dashed border-line bg-cream/60 p-8 text-center text-sm text-muted">
            还没有打卡记录。勾选任意项目后，这里会显示各项习惯的完成比例。
          </div>
        )}
        <p className="mt-3 text-[0.74rem] leading-6 text-muted">
          完成率只反映记录行为，不代表健康水平或健康价值；本站不显示排名、不判定失败，也不据此推断生物年龄或疾病风险。
        </p>
      </div>
    </section>
  );
}
