/** Shared domain types for LONGEVIA. Content, evidence, tools and lab all use these. */

export type EvidenceLevel = 'strong' | 'moderate' | 'limited' | 'insufficient';

export type StudyType =
  | '系统综述 / Meta 分析'
  | '随机对照试验'
  | '队列研究 / 观察性研究'
  | '临床指南 / 专家共识'
  | '基础研究（细胞 / 动物）'
  | '叙述性综述'
  | '临床试验注册信息';

export interface Reference {
  /** Human readable citation. Must correspond to a real, verifiable source. */
  citation: string;
  year?: number;
  url?: string;
  note?: string;
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}
export interface NavGroup {
  title: string;
  items: NavChild[];
}
export interface NavItem {
  label: string;
  en: string;
  href: string;
  groups?: NavGroup[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  /** One-sentence conclusion shown under the title. */
  conclusion: string;
  description: string;
  category: string;
  categoryHref: string;
  audience: string;
  date: string;
  updated?: string;
  author: string;
  evidence: EvidenceLevel;
  readingMinutes: number;
  tags: string[];
  keywords: string[];
  /** Keys into the illustration registry. */
  illustration?: string;
  /** Keys into the chart registry embedded in MDX. */
  charts?: string[];
  references: Reference[];
  related?: string[];
  featured?: boolean;
}

export interface Mechanism {
  id: string;
  name: string;
  en: string;
  definition: string;
  process: string;
  impact: string;
  research: string;
  evidence: EvidenceLevel;
  example: string;
  lifestyle: string;
  limitations: string;
  disputed?: boolean;
  illustration: string;
}

export interface Supplement {
  id: string;
  name: string;
  en: string;
  mechanism: string;
  preclinical: string;
  human: string;
  clinicalOutcomes: string;
  safety: string;
  interactions: string;
  suitableFor: string;
  limitations: string;
  extendsHumanLifespan: '否' | '尚无证据' | '存在争议';
  evidence: EvidenceLevel;
}

export interface Book {
  id: string;
  title: string;
  chineseTitle?: string;
  authors: string;
  publisher: string;
  year: number | string;
  isbn?: string;
  region: '国外' | '国内';
  kind: '科普作品' | '专业教材' | '学术著作' | '指南 / 机构出版物';
  summary: string;
  viewpoints: string;
  audience: string;
  scientificValue: string;
  limitations: string;
  link: string;
  topics: string[];
  /** True when a bibliographic field could not be verified from an authoritative source. */
  needsVerification?: string;
}

export interface WebsiteResource {
  id: string;
  name: string;
  en?: string;
  region: string;
  orgType: string;
  fields: string[];
  summary: string;
  recommended: string;
  link: string;
  audience: string;
  authority: string;
  limitations: string;
  verified: boolean;
}

export interface ResearchItem {
  id: string;
  title: string;
  topic: string;
  institution: string;
  authors: string;
  year: number;
  studyType: StudyType;
  subjects: string;
  sampleSize?: string;
  isHuman: boolean;
  clinicalApplication: '尚无' | '探索阶段' | '已有指南支持';
  findings: string;
  limitations: string;
  significance: string;
  evidence: EvidenceLevel;
  sourceName: string;
  sourceUrl: string;
  controversial?: string;
}

export interface Quote {
  id: string;
  text: string;
  theme: string;
  origin: 'LONGEVIA 原创';
}

export interface HealthRecord {
  id: string;
  date: string;
  weightKg?: number;
  waistCm?: number;
  restingHr?: number;
  systolic?: number;
  diastolic?: number;
  sleepHours?: number;
  steps?: number;
  exerciseMinutes?: number;
  strengthSessions?: number;
  /** Measurement context for blood pressure / glucose / lipids. */
  measureCondition?: string;
  measureUnit?: string;
  dataSource?: '自测' | '体检报告' | '医疗机构' | '其他';
  /** Free-text slot for glucose / lipids etc., including units and context. */
  extraMetrics?: string;
  note?: string;
  createdAt: string;
}

export interface TopicSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: { kind: 'note' | 'warning'; title: string; text: string };
  table?: { headers: string[]; rows: string[][] };
  illustration?: string;
  chart?: string;
}

export interface TopicPage {
  section: string;
  slug: string;
  title: string;
  en: string;
  conclusion: string;
  audience: string;
  evidence: EvidenceLevel;
  lead: string;
  keyPoints: string[];
  sections: TopicSection[];
  misconceptions: { myth: string; fact: string }[];
  actions: string[];
  faq: { q: string; a: string }[];
  limitations: string;
  references: Reference[];
  relatedArticles: string[];
  illustration?: string;
  chart?: string;
  updated: string;
}
