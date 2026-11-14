'use client';

import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { WaistTrendChart, WeightTrendChart } from '@/components/charts';
import { Button, Callout } from '@/components/ui/primitives';
import { CalculationSteps, NumberField, ToolShell } from '@/components/tools/tool-shell';
import { weeklyMinutes } from '@/lib/calculations';
import { getRecords, STORAGE_KEYS, upsertRecord, writeJSON, readJSON } from '@/lib/storage';
import { clamp, todayISO, uid } from '@/lib/utils';
import type { HealthRecord } from '@/lib/types';

interface ActivityEntry { id: string; date: string; type: string; minutes: number; note: string }
interface TrainingEntry { id: string; date: string; exercise: string; sets: string; reps: string; intensity: string; note: string }

const activityTypes = ['快走', '骑行', '游泳', '力量训练', '拉伸 / 平衡', '家务与通勤', '其他'];

export function ActivityLogger() {
  const [date, setDate] = useState(todayISO());
  const [type, setType] = useState(activityTypes[0]);
  const [minutes, setMinutes] = useState('30');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<ActivityEntry[]>(() => readJSON(STORAGE_KEYS.activity, [] as ActivityEntry[]));

  const save = () => {
    const entry: ActivityEntry = { id: uid(), date, type, minutes: clamp(Number(minutes) || 0, 0, 1440), note };
    const next = [...entries, entry].sort((a, b) => a.date.localeCompare(b.date));
    setEntries(next);
    writeJSON(STORAGE_KEYS.activity, next);
    setNote('');
  };
  const remove = (id: string) => {
    const next = entries.filter((e) => e.id !== id);
    setEntries(next);
    writeJSON(STORAGE_KEYS.activity, next);
  };
  const total = entries.reduce((s, e) => s + e.minutes, 0);

  return (
    <ToolShell id="activity" index="04" title="每日活动量记录器" en="Daily Activity Log" description="记录每次活动的类型与时长，观察日常活动的累积，而非只关注正式训练。"
      unit="时长 分钟（min）、记录保存于本地浏览器">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">日期</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">活动类型</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest">
            {activityTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <NumberField label="时长" unit="分钟" value={minutes} onChange={setMinutes} min={0} max={1440} step={5} />
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">备注</span>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="可选" className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
      </div>
      <Button type="button" size="sm" className="mt-5" onClick={save}>添加记录</Button>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_1.2fr]">
        <div className="rounded-xl border border-forest/15 bg-forest-50 p-5 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest-600">累计记录时长</p>
          <p className="mt-2 font-display text-3xl text-forest tabular">{total}<span className="ml-1.5 text-sm font-sans text-muted">分钟</span></p>
          <p className="mt-1 text-[0.74rem] text-muted">共 {entries.length} 条记录</p>
        </div>
        <CalculationSteps formula="累计活动量 = Σ（每次活动分钟数）" steps={entries.length ? [`${entries.slice(-6).map((e) => e.minutes).join(' + ')}${entries.length > 6 ? ' + …' : ''} = ${total} 分钟`] : ['尚无记录，添加后显示计算过程']} />
      </div>

      {entries.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[480px] text-[0.78rem]">
            <thead><tr className="bg-cream-deep text-left text-[0.7rem] uppercase tracking-wider text-muted">
              <th className="px-3 py-2 font-semibold">日期</th><th className="px-3 py-2 font-semibold">类型</th><th className="px-3 py-2 font-semibold">时长</th><th className="px-3 py-2 font-semibold">备注</th><th className="px-3 py-2" />
            </tr></thead>
            <tbody>{entries.slice().reverse().slice(0, 10).map((e) => (
              <tr key={e.id} className="border-t border-line">
                <td className="px-3 py-2 text-forest">{e.date}</td><td className="px-3 py-2">{e.type}</td>
                <td className="px-3 py-2">{e.minutes} min</td><td className="px-3 py-2 text-muted">{e.note || '—'}</td>
                <td className="px-3 py-2 text-right"><button type="button" onClick={() => remove(e.id)} aria-label="删除记录"><Trash2 className="h-3.5 w-3.5 text-muted hover:text-forest" /></button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </ToolShell>
  );
}

export function WeeklyExerciseTool() {
  const [days, setDays] = useState<string[]>(['30', '0', '40', '0', '45', '60', '0']);
  const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const sessions = days.map((d) => ({ minutes: clamp(Number(d) || 0, 0, 1440) }));
  const r = weeklyMinutes(sessions);
  return (
    <ToolShell id="weekly" index="05" title="每周运动时间计算器" en="Weekly Exercise Minutes" description="把一周每天的活动分钟数相加，与群体指南参考量对照。"
      unit="每天 分钟（min）、合计 分钟 / 周">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {week.map((label, i) => (
          <NumberField key={label} label={label} unit="min" value={days[i]} onChange={(v) => setDays(days.map((d, j) => (i === j ? v : d)))} min={0} max={1440} step={5} />
        ))}
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-forest/15 bg-forest-50 p-5 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest-600">本周合计</p>
          <p className="mt-2 font-display text-3xl text-forest tabular">{r.value}<span className="ml-1.5 text-sm font-sans text-muted">分钟</span></p>
          <p className="mt-1 text-[0.74rem] text-forest-700">{r.value >= 150 ? '达到 WHO 成人中等强度活动参考下限' : '低于 WHO 成人参考下限，可循序渐进增加'}</p>
        </div>
        <CalculationSteps formula={r.formula} steps={r.steps} />
      </div>
      <Callout kind="note" title="参考线不是处方" className="mt-5"><p>{r.note} 疾病、关节问题与运动经验都会影响适合的强度与总量。</p></Callout>
    </ToolShell>
  );
}

export function TrendTool() {
  const [date, setDate] = useState(todayISO());
  const [weight, setWeight] = useState('68');
  const [waist, setWaist] = useState('82');
  const [records, setRecords] = useState<HealthRecord[]>(() => getRecords());

  const save = () => {
    const w = Number(weight), c = Number(waist);
    const record: HealthRecord = {
      id: uid(), date, createdAt: new Date().toISOString(), dataSource: '自测',
      ...(w > 0 ? { weightKg: w } : {}),
      ...(c > 0 ? { waistCm: c } : {}),
      measureUnit: 'kg / cm',
      measureCondition: '自测，条件以用户记录为准',
    };
    setRecords(upsertRecord(record));
  };

  const weightPoints = useMemo(() => records.filter((r) => r.weightKg !== undefined).map((r) => ({ date: r.date.slice(5), value: r.weightKg! })), [records]);
  const waistPoints = useMemo(() => records.filter((r) => r.waistCm !== undefined).map((r) => ({ date: r.date.slice(5), value: r.waistCm! })), [records]);

  return (
    <ToolShell id="trend" index="08" title="体重与腰围趋势工具" en="Weight & Waist Trends" description="录入体重与腰围，查看长期变化曲线。短期波动很常见，趋势比单次数值更有参考价值。"
      unit="体重 kg、腰围 cm；记录与数据实验室共用，保存在本地浏览器">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">日期</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <NumberField label="体重" unit="kg" value={weight} onChange={setWeight} min={20} max={400} step={0.1} />
        <NumberField label="腰围" unit="cm" value={waist} onChange={setWaist} min={30} max={250} step={0.5} />
      </div>
      <Button type="button" size="sm" className="mt-5" onClick={save}>保存当日记录</Button>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <WeightTrendChart points={weightPoints} simulated={false} height={240} compact />
        <WaistTrendChart points={waistPoints} simulated={false} height={240} compact />
      </div>
      <Callout kind="note" title="测量条件" className="mt-5"><p>体重受水分、进食与衣物影响，腰围受体位与测量部位影响。尽量在相同条件下测量，并与数据实验室中的其他指标一起观察。</p></Callout>
    </ToolShell>
  );
}

export function TrainingLogger() {
  const [date, setDate] = useState(todayISO());
  const [exercise, setExercise] = useState('坐姿站起');
  const [sets, setSets] = useState('2');
  const [reps, setReps] = useState('10');
  const [intensity, setIntensity] = useState('轻松可控');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<TrainingEntry[]>(() => readJSON(STORAGE_KEYS.training, [] as TrainingEntry[]));

  const save = () => {
    const entry: TrainingEntry = { id: uid(), date, exercise, sets, reps, intensity, note };
    const next = [...entries, entry].sort((a, b) => a.date.localeCompare(b.date));
    setEntries(next);
    writeJSON(STORAGE_KEYS.training, next);
    setNote('');
  };
  const remove = (id: string) => {
    const next = entries.filter((e) => e.id !== id);
    setEntries(next);
    writeJSON(STORAGE_KEYS.training, next);
  };

  return (
    <ToolShell id="training" index="09" title="训练记录工具" en="Training Log" description="记录动作、组数、次数与主观强度，便于渐进超负荷与回顾动作质量。"
      unit="组数 组、次数 次、强度为主观描述；记录保存于本地浏览器">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">日期</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">动作</span>
          <input value={exercise} onChange={(e) => setExercise(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <NumberField label="组数" unit="组" value={sets} onChange={setSets} min={1} max={20} />
        <NumberField label="每组次数" unit="次" value={reps} onChange={setReps} min={1} max={100} />
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">主观强度</span>
          <select value={intensity} onChange={(e) => setIntensity(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest">
            <option>轻松可控</option><option>最后几次略费力</option><option>保留 2 次余力</option><option>接近力竭</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">备注</span>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="动作质量、疼痛等" className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
      </div>
      <Button type="button" size="sm" className="mt-5" onClick={save}>添加训练记录</Button>

      {entries.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[600px] text-[0.78rem]">
            <thead><tr className="bg-cream-deep text-left text-[0.7rem] uppercase tracking-wider text-muted">
              <th className="px-3 py-2 font-semibold">日期</th><th className="px-3 py-2 font-semibold">动作</th><th className="px-3 py-2 font-semibold">组数</th>
              <th className="px-3 py-2 font-semibold">次数</th><th className="px-3 py-2 font-semibold">强度</th><th className="px-3 py-2 font-semibold">备注</th><th className="px-3 py-2" />
            </tr></thead>
            <tbody>{entries.slice().reverse().slice(0, 10).map((e) => (
              <tr key={e.id} className="border-t border-line">
                <td className="px-3 py-2 text-forest">{e.date}</td><td className="px-3 py-2">{e.exercise}</td>
                <td className="px-3 py-2">{e.sets}</td><td className="px-3 py-2">{e.reps}</td>
                <td className="px-3 py-2 text-muted">{e.intensity}</td><td className="px-3 py-2 text-muted">{e.note || '—'}</td>
                <td className="px-3 py-2 text-right"><button type="button" onClick={() => remove(e.id)} aria-label="删除记录"><Trash2 className="h-3.5 w-3.5 text-muted hover:text-forest" /></button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <Callout kind="warning" title="安全提示" className="mt-5"><p>出现胸痛、眩晕、异常气促或明显关节疼痛应立即停止并寻求医疗帮助。本站不提供个体化训练处方。</p></Callout>
    </ToolShell>
  );
}
