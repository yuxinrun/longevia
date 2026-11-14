'use client';

import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { SleepDurationChart } from '@/components/charts';
import { Button, Callout } from '@/components/ui/primitives';
import { NumberField, ToolShell } from '@/components/tools/tool-shell';
import { sleepStats } from '@/lib/calculations';
import { readJSON, STORAGE_KEYS, writeJSON } from '@/lib/storage';
import { clamp, todayISO, uid } from '@/lib/utils';

interface SleepEntry {
  id: string; date: string; hours: number; bedtime: string; wakeTime: string;
  caffeine: boolean; note: string;
}

export function SleepTracker() {
  const [date, setDate] = useState(todayISO());
  const [hours, setHours] = useState('7.5');
  const [bedtime, setBedtime] = useState('23:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [caffeine, setCaffeine] = useState(false);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<SleepEntry[]>(() => readJSON(STORAGE_KEYS.sleep, [] as SleepEntry[]));

  const save = () => {
    const value = clamp(Number(hours) || 0, 0, 24);
    const entry: SleepEntry = { id: uid(), date, hours: value, bedtime, wakeTime, caffeine, note };
    const next = [...entries.filter((e) => e.date !== date), entry].sort((a, b) => a.date.localeCompare(b.date));
    setEntries(next);
    writeJSON(STORAGE_KEYS.sleep, next);
    setNote('');
  };

  const remove = (id: string) => {
    const next = entries.filter((e) => e.id !== id);
    setEntries(next);
    writeJSON(STORAGE_KEYS.sleep, next);
  };

  const points = useMemo(() => entries.slice(-14).map((e) => ({ date: e.date.slice(5), value: e.hours })), [entries]);
  const stats = useMemo(() => sleepStats(entries.map((e) => e.hours)), [entries]);

  return (
    <ToolShell id="sleep" index="07" title="睡眠记录工具" en="Sleep Log" description="记录睡眠时长、入睡与起床时刻、咖啡因与备注，用于观察 2–4 周的行为模式。"
      unit="时长 小时（h）、时刻 24 小时制、记录保存于本地浏览器">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">日期</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <NumberField label="睡眠时长" unit="小时" value={hours} onChange={setHours} min={0} max={24} step={0.1} />
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">入睡时刻</span>
          <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">起床时刻</span>
          <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <label className="flex items-center gap-2 self-end pb-2.5">
          <input type="checkbox" checked={caffeine} onChange={(e) => setCaffeine(e.target.checked)} className="h-4 w-4 accent-[#173D32]" />
          <span className="text-[0.8rem] text-forest">午后摄入咖啡因</span>
        </label>
        <label className="block sm:col-span-2 lg:col-span-1">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">备注</span>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="如：夜间醒来 / 运动较晚" className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
      </div>
      <Button type="button" size="sm" className="mt-5" onClick={save}>保存当日记录</Button>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-cream-light p-4">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">近期统计（仅描述记录）</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            {[
              { label: '记录天数', value: String(stats.count) },
              { label: '平均时长', value: `${stats.mean} h` },
              { label: '最短', value: `${stats.min} h` },
              { label: '波动范围', value: `${stats.range} h` },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-line bg-cream px-2 py-3">
                <p className="font-display text-lg text-forest tabular">{s.value}</p>
                <p className="mt-0.5 text-[0.68rem] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[0.72rem] leading-6 text-muted">统计只描述你自己的记录，不用于诊断、睡眠质量评分或衰老速度判断。</p>
        </div>
        <SleepDurationChart points={points} simulated={false} height={220} compact />
      </div>

      {entries.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[560px] text-[0.78rem]">
            <thead><tr className="bg-cream-deep text-left text-[0.7rem] uppercase tracking-wider text-muted">
              <th className="px-3 py-2 font-semibold">日期</th><th className="px-3 py-2 font-semibold">时长</th>
              <th className="px-3 py-2 font-semibold">入睡 / 起床</th><th className="px-3 py-2 font-semibold">咖啡因</th>
              <th className="px-3 py-2 font-semibold">备注</th><th className="px-3 py-2" />
            </tr></thead>
            <tbody>{entries.slice().reverse().slice(0, 10).map((e) => (
              <tr key={e.id} className="border-t border-line">
                <td className="px-3 py-2 text-forest">{e.date}</td>
                <td className="px-3 py-2">{e.hours} h</td>
                <td className="px-3 py-2 text-muted">{e.bedtime} / {e.wakeTime}</td>
                <td className="px-3 py-2 text-muted">{e.caffeine ? '有' : '无'}</td>
                <td className="px-3 py-2 text-muted">{e.note || '—'}</td>
                <td className="px-3 py-2 text-right"><button type="button" onClick={() => remove(e.id)} aria-label={`删除 ${e.date} 记录`}><Trash2 className="h-3.5 w-3.5 text-muted hover:text-forest" /></button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <Callout kind="warning" title="何时寻求专业评估" className="mt-5">
        <p>长期失眠、打鼾伴憋醒、明显日间嗜睡或情绪受影响时，应咨询专业医疗人员。记录工具不替代睡眠医学诊断。</p>
      </Callout>
    </ToolShell>
  );
}
