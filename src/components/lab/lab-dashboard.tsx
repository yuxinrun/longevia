'use client';

import { useEffect, useMemo, useState } from 'react';
import { Database, Info } from 'lucide-react';
import {
  ActivityGaugeChart, BloodPressureTrendChart, HabitCompletionChart, RestingHrTrendChart,
  SleepDurationChart, StepsTrendChart, StrengthFrequencyChart, WaistTrendChart,
  WeightTrendChart, WeeklyExerciseMinutesChart,
} from '@/components/charts';
import { RecordForm } from '@/components/lab/record-form';
import { DataManager } from '@/components/lab/data-manager';
import { dailyHabits } from '@/content/plans';
import { dashboardStats, toBloodPressure, toTrend, weeklyAggregate } from '@/lib/lab';
import { getRecords, readJSON, STORAGE_KEYS } from '@/lib/storage';
import type { HealthRecord } from '@/lib/types';

export function LabDashboard() {
  // Defer local-storage reads until after hydration to keep SSR markup identical.
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [habits, setHabits] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setRecords(getRecords());
    setHabits(readJSON(STORAGE_KEYS.habits, {} as Record<string, string[]>));
  }, []);

  const data = useMemo(() => {
    const weeks = weeklyAggregate(records);
    const days = Object.keys(habits);
    return {
      stats: dashboardStats(records),
      weight: toTrend(records, 'weightKg'),
      waist: toTrend(records, 'waistCm'),
      hr: toTrend(records, 'restingHr'),
      bp: toBloodPressure(records),
      sleep: toTrend(records, 'sleepHours'),
      steps: toTrend(records, 'steps'),
      weeklyMinutes: weeks.map((w) => ({ date: w.date, value: w.minutes })),
      weeklyStrength: weeks.map((w) => ({ date: w.date, value: w.strength })),
      habitRates: dailyHabits.map((h) => ({
        name: h.label,
        value: days.length ? Math.round((days.filter((d) => (habits[d] ?? []).includes(h.id)).length / days.length) * 100) : 0,
      })),
      hasHabits: days.length > 0,
    };
  }, [records, habits]);

  const s = data.stats;
  const cards = [
    { label: '累计记录', value: `${s.count}`, unit: '天' },
    { label: '最近记录', value: s.lastDate ? s.lastDate.slice(5) : '—', unit: '月-日' },
    { label: '平均睡眠', value: s.avgSleep === null ? '—' : String(s.avgSleep), unit: '小时' },
    { label: '平均步数', value: s.avgSteps === null ? '—' : s.avgSteps.toLocaleString(), unit: '步/天' },
    { label: '平均静息心率', value: s.avgRestingHr === null ? '—' : String(s.avgRestingHr), unit: '次/分' },
    { label: '最近一周运动', value: String(s.thisWeekMinutes), unit: '分钟' },
    { label: '最近一周力量', value: String(s.thisWeekStrength), unit: '次' },
    { label: '有记录的周数', value: String(s.weeksRecorded), unit: '周' },
  ];

  return (
    <div className="space-y-7">
      <RecordForm records={records} onSaved={setRecords} />

      <section className="surface rounded-xl p-5 sm:p-7" aria-labelledby="dashboard-heading">
        <span className="eyebrow">个人健康仪表盘 / Dashboard</span>
        <h2 id="dashboard-heading" className="editorial-title mt-3 text-[1.4rem] sm:text-[1.7rem]">近期记录情况</h2>
        <p className="mt-3 text-[0.82rem] leading-7 text-muted">
          仪表盘只汇总你自己录入的数字，用于回顾记录与生活模式。它不推断生物年龄、剩余寿命或疾病风险，也不给出健康评分。
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-lg border border-line bg-cream-light px-3 py-4 text-center">
              <p className="font-display text-[1.35rem] text-forest tabular sm:text-[1.6rem]">{c.value}<span className="ml-1 text-[0.68rem] font-sans text-muted">{c.unit}</span></p>
              <p className="mt-1 text-[0.7rem] text-muted">{c.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-[0.74rem] leading-6 text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
          「个人目标完成情况」在此仅以记录覆盖天数呈现，不设强制目标，不评价完成好坏。长期趋势请结合下方图表与专业医疗意见阅读。
        </p>
      </section>

      <section aria-labelledby="charts-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">数据可视化 / Visualisation</span>
            <h2 id="charts-heading" className="editorial-title mt-3 text-[1.4rem] sm:text-[1.7rem]">八类长期趋势</h2>
          </div>
          <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-[0.7rem] font-medium text-forest-700">个人记录 · 非研究数据</span>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <WeightTrendChart points={data.weight} simulated={false} height={240} compact />
          <WaistTrendChart points={data.waist} simulated={false} height={240} compact />
          <RestingHrTrendChart points={data.hr} simulated={false} height={240} compact />
          <BloodPressureTrendChart points={data.bp} simulated={false} height={240} compact />
          <SleepDurationChart points={data.sleep} simulated={false} height={240} compact />
          <WeeklyExerciseMinutesChart points={data.weeklyMinutes} height={240} compact />
          <StrengthFrequencyChart points={data.weeklyStrength} height={240} compact />
          <StepsTrendChart points={data.steps} height={240} compact />
          <ActivityGaugeChart value={s.thisWeekMinutes} simulated={false} height={240} compact />
          {data.hasHabits ? (
            <HabitCompletionChart data={data.habitRates} simulated={false} height={240} compact />
          ) : (
            <div className="surface flex min-h-[240px] flex-col items-center justify-center gap-2 rounded-xl p-6 text-center">
              <Database className="h-6 w-6 text-forest-200" />
              <p className="text-sm font-medium text-forest">暂无习惯打卡数据</p>
              <p className="text-xs leading-6 text-muted">在「实用工具」中完成打卡后，这里会显示完成率。</p>
            </div>
          )}
        </div>
        <p className="mt-4 text-[0.74rem] leading-6 text-muted">
          图表默认支持 Tooltip 与图例，移动端不会横向溢出；所有数据来自你的浏览器本地记录。相关性不等于因果关系，短期波动不应被解读为健康变化结论。
        </p>
      </section>

      <DataManager onChanged={setRecords} />
    </div>
  );
}
