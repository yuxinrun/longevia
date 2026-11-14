import { P, type IllustrationProps } from './shared';

function Icon({ children, label, className }: IllustrationProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 96 96" role="img" aria-label={label} className={className ?? 'h-full w-full'} fill="none">
      <circle cx="48" cy="48" r="45" fill={P.cream} />
      <circle cx="48" cy="48" r="44.5" stroke={P.olive} />
      <g strokeLinecap="round" strokeLinejoin="round">{children}</g>
    </svg>
  );
}

/** 1. 衰老的生物学机制 — DNA double helix inside a cell */
export function IconBiology({ className }: IllustrationProps) {
  return (
    <Icon label="DNA 双螺旋与细胞" className={className}>
      <circle cx="48" cy="48" r="30" stroke={P.olive} strokeWidth="1.4" strokeDasharray="3 4" />
      <path d="M36 26c0 14 24 16 24 30s-24 16-24 30" stroke={P.forest} strokeWidth="2.4" />
      <path d="M60 26c0 14-24 16-24 30s24 16 24 30" stroke={P.soft} strokeWidth="2.4" />
      {[34, 44, 54, 64, 74].map((y, i) => (
        <line key={y} x1={i % 2 ? 38 : 41} x2={i % 2 ? 58 : 55} y1={y} y2={y} stroke={P.gold} strokeWidth="2" />
      ))}
      <circle cx="48" cy="48" r="3.4" fill={P.gold} />
    </Icon>
  );
}

/** 2. 如何延长健康寿命 — two parallel timelines */
export function IconHealthspan({ className }: IllustrationProps) {
  return (
    <Icon label="总寿命与健康寿命" className={className}>
      <path d="M22 32h52M22 62h52" stroke={P.line} strokeWidth="2" />
      <path d="M22 32h40" stroke={P.gold} strokeWidth="4" strokeLinecap="round" />
      <path d="M22 62h52" stroke={P.forest} strokeWidth="4" strokeLinecap="round" />
      <circle cx="22" cy="32" r="3" fill={P.forest} /><circle cx="62" cy="32" r="3" fill={P.gold} />
      <circle cx="22" cy="62" r="3" fill={P.forest} /><circle cx="74" cy="62" r="3" fill={P.forest} />
      <path d="M62 38v18" stroke={P.muted} strokeWidth="1.2" strokeDasharray="2 3" />
      <text x="48" y="22" textAnchor="middle" fontSize="8" fill={P.muted}>Healthspan</text>
      <text x="48" y="80" textAnchor="middle" fontSize="8" fill={P.muted}>Lifespan</text>
    </Icon>
  );
}

/** 3. 科学营养与代谢 — balanced plate */
export function IconNutrition({ className }: IllustrationProps) {
  return (
    <Icon label="均衡餐盘" className={className}>
      <circle cx="48" cy="48" r="28" stroke={P.forest} strokeWidth="2" />
      <circle cx="48" cy="48" r="21" stroke={P.olive} strokeWidth="1.2" />
      <path d="M48 27v21l15 11" stroke={P.forest} strokeWidth="1.6" />
      <path d="M48 27a21 21 0 0 1 18 10L48 48Z" fill={P.olive} />
      <path d="M48 48 30 59a21 21 0 0 1-3-20Z" fill={P.goldLight} />
      <circle cx="36" cy="38" r="3" fill={P.gold} />
      <circle cx="61" cy="57" r="2.4" fill={P.leaf} />
    </Icon>
  );
}

/** 4. 肌肉、骨骼与运动 — muscle fibres and joint */
export function IconFitness({ className }: IllustrationProps) {
  return (
    <Icon label="肌肉纤维与骨骼" className={className}>
      <path d="M26 26c14-6 30 2 44 0" stroke={P.forest} strokeWidth="2.2" />
      <path d="M26 36c14-6 30 2 44 0M26 46c14-6 30 2 44 0M26 56c14-6 30 2 44 0" stroke={P.soft} strokeWidth="2" opacity="0.75" />
      <path d="M30 22v38M66 22v38" stroke={P.gold} strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="22" r="4" fill={P.cream} stroke={P.gold} strokeWidth="2" />
      <circle cx="30" cy="60" r="4" fill={P.cream} stroke={P.gold} strokeWidth="2" />
      <circle cx="66" cy="22" r="4" fill={P.cream} stroke={P.gold} strokeWidth="2" />
      <circle cx="66" cy="60" r="4" fill={P.cream} stroke={P.gold} strokeWidth="2" />
      <path d="M38 70h20" stroke={P.muted} strokeWidth="1.2" strokeDasharray="2 3" />
    </Icon>
  );
}

/** 5. 睡眠与生物钟 — circadian circle */
export function IconSleep({ className }: IllustrationProps) {
  return (
    <Icon label="昼夜节律与睡眠" className={className}>
      <circle cx="48" cy="48" r="27" stroke={P.forest} strokeWidth="2" />
      <path d="M48 21a27 27 0 0 0 0 54 20 20 0 0 1 0-54Z" fill={P.olive} />
      <path d="M48 27v21l14 8" stroke={P.forest} strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="48" r="2.6" fill={P.gold} />
      <circle cx="66" cy="30" r="3.5" fill={P.gold} />
      <path d="M67 22v-3M67 41v-3M75 30h3M56 30h3" stroke={P.gold} strokeWidth="1.4" />
    </Icon>
  );
}

/** 6. 心理健康与压力管理 — brain and calm waves */
export function IconMind({ className }: IllustrationProps) {
  return (
    <Icon label="大脑与放松" className={className}>
      <path d="M48 66c-4 0-7-3-7-7 0-2 1-3 2-4-5-1-8-5-8-10 0-5 3-8 7-9 0-6 5-11 11-11 4 0 7 2 9 5 2-1 4-1 6 0 5 2 7 6 6 11 3 2 4 5 4 8 0 5-4 9-9 9-1 5-4 8-9 8Z" stroke={P.forest} strokeWidth="2" />
      <path d="M47 28v34M39 36c4 0 6 3 6 6M57 33c-4 0-6 3-6 7M58 51c4 0 6-2 6-5" stroke={P.leaf} strokeWidth="1.6" />
      <path d="M26 72c5-4 9 4 14 0s9 4 14 0 9 4 14 0" stroke={P.gold} strokeWidth="1.8" />
    </Icon>
  );
}

/** 7. 长寿研究与前沿进展 — evidence pyramid + flask */
export function IconResearch({ className }: IllustrationProps) {
  return (
    <Icon label="研究证据等级" className={className}>
      <path d="M48 22 26 38h44L48 22Z" fill={P.forest} />
      <path d="M38 42 28 52h40l-10-10" fill={P.soft} opacity="0.85" />
      <path d="M32 56 24 66h48l-8-10" fill={P.goldLight} />
      <path d="M26 70h44" stroke={P.gold} strokeWidth="2.4" />
      <circle cx="48" cy="22" r="2.4" fill={P.gold} />
      <text x="48" y="82" textAnchor="middle" fontSize="7.5" fill={P.muted}>EVIDENCE</text>
    </Icon>
  );
}

/** 8. 个人健康数据实验室 — trend line */
export function IconLab({ className }: IllustrationProps) {
  return (
    <Icon label="个人健康数据趋势" className={className}>
      <path d="M24 68h48M24 68V28" stroke={P.forest} strokeWidth="1.8" />
      {[38, 48, 58].map((y) => <path key={y} d={`M24 ${y}h48`} stroke={P.line} strokeWidth="1" />)}
      <path d="M28 58 38 50 48 54 58 38 70 34" stroke={P.forest} strokeWidth="2.4" />
      <path d="M28 58 38 50 48 54 58 38 70 34V68H28Z" fill={P.olive} opacity="0.6" />
      {[[28, 58], [38, 50], [48, 54], [58, 38], [70, 34]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill={P.gold} />)}
    </Icon>
  );
}

export const knowledgeIcons = {
  biology: IconBiology,
  healthspan: IconHealthspan,
  nutrition: IconNutrition,
  fitness: IconFitness,
  sleep: IconSleep,
  mind: IconMind,
  research: IconResearch,
  lab: IconLab,
} as const;

export type KnowledgeIconKey = keyof typeof knowledgeIcons;
