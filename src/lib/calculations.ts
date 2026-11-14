import { round } from '@/lib/utils';

/** All functions are pure so calculation steps can be displayed and unit-tested. */

export function bmi(weightKg: number, heightCm: number) {
  const h = heightCm / 100;
  const value = weightKg / (h * h);
  let category = '偏低';
  if (value >= 18.5 && value < 24) category = '一般成人参考范围';
  else if (value >= 24 && value < 28) category = '偏高（中国成人标准）';
  else if (value >= 28) category = '肥胖范围（中国成人标准）';
  return {
    value: round(value, 1),
    formula: 'BMI = 体重(kg) ÷ 身高(m)²',
    steps: [`身高 ${heightCm} cm = ${round(h, 2)} m`, `${weightKg} ÷ (${round(h, 2)} × ${round(h, 2)}) = ${round(value, 1)} kg/m²`],
    category,
    unit: 'kg/m²',
    note: '中国成人常用参考区间为 18.5–23.9；不同机构与人群（老年人、运动员、孕妇）的解读边界不同。BMI 不区分肌肉与脂肪，也不能反映脂肪分布。',
  };
}

export function whtr(waistCm: number, heightCm: number) {
  const value = waistCm / heightCm;
  let category = '常见参考范围';
  if (value >= 0.5 && value < 0.6) category = '偏高，建议关注腹部脂肪';
  else if (value >= 0.6) category = '明显偏高，建议专业评估';
  return {
    value: round(value, 2),
    formula: 'WHtR = 腰围(cm) ÷ 身高(cm)',
    steps: [`${waistCm} ÷ ${heightCm} = ${round(value, 2)}`],
    category,
    unit: '无量纲比值',
    note: '常用 0.5 作为粗略提示线（不同人群与指南略有差异）。腰围测量部位、时间与体位会影响结果。该比值不是诊断工具。',
  };
}

export type Sex = 'male' | 'female';
export function bmr(weightKg: number, heightCm: number, age: number, sex: Sex) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const value = sex === 'male' ? base + 5 : base - 161;
  return {
    value: Math.round(value),
    formula: 'Mifflin-St Jeor：男性 10×体重 + 6.25×身高 − 5×年龄 + 5；女性 − 161',
    steps: [
      `10 × ${weightKg} = ${round(10 * weightKg, 1)}`,
      `6.25 × ${heightCm} = ${round(6.25 * heightCm, 1)}`,
      `5 × ${age} = ${5 * age}`,
      `${round(10 * weightKg + 6.25 * heightCm - 5 * age, 1)} ${sex === 'male' ? '+ 5' : '− 161'} = ${Math.round(value)}`,
    ],
    unit: 'kcal / 天',
    note: 'BMR 是安静状态下的基础能量消耗估算，不等于每日总消耗。公式为群体平均回归，个体误差可达 ±10% 以上；体成分、疾病、药物与年龄都会影响实际值。',
  };
}

export const activityFactors = [
  { value: 1.2, label: '久坐为主（几乎无刻意运动）' },
  { value: 1.375, label: '轻度活动（每周 1–3 次）' },
  { value: 1.55, label: '中度活动（每周 3–5 次）' },
  { value: 1.725, label: '高强度活动（每周 6–7 次）' },
  { value: 1.9, label: '极高活动量（体力工作 + 训练）' },
];

export function tdee(bmrValue: number, factor: number) {
  return {
    value: Math.round(bmrValue * factor),
    formula: 'TDEE ≈ BMR × 活动系数',
    steps: [`${bmrValue} × ${factor} = ${Math.round(bmrValue * factor)}`],
    unit: 'kcal / 天',
    note: '活动系数为粗略分类，个体实际消耗差异较大；不能用于制定减重或增重的医疗方案。',
  };
}

export type ProteinGoal = 'general' | 'active' | 'older' | 'strength';
export function proteinReference(weightKg: number, goal: ProteinGoal) {
  const ranges: Record<ProteinGoal, [number, number]> = {
    general: [0.8, 1.0],
    active: [1.0, 1.2],
    older: [1.0, 1.2],
    strength: [1.2, 1.6],
  };
  const [lo, hi] = ranges[goal];
  return {
    min: Math.round(weightKg * lo),
    max: Math.round(weightKg * hi),
    formula: '参考摄入量 = 体重(kg) × 每公斤参考系数(g/kg)',
    steps: [`${weightKg} × ${lo} = ${Math.round(weightKg * lo)} g`, `${weightKg} × ${hi} = ${Math.round(weightKg * hi)} g`],
    unit: 'g / 天',
    note: '0.8 g/kg 接近一般成人推荐摄入水平；1.0–1.6 g/kg 常见于运动人群与中老年人肌肉健康的研究讨论，并非统一临床指南。肾脏疾病、肝病等特殊情况需专业个体化指导。',
  };
}

export function weeklyMinutes(sessions: { minutes: number }[]) {
  return {
    value: sessions.reduce((sum, s) => sum + s.minutes, 0),
    formula: '每周运动时长 = Σ（每次活动分钟数）',
    steps: sessions.length ? [`${sessions.map((s) => s.minutes).join(' + ')} = ${sessions.reduce((sum, s) => sum + s.minutes, 0)} 分钟`] : ['尚无记录'],
    unit: '分钟 / 周',
    note: 'WHO 成人指南给出每周 150–300 分钟中等强度有氧活动作为群体参考量，不等于个人处方。',
  };
}

export function sleepStats(hours: number[]) {
  if (!hours.length) return { mean: 0, range: 0, min: 0, max: 0, count: 0 };
  const mean = hours.reduce((a, b) => a + b, 0) / hours.length;
  const min = Math.min(...hours);
  const max = Math.max(...hours);
  return { mean: round(mean, 1), range: round(max - min, 1), min, max, count: hours.length };
}

export const toolCommonNotes = {
  source: '公式与参考区间来自公开的通用生理学公式及 WHO / 中国居民膳食指南等权威机构公开建议；具体数值请以最新版官方文件为准。',
  estimate: '所有结果为估算值，存在个体差异与测量误差，不能替代专业评估。',
  scope: '适用于一般成年人的健康教育与自我观察，不适用于儿童、孕期、急性疾病或需要临床营养/运动处方的情况。',
  diagnosis: '本工具不能用于诊断、治疗、药物调整或寿命预测。有症状或慢性病请咨询专业医疗人员。',
};
