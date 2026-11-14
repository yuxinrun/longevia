import type { NavItem } from '@/lib/types';

export const navItems: NavItem[] = [
  { label: '首页', en: 'Home', href: '/' },
  {
    label: '衰老科学', en: 'Aging Science', href: '/aging-science',
    groups: [
      { title: '基础认知', items: [
        { label: '什么是衰老', href: '/aging-science/what-is-aging', description: '定义、层次与个体差异' },
        { label: '关键生物学机制', href: '/aging-science/mechanisms', description: '12 个机制与证据边界' },
      ] },
      { title: '机制专题', items: [
        { label: '端粒与衰老', href: '/aging-science/telomeres' },
        { label: '线粒体与能量代谢', href: '/aging-science/mitochondria' },
        { label: '细胞衰老与自噬', href: '/aging-science/cellular-senescence' },
        { label: '表观遗传与生物年龄', href: '/aging-science/epigenetics' },
      ] },
    ],
  },
  {
    label: '健康长寿', en: 'Healthspan', href: '/healthspan',
    groups: [
      { title: '核心概念', items: [
        { label: '健康寿命', href: '/healthspan/healthspan' },
        { label: '健康老龄化', href: '/healthspan/healthy-aging' },
      ] },
      { title: '身体系统', items: [
        { label: '心血管健康', href: '/healthspan/cardiovascular' },
        { label: '代谢健康', href: '/healthspan/metabolic' },
        { label: '肌肉与骨骼', href: '/healthspan/musculoskeletal' },
        { label: '认知健康', href: '/healthspan/cognitive' },
        { label: '免疫与炎症', href: '/healthspan/immune' },
      ] },
    ],
  },
  {
    label: '营养与代谢', en: 'Nutrition', href: '/nutrition',
    groups: [
      { title: '膳食体系', items: [
        { label: '长寿饮食的科学基础', href: '/nutrition/dietary-patterns' },
        { label: '主要营养素', href: '/nutrition/macronutrients' },
        { label: '蛋白质与健康老龄化', href: '/nutrition/protein' },
        { label: '多酚与植物化学物', href: '/nutrition/polyphenols' },
      ] },
      { title: '争议与证据', items: [
        { label: '热量限制与间歇性禁食', href: '/nutrition/caloric-restriction' },
        { label: '补剂证据评估数据库', href: '/nutrition/supplements' },
      ] },
    ],
  },
  {
    label: '运动与身体机能', en: 'Fitness', href: '/fitness',
    groups: [
      { title: '能力基础', items: [
        { label: '心肺适能 VO2max', href: '/fitness/cardiorespiratory' },
        { label: '力量训练', href: '/fitness/strength' },
        { label: '平衡与灵活性', href: '/fitness/balance' },
        { label: '久坐与 NEAT', href: '/fitness/neat' },
      ] },
      { title: '实践资源', items: [
        { label: '五套训练计划', href: '/fitness/plans' },
        { label: '运动 SVG 图鉴', href: '/fitness/exercises' },
      ] },
    ],
  },
  {
    label: '睡眠与心理', en: 'Sleep & Mind', href: '/sleep-mind',
    groups: [
      { title: '睡眠科学', items: [
        { label: '睡眠与衰老', href: '/sleep-mind/sleep-and-aging' },
        { label: '生物钟与昼夜节律', href: '/sleep-mind/circadian' },
      ] },
      { title: '心理与行动', items: [
        { label: '压力与心理健康', href: '/sleep-mind/stress' },
        { label: '可执行的睡眠改善方案', href: '/sleep-mind/sleep-plan' },
      ] },
    ],
  },
  {
    label: '抗衰实战', en: 'Longevity Practice', href: '/longevity-practice',
    groups: [
      { title: '行动计划', items: [
        { label: '30 天入门计划', href: '/longevity-practice/30-day-plan' },
        { label: '每日健康行动清单', href: '/longevity-practice/daily-checklist' },
      ] },
      { title: '分人群指南', items: [
        { label: '不同年龄阶段', href: '/longevity-practice/age-groups' },
        { label: '不同生活方式人群', href: '/longevity-practice/lifestyles' },
      ] },
    ],
  },
  { label: '深度文章', en: 'Long Reads', href: '/articles' },
  {
    label: '书籍与网站', en: 'Resources', href: '/resources',
    groups: [
      { title: '书单', items: [
        { label: '国外书籍', href: '/resources#books-international' },
        { label: '国内书籍', href: '/resources#books-china' },
      ] },
      { title: '专业机构', items: [
        { label: '国外专业网站', href: '/resources#sites-international' },
        { label: '国内专业网站', href: '/resources#sites-china' },
      ] },
    ],
  },
  { label: '研究前沿', en: 'Research', href: '/research' },
  { label: '长寿数据实验室', en: 'Longevity Lab', href: '/lab' },
  {
    label: '实用工具', en: 'Tools', href: '/tools',
    groups: [
      { title: '身体指标', items: [
        { label: 'BMI 计算器', href: '/tools#bmi' },
        { label: '腰高比计算器', href: '/tools#whtr' },
        { label: 'BMR 基础代谢估算', href: '/tools#bmr' },
        { label: '蛋白质摄入参考', href: '/tools#protein' },
      ] },
      { title: '记录工具', items: [
        { label: '运动与训练记录', href: '/tools#activity' },
        { label: '睡眠记录', href: '/tools#sleep' },
        { label: '体重腰围趋势', href: '/tools#trend' },
        { label: '健康习惯打卡', href: '/tools#habits' },
      ] },
    ],
  },
  { label: '关于本站', en: 'About', href: '/about' },
];

export const sectionMeta: Record<string, { title: string; en: string; description: string; eyebrow: string }> = {
  'aging-science': {
    title: '衰老科学', en: 'Aging Science', eyebrow: '理解衰老',
    description: '从细胞到整体，系统梳理衰老生物学的主要机制、证据强度与研究边界。衰老是复杂过程，任何单一指标都无法解释它。',
  },
  healthspan: {
    title: '健康长寿', en: 'Healthspan', eyebrow: '延长健康的部分',
    description: '关注身体机能、生活自理能力与慢性病负担。延长总寿命与延长健康寿命，并不是完全相同的目标。',
  },
  nutrition: {
    title: '营养与代谢', en: 'Nutrition', eyebrow: '循证膳食',
    description: '以膳食质量与代谢健康为核心，梳理营养素、饮食模式、禁食研究与补剂证据，不神化任何单一食物。',
  },
  fitness: {
    title: '运动与身体机能', en: 'Fitness', eyebrow: '功能优先',
    description: '心肺适能、肌肉力量、平衡与日常活动量，是健康老龄化中最可干预、也最值得长期投入的部分。',
  },
  'sleep-mind': {
    title: '睡眠与心理', en: 'Sleep & Mind', eyebrow: '恢复与节律',
    description: '睡眠结构、昼夜节律、压力反应与社交关系，共同影响身体恢复与长期健康行为的可持续性。',
  },
  'longevity-practice': {
    title: '抗衰实战', en: 'Longevity Practice', eyebrow: '把知识变成习惯',
    description: '把循证知识拆解成可执行的日常行动：30 天入门计划、分年龄与分人群指南、每日行动清单。',
  },
};

export const footerColumns = [
  { title: '知识板块', links: navItems.slice(1, 7) },
  { title: '资源与工具', links: navItems.slice(7, 12) },
];

export const siteNotices = {
  educational: '本站内容仅用于健康教育与知识普及，不构成医疗建议，不能替代医生的诊断、治疗或处方。',
  evidence: '动物实验与细胞实验不等于人体疗效；生物标志物改善不等于延长寿命；相关性不等于因果关系。',
  privacy: '数据实验室与实用工具默认将记录保存在你的浏览器本地，不会自动上传。',
};
