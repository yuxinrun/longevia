import type { ComponentType } from 'react';
import {
  ActivityGaugeChart, BloodPressureTrendChart, ExerciseDistributionChart, ExerciseTrendChart,
  HabitCompletionChart, HealthspanConceptChart, MuscleStrengthChart, NutritionStructureChart,
  ResearchComparisonChart, RestingHrTrendChart, SleepDurationChart, SleepRegularityChart,
  WaistTrendChart, WeightTrendChart,
} from '@/components/charts';
import { Illustration, illustrations } from '@/components/illustrations';

const chartMap: Record<string, ComponentType<{ className?: string; height?: number; compact?: boolean }>> = {
  healthspanConcept: HealthspanConceptChart,
  muscleStrength: MuscleStrengthChart,
  exerciseTrend: ExerciseTrendChart,
  exerciseDistribution: ExerciseDistributionChart,
  sleepDuration: SleepDurationChart,
  sleepRegularity: SleepRegularityChart,
  weightTrend: WeightTrendChart,
  waistTrend: WaistTrendChart,
  restingHr: RestingHrTrendChart,
  bloodPressure: BloodPressureTrendChart,
  activityGauge: ActivityGaugeChart,
  habitCompletion: HabitCompletionChart,
  nutritionStructure: NutritionStructureChart,
  researchComparison: ResearchComparisonChart,
};

/** Renders a registered chart, or falls back to the SVG illustration registry. */
export function ChartSlot({ name, height = 280, className }: { name?: string; height?: number; className?: string }) {
  if (!name) return null;
  const Chart = chartMap[name];
  if (Chart) return <div className={className}><Chart height={height} /></div>;
  if (illustrations[name]) {
    return (
      <figure className={`surface rounded-xl p-5 sm:p-6 ${className ?? ''}`}>
        <div className="mx-auto max-w-[420px]"><Illustration name={name} /></div>
        <figcaption className="mt-3 text-center text-xs leading-5 text-muted">
          原创科学示意图 · 用于解释概念，不代表真实测量数据
        </figcaption>
      </figure>
    );
  }
  return null;
}

export function IllustrationBlock({ name, caption }: { name?: string; caption?: string }) {
  if (!name || !illustrations[name]) return null;
  return (
    <figure className="my-8 surface rounded-xl p-5 sm:p-7">
      <div className="mx-auto max-w-[460px]"><Illustration name={name} /></div>
      <figcaption className="mt-4 text-center text-xs leading-6 text-muted">
        {caption ?? 'LONGEVIA 原创科学插画 · 概念示意，复杂机制请以正文与参考文献为准'}
      </figcaption>
    </figure>
  );
}
