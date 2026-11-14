import { Info, ShieldAlert } from 'lucide-react';
import { toolCommonNotes } from '@/lib/calculations';

export function NumberField({
  label, value, onChange, unit, min, max, step = 1, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  unit?: string; min?: number; max?: number; step?: number; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.76rem] font-medium text-forest">{label}{unit && <span className="ml-1 font-normal text-muted">（{unit}）</span>}</span>
      <input
        type="number" value={value} onChange={(e) => onChange(e.target.value)}
        min={min} max={max} step={step} placeholder={placeholder} inputMode="decimal"
        className="w-full rounded-lg border border-line bg-cream-light px-3.5 py-2.5 text-sm text-forest outline-none transition-colors focus:border-forest"
      />
    </label>
  );
}

export function ResultPanel({ value, unit, label, note }: { value: string; unit?: string; label: string; note?: string }) {
  return (
    <div className="rounded-xl border border-forest/15 bg-forest-50 p-5 text-center">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest-600">{label}</p>
      <p className="mt-2 font-display text-3xl text-forest tabular sm:text-4xl">{value}<span className="ml-1.5 text-sm font-sans text-muted">{unit}</span></p>
      {note && <p className="mt-2 text-[0.76rem] leading-6 text-ink/80">{note}</p>}
    </div>
  );
}

export function CalculationSteps({ formula, steps }: { formula: string; steps: string[] }) {
  return (
    <div className="rounded-lg border border-line bg-cream-light p-4">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">计算过程</p>
      <p className="mt-1.5 font-mono text-[0.78rem] leading-6 text-forest">{formula}</p>
      <ol className="mt-2 space-y-0.5">
        {steps.map((s, i) => <li key={i} className="text-[0.78rem] leading-6 text-muted">{i + 1}. {s}</li>)}
      </ol>
    </div>
  );
}

export function ToolShell({
  id, index, title, en, description, unit, children, className,
}: {
  id: string; index: string; title: string; en: string; description: string;
  unit: string; children: React.ReactNode; className?: string;
}) {
  return (
    <section id={id} className={`surface scroll-mt-44 rounded-xl p-5 sm:p-7 ${className ?? ''}`} aria-labelledby={`${id}-heading`}>
      <div className="flex items-start gap-3">
        <span className="mt-1 font-display text-lg text-gold-deep tabular">{index}</span>
        <div>
          <h2 id={`${id}-heading`} className="font-display text-[1.3rem] text-forest">{title}</h2>
          <p className="mt-0.5 font-serif text-xs italic text-muted">{en}</p>
          <p className="mt-3 text-[0.82rem] leading-7 text-muted">{description}</p>
        </div>
      </div>

      <div className="mt-6">{children}</div>

      <div className="mt-7 space-y-2 border-t border-line pt-5 text-[0.73rem] leading-6 text-muted">
        <p><strong className="font-semibold text-forest">单位：</strong>{unit}</p>
        <p><strong className="font-semibold text-forest">数据来源：</strong>{toolCommonNotes.source}</p>
        <p><strong className="font-semibold text-forest">估算误差：</strong>{toolCommonNotes.estimate}</p>
        <p><strong className="font-semibold text-forest">适用范围：</strong>{toolCommonNotes.scope}</p>
        <p className="flex items-start gap-2 text-forest"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span><strong>不夸大医学意义：</strong>{toolCommonNotes.diagnosis}</span></p>
        <p className="flex items-start gap-2 border-t border-line pt-2 text-gold-deep"><ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span>本工具不推断生物年龄、剩余寿命或疾病风险；记录默认保存在本地浏览器。</span></p>
      </div>
    </section>
  );
}
