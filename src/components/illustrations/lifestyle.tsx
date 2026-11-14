import { Dot, P, SvgFrame, SvgLabel, type IllustrationProps } from './shared';

/** Strength training figure with dumbbells */
export function Strength({ className }: IllustrationProps) {
  return (
    <SvgFrame label="力量训练示意" className={className}>
      <circle cx="120" cy="42" r="11" fill={P.cream} stroke={P.forest} strokeWidth="2.2" />
      <path d="M120 54v42M120 62 92 74M120 62l28 12M120 96l-18 32M120 96l18 32" stroke={P.forest} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M84 66v16M100 66v16M140 66v16M156 66v16" stroke={P.gold} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M88 74h56" stroke={P.gold} strokeWidth="2" />
      <path d="M46 136h148" stroke={P.line} strokeWidth="2" />
      <SvgLabel x={120} y={160} size={8.5}>渐进抗阻 · 每周 2–4 次</SvgLabel>
    </SvgFrame>
  );
}

/** Aerobic activity: runner with motion lines */
export function Aerobic({ className }: IllustrationProps) {
  return (
    <SvgFrame label="有氧运动示意" className={className}>
      <circle cx="132" cy="40" r="10" fill={P.cream} stroke={P.forest} strokeWidth="2.2" />
      <path d="M128 52l-12 30 22 8M116 82l-24 18M138 90l18 26M116 62l-22 10M116 62l24 14" stroke={P.forest} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M52 58h26M44 74h30M56 90h24" stroke={P.gold} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 136h160" stroke={P.line} strokeWidth="2" />
      <SvgLabel x={120} y={160} size={8.5}>步行 · 骑行 · 游泳 · 心肺适能</SvgLabel>
    </SvgFrame>
  );
}

/** Single-leg balance */
export function Balance({ className }: IllustrationProps) {
  return (
    <SvgFrame label="平衡训练示意" className={className}>
      <circle cx="120" cy="38" r="10" fill={P.cream} stroke={P.forest} strokeWidth="2.2" />
      <path d="M120 50v42M120 58 88 44M120 58l32-14M120 92l-16 40M120 92l22 20 12 18" stroke={P.forest} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M72 122c16 6 34 10 52 10s36-4 52-10" stroke={P.gold} strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <path d="M40 136h160" stroke={P.line} strokeWidth="2" />
      <SvgLabel x={120} y={160} size={8.5}>平衡与跌倒预防</SvgLabel>
    </SvgFrame>
  );
}

/** Healthy plate with food groups */
export function Plate({ className }: IllustrationProps) {
  return (
    <SvgFrame label="健康餐盘结构示意" className={className}>
      <circle cx="120" cy="88" r="58" fill={P.cream} stroke={P.forest} strokeWidth="2.4" />
      <circle cx="120" cy="88" r="46" fill="none" stroke={P.olive} strokeWidth="1.4" />
      <path d="M120 42a46 46 0 0 1 40 23L120 88Z" fill={P.olive} />
      <path d="M120 88 88 127a46 46 0 0 1-14-56Z" fill={P.goldLight} />
      <path d="M120 88 160 65a46 46 0 0 1 6 40L120 88Z" fill={P.leaf} fillOpacity="0.6" />
      <path d="M120 42v46" stroke={P.forest} strokeWidth="1.8" />
      <Dot cx={98} cy={66} r={3} /><Dot cx={142} cy={112} r={3} />
      <SvgLabel x={120} y={164} size={8.5}>蔬菜 · 全谷物 · 优质蛋白 · 健康脂肪</SvgLabel>
    </SvgFrame>
  );
}

/** 24h circadian rhythm */
export function SleepRhythm({ className }: IllustrationProps) {
  return (
    <SvgFrame label="睡眠与昼夜节律示意" className={className}>
      <circle cx="120" cy="88" r="56" fill="none" stroke={P.olive} strokeWidth="10" />
      <path d="M120 32a56 56 0 0 1 48 85" fill="none" stroke={P.gold} strokeWidth="10" strokeLinecap="round" />
      <path d="M64 88a56 56 0 0 1 34-52" fill="none" stroke={P.forest} strokeWidth="10" strokeLinecap="round" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return <line key={deg} x1={120 + Math.cos(a) * 68} y1={88 + Math.sin(a) * 68} x2={120 + Math.cos(a) * 74} y2={88 + Math.sin(a) * 74} stroke={P.muted} strokeWidth="1.4" />;
      })}
      <circle cx="120" cy="88" r="4" fill={P.forest} />
      <path d="M120 88l-24-24" stroke={P.forest} strokeWidth="2" />
      <SvgLabel x={120} y={164} size={8.5}>规律作息 · 光照 · 进食时间</SvgLabel>
    </SvgFrame>
  );
}

/** Outdoor activity */
export function Outdoor({ className }: IllustrationProps) {
  return (
    <SvgFrame label="户外活动与光照示意" className={className}>
      <circle cx="184" cy="46" r="16" fill={P.goldLight} stroke={P.gold} strokeWidth="1.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return <line key={deg} x1={184 + Math.cos(a) * 21} y1={46 + Math.sin(a) * 21} x2={184 + Math.cos(a) * 27} y2={46 + Math.sin(a) * 27} stroke={P.gold} strokeWidth="1.6" strokeLinecap="round" />;
      })}
      <path d="M62 118V84c0-18 12-32 28-32s28 14 28 32v34" fill={P.olive} stroke={P.forest} strokeWidth="2.2" />
      <path d="M90 118v20" stroke={P.forest} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M48 138h96" stroke={P.line} strokeWidth="2" />
      <circle cx="120" cy="106" r="9" fill={P.cream} stroke={P.forest} strokeWidth="2" />
      <path d="M120 116v14M120 120l-10 8M120 120l10 8" stroke={P.forest} strokeWidth="2.2" strokeLinecap="round" />
      <SvgLabel x={120} y={164} size={8.5}>户外光照与日常活动量</SvgLabel>
    </SvgFrame>
  );
}

/** Social connection */
export function Social({ className }: IllustrationProps) {
  return (
    <SvgFrame label="社交互动示意" className={className}>
      <ellipse cx="120" cy="112" rx="58" ry="18" fill={P.olive} stroke={P.forest} strokeWidth="2" />
      {[[70, 58], [120, 46], [170, 58]].map(([x, y], i) => (
        <g key={x}>
          <circle cx={x} cy={y} r="10" fill={P.cream} stroke={P.forest} strokeWidth="2" />
          <path d={`M${x - 12} ${y + 26}c0-10 6-16 12-16s12 6 12 16`} fill={i === 1 ? P.goldLight : P.olive} stroke={P.soft} strokeWidth="1.8" />
        </g>
      ))}
      <path d="M82 74c14 8 22 8 32 2M128 76c12-6 20-6 30 2" stroke={P.gold} strokeWidth="1.8" strokeDasharray="3 3" fill="none" />
      <SvgLabel x={120} y={158} size={8.5}>社交参与与心理健康</SvgLabel>
    </SvgFrame>
  );
}

/** Meditation / slow breathing */
export function Meditation({ className }: IllustrationProps) {
  return (
    <SvgFrame label="冥想与放松示意" className={className}>
      <circle cx="120" cy="52" r="11" fill={P.cream} stroke={P.forest} strokeWidth="2.2" />
      <path d="M120 64v26M120 72 86 104M120 72l34 32M86 104c14 12 54 12 68 0" stroke={P.forest} strokeWidth="3.2" strokeLinecap="round" fill="none" />
      {[64, 50, 36].map((r, i) => (
        <circle key={r} cx="120" cy="76" r={r} fill="none" stroke={P.gold} strokeWidth="1.2" opacity={0.65 - i * 0.15} strokeDasharray="4 6" />
      ))}
      <Dot cx={120} cy={76} r={3.6} />
      <SvgLabel x={120} y={158} size={8.5}>压力调节与恢复</SvgLabel>
    </SvgFrame>
  );
}

export const lifestyleIllustrations = {
  strength: Strength, aerobic: Aerobic, balance: Balance, plate: Plate,
  sleepRhythm: SleepRhythm, outdoor: Outdoor, social: Social, meditation: Meditation,
};
