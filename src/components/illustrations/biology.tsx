import { Dot, P, SvgFrame, SvgLabel, type IllustrationProps } from './shared';

/** DNA double helix with base pairs */
export function Dna({ className }: IllustrationProps) {
  return (
    <SvgFrame label="DNA 双螺旋结构示意" className={className}>
      <path d="M88 24c0 38 64 30 64 66s-64 28-64 66" stroke={P.forest} strokeWidth="3" fill="none" />
      <path d="M152 24c0 38-64 30-64 66s64 28 64 66" stroke={P.soft} strokeWidth="3" fill="none" />
      {[34, 50, 66, 82, 98, 114, 130, 146].map((y, i) => {
        const t = (y - 24) / 132;
        const offset = Math.sin(t * Math.PI * 2) * 24;
        return <line key={y} x1={104 - offset} y1={y} x2={136 + offset} y2={y} stroke={P.gold} strokeWidth="2.2" />;
      })}
      <Dot cx={120} cy={90} r={4} />
      <SvgLabel x={120} y={172} size={8.5}>碱基配对 · 遗传信息载体</SvgLabel>
    </SvgFrame>
  );
}

/** Chromosome with highlighted telomere caps */
export function Telomere({ className }: IllustrationProps) {
  return (
    <SvgFrame label="染色体末端的端粒结构" className={className}>
      <path d="M96 46c8-8 16-8 24 0l-8 40c-2 10-2 22 8 30" stroke={P.forest} strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M144 46c-8-8-16-8-24 0l8 40c2 10 2 22-8 30" stroke={P.soft} strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M96 46c8-8 16-8 24 0M144 46c-8-8-16-8-24 0" stroke={P.gold} strokeWidth="6" strokeLinecap="round" />
      <path d="M128 116c-10 8-10 18 0 26M112 116c10 8 10 18 0 26" stroke={P.gold} strokeWidth="6" strokeLinecap="round" />
      <path d="M86 40h-18M154 40h18" stroke={P.muted} strokeWidth="1.2" strokeDasharray="2 3" />
      <SvgLabel x={56} y={37} size={8}>端粒</SvgLabel>
      <SvgLabel x={190} y={37} size={8}>端粒</SvgLabel>
      <SvgLabel x={120} y={160} size={8.5}>重复序列保护染色体末端</SvgLabel>
    </SvgFrame>
  );
}

/** Eukaryotic cell with organelles */
export function Cell({ className }: IllustrationProps) {
  return (
    <SvgFrame label="细胞与细胞器结构" className={className}>
      <circle cx="120" cy="90" r="62" fill={P.olive} fillOpacity="0.4" stroke={P.forest} strokeWidth="2.4" />
      <circle cx="104" cy="84" r="24" fill={P.cream} stroke={P.soft} strokeWidth="2" />
      <circle cx="104" cy="84" r="8" fill={P.goldLight} stroke={P.gold} strokeWidth="1.4" />
      <ellipse cx="158" cy="66" rx="17" ry="9" transform="rotate(-25 158 66)" fill={P.cream} stroke={P.soft} strokeWidth="1.8" />
      <path d="M148 70c4-6 8 2 12-4s8 2 10-4" stroke={P.gold} strokeWidth="1.4" fill="none" />
      <ellipse cx="150" cy="116" rx="15" ry="8" transform="rotate(20 150 116)" fill={P.cream} stroke={P.soft} strokeWidth="1.8" />
      <path d="M140 112c5 5 9-2 14 3s7-3 10 1" stroke={P.gold} strokeWidth="1.3" fill="none" />
      <path d="M76 112c12 8 24 4 30-2M74 120c12 8 26 4 32-2" stroke={P.leaf} strokeWidth="1.6" fill="none" />
      {[[68, 66], [174, 92], [90, 138], [126, 42]].map(([x, y]) => <Dot key={`${x}-${y}`} cx={x} cy={y} r={2.4} />)}
      <SvgLabel x={120} y={170} size={8.5}>细胞核 · 线粒体 · 内质网</SvgLabel>
    </SvgFrame>
  );
}

/** Mitochondrion with cristae and ATP output */
export function Mitochondria({ className }: IllustrationProps) {
  return (
    <SvgFrame label="线粒体与能量代谢" className={className}>
      <ellipse cx="112" cy="90" rx="62" ry="34" fill={P.olive} fillOpacity="0.5" stroke={P.forest} strokeWidth="2.4" />
      <ellipse cx="112" cy="90" rx="54" ry="26" fill="none" stroke={P.soft} strokeWidth="1.4" />
      {[70, 88, 106, 124, 142].map((x, i) => (
        <path key={x} d={`M${x} 66c-14 8-14 16 0 24s14 16 0 24`} stroke={P.soft} strokeWidth="2.4" fill="none" opacity={0.85 - i * 0.06} />
      ))}
      <path d="M174 90h18" stroke={P.gold} strokeWidth="2" strokeDasharray="3 3" />
      <Dot cx={198} cy={90} r={4} />
      <SvgLabel x={112} y={148} size={8.5}>嵴结构 · 氧化磷酸化 · ATP</SvgLabel>
    </SvgFrame>
  );
}

/** Normal cell -> senescent cell -> SASP signalling */
export function Senescence({ className }: IllustrationProps) {
  return (
    <SvgFrame label="细胞衰老与 SASP 分泌示意" className={className}>
      <circle cx="56" cy="86" r="24" fill={P.olive} fillOpacity="0.55" stroke={P.forest} strokeWidth="2" />
      <circle cx="56" cy="86" r="8" fill={P.cream} stroke={P.soft} strokeWidth="1.6" />
      <path d="M88 86h14m-4-5 5 5-5 5" stroke={P.muted} strokeWidth="1.6" fill="none" />
      <circle cx="132" cy="86" r="26" fill={P.goldLight} fillOpacity="0.5" stroke={P.gold} strokeWidth="2.2" />
      <circle cx="132" cy="86" r="9" fill={P.cream} stroke={P.soft} strokeWidth="1.6" />
      <path d="M164 86h12m-4-5 5 5-5 5" stroke={P.muted} strokeWidth="1.6" fill="none" />
      {[[188, 58], [200, 76], [190, 96], [204, 112], [178, 120]].map(([x, y]) => <Dot key={`${x}-${y}`} cx={x} cy={y} r={3.6} />)}
      <SvgLabel x={56} y={132} size={8}>增殖细胞</SvgLabel>
      <SvgLabel x={132} y={132} size={8}>衰老细胞</SvgLabel>
      <SvgLabel x={193} y={138} size={8}>SASP 因子</SvgLabel>
      <SvgLabel x={120} y={164} size={8.5}>细胞周期停滞 ≠ 细胞死亡</SvgLabel>
    </SvgFrame>
  );
}

/** Autophagy: damaged organelle -> autophagosome -> lysosome */
export function Autophagy({ className }: IllustrationProps) {
  return (
    <SvgFrame label="自噬与细胞质量控制过程" className={className}>
      <ellipse cx="46" cy="86" rx="17" ry="10" fill={P.goldLight} stroke={P.gold} strokeWidth="1.8" />
      <path d="M36 86c5 4 8-2 12 2s7-2 9 1" stroke={P.gold} strokeWidth="1.3" fill="none" />
      <path d="M70 86h14m-4-5 5 5-5 5" stroke={P.muted} strokeWidth="1.6" fill="none" />
      <circle cx="116" cy="86" r="28" fill="none" stroke={P.forest} strokeWidth="2.4" strokeDasharray="5 3" />
      <ellipse cx="116" cy="86" rx="15" ry="9" fill={P.olive} stroke={P.soft} strokeWidth="1.6" />
      <path d="M150 86h14m-4-5 5 5-5 5" stroke={P.muted} strokeWidth="1.6" fill="none" />
      <circle cx="192" cy="86" r="24" fill={P.olive} fillOpacity="0.5" stroke={P.forest} strokeWidth="2.2" />
      {[[186, 78], [198, 84], [190, 94], [200, 98]].map(([x, y]) => <Dot key={`${x}-${y}`} cx={x} cy={y} r={2.6} fill={P.gold} />)}
      <SvgLabel x={46} y={122} size={8}>受损组分</SvgLabel>
      <SvgLabel x={116} y={132} size={8}>自噬体</SvgLabel>
      <SvgLabel x={192} y={128} size={8}>降解回收</SvgLabel>
    </SvgFrame>
  );
}

/** DNA methylation tags and gene expression switch */
export function Epigenetics({ className }: IllustrationProps) {
  return (
    <SvgFrame label="表观遗传甲基化调控示意" className={className}>
      <path d="M50 78h140" stroke={P.forest} strokeWidth="3.4" />
      <path d="M50 102h140" stroke={P.soft} strokeWidth="3.4" />
      {[70, 96, 122, 148, 174].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="78" x2={x} y2="102" stroke={P.gold} strokeWidth="2" />
          {i % 2 === 0 && (
            <>
              <line x1={x} y1="78" x2={x} y2="66" stroke={P.gold} strokeWidth="1.6" />
              <circle cx={x} cy="61" r="5" fill={P.goldLight} stroke={P.gold} strokeWidth="1.4" />
            </>
          )}
        </g>
      ))}
      <path d="M50 132h58" stroke={P.leaf} strokeWidth="2.4" />
      <path d="M108 126v12" stroke={P.forest} strokeWidth="2" />
      <text x="190" y="66" textAnchor="middle" fontSize="9" fill={P.gold}>CH₃</text>
      <SvgLabel x={120} y={158} size={8.5}>化学修饰改变基因表达，不改变 DNA 序列</SvgLabel>
    </SvgFrame>
  );
}

/** Chronic low-grade inflammation signalling */
export function Inflammation({ className }: IllustrationProps) {
  return (
    <SvgFrame label="慢性低度炎症信号示意" className={className}>
      <circle cx="62" cy="90" r="28" fill={P.olive} fillOpacity="0.55" stroke={P.forest} strokeWidth="2.2" />
      <circle cx="62" cy="90" r="13" fill={P.cream} stroke={P.soft} strokeWidth="1.6" />
      <circle cx="62" cy="90" r="5" fill={P.goldLight} />
      {[[104, 62], [116, 78], [106, 100], [124, 112], [118, 48]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="4" fill={P.gold} fillOpacity="0.85" />
          <circle cx={x} cy={y} r="7" fill="none" stroke={P.goldLight} strokeWidth="1" />
        </g>
      ))}
      <path d="M92 90h12m-4-5 5 5-5 5" stroke={P.muted} strokeWidth="1.6" fill="none" />
      <circle cx="178" cy="90" r="26" fill={P.cream} stroke={P.soft} strokeWidth="2.2" />
      <path d="M164 84c6-6 12 4 18-2M164 96c6 6 12-4 18 2" stroke={P.leaf} strokeWidth="1.8" fill="none" />
      <SvgLabel x={62} y={134} size={8}>免疫细胞</SvgLabel>
      <SvgLabel x={178} y={134} size={8}>靶组织</SvgLabel>
      <SvgLabel x={120} y={160} size={8.5}>持续低水平信号与年龄相关变化</SvgLabel>
    </SvgFrame>
  );
}

/** Stem cell differentiation */
export function StemCell({ className }: IllustrationProps) {
  return (
    <SvgFrame label="干细胞分化示意" className={className}>
      <circle cx="52" cy="90" r="24" fill={P.olive} stroke={P.forest} strokeWidth="2.2" />
      <circle cx="52" cy="90" r="8" fill={P.cream} stroke={P.soft} strokeWidth="1.5" />
      <path d="M80 90h28M108 90v-34h24M108 90h24M108 90v34h24" stroke={P.muted} strokeWidth="1.8" fill="none" />
      <rect x="136" y="44" width="44" height="24" rx="12" fill={P.cream} stroke={P.soft} strokeWidth="1.8" />
      <circle cx="158" cy="56" r="6" fill={P.goldLight} stroke={P.gold} strokeWidth="1.2" />
      <rect x="136" y="78" width="44" height="24" rx="6" fill={P.olive} fillOpacity="0.6" stroke={P.forest} strokeWidth="1.8" />
      <path d="M144 90h28" stroke={P.soft} strokeWidth="1.6" />
      <rect x="136" y="112" width="44" height="24" rx="12" fill={P.cream} stroke={P.soft} strokeWidth="1.8" />
      <path d="M146 124c5-6 9 6 14 0s9 6 14 0" stroke={P.gold} strokeWidth="1.6" fill="none" />
      <SvgLabel x={52} y={132} size={8}>干细胞</SvgLabel>
      <SvgLabel x={120} y={160} size={8.5}>组织修复潜能随年龄变化</SvgLabel>
    </SvgFrame>
  );
}

export const biologyIllustrations = {
  dna: Dna, telomere: Telomere, cell: Cell, mitochondria: Mitochondria,
  senescence: Senescence, autophagy: Autophagy, epigenetics: Epigenetics,
  inflammation: Inflammation, stemCell: StemCell,
};
