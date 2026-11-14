import type { EvidenceLevel, Quote, StudyType } from '@/lib/types';
import type { KnowledgeIconKey } from '@/components/illustrations/knowledge-icons';
import { quotes } from './quotes';

export interface KnowledgeEntry {
  title: string;
  description: string;
  href: string;
  icon: KnowledgeIconKey;
  index: string;
}

export const knowledgeEntries: KnowledgeEntry[] = [
  { index: '01', title: '衰老的生物学机制', description: '从 DNA 损伤到细胞间通讯，理解衰老的复杂过程', href: '/aging-science/mechanisms', icon: 'biology' },
  { index: '02', title: '如何延长健康寿命', description: '把关注点从寿命数字转向身体机能与生活质量', href: '/healthspan/healthspan', icon: 'healthspan' },
  { index: '03', title: '科学营养与代谢', description: '膳食质量、营养素与代谢健康，不神化单一食物', href: '/nutrition', icon: 'nutrition' },
  { index: '04', title: '肌肉、骨骼与运动', description: '力量、心肺适能与活动能力，可干预的功能储备', href: '/fitness/strength', icon: 'fitness' },
  { index: '05', title: '睡眠与生物钟', description: '睡眠结构、昼夜节律与作息规律性的长期价值', href: '/sleep-mind/circadian', icon: 'sleep' },
  { index: '06', title: '心理健康与压力管理', description: '压力反应、社交关系与可持续的健康行为', href: '/sleep-mind/stress', icon: 'mind' },
  { index: '07', title: '长寿研究与前沿进展', description: '区分基础研究、动物实验与人体临床证据', href: '/research', icon: 'research' },
  { index: '08', title: '个人健康数据实验室', description: '本地记录、可视化与导出，建立自己的长期基线', href: '/lab', icon: 'lab' },
];

/** Core editorial positions. These are deliberately conservative. */
export const scientificViews = [
  { id: 'v1', title: '健康寿命比寿命数字更值得关注', body: '总寿命（Lifespan）描述活了多少年，健康寿命（Healthspan）描述其中有多少年保持良好机能。两者相关，却不是同一个目标。' },
  { id: 'v2', title: '肌肉力量、心肺适能与活动能力是重要指标', body: '这些功能性指标与日常独立生活能力密切相关，也是可以通过规律运动长期干预的部分。' },
  { id: 'v3', title: '均衡营养、规律运动与充足睡眠有广泛价值', body: '它们的价值来自多方面健康结局的综合证据，而不是某项单一生物标志物的短期变化。' },
  { id: 'v4', title: '衰老是复杂的生物学过程', body: '涉及基因组稳定性、表观遗传、蛋白质稳态、线粒体、细胞间通讯等多个层面，无法用单一指标解释。' },
  { id: 'v5', title: '没有被证实能让普通人长生不老的干预', body: '目前不存在被可靠人体临床结局证据支持的“长生不老”方案。对夸张承诺应保持警惕。' },
  { id: 'v6', title: '动物长寿效果不等于人体有效', body: '实验动物中的寿命延长是重要的机制线索，但不能直接外推为人体的疗效或寿命收益。' },
  { id: 'v7', title: '生物年龄检测不等于寿命预测', body: '不同算法、检测误差与人群差异都会影响结果；商业检测不能作为医学诊断或个人寿命预测工具。' },
];

export interface ResearchHighlight {
  id: string;
  title: string;
  summary: string;
  type: StudyType | string;
  year: string;
  source: string;
  sourceUrl: string;
  evidence: EvidenceLevel;
  controversial?: string;
  note: string;
}

/**
 * Research topic cards. Sources are authoritative, verifiable entry points —
 * no papers, trial IDs, sample sizes or results are invented here.
 */
export const researchHighlights: ResearchHighlight[] = [
  {
    id: 'r1', title: '衰老标志框架的扩展与争议', type: '叙述性综述', year: '2023',
    source: 'Cell · López-Otín 等《Hallmarks of Aging: An Expanding Universe》',
    sourceUrl: 'https://doi.org/10.1016/j.cell.2022.11.004', evidence: 'moderate',
    summary: '在 2013 年框架基础上扩展衰老机制条目。该框架用于组织研究方向，不是已被完全确立的因果清单。',
    note: '机制归类仍在演进，部分条目之间存在重叠与争议。',
    controversial: '不同学者对“标志”应满足的因果标准存在不同看法。',
  },
  {
    id: 'r2', title: '健康老龄化的全球测量框架', type: '临床指南 / 专家共识', year: '2020',
    source: 'WHO · Decade of Healthy Ageing', sourceUrl: 'https://www.who.int/initiatives/decade-of-healthy-ageing',
    evidence: 'strong',
    summary: '以功能能力（Functional Ability）而非单纯疾病清单来理解健康老龄化，强调环境与个体能力的互动。',
    note: '机构框架与倡议文件，不是单项干预试验。',
  },
  {
    id: 'r3', title: '身体活动与久坐行为指南', type: '临床指南 / 专家共识', year: '2020',
    source: 'WHO · 身体活动与久坐行为指南', sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
    evidence: 'strong',
    summary: '给出成年人每周有氧与力量活动的推荐量，作为公共卫生层面的循证参考。推荐量是群体指南，不是个人处方。',
    note: '具体运动安排需结合年龄、病史与身体机能。',
  },
  {
    id: 'r4', title: '地中海饮食与心血管一级预防', type: '随机对照试验', year: '2013（2018 年撤回重发）',
    source: 'NEJM · PREDIMED 研究（PubMed 检索入口）', sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/?term=PREDIMED+mediterranean+diet',
    evidence: 'moderate',
    summary: '常被引用为饮食模式与心血管风险的重要人体研究。因随机化与数据问题，原论文曾被撤回并重发，解读时应同时阅读更正说明。',
    note: '饮食模式研究难以完全盲法，外推到其他人群需谨慎。',
    controversial: '该研究经历过撤回与重新发表，结论强度在学界有持续讨论。',
  },
  {
    id: 'r5', title: '睡眠与衰老的机构专题综述', type: '机构专题 / 叙述性综述', year: '持续更新',
    source: 'National Institute on Aging (NIA)', sourceUrl: 'https://www.nia.nih.gov/health/sleep',
    evidence: 'moderate',
    summary: '梳理老年人睡眠变化、常见睡眠问题与专业评估路径，强调持续症状应寻求医疗评估。',
    note: '机构健康教育页面，不等同于系统综述。',
  },
  {
    id: 'r6', title: '衰老相关临床试验注册信息', type: '临床试验注册信息', year: '持续更新',
    source: 'ClinicalTrials.gov 官方检索', sourceUrl: 'https://clinicaltrials.gov/search?cond=Aging',
    evidence: 'insufficient',
    summary: '注册信息说明研究正在开展或计划开展，并不代表已有结论、疗效或临床应用证据。',
    note: '阅读注册信息时，应关注研究状态、主要结局与是否有人体结果发表。',
  },
];

export const homeQuoteIds = ['q01', 'q02', 'q03', 'q04', 'q05'];
export const homeQuotes: Quote[] = homeQuoteIds
  .map((id) => quotes.find((q) => q.id === id))
  .filter((q): q is Quote => Boolean(q));

export const coreConcepts = [
  { en: 'Lifespan', zh: '总寿命', desc: '从出生到死亡的时间长度' },
  { en: 'Healthspan', zh: '健康寿命', desc: '保持良好机能与生活能力的时间' },
  { en: 'Aging', zh: '衰老', desc: '多层面、逐渐发生的功能变化' },
  { en: 'Longevity', zh: '长寿', desc: '较长的寿命，不等于较长的健康期' },
  { en: 'Healthy Aging', zh: '健康老龄化', desc: '在变化中维持功能与参与度' },
];

export const homeTrustPoints = [
  '四级证据标签',
  '参考文献可追溯',
  '数据默认本地保存',
  '不替代医疗建议',
];
