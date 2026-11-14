import type { HealthRecord } from '@/lib/types';
import { round } from '@/lib/utils';

export type LabTrendPoint = { date: string; value: number };
export type LabBpPoint = { date: string; systolic: number; diastolic: number };

const numericFields = ['weightKg', 'waistCm', 'restingHr', 'systolic', 'diastolic', 'sleepHours', 'steps', 'exerciseMinutes', 'strengthSessions'] as const;
type NumericField = (typeof numericFields)[number];

export function toTrend(records: HealthRecord[], field: NumericField): LabTrendPoint[] {
  return records
    .filter((r) => typeof r[field] === 'number')
    .map((r) => ({ date: r.date.slice(5), value: r[field] as number }));
}

export function toBloodPressure(records: HealthRecord[]): LabBpPoint[] {
  return records
    .filter((r) => typeof r.systolic === 'number' && typeof r.diastolic === 'number')
    .map((r) => ({ date: r.date.slice(5), systolic: r.systolic!, diastolic: r.diastolic! }));
}

/** Group records into ISO-week buckets for weekly exercise / strength / steps views. */
export function weeklyAggregate(records: HealthRecord[]) {
  const buckets = new Map<string, { minutes: number; strength: number; steps: number; count: number }>();
  for (const r of records) {
    const d = new Date(`${r.date}T00:00:00`);
    if (Number.isNaN(d.getTime())) continue;
    const day = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - day);
    const key = d.toISOString().slice(0, 10);
    const b = buckets.get(key) ?? { minutes: 0, strength: 0, steps: 0, count: 0 };
    b.minutes += r.exerciseMinutes ?? 0;
    b.strength += r.strengthSessions ?? 0;
    b.steps += r.steps ?? 0;
    b.count += 1;
    buckets.set(key, b);
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, b]) => ({ date: key.slice(5), minutes: b.minutes, strength: b.strength, steps: round(b.steps / Math.max(1, b.count), 0), count: b.count }));
}

export function dashboardStats(records: HealthRecord[]) {
  const last = records.at(-1);
  const sleep = records.filter((r) => r.sleepHours !== undefined);
  const steps = records.filter((r) => r.steps !== undefined);
  const hr = records.filter((r) => r.restingHr !== undefined);
  const weeks = weeklyAggregate(records);
  return {
    count: records.length,
    lastDate: last?.date ?? null,
    avgSleep: sleep.length ? round(sleep.reduce((s, r) => s + (r.sleepHours ?? 0), 0) / sleep.length, 1) : null,
    avgSteps: steps.length ? Math.round(steps.reduce((s, r) => s + (r.steps ?? 0), 0) / steps.length) : null,
    avgRestingHr: hr.length ? Math.round(hr.reduce((s, r) => s + (r.restingHr ?? 0), 0) / hr.length) : null,
    thisWeekMinutes: weeks.at(-1)?.minutes ?? 0,
    thisWeekStrength: weeks.at(-1)?.strength ?? 0,
    weeksRecorded: weeks.length,
  };
}

export const dataFieldLabels: { key: NumericField; label: string; unit: string }[] = [
  { key: 'weightKg', label: '体重', unit: 'kg' },
  { key: 'waistCm', label: '腰围', unit: 'cm' },
  { key: 'restingHr', label: '静息心率', unit: '次/分' },
  { key: 'systolic', label: '收缩压', unit: 'mmHg' },
  { key: 'diastolic', label: '舒张压', unit: 'mmHg' },
  { key: 'sleepHours', label: '睡眠时长', unit: '小时' },
  { key: 'steps', label: '每日步数', unit: '步' },
  { key: 'exerciseMinutes', label: '运动时长', unit: '分钟' },
  { key: 'strengthSessions', label: '力量训练', unit: '次' },
];
