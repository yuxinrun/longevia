'use client';

import { useState } from 'react';
import { CalculationSteps, NumberField, ResultPanel, ToolShell } from '@/components/tools/tool-shell';
import { activityFactors, bmi, bmr, proteinReference, tdee, whtr, type ProteinGoal, type Sex } from '@/lib/calculations';
import { Button, Callout } from '@/components/ui/primitives';

export function BmiTool() {
  const [weight, setWeight] = useState('68');
  const [height, setHeight] = useState('170');
  const w = Number(weight), h = Number(height);
  const valid = w > 0 && h > 0;
  const r = valid ? bmi(w, h) : null;
  return (
    <ToolShell id="bmi" index="01" title="BMI 计算器" en="Body Mass Index" description="用身高与体重计算身体质量指数，作为群体层面的粗略参考。"
      unit="体重 kg、身高 cm、结果 kg/m²">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="体重" unit="kg" value={weight} onChange={setWeight} min={20} max={400} step={0.1} />
        <NumberField label="身高" unit="cm" value={height} onChange={setHeight} min={80} max={250} step={0.5} />
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {r ? <ResultPanel label="BMI 估算值" value={String(r.value)} unit={r.unit} note={`参考区间提示：${r.category}`} /> : <ResultPanel label="BMI 估算值" value="—" note="请输入有效数值" />}
        {r && <CalculationSteps formula={r.formula} steps={r.steps} />}
      </div>
      <Callout kind="note" title="BMI 的局限" className="mt-5"><p>{r?.note}</p></Callout>
    </ToolShell>
  );
}

export function WhtrTool() {
  const [waist, setWaist] = useState('82');
  const [height, setHeight] = useState('170');
  const w = Number(waist), h = Number(height);
  const valid = w > 0 && h > 0;
  const r = valid ? whtr(w, h) : null;
  return (
    <ToolShell id="whtr" index="02" title="腰高比计算器" en="Waist-to-Height Ratio" description="用腰围与身高的比值粗略了解腹部脂肪分布，比 BMI 更接近中心性肥胖信息。"
      unit="腰围 cm、身高 cm、结果为无量纲比值">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="腰围" unit="cm" value={waist} onChange={setWaist} min={30} max={250} step={0.5} />
        <NumberField label="身高" unit="cm" value={height} onChange={setHeight} min={80} max={250} step={0.5} />
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {r ? <ResultPanel label="腰高比 WHtR" value={String(r.value)} note={r.category} /> : <ResultPanel label="腰高比 WHtR" value="—" note="请输入有效数值" />}
        {r && <CalculationSteps formula={r.formula} steps={r.steps} />}
      </div>
      <Callout kind="note" title="测量条件很重要" className="mt-5"><p>{r?.note} 建议在相同时间、相同体位与同一测量部位记录，观察长期趋势。</p></Callout>
    </ToolShell>
  );
}

export function BmrTool() {
  const [weight, setWeight] = useState('68');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('40');
  const [sex, setSex] = useState<Sex>('female');
  const [factor, setFactor] = useState('1.375');
  const w = Number(weight), h = Number(height), a = Number(age);
  const valid = w > 0 && h > 0 && a > 0;
  const r = valid ? bmr(w, h, a, sex) : null;
  const t = r ? tdee(r.value, Number(factor)) : null;
  return (
    <ToolShell id="bmr" index="03" title="BMR 基础代谢估算器" en="Basal Metabolic Rate" description="用 Mifflin-St Jeor 公式估算安静状态下的基础能量消耗，并可按活动系数估算每日总消耗。"
      unit="体重 kg、身高 cm、年龄 岁、结果 kcal / 天">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NumberField label="体重" unit="kg" value={weight} onChange={setWeight} min={20} max={400} step={0.1} />
        <NumberField label="身高" unit="cm" value={height} onChange={setHeight} min={80} max={250} step={0.5} />
        <NumberField label="年龄" unit="岁" value={age} onChange={setAge} min={18} max={110} />
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">公式中的性别系数</span>
          <select value={sex} onChange={(e) => setSex(e.target.value as Sex)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest">
            <option value="female">女性（−161）</option><option value="male">男性（+5）</option>
          </select>
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">日常活动水平（用于估算 TDEE）</span>
        <select value={factor} onChange={(e) => setFactor(e.target.value)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest">
          {activityFactors.map((f) => <option key={f.value} value={f.value}>{f.label} · ×{f.value}</option>)}
        </select>
      </label>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {r ? <ResultPanel label="基础代谢 BMR" value={String(r.value)} unit={r.unit} note="安静状态下的估算消耗" /> : <ResultPanel label="基础代谢 BMR" value="—" note="请输入有效数值" />}
        {t ? <ResultPanel label="每日总消耗 TDEE" value={String(t.value)} unit={t.unit} note="按所选活动系数估算" /> : <ResultPanel label="每日总消耗 TDEE" value="—" />}
      </div>
      {r && <div className="mt-4"><CalculationSteps formula={r.formula} steps={[...r.steps, ...(t?.steps ?? [])]} /></div>}
      <Callout kind="note" title="估算误差" className="mt-5"><p>{r?.note} {t?.note}</p></Callout>
    </ToolShell>
  );
}

export function ProteinTool() {
  const [weight, setWeight] = useState('68');
  const [goal, setGoal] = useState<ProteinGoal>('general');
  const w = Number(weight);
  const r = w > 0 ? proteinReference(w, goal) : null;
  const goals: { value: ProteinGoal; label: string }[] = [
    { value: 'general', label: '一般成人参考' },
    { value: 'active', label: '规律活动人群' },
    { value: 'older', label: '中老年人肌肉健康' },
    { value: 'strength', label: '规律力量训练' },
  ];
  return (
    <ToolShell id="protein" index="06" title="蛋白质摄入参考计算器" en="Protein Intake Reference" description="按体重与情境给出每日蛋白质摄入的参考区间，用于理解食物安排，不是营养处方。"
      unit="体重 kg、结果 g / 天（每公斤 g/kg）">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="体重" unit="kg" value={weight} onChange={setWeight} min={20} max={400} step={0.1} />
        <label className="block">
          <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">参考情境</span>
          <select value={goal} onChange={(e) => setGoal(e.target.value as ProteinGoal)} className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none focus:border-forest">
            {goals.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {r ? <ResultPanel label="每日参考区间" value={`${r.min}–${r.max}`} unit={r.unit} note="请结合全天膳食与训练安排" /> : <ResultPanel label="每日参考区间" value="—" />}
        {r && <CalculationSteps formula={r.formula} steps={r.steps} />}
      </div>
      <Callout kind="warning" title="特殊情况需专业指导" className="mt-5"><p>{r?.note} 肾脏疾病、肝病或正在接受医疗营养治疗者，请勿依据本工具自行调整。</p></Callout>
    </ToolShell>
  );
}

export function Resettable({ onReset }: { onReset: () => void }) {
  return <Button type="button" variant="ghost" size="sm" onClick={onReset}>恢复默认值</Button>;
}
