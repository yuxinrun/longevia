'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/primitives';
import { NumberField } from '@/components/tools/tool-shell';
import { deleteRecord, getRecords, upsertRecord } from '@/lib/storage';
import { todayISO, uid } from '@/lib/utils';
import type { HealthRecord } from '@/lib/types';

type NumericKey = 'weightKg' | 'waistCm' | 'restingHr' | 'systolic' | 'diastolic' | 'sleepHours' | 'steps' | 'exerciseMinutes' | 'strengthSessions';

const empty = { weightKg: '', waistCm: '', restingHr: '', systolic: '', diastolic: '', sleepHours: '', steps: '', exerciseMinutes: '', strengthSessions: '' };

export function RecordForm({ onSaved, records }: { onSaved: (records: HealthRecord[]) => void; records: HealthRecord[] }) {
  const [date, setDate] = useState(todayISO());
  const [values, setValues] = useState<Record<NumericKey, string>>(empty);
  const [unit, setUnit] = useState('kg / cm / mmHg');
  const [condition, setCondition] = useState('安静休息 5 分钟后坐位测量');
  const [source, setSource] = useState<'自测' | '体检报告' | '医疗机构' | '其他'>('自测');
  const [extra, setExtra] = useState('');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const set = (key: NumericKey) => (v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const save = () => {
    const num = (key: NumericKey) => {
      const v = Number(values[key]);
      return values[key] !== '' && Number.isFinite(v) && v >= 0 ? v : undefined;
    };
    const record: HealthRecord = {
      id: uid(), date, createdAt: new Date().toISOString(),
      weightKg: num('weightKg'), waistCm: num('waistCm'), restingHr: num('restingHr'),
      systolic: num('systolic'), diastolic: num('diastolic'), sleepHours: num('sleepHours'),
      steps: num('steps'), exerciseMinutes: num('exerciseMinutes'), strengthSessions: num('strengthSessions'),
      measureUnit: unit, measureCondition: condition, dataSource: source,
      extraMetrics: extra || undefined, note: note || undefined,
    };
    onSaved(upsertRecord(record));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const remove = (id: string) => onSaved(deleteRecord(id));

  return (
    <section className="surface rounded-xl p-5 sm:p-7" aria-labelledby="record-form-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">个人健康数据记录</span>
          <h2 id="record-form-heading" className="editorial-title mt-3 text-[1.4rem] sm:text-[1.7rem]">添加一条记录</h2>
        </div>
        <span className="text-[0.72rem] text-muted">同一天再次保存会更新该日记录 · 全部字段可选</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">日期</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <NumberField label="体重" unit="kg" value={values.weightKg} onChange={set('weightKg')} min={20} max={400} step={0.1} />
        <NumberField label="腰围" unit="cm" value={values.waistCm} onChange={set('waistCm')} min={30} max={250} step={0.5} />
        <NumberField label="静息心率" unit="次/分" value={values.restingHr} onChange={set('restingHr')} min={25} max={220} />
        <NumberField label="收缩压" unit="mmHg" value={values.systolic} onChange={set('systolic')} min={50} max={280} />
        <NumberField label="舒张压" unit="mmHg" value={values.diastolic} onChange={set('diastolic')} min={30} max={180} />
        <NumberField label="睡眠时长" unit="小时" value={values.sleepHours} onChange={set('sleepHours')} min={0} max={24} step={0.1} />
        <NumberField label="每日步数" unit="步" value={values.steps} onChange={set('steps')} min={0} max={100000} step={100} />
        <NumberField label="运动时长" unit="分钟" value={values.exerciseMinutes} onChange={set('exerciseMinutes')} min={0} max={1440} step={5} />
        <NumberField label="力量训练次数" unit="次" value={values.strengthSessions} onChange={set('strengthSessions')} min={0} max={20} />
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="text-[0.76rem] font-semibold text-forest">测量单位、条件与来源（适用于血压、血糖、血脂等）</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="mb-1.5 block text-[0.72rem] text-muted">测量单位</span>
            <input value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[0.72rem] text-muted">测量条件</span>
            <input value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[0.72rem] text-muted">数据来源</span>
            <select value={source} onChange={(e) => setSource(e.target.value as typeof source)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest">
              <option>自测</option><option>体检报告</option><option>医疗机构</option><option>其他</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[0.72rem] text-muted">其他指标（血糖 / 血脂等）</span>
            <input value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="例：空腹血糖 5.4 mmol/L" className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
          </label>
        </div>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-[0.72rem] text-muted">备注</span>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="可选：当日状态、测量差异、特殊情况" className="w-full resize-y rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest" />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="button" size="sm" onClick={save}><Save className="h-3.5 w-3.5" />保存到本地</Button>
        {saved && <span className="text-xs font-medium text-forest-600">已保存。数据仅存在于当前浏览器。</span>}
      </div>

      {records.length > 0 && (
        <div className="mt-7 border-t border-line pt-5">
          <p className="text-[0.76rem] font-semibold text-forest">最近记录（{records.length} 条）</p>
          <div className="mt-3 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[680px] text-[0.76rem]">
              <thead><tr className="bg-cream-deep text-left text-[0.68rem] uppercase tracking-wider text-muted">
                <th className="px-3 py-2 font-semibold">日期</th><th className="px-3 py-2 font-semibold">体重</th><th className="px-3 py-2 font-semibold">腰围</th>
                <th className="px-3 py-2 font-semibold">血压</th><th className="px-3 py-2 font-semibold">睡眠</th><th className="px-3 py-2 font-semibold">来源</th><th className="px-3 py-2" />
              </tr></thead>
              <tbody>{records.slice().reverse().slice(0, 8).map((r) => (
                <tr key={r.id} className="border-t border-line">
                  <td className="px-3 py-2 text-forest">{r.date}</td>
                  <td className="px-3 py-2">{r.weightKg ?? '—'} kg</td>
                  <td className="px-3 py-2">{r.waistCm ?? '—'} cm</td>
                  <td className="px-3 py-2">{r.systolic && r.diastolic ? `${r.systolic}/${r.diastolic}` : '—'}</td>
                  <td className="px-3 py-2">{r.sleepHours ?? '—'} h</td>
                  <td className="px-3 py-2 text-muted">{r.dataSource ?? '—'}</td>
                  <td className="px-3 py-2 text-right"><button type="button" onClick={() => remove(r.id)} aria-label={`删除 ${r.date} 记录`} className="text-[0.7rem] text-muted underline hover:text-forest">删除</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <p className="mt-2 text-[0.7rem] leading-5 text-muted">血压结果需结合年龄、病史与专业医疗意见；不能仅根据单项指标自行诊断。{records.find((r) => r.extraMetrics)?.extraMetrics ? '其他指标已在记录中以文本保留单位与条件。' : ''}</p>
        </div>
      )}
      <button type="button" className="hidden" onClick={() => onSaved(getRecords())} aria-hidden="true" />
    </section>
  );
}
