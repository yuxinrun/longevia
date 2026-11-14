import type { EvidenceLevel, StudyType } from '@/lib/types';

export const evidenceLevels: Record<EvidenceLevel, { label: string; short: string; description: string; className: string; dot: string }> = {
  strong: {
    label: '证据较充分', short: '充分',
    description: '有多项高质量系统综述、随机对照试验或权威临床指南支持，结论在适用人群内较为一致。',
    className: 'border-forest-600/30 bg-forest-50 text-forest-700',
    dot: 'bg-forest-600',
  },
  moderate: {
    label: '有一定证据', short: '中等',
    description: '有较多人体研究或一致的大型观察性证据支持，但结论强度、人群外推或因果性仍有限制。',
    className: 'border-olive bg-olive/50 text-forest-700',
    dot: 'bg-forest-300',
  },
  limited: {
    label: '证据有限', short: '有限',
    description: '初步人体研究、样本较小或结果不一致；不少证据来自动物或细胞实验，尚需验证。',
    className: 'border-gold/50 bg-gold-light/30 text-ink',
    dot: 'bg-gold',
  },
  insufficient: {
    label: '尚无充分证据', short: '不足',
    description: '缺乏可靠的人体临床结局证据，机制推测或商业宣传不能替代临床验证。',
    className: 'border-line bg-cream-deep text-muted',
    dot: 'bg-muted',
  },
};

/** Evidence hierarchy used across the editorial guidelines. Higher = stronger. */
export const evidenceHierarchy: { rank: number; type: StudyType; description: string }[] = [
  { rank: 1, type: '系统综述 / Meta 分析', description: '综合多项研究，评估总体效应与异质性' },
  { rank: 2, type: '随机对照试验', description: '通过随机分组控制混杂，检验干预效果' },
  { rank: 3, type: '队列研究 / 观察性研究', description: '观察真实世界关联，不能直接证明因果' },
  { rank: 4, type: '临床指南 / 专家共识', description: '综合证据与临床经验形成实践建议' },
  { rank: 5, type: '叙述性综述', description: '梳理研究脉络，效应量需回到原始研究核查' },
  { rank: 6, type: '基础研究（细胞 / 动物）', description: '揭示机制与假说，不等于人体疗效' },
  { rank: 7, type: '临床试验注册信息', description: '说明研究正在进行，不代表已有结论' },
];

export const evidenceCaveats = [
  '动物实验不等于人体疗效',
  '细胞实验不等于临床有效',
  '生物标志物改善不等于延长寿命',
  '生物年龄下降不等于真实年龄逆转',
  '相关性不等于因果关系',
  '商业检测结果不等于医学诊断',
  '不能用单一指标预测个人寿命',
  '不能将研究性干预包装成成熟的健康建议',
  '不能编造论文、DOI、临床试验或书籍信息',
  '对存在争议的研究必须明确标注争议',
];

export const medicalDisclaimer =
  '本站提供的是健康教育与知识普及，不替代医生的诊断、治疗或处方。有症状、慢性病、正在用药或准备使用补剂的人群，请先咨询专业医疗人员。';
