'use client';

import { useMemo } from 'react';
import type { EChartsCoreOption } from 'echarts/core';
import { ChartPanel } from './chart-panel';
import * as O from './options';
import { SIMULATED_SOURCE } from './theme';

type PanelProps = { className?: string; compact?: boolean; height?: number };

function useOption(factory: () => EChartsCoreOption, deps: unknown[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}

/** 1 — Healthspan / lifespan concept */
export function HealthspanConceptChart(p: PanelProps) {
  const option = useOption(() => O.healthspanConceptOption(), []);
  return (
    <ChartPanel {...p} title="健康寿命与总寿命概念图" description="三种概念情形的对照，说明两者并不相同" unit="示意年数"
      source="LONGEVIA 概念示意（模拟数值）" option={option}
      caption="延长总寿命不必然延长健康阶段；图中的年数仅为概念演示。" />
  );
}

/** 2 — Muscle strength across ages */
export function MuscleStrengthChart(p: PanelProps) {
  const option = useOption(() => O.muscleStrengthByAgeOption(), []);
  return (
    <ChartPanel {...p} title="年龄与肌肉力量变化示意" description="以 30 岁为 100 的相对指数曲线" unit="相对指数（30 岁 = 100）"
      source={SIMULATED_SOURCE} option={option}
      caption="曲线为示意性假设，不代表任何队列研究结果；个体轨迹差异很大。" />
  );
}

/** 3 — Exercise duration trend */
export function ExerciseTrendChart({ points, simulated = true, ...p }: PanelProps & { points?: O.TrendPoint[]; simulated?: boolean }) {
  const option = useOption(() => O.exerciseTrendOption(points), [points]);
  return (
    <ChartPanel {...p} title="每周运动时长趋势" description="含每周 150 分钟中等强度活动参考线" unit="分钟 / 周"
      source={simulated ? `${SIMULATED_SOURCE}；参考线来自 WHO 身体活动指南` : '个人记录（本地浏览器）'}
      option={option} simulated={simulated}
      caption="参考线用于定位运动量，不构成个人处方。" />
  );
}

/** 4 — Weekly exercise type distribution */
export function ExerciseDistributionChart(p: PanelProps) {
  const option = useOption(() => O.weeklyExerciseDistributionOption(), []);
  return (
    <ChartPanel {...p} title="每周运动类型分布" description="按累计时长计算的结构占比" unit="%"
      source={SIMULATED_SOURCE} option={option} caption="占比是示意，不代表推荐配比。" />
  );
}

/** 5 — Sleep duration trend */
export function SleepDurationChart({ points, simulated = true, ...p }: PanelProps & { points?: O.TrendPoint[]; simulated?: boolean }) {
  const option = useOption(() => O.sleepDurationTrendOption(points), [points]);
  return (
    <ChartPanel {...p} title="睡眠时长趋势" description="记录与 7–9 小时参考区间" unit="小时 / 天"
      source={simulated ? SIMULATED_SOURCE : '个人睡眠记录（本地浏览器）'} option={option} simulated={simulated}
      empty={Boolean(points) && !points?.length} emptyHint="记录睡眠时长后，这里会显示趋势。"
      caption="成年人常见建议区间并非诊断标准，个体差异与症状需专业评估。" />
  );
}

/** 6 — Sleep regularity */
export function SleepRegularityChart(p: PanelProps) {
  const option = useOption(() => O.sleepRegularityOption(), []);
  return (
    <ChartPanel {...p} title="睡眠规律性记录" description="每日入睡时刻的离散程度" unit="时刻（24 小时制）"
      source={SIMULATED_SOURCE} option={option}
      caption="规律性比单日时长更能反映作息稳定性；本图为模拟记录。" />
  );
}

/** 7 — Weight */
export function WeightTrendChart({ points, simulated = true, ...p }: PanelProps & { points?: O.TrendPoint[]; simulated?: boolean }) {
  const option = useOption(() => O.weightTrendOption(points ?? []), [points]);
  return (
    <ChartPanel {...p} title="体重变化折线图" unit="kg" source={simulated ? SIMULATED_SOURCE : '个人记录（本地浏览器）'}
      option={option} simulated={simulated} empty={!points?.length} emptyHint="在数据实验室记录体重后，这里会显示长期趋势。"
      caption="短期体重波动受水分、进食与测量条件影响，请关注长期趋势。" />
  );
}

/** 8 — Waist */
export function WaistTrendChart({ points, simulated = true, ...p }: PanelProps & { points?: O.TrendPoint[]; simulated?: boolean }) {
  const option = useOption(() => O.waistTrendOption(points ?? []), [points]);
  return (
    <ChartPanel {...p} title="腰围变化折线图" unit="cm" source={simulated ? SIMULATED_SOURCE : '个人记录（本地浏览器）'}
      option={option} simulated={simulated} empty={!points?.length} emptyHint="记录腰围后，这里会显示趋势。"
      caption="测量时间与体位会影响结果，尽量在相同条件下测量。" />
  );
}

/** 9 — Resting heart rate */
export function RestingHrTrendChart({ points, simulated = true, ...p }: PanelProps & { points?: O.TrendPoint[]; simulated?: boolean }) {
  const option = useOption(() => O.restingHrTrendOption(points ?? []), [points]);
  return (
    <ChartPanel {...p} title="静息心率趋势" unit="次 / 分" source={simulated ? SIMULATED_SOURCE : '个人记录（本地浏览器）'}
      option={option} simulated={simulated} empty={!points?.length} emptyHint="记录静息心率后，这里会显示趋势。"
      caption="单次数值受睡眠、咖啡因与情绪影响，不能用于自我诊断。" />
  );
}

/** 10 — Blood pressure */
export function BloodPressureTrendChart({ points = [], simulated = false, ...p }: PanelProps & { points?: O.BloodPressurePoint[]; simulated?: boolean }) {
  const option = useOption(() => O.bloodPressureTrendOption(points), [points]);
  return (
    <ChartPanel {...p} title="血压变化趋势" description="收缩压 / 舒张压双序列" unit="mmHg"
      source={simulated ? SIMULATED_SOURCE : '个人记录（本地浏览器）；请注明测量条件与单位'}
      option={option} simulated={simulated} empty={!points.length} emptyHint="记录血压后，这里会显示趋势。"
      caption="血压判读需结合年龄、病史与专业医疗意见，不能仅凭单次或单项指标自行诊断。" />
  );
}

/** 11 — Activity gauge */
export function ActivityGaugeChart({ value = 195, max = 300, simulated = true, ...p }: PanelProps & { value?: number; max?: number; simulated?: boolean }) {
  const option = useOption(() => O.activityGaugeOption(value, max), [value, max]);
  return (
    <ChartPanel {...p} title="个人运动量仪表盘" description="本周累计活动时长" unit="分钟 / 周"
      source={simulated ? SIMULATED_SOURCE : '个人记录（本地浏览器）'} option={option} simulated={simulated}
      caption="仪表盘仅呈现累计量，不对健康风险作出推断。" />
  );
}

/** 12 — Habit completion */
export function HabitCompletionChart({ data, simulated = true, ...p }: PanelProps & { data?: O.HabitPoint[]; simulated?: boolean }) {
  const option = useOption(() => O.habitCompletionOption(data), [data]);
  return (
    <ChartPanel {...p} title="健康习惯完成率" description="按习惯分组的完成比例" unit="%"
      source={simulated ? SIMULATED_SOURCE : '个人打卡记录（本地浏览器）'} option={option} simulated={simulated}
      caption="完成率用于回顾习惯，不设置强制目标，也不用于评价个人健康价值。" />
  );
}

/** 13 — Nutrition structure */
export function NutritionStructureChart(p: PanelProps) {
  const option = useOption(() => O.nutritionStructureOption(), []);
  return (
    <ChartPanel {...p} title="营养摄入结构图" description="示意性的膳食构成占比" unit="%"
      source={SIMULATED_SOURCE} option={option} caption="占比为示意，不是推荐摄入量或膳食指南数值。" />
  );
}

/** 14 — Research evidence comparison */
export function ResearchComparisonChart(p: PanelProps) {
  const option = useOption(() => O.researchComparisonOption(), []);
  return (
    <ChartPanel {...p} title="研究数据对比示意" description="不同研究类型与结局指标的证据距离" unit="示意比例 %"
      source="LONGEVIA 概念示意（模拟数值，非文献统计结果）" option={option}
      caption="此图用于说明证据层级概念，不是对真实文献的量化统计。" />
  );
}

/** Lab-only charts backed by personal records. */
export function WeeklyExerciseMinutesChart({ points = [], ...p }: PanelProps & { points?: O.TrendPoint[] }) {
  const option = useOption(() => O.weeklyExerciseMinutesOption(points), [points]);
  return (
    <ChartPanel {...p} title="每周运动量" unit="分钟 / 周" source="个人记录（本地浏览器）；参考线来自 WHO 身体活动指南"
      option={option} simulated={false} empty={!points.length} emptyHint="记录运动时长后，这里会显示每周合计。" />
  );
}

export function StrengthFrequencyChart({ points = [], ...p }: PanelProps & { points?: O.TrendPoint[] }) {
  const option = useOption(() => O.strengthFrequencyOption(points), [points]);
  return (
    <ChartPanel {...p} title="每周力量训练次数" unit="次 / 周" source="个人记录（本地浏览器）"
      option={option} simulated={false} empty={!points.length} emptyHint="记录力量训练次数后，这里会显示趋势。" />
  );
}

export function StepsTrendChart({ points = [], ...p }: PanelProps & { points?: O.TrendPoint[] }) {
  const option = useOption(() => O.stepsTrendOption(points), [points]);
  return (
    <ChartPanel {...p} title="每日步数趋势" unit="步 / 天" source="个人记录（本地浏览器）"
      option={option} simulated={false} empty={!points.length} emptyHint="记录步数后，这里会显示趋势。"
      caption="步数是粗略活动指标，不是健康评分。" />
  );
}

export type { TrendPoint, BloodPressurePoint, HabitPoint } from './options';
