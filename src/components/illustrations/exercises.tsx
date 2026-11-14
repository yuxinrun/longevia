import * as React from 'react';
import { P, SvgFrame, SvgLabel, type IllustrationProps } from './shared';

/** Shared stick-figure renderer keeps the whole exercise atlas visually consistent. */
function Figure({
  head, paths, accents, label, caption, className,
}: IllustrationProps & {
  head: [number, number]; paths: string[]; accents?: React.ReactNode; label: string; caption: string;
}) {
  return (
    <SvgFrame label={label} className={className}>
      <line x1="36" y1="142" x2="204" y2="142" stroke={P.line} strokeWidth="2" />
      <circle cx={head[0]} cy={head[1]} r="10" fill={P.cream} stroke={P.forest} strokeWidth="2.2" />
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={P.forest} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ))}
      {accents}
      <SvgLabel x={120} y={164} size={8.5}>{caption}</SvgLabel>
    </SvgFrame>
  );
}

export function Squat({ className }: IllustrationProps) {
  return (
    <Figure className={className} label="深蹲动作示意" caption="深蹲 · 髋膝协同" head={[112, 42]}
      paths={['M112 54l-8 34 34 8', 'M104 88l-26 20 22 30', 'M138 96l24 18-16 28', 'M112 60 84 78M112 60l28 16']}
      accents={<path d="M64 60c-6 20 0 42 14 54" stroke={P.gold} strokeWidth="2" strokeDasharray="4 4" fill="none" />}
    />
  );
}

export function SitToStand({ className }: IllustrationProps) {
  return (
    <Figure className={className} label="坐姿站起动作示意" caption="坐姿站起 · 下肢功能" head={[104, 46]}
      paths={['M104 58l16 34-18 6', 'M120 92l-16 22 6 26', 'M104 98l24 16-8 28', 'M104 66 82 84M104 66l22 12']}
      accents={<g stroke={P.gold} strokeWidth="2.6" fill="none"><path d="M74 96h56v46M78 96V76h44" /><path d="M74 142v8M130 142v8" /></g>}
    />
  );
}

export function PushUp({ className }: IllustrationProps) {
  return (
    <Figure className={className} label="俯卧撑动作示意" caption="俯卧撑 · 上肢推" head={[62, 72]}
      paths={['M72 76 168 104', 'M168 104l14 34M168 104l-18 34', 'M96 84l-6 54M96 84l12 12', 'M140 96l-4 42']}
      accents={<circle cx="62" cy="72" r="10" fill={P.cream} stroke={P.forest} strokeWidth="2.2" />}
    />
  );
}

export function Row({ className }: IllustrationProps) {
  return (
    <Figure className={className} label="俯身划船动作示意" caption="划船 · 背部拉" head={[84, 52]}
      paths={['M84 64l30 22-14 16', 'M114 86l-10 30 4 22M100 102l26 18-12 22', 'M92 70l-8 34M110 78l14 22']}
      accents={<g stroke={P.gold} strokeWidth="3" strokeLinecap="round"><path d="M114 100v18" /><path d="M106 118h16M106 124h16" /></g>}
    />
  );
}

export function OverheadPress({ className }: IllustrationProps) {
  return (
    <Figure className={className} label="哑铃推举动作示意" caption="哑铃推举 · 上肢推" head={[120, 58]}
      paths={['M120 70v40M120 110l-18 30M120 110l18 30M120 78 92 62 88 36M120 78l28-16 4-26']}
      accents={<g stroke={P.gold} strokeWidth="3.2" strokeLinecap="round"><path d="M78 32h20M78 38h20M142 32h20M142 38h20" /></g>}
    />
  );
}

export function ResistanceBand({ className }: IllustrationProps) {
  return (
    <Figure className={className} label="弹力带训练动作示意" caption="弹力带划船 · 可居家" head={[112, 48]}
      paths={['M112 60v44M112 104l-18 34M112 104l18 34', 'M112 70 88 92M112 70l24 22']}
      accents={<g stroke={P.gold} strokeWidth="2.4" fill="none"><path d="M86 92c-8 12-6 26 0 38M138 92c8 12 6 26 0 38" /><path d="M86 130h52" /></g>}
    />
  );
}

export function BriskWalk({ className }: IllustrationProps) {
  return (
    <Figure className={className} label="快走动作示意" caption="快走 · 日常有氧" head={[126, 40]}
      paths={['M122 52l-10 32 20 8', 'M112 84l-24 20 6 34M132 92l20 22 4 24', 'M116 62 92 78M116 62l26 10']}
      accents={<g stroke={P.gold} strokeWidth="2" strokeLinecap="round"><path d="M52 58h22M44 74h26M54 90h20" /></g>}
    />
  );
}

export function Cycling({ className }: IllustrationProps) {
  return (
    <Figure className={className} label="骑行动作示意" caption="骑行 · 低冲击有氧" head={[116, 38]}
      paths={['M112 50l8 34 26 12', 'M120 84l-22 22 22 18M138 96l14 24-32 4', 'M112 58l24 22 14 16']}
      accents={<g stroke={P.gold} strokeWidth="2.4" fill="none"><circle cx="76" cy="124" r="18" /><circle cx="164" cy="124" r="18" /><path d="M76 124l36-40 52 40-22-2M112 84l52 40" /></g>}
    />
  );
}

export function BalanceExercise({ className }: IllustrationProps) {
  return (
    <Figure className={className} label="单腿平衡训练动作示意" caption="单腿站立 · 平衡" head={[120, 38]}
      paths={['M120 50v44M120 94l-18 46M120 94l20 22 14 14', 'M120 58 88 44M120 58l32-10']}
      accents={<g stroke={P.gold} strokeWidth="2.6" fill="none"><path d="M170 60v82M170 60h20" /><path d="M152 58h20" /></g>}
    />
  );
}

export function Stretch({ className }: IllustrationProps) {
  return (
    <Figure className={className} label="拉伸动作示意" caption="站姿拉伸 · 关节活动度" head={[116, 38]}
      paths={['M116 50v44M116 94l-16 46M116 94l18 18 22 14', 'M116 58 92 40M116 58l18-16']}
      accents={<path d="M62 60c14-4 26 2 32 14" stroke={P.gold} strokeWidth="2" strokeDasharray="4 4" fill="none" />}
    />
  );
}

export const exerciseIllustrations = {
  squat: Squat, sitToStand: SitToStand, pushUp: PushUp, row: Row,
  overheadPress: OverheadPress, resistanceBand: ResistanceBand,
  briskWalk: BriskWalk, cycling: Cycling, balanceExercise: BalanceExercise, stretch: Stretch,
};
