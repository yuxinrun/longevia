import { z } from 'zod';
import type { HealthRecord } from '@/lib/types';
import { isBrowser } from '@/lib/utils';

/** All personal data stays in this browser. No network calls are made by these helpers. */
export const STORAGE_KEYS = {
  records: 'longevia.health.records.v1',
  habits: 'longevia.habits.v1',
  plan30: 'longevia.plan30.v1',
  activity: 'longevia.activity.v1',
  sleep: 'longevia.sleep.v1',
  training: 'longevia.training.v1',
  favorites: 'longevia.resources.favorites.v1',
  /** Reserved: explicit consent flag for a future sync feature. Never set automatically. */
  syncConsent: 'longevia.sync.consent.v1',
} as const;

export const HealthRecordSchema = z.object({
  id: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  weightKg: z.number().min(20).max(400).optional(),
  waistCm: z.number().min(30).max(250).optional(),
  restingHr: z.number().min(25).max(220).optional(),
  systolic: z.number().min(50).max(280).optional(),
  diastolic: z.number().min(30).max(180).optional(),
  sleepHours: z.number().min(0).max(24).optional(),
  steps: z.number().min(0).max(100000).optional(),
  exerciseMinutes: z.number().min(0).max(1440).optional(),
  strengthSessions: z.number().min(0).max(20).optional(),
  measureCondition: z.string().max(200).optional(),
  measureUnit: z.string().max(40).optional(),
  dataSource: z.enum(['自测', '体检报告', '医疗机构', '其他']).optional(),
  extraMetrics: z.string().max(500).optional(),
  note: z.string().max(1000).optional(),
  createdAt: z.string(),
});

export function readJSON<T>(key: string, fallback: T, schema?: z.ZodType<T>): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (schema) {
      const result = schema.safeParse(parsed);
      return result.success ? result.data : fallback;
    }
    return parsed as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key: string) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(key);
}

export function getRecords(): HealthRecord[] {
  return readJSON(STORAGE_KEYS.records, [] as HealthRecord[], z.array(HealthRecordSchema));
}

export function upsertRecord(record: HealthRecord): HealthRecord[] {
  const existing = getRecords().find((r) => r.date === record.date);
  const merged: HealthRecord = existing
    ? { ...existing, ...record, id: existing.id, createdAt: existing.createdAt }
    : record;
  const next = [...getRecords().filter((r) => r.date !== record.date), merged]
    .sort((a, b) => a.date.localeCompare(b.date));
  writeJSON(STORAGE_KEYS.records, next);
  return next;
}

export function deleteRecord(id: string): HealthRecord[] {
  const next = getRecords().filter((r) => r.id !== id);
  writeJSON(STORAGE_KEYS.records, next);
  return next;
}

export function clearRecords() {
  removeKey(STORAGE_KEYS.records);
}

/** Export a labelled backup including a data-source marker and schema version. */
export function exportBackup(): string {
  const data = {
    app: 'LONGEVIA',
    kind: 'personal-health-backup',
    version: 1,
    exportedAt: new Date().toISOString(),
    note: '本文件包含你自己在本浏览器记录的健康数据。默认不上传任何服务器，请妥善保管。',
    dataSource: '浏览器本地记录（自测 / 体检报告 / 医疗机构，按记录标记）',
    records: getRecords(),
    habits: readJSON(STORAGE_KEYS.habits, {} as Record<string, string[]>),
    activity: readJSON(STORAGE_KEYS.activity, [] as unknown[]),
    sleep: readJSON(STORAGE_KEYS.sleep, [] as unknown[]),
    training: readJSON(STORAGE_KEYS.training, [] as unknown[]),
    plan30: readJSON(STORAGE_KEYS.plan30, [] as number[]),
    favorites: readJSON(STORAGE_KEYS.favorites, [] as string[]),
  };
  return JSON.stringify(data, null, 2);
}

/** Import records from a previously exported backup (validated with Zod). */
export function importBackup(json: string): { ok: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(json) as { records?: unknown; version?: number };
    if (!parsed || !Array.isArray(parsed.records)) return { ok: false, count: 0, error: '文件格式不符合 LONGEVIA 备份结构' };
    const result = z.array(HealthRecordSchema).safeParse(parsed.records);
    if (!result.success) return { ok: false, count: 0, error: '记录未通过数据校验，未写入本地' };
    const merged = [...getRecords()];
    for (const record of result.data) {
      const i = merged.findIndex((r) => r.date === record.date);
      if (i >= 0) merged[i] = record; else merged.push(record);
    }
    merged.sort((a, b) => a.date.localeCompare(b.date));
    writeJSON(STORAGE_KEYS.records, merged);
    return { ok: true, count: result.data.length };
  } catch {
    return { ok: false, count: 0, error: '无法解析 JSON 文件' };
  }
}

export function clearAllPersonalData() {
  Object.values(STORAGE_KEYS).forEach(removeKey);
}

export function downloadText(filename: string, text: string, mime = 'application/json') {
  if (!isBrowser()) return;
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
