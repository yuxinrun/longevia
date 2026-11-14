import { Dot, P, SvgFrame, SvgLabel, type IllustrationProps } from './shared';

/** Milestones in aging research (conceptual, not a data chart) */
export function ResearchTimeline({ className }: IllustrationProps) {
  const points = [
    { x: 48, label: '衰老表型描述' },
    { x: 96, label: '细胞衰老' },
    { x: 144, label: '机制框架' },
    { x: 192, label: '人体干预研究' },
  ];
  return (
    <SvgFrame label="衰老研究发展脉络示意" className={className}>
      <path d="M36 90h168" stroke={P.forest} strokeWidth="2.4" />
      <path d="M196 90l8-5v10Z" fill={P.forest} />
      {points.map((p, i) => (
        <g key={p.x}>
          <circle cx={p.x} cy="90" r={i === 3 ? 6 : 4.5} fill={i === 3 ? P.gold : P.cream} stroke={P.forest} strokeWidth="2" />
          <line x1={p.x} y1={90} x2={p.x} y2={i % 2 ? 68 : 112} stroke={P.muted} strokeWidth="1.2" strokeDasharray="2 3" />
          <SvgLabel x={p.x} y={i % 2 ? 60 : 126} size={7.5}>{p.label}</SvgLabel>
        </g>
      ))}
      <SvgLabel x={120} y={158} size={8.5}>框架持续更新，机制不等于已确立因果</SvgLabel>
    </SvgFrame>
  );
}

/** Evidence hierarchy pyramid */
export function EvidencePyramid({ className }: IllustrationProps) {
  const rows = [
    { y: 44, w: 46, fill: P.forest, label: '系统综述 / Meta 分析' },
    { y: 70, w: 84, fill: P.soft, label: '随机对照试验' },
    { y: 96, w: 122, fill: P.leaf, label: '队列与观察性研究' },
    { y: 122, w: 160, fill: P.goldLight, label: '基础研究（细胞 / 动物）' },
  ];
  return (
    <SvgFrame label="研究证据等级金字塔" className={className}>
      {rows.map((r) => (
        <g key={r.y}>
          <rect x={120 - r.w / 2} y={r.y} width={r.w} height="22" rx="2" fill={r.fill} fillOpacity={0.9} />
          <SvgLabel x={120} y={r.y + 15} size={8} fill={r.fill === P.forest ? P.cream : P.forest} weight={600}>{r.label}</SvgLabel>
        </g>
      ))}
      <SvgLabel x={120} y={162} size={8.5}>越靠上，越接近可靠的人体效应判断</SvgLabel>
    </SvgFrame>
  );
}

/** From bench research to clinical application */
export function BenchToClinic({ className }: IllustrationProps) {
  const stages = [
    { x: 44, label: '细胞实验', sub: '机制假说' },
    { x: 92, label: '动物实验', sub: '安全性' },
    { x: 140, label: '人体试验', sub: '疗效与剂量' },
    { x: 192, label: '临床指南', sub: '实践推荐' },
  ];
  return (
    <SvgFrame label="从基础研究到临床应用的研究路径" className={className}>
      <path d="M32 84h176" stroke={P.olive} strokeWidth="6" strokeLinecap="round" />
      {stages.map((s, i) => (
        <g key={s.x}>
          <circle cx={s.x} cy="84" r="16" fill={i === 3 ? P.gold : P.cream} stroke={P.forest} strokeWidth="2" />
          <text x={s.x} y="88" textAnchor="middle" fontSize="10" fill={P.forest} fontWeight="600">{i + 1}</text>
          <SvgLabel x={s.x} y={116} size={8} fill={P.forest} weight={600}>{s.label}</SvgLabel>
          <SvgLabel x={s.x} y={130} size={7}>{s.sub}</SvgLabel>
        </g>
      ))}
      <path d="M60 84h32M108 84h32M156 84h20m-5-4 5 4-5 4" stroke={P.gold} strokeWidth="1.6" fill="none" strokeDasharray="3 3" />
      <SvgLabel x={120} y={158} size={8.5}>前一阶段成立，不代表下一阶段成立</SvgLabel>
    </SvgFrame>
  );
}

/** Confidence intervals: how result certainty is read */
export function Reliability({ className }: IllustrationProps) {
  return (
    <SvgFrame label="研究结果可信度与置信区间示意" className={className}>
      <path d="M40 130h164M40 130V40" stroke={P.muted} strokeWidth="1.4" />
      <path d="M120 44v86" stroke={P.forest} strokeWidth="1.6" strokeDasharray="4 4" />
      <SvgLabel x={120} y={148} size={7.5}>无效应线</SvgLabel>
      {[
        { y: 58, x1: 132, x2: 186, c: P.gold },
        { y: 78, x1: 96, x2: 172, c: P.soft },
        { y: 98, x1: 74, x2: 154, c: P.leaf },
        { y: 118, x1: 60, x2: 142, c: P.muted },
      ].map((r) => (
        <g key={r.y}>
          <line x1={r.x1} y1={r.y} x2={r.x2} y2={r.y} stroke={r.c} strokeWidth="2" />
          <line x1={r.x1} y1={r.y - 4} x2={r.x1} y2={r.y + 4} stroke={r.c} strokeWidth="2" />
          <line x1={r.x2} y1={r.y - 4} x2={r.x2} y2={r.y + 4} stroke={r.c} strokeWidth="2" />
          <Dot cx={(r.x1 + r.x2) / 2} cy={r.y} r={3.6} fill={r.c} />
        </g>
      ))}
      <SvgLabel x={120} y={164} size={8.5}>区间跨过无效应线时，结论通常不确定</SvgLabel>
    </SvgFrame>
  );
}

/** Lifespan vs healthspan concept */
export function HealthspanConcept({ className }: IllustrationProps) {
  return (
    <SvgFrame label="总寿命与健康寿命概念图" className={className}>
      <SvgLabel x={68} y={52} size={8.5} fill={P.forest} weight={600}>总寿命 Lifespan</SvgLabel>
      <rect x="40" y="58" width="160" height="22" rx="3" fill={P.cream} stroke={P.forest} strokeWidth="1.8" />
      <rect x="40" y="58" width="112" height="22" rx="3" fill={P.olive} stroke={P.soft} strokeWidth="1.6" />
      <rect x="152" y="58" width="48" height="22" fill={P.goldLight} />
      <SvgLabel x={68} y={106} size={8.5} fill={P.forest} weight={600}>健康寿命 Healthspan</SvgLabel>
      <rect x="40" y="112" width="160" height="22" rx="3" fill={P.cream} stroke={P.forest} strokeWidth="1.8" />
      <rect x="40" y="112" width="132" height="22" rx="3" fill={P.forest} />
      <rect x="172" y="112" width="28" height="22" fill={P.goldLight} />
      <SvgLabel x={96} y={73} size={8} fill={P.forest}>健康阶段</SvgLabel>
      <SvgLabel x={176} y={73} size={7.5} fill={P.ink}>功能受限</SvgLabel>
      <SvgLabel x={106} y={127} size={8} fill={P.cream}>健康阶段延长</SvgLabel>
      <SvgLabel x={120} y={158} size={8.5}>示意概念图 · 非真实人群数据</SvgLabel>
    </SvgFrame>
  );
}

export const researchIllustrations = {
  researchTimeline: ResearchTimeline, evidencePyramid: EvidencePyramid,
  benchToClinic: BenchToClinic, reliability: Reliability, healthspanConcept: HealthspanConcept,
};
