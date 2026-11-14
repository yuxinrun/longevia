import type { EChartsCoreOption } from 'echarts/core';
import { AXIS_LABEL, AXIS_LINE, areaFill, C, GRID, LEGEND, SERIES_COLORS, SPLIT_LINE, TOOLTIP } from './theme';
import {
  demoAges, demoExerciseDistribution, demoHabitCompletion, demoNutritionStructure,
  demoResearchComparison, demoSleepBedtimes, demoSleepDays, demoSleepDurations,
  demoStrengthRegular, demoStrengthSedentary, demoStrengthTypical, demoWeeklyMinutes, demoWeeks,
} from './demo-data';

export type TrendPoint = { date: string; value: number };
export type BloodPressurePoint = { date: string; systolic: number; diastolic: number };
export type HabitPoint = { name: string; value: number };

const TOOLTIP_ITEM = { ...TOOLTIP, trigger: 'item' as const };

const axisX = (data: string[], boundaryGap = true) => ({
  type: 'category', data, boundaryGap,
  axisLabel: { ...AXIS_LABEL, hideOverlap: true }, axisLine: AXIS_LINE, axisTick: { show: false },
});

const axisY = (unit: string, extra: Record<string, unknown> = {}) => ({
  type: 'value', name: unit,
  nameTextStyle: { color: C.muted, fontSize: 10, padding: [0, 0, 0, 4] },
  axisLabel: AXIS_LABEL, axisLine: { show: false }, splitLine: SPLIT_LINE, ...extra,
});

function trendOption(
  points: TrendPoint[],
  { name, unit, color = C.forest, markLine, markArea, smooth = true }: {
    name: string; unit: string; color?: string;
    markLine?: number; markArea?: [number, number]; smooth?: boolean;
  },
): EChartsCoreOption {
  return {
    color: [color],
    tooltip: { ...TOOLTIP, trigger: 'axis' },
    legend: { ...LEGEND, data: [name] },
    grid: GRID,
    xAxis: axisX(points.map((p) => p.date), false),
    yAxis: axisY(unit, { scale: true }),
    series: [{
      name, type: 'line', smooth, symbol: 'circle', symbolSize: 6,
      data: points.map((p) => p.value),
      lineStyle: { width: 2.6, color },
      itemStyle: { color, borderColor: C.cream, borderWidth: 1.5 },
      areaStyle: { color: areaFill(color) },
      markLine: markLine === undefined ? undefined : {
        silent: true, symbol: 'none',
        lineStyle: { color: C.gold, type: 'dashed', width: 1.5 },
        label: { formatter: `参考线 ${markLine}${unit}`, color: C.gold, fontSize: 10, position: 'insideEndTop' },
        data: [{ yAxis: markLine }],
      },
      markArea: markArea === undefined ? undefined : {
        silent: true, itemStyle: { color: `${C.olive}88` },
        label: { formatter: `${markArea[0]}–${markArea[1]}${unit} 参考区间`, color: C.soft, fontSize: 10, position: 'insideTop' },
        data: [[{ yAxis: markArea[0] }, { yAxis: markArea[1] }]],
      },
    }],
  };
}

/** 1. Healthspan vs lifespan — conceptual stacked bars (simulated, not study data). */
export function healthspanConceptOption(): EChartsCoreOption {
  return {
    color: [C.forest, C.goldLight],
    tooltip: { ...TOOLTIP, trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { ...LEGEND, data: ['健康年限', '功能受限年限'] },
    grid: { ...GRID, left: 8, right: 22, bottom: 40 },
    xAxis: { ...axisY('示意年数'), max: 90 },
    yAxis: {
      type: 'category',
      data: ['概念 A｜仅总寿命延长', '概念 B｜健康寿命同步延长', '概念 C｜压缩功能受限期'],
      axisLabel: { ...AXIS_LABEL, width: 128, overflow: 'truncate' },
      axisLine: AXIS_LINE, axisTick: { show: false },
    },
    series: [
      { name: '健康年限', type: 'bar', stack: 'total', barWidth: 22, data: [62, 72, 76], itemStyle: { color: C.forest }, label: { show: true, position: 'inside', color: C.cream, fontSize: 10 } },
      { name: '功能受限年限', type: 'bar', stack: 'total', data: [20, 8, 4], itemStyle: { color: C.goldLight }, label: { show: true, position: 'inside', color: C.ink, fontSize: 10 } },
    ],
  };
}

/** 2. Relative muscle strength across ages — illustrative curves only. */
export function muscleStrengthByAgeOption(): EChartsCoreOption {
  return {
    color: [C.forest, C.gold, C.muted],
    tooltip: { ...TOOLTIP, trigger: 'axis', valueFormatter: (v: unknown) => `${v}（指数）` },
    legend: { ...LEGEND, data: ['规律阻力训练（示意）', '一般活动（示意）', '久坐为主（示意）'] },
    grid: GRID,
    xAxis: axisX(demoAges, false),
    yAxis: axisY('相对指数', { min: 20, max: 110 }),
    series: [
      { name: '规律阻力训练（示意）', type: 'line', smooth: true, data: demoStrengthRegular, lineStyle: { width: 2.6 }, symbolSize: 5, areaStyle: { color: areaFill(C.forest) } },
      { name: '一般活动（示意）', type: 'line', smooth: true, data: demoStrengthTypical, lineStyle: { width: 2.4 }, symbolSize: 5 },
      { name: '久坐为主（示意）', type: 'line', smooth: true, data: demoStrengthSedentary, lineStyle: { width: 2, type: 'dashed' }, symbolSize: 5 },
    ],
  };
}

/** 3. Weekly exercise minutes with a WHO guideline reference line. */
export function exerciseTrendOption(points: TrendPoint[] = demoWeeks.map((d, i) => ({ date: d, value: demoWeeklyMinutes[i] }))): EChartsCoreOption {
  return trendOption(points, {
    name: '每周运动时长', unit: '分钟', color: C.forest, markLine: 150,
  });
}

/** 4. Weekly exercise type distribution (donut). */
export function weeklyExerciseDistributionOption(): EChartsCoreOption {
  return {
    color: SERIES_COLORS,
    tooltip: { ...TOOLTIP_ITEM, formatter: '{b}: {c}% ({d}%)' },
    legend: { ...LEGEND, data: demoExerciseDistribution.map((d) => d.name) },
    series: [{
      name: '运动类型占比', type: 'pie', radius: ['46%', '70%'], center: ['50%', '44%'],
      avoidLabelOverlap: true, itemStyle: { borderColor: C.cream, borderWidth: 2 },
      label: { show: true, formatter: '{b}\n{d}%', color: C.ink, fontSize: 11, lineHeight: 16 },
      data: demoExerciseDistribution,
    }],
  };
}

/** 5. Sleep duration trend with a 7–9h reference band. */
export function sleepDurationTrendOption(points: TrendPoint[] = demoSleepDays.map((d, i) => ({ date: d, value: demoSleepDurations[i] }))): EChartsCoreOption {
  return {
    ...trendOption(points, { name: '睡眠时长', unit: '小时', color: C.soft, markArea: [7, 9], smooth: false }),
    series: [{
      name: '睡眠时长', type: 'bar', barWidth: '52%',
      data: points.map((p) => p.value), itemStyle: { color: C.soft, borderRadius: [3, 3, 0, 0] },
      markArea: {
        silent: true, itemStyle: { color: `${C.olive}80` },
        label: { formatter: '7–9 小时参考区间', color: C.soft, fontSize: 10, position: 'insideTop' },
        data: [[{ yAxis: 7 }, { yAxis: 9 }]],
      },
    }],
  };
}

/** 6. Sleep regularity: bedtime scatter over 14 days. */
export function sleepRegularityOption(): EChartsCoreOption {
  const fmt = (v: number) => {
    const h = Math.floor(v) % 24;
    const m = Math.round((v - Math.floor(v)) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };
  return {
    color: [C.gold],
    tooltip: {
      ...TOOLTIP_ITEM,
      formatter: (p: unknown) => {
        const item = p as { data: [string, number] };
        return `${item.data[0]}<br/>入睡时间：${fmt(item.data[1])}`;
      },
    },
    grid: GRID,
    xAxis: axisX(demoSleepDays, true),
    yAxis: {
      ...axisY('入睡时刻', { min: 21, max: 26, inverse: true }),
      axisLabel: { ...AXIS_LABEL, formatter: (v: number) => fmt(v) },
    },
    series: [{
      name: '入睡时刻', type: 'scatter', symbolSize: 10,
      data: demoSleepBedtimes.map((v, i) => [demoSleepDays[i], v]),
      itemStyle: { color: C.gold, borderColor: C.forest, borderWidth: 1 },
      markLine: {
        silent: true, symbol: 'none', lineStyle: { color: C.forest, type: 'dashed', width: 1.4 },
        label: { formatter: '规律入睡参考', color: C.forest, fontSize: 10 },
        data: [{ yAxis: 23.2 }],
      },
    }],
  };
}

/** 7. Weight trend from personal records. */
export function weightTrendOption(points: TrendPoint[]): EChartsCoreOption {
  return points.length ? trendOption(points, { name: '体重', unit: 'kg', color: C.forest }) : {};
}

/** 8. Waist circumference trend from personal records. */
export function waistTrendOption(points: TrendPoint[]): EChartsCoreOption {
  return points.length ? trendOption(points, { name: '腰围', unit: 'cm', color: C.soft }) : {};
}

/** 9. Resting heart rate trend from personal records. */
export function restingHrTrendOption(points: TrendPoint[]): EChartsCoreOption {
  return points.length ? trendOption(points, { name: '静息心率', unit: '次/分', color: C.gold }) : {};
}

/** 10. Blood pressure trend (systolic / diastolic). */
export function bloodPressureTrendOption(points: BloodPressurePoint[]): EChartsCoreOption {
  return {
    color: [C.forest, C.gold],
    tooltip: { ...TOOLTIP, trigger: 'axis' },
    legend: { ...LEGEND, data: ['收缩压', '舒张压'] },
    grid: GRID,
    xAxis: axisX(points.map((p) => p.date), false),
    yAxis: axisY('mmHg', { scale: true }),
    series: [
      { name: '收缩压', type: 'line', smooth: true, data: points.map((p) => p.systolic), symbolSize: 5, lineStyle: { width: 2.6 } },
      { name: '舒张压', type: 'line', smooth: true, data: points.map((p) => p.diastolic), symbolSize: 5, lineStyle: { width: 2.2 } },
    ],
  };
}

/** 11. Weekly activity gauge. */
export function activityGaugeOption(value: number, max = 300): EChartsCoreOption {
  return {
    tooltip: { ...TOOLTIP_ITEM, formatter: `本周累计 ${value} 分钟` },
    series: [{
      type: 'gauge', min: 0, max, startAngle: 210, endAngle: -30,
      center: ['50%', '58%'], radius: '88%',
      progress: { show: true, width: 12, itemStyle: { color: C.forest } },
      axisLine: { lineStyle: { width: 12, color: [[1, C.olive]] } },
      axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: C.muted, fontSize: 10, distance: 18 },
      pointer: { width: 4, itemStyle: { color: C.gold } },
      anchor: { show: true, size: 8, itemStyle: { color: C.forest } },
      detail: { valueAnimation: true, fontSize: 22, offsetCenter: [0, '38%'], color: C.forest, formatter: '{value} 分钟' },
      title: { offsetCenter: [0, '66%'], color: C.muted, fontSize: 11 },
      data: [{ value, name: '本周累计运动' }],
    }],
  };
}

/** 12. Habit completion rate (horizontal bars). */
export function habitCompletionOption(data: HabitPoint[] = demoHabitCompletion): EChartsCoreOption {
  return {
    color: [C.leaf],
    tooltip: { ...TOOLTIP, trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v: unknown) => `${v}%` },
    grid: { ...GRID, left: 8, right: 30 },
    xAxis: { ...axisY('完成率 %', { max: 100 }), position: 'top' },
    yAxis: { type: 'category', data: data.map((d) => d.name), axisLabel: AXIS_LABEL, axisLine: AXIS_LINE, axisTick: { show: false } },
    series: [{
      name: '完成率', type: 'bar', data: data.map((d) => d.value), barWidth: 14,
      itemStyle: { color: C.leaf, borderRadius: [0, 4, 4, 0] },
      label: { show: true, position: 'right', formatter: '{c}%', color: C.ink, fontSize: 10 },
    }],
  };
}

/** 13. Nutrition structure (donut, illustrative plate proportions). */
export function nutritionStructureOption(): EChartsCoreOption {
  return {
    color: SERIES_COLORS,
    tooltip: { ...TOOLTIP_ITEM, formatter: '{b}: {c}%（示意占比）' },
    legend: { ...LEGEND, data: demoNutritionStructure.map((d) => d.name) },
    series: [{
      name: '膳食结构', type: 'pie', radius: ['42%', '68%'], center: ['50%', '44%'],
      itemStyle: { borderColor: C.cream, borderWidth: 2 },
      label: { show: false }, emphasis: { label: { show: true, fontSize: 12, color: C.forest } },
      data: demoNutritionStructure,
    }],
  };
}

/** 14. Research evidence comparison — conceptual, not a real meta-analysis. */
export function researchComparisonOption(): EChartsCoreOption {
  return {
    color: [C.forest, C.goldLight],
    tooltip: { ...TOOLTIP, trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { ...LEGEND, data: ['接近人体证据的比例（示意）', '直接以寿命为结局的比例（示意）'] },
    grid: { ...GRID, bottom: 52 },
    xAxis: { ...axisX(demoResearchComparison.types), axisLabel: { ...AXIS_LABEL, interval: 0, rotate: 18 } },
    yAxis: axisY('示意比例 %', { max: 100 }),
    series: [
      { name: '接近人体证据的比例（示意）', type: 'bar', data: demoResearchComparison.humanEvidence, barWidth: 16, itemStyle: { color: C.forest, borderRadius: [3, 3, 0, 0] } },
      { name: '直接以寿命为结局的比例（示意）', type: 'bar', data: demoResearchComparison.directLifespanOutcome, barWidth: 16, itemStyle: { color: C.goldLight, borderRadius: [3, 3, 0, 0] } },
    ],
  };
}

/** Personal-record chart options used by the Longevity Lab. */
export function weeklyExerciseMinutesOption(points: TrendPoint[]): EChartsCoreOption {
  return points.length ? trendOption(points, { name: '每周运动量', unit: '分钟 / 周', color: C.forest, markLine: 150, smooth: false }) : {};
}

export function strengthFrequencyOption(points: TrendPoint[]): EChartsCoreOption {
  return points.length ? trendOption(points, { name: '力量训练次数', unit: '次 / 周', color: C.gold, smooth: false }) : {};
}

export function stepsTrendOption(points: TrendPoint[]): EChartsCoreOption {
  return points.length ? trendOption(points, { name: '每日步数', unit: '步 / 天', color: C.soft }) : {};
}
