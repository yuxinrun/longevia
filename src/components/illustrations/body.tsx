import { Dot, P, SvgFrame, SvgLabel, type IllustrationProps } from './shared';

/** Heart and vascular network */
export function Heart({ className }: IllustrationProps) {
  return (
    <SvgFrame label="心脏与血管示意" className={className}>
      <path d="M120 132c-8-12-38-30-38-56 0-14 10-24 22-24 8 0 14 4 16 10 2-6 8-10 16-10 12 0 22 10 22 24 0 26-30 44-38 56Z" fill={P.olive} stroke={P.forest} strokeWidth="2.4" />
      <path d="M120 52v74M104 66c8 4 10 16 8 30M136 66c-8 4-10 16-8 30" stroke={P.soft} strokeWidth="1.8" fill="none" />
      <path d="M100 54c-14-8-24-4-30 4M140 54c14-8 24-4 30 4" stroke={P.gold} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M70 58c-8 10-10 22-6 34M170 58c8 10 10 22 6 34" stroke={P.leaf} strokeWidth="2" fill="none" />
      <Dot cx={64} cy={94} r={3} /><Dot cx={176} cy={94} r={3} />
      <SvgLabel x={120} y={160} size={8.5}>血压 · 血脂 · 心肺适能共同影响风险</SvgLabel>
    </SvgFrame>
  );
}

/** Brain lateral view */
export function Brain({ className }: IllustrationProps) {
  return (
    <SvgFrame label="大脑与认知功能示意" className={className}>
      <path d="M62 96c-10-6-12-20-4-28 0-14 12-24 26-22 8-10 26-12 36-2 14-2 26 8 26 22 8 8 6 22-4 28-2 14-14 22-26 20-8 6-20 6-28 0-10 2-22-4-26-18Z" fill={P.olive} fillOpacity="0.55" stroke={P.forest} strokeWidth="2.4" />
      <path d="M84 50c8 6 6 14 2 20M108 46c10 6 12 16 8 24M132 50c-8 6-8 16-2 22M92 84c10-4 18 2 20 12M124 82c-8 4-10 14-4 20M70 78c8 0 12 6 12 12" stroke={P.soft} strokeWidth="1.7" fill="none" />
      <path d="M90 118c12 4 26 4 38-2" stroke={P.gold} strokeWidth="2.4" fill="none" />
      <SvgLabel x={120} y={158} size={8.5}>认知功能受睡眠、活动与感官健康共同影响</SvgLabel>
    </SvgFrame>
  );
}

/** Skeletal muscle fibre bundle */
export function Muscle({ className }: IllustrationProps) {
  return (
    <SvgFrame label="骨骼肌纤维示意" className={className}>
      <path d="M56 52c26-12 82-12 128 0M56 68c26-12 82-12 128 0M56 84c26-12 82-12 128 0M56 100c26-12 82-12 128 0M56 116c26-12 82-12 128 0" stroke={P.forest} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M48 44v80M192 44v80" stroke={P.gold} strokeWidth="4" strokeLinecap="round" />
      {[62, 78, 94, 110].map((y) => <path key={y} d={`M76 ${y}h88`} stroke={P.leaf} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.8" />)}
      <SvgLabel x={120} y={158} size={8.5}>肌肉力量与质量是重要的功能指标</SvgLabel>
    </SvgFrame>
  );
}

/** Bone with trabecular structure */
export function Bone({ className }: IllustrationProps) {
  return (
    <SvgFrame label="骨骼与骨密度示意" className={className}>
      <path d="M64 44c-10-10 4-20 12-12 6-6 16 2 10 10l36 70c6 8-2 16-10 12-8 8-18 0-12-10Z" fill={P.cream} stroke={P.forest} strokeWidth="2.4" />
      <path d="M68 46c8-2 14 2 18 8M80 62c10 0 16 6 18 14M96 84c10 0 16 6 18 14M108 108c8 0 14 4 16 10" stroke={P.gold} strokeWidth="1.6" fill="none" />
      {[[82, 52], [98, 70], [112, 92], [126, 112]].map(([x, y]) => <Dot key={`${x}-${y}`} cx={x} cy={y} r={2.4} fill={P.leaf} />)}
      <path d="M150 62h40M150 90h40M150 118h30" stroke={P.olive} strokeWidth="3" />
      <SvgLabel x={170} y={140} size={8}>骨小梁结构</SvgLabel>
      <SvgLabel x={120} y={162} size={8.5}>阻力训练与蛋白质有助于骨骼与肌肉健康</SvgLabel>
    </SvgFrame>
  );
}

/** Lungs and airways */
export function Lung({ className }: IllustrationProps) {
  return (
    <SvgFrame label="肺与呼吸系统示意" className={className}>
      <path d="M120 34v40M120 74 92 92M120 74l28 18" stroke={P.forest} strokeWidth="3" fill="none" />
      <path d="M108 84c-8 6-12 18-12 34 0 18 8 28 20 26 8-2 10-10 8-24V86c0-6-10-8-16-2Z" fill={P.olive} fillOpacity="0.6" stroke={P.soft} strokeWidth="2.2" />
      <path d="M132 84c8 6 12 18 12 34 0 18-8 28-20 26-8-2-10-10-8-24V86c0-6 10-8 16-2Z" fill={P.olive} fillOpacity="0.6" stroke={P.soft} strokeWidth="2.2" />
      <path d="M100 100c-4 10-6 20-6 30M140 100c4 10 6 20 6 30" stroke={P.leaf} strokeWidth="1.6" fill="none" />
      <SvgLabel x={120} y={160} size={8.5}>有氧运动与心肺适能密切相关</SvgLabel>
    </SvgFrame>
  );
}

/** Liver and metabolic pathways */
export function Liver({ className }: IllustrationProps) {
  return (
    <SvgFrame label="肝脏与代谢调节示意" className={className}>
      <path d="M50 76c18-18 50-22 84-14 22 4 42 2 52-6-2 22-12 44-32 54-30 16-76 10-98-6-8-6-10-18-6-28Z" fill={P.olive} fillOpacity="0.55" stroke={P.forest} strokeWidth="2.4" />
      <path d="M120 66c-4 20 2 40 12 54" stroke={P.soft} strokeWidth="1.8" fill="none" />
      <path d="M70 84c14 6 28 4 38-2M150 84c12 6 24 4 32-2" stroke={P.gold} strokeWidth="1.8" fill="none" />
      <Dot cx={88} cy={104} r={3} /><Dot cx={158} cy={108} r={3} />
      <SvgLabel x={120} y={158} size={8.5}>糖脂代谢 · 内脏脂肪 · 胰岛素敏感性</SvgLabel>
    </SvgFrame>
  );
}

/** Gut and microbiome */
export function Gut({ className }: IllustrationProps) {
  return (
    <SvgFrame label="肠道与微生物群示意" className={className}>
      <path d="M76 44c-16 0-24 14-24 30s10 28 26 28h28c14 0 20-10 20-24s-8-22-20-22h-8c-8 0-12 6-12 14s6 12 12 12h16" fill="none" stroke={P.forest} strokeWidth="4" strokeLinecap="round" />
      {[[62, 118], [82, 126], [104, 122], [130, 118], [150, 108], [170, 90], [178, 66], [162, 48]].map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={i % 3 === 0 ? 4.5 : 3.2} fill={i % 2 ? P.goldLight : P.olive} stroke={P.gold} strokeWidth="1.1" />
        </g>
      ))}
      <SvgLabel x={120} y={158} size={8.5}>微生物组与代谢、免疫存在关联</SvgLabel>
    </SvgFrame>
  );
}

/** Immune cells and defence */
export function Immune({ className }: IllustrationProps) {
  return (
    <SvgFrame label="免疫系统与免疫衰老示意" className={className}>
      <circle cx="98" cy="88" r="34" fill={P.olive} fillOpacity="0.6" stroke={P.forest} strokeWidth="2.4" />
      <circle cx="98" cy="88" r="16" fill={P.cream} stroke={P.soft} strokeWidth="1.8" />
      <circle cx="98" cy="88" r="6" fill={P.goldLight} />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return <Dot key={deg} cx={98 + Math.cos(a) * 44} cy={88 + Math.sin(a) * 44} r={3.4} fill={P.gold} />;
      })}
      <path d="M150 88h26m-6-6 6 6-6 6" stroke={P.muted} strokeWidth="1.8" fill="none" />
      <path d="M184 68c14-6 24 4 22 18-2 14-12 20-22 16" stroke={P.soft} strokeWidth="2.4" fill="none" />
      <SvgLabel x={120} y={158} size={8.5}>免疫监视 · 疫苗应答 · 慢性低度炎症</SvgLabel>
    </SvgFrame>
  );
}

export const bodyIllustrations = {
  heart: Heart, brain: Brain, muscle: Muscle, bone: Bone,
  lung: Lung, liver: Liver, gut: Gut, immune: Immune,
};
