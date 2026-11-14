'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { Info } from 'lucide-react';
import {
  ActivityGaugeChart, ExerciseDistributionChart, ExerciseTrendChart, HabitCompletionChart,
  HealthspanConceptChart, MuscleStrengthChart, SleepDurationChart, SleepRegularityChart,
  WeightTrendChart, type TrendPoint,
} from '@/components/charts';
import { SimulatedTag } from '@/components/ui/primitives';
import { demoWeeks } from '@/components/charts/demo-data';

const demoTabs = [
  { id: 'healthspan', label: '健康寿命概念' },
  { id: 'muscle', label: '肌肉力量变化' },
  { id: 'exercise', label: '每周运动分布' },
  { id: 'sleep', label: '睡眠记录' },
  { id: 'trend', label: '长期趋势' },
];

/** Purely illustrative record series. Never presented as research data. */
const demoWeight: TrendPoint[] = demoWeeks.map((w, i) => ({
  date: w, value: Number((68.6 - i * 0.11 + Math.sin(i * 1.4) * 0.28).toFixed(1)),
}));

function Explanation({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="surface flex flex-col justify-center rounded-xl p-6 sm:p-7">
      <span className="eyebrow">图表解读</span>
      <h3 className="mt-3 font-display text-[1.25rem] text-forest">{title}</h3>
      <ul className="mt-4 space-y-3 text-[0.84rem] leading-7 text-muted">
        {points.map((p) => <li key={p} className="flex gap-2.5"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />{p}</li>)}
      </ul>
      <p className="mt-6 flex items-start gap-2 border-t border-line pt-4 text-[0.72rem] leading-5 text-muted">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
        图表用于展示交互与概念，不用于评估任何人的健康状态，也不支持因果推断。
      </p>
    </div>
  );
}

export function DataVisualization() {
  return (
    <section className="section-pad border-y border-line bg-cream-light" aria-labelledby="dataviz-heading">
      <div className="container">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow">数据可视化 / Data Studio</span>
            <h2 id="dataviz-heading" className="editorial-title mt-4 text-[1.9rem] leading-tight sm:text-[2.4rem] lg:text-[2.7rem]">
              用图表理解概念，而不是制造结论
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              下面所有示例数据均为<strong className="font-semibold text-forest">模拟数据</strong>，仅用于展示图表交互与概念关系，不代表真实人群研究结果。你自己的记录可在数据实验室中本地保存与查看。
            </p>
          </div>
          <SimulatedTag label="本区块全部为模拟数据" className="shrink-0" />
        </div>

        <Tabs.Root defaultValue="healthspan" className="mt-10">
          <Tabs.List aria-label="图表主题" className="scrollbar-thin -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
            {demoTabs.map((tab) => (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className="shrink-0 rounded-full border border-line bg-cream-light px-4 py-2 text-[0.8rem] font-medium text-forest-700 transition-colors hover:border-forest/40 data-[state=active]:border-forest data-[state=active]:bg-forest data-[state=active]:text-cream"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="healthspan" className="mt-5 focus:outline-none">
            <div className="grid gap-5 lg:grid-cols-2">
              <HealthspanConceptChart height={320} />
              <Explanation title="总寿命 ≠ 健康寿命" points={[
                '概念 A 表示总寿命延长，但功能受限期同步延长，健康阶段并未增加。',
                '概念 B、C 代表把健康阶段尽可能延长，并压缩功能受限的时间。',
                '横轴年数为示意数值，不是任何国家或人群的统计数据。',
              ]} />
            </div>
          </Tabs.Content>

          <Tabs.Content value="muscle" className="mt-5 focus:outline-none">
            <div className="grid gap-5 lg:grid-cols-2">
              <MuscleStrengthChart height={320} />
              <Explanation title="力量随年龄变化的示意曲线" points={[
                '三条曲线是以 30 岁为 100 的相对指数假设，用于说明趋势概念。',
                '真实个体的力量变化受训练史、疾病、营养与测量方式影响，差异很大。',
                '阻力训练与蛋白质摄入对肌肉健康的价值有较多人体研究支持，但不能据此推算个人寿命。',
              ]} />
            </div>
          </Tabs.Content>

          <Tabs.Content value="exercise" className="mt-5 focus:outline-none">
            <div className="grid gap-5 lg:grid-cols-2">
              <ExerciseDistributionChart height={300} />
              <ExerciseTrendChart height={300} />
            </div>
            <p className="mt-4 text-xs leading-6 text-muted">
              每周 150 分钟是 WHO 成人身体活动指南中的参考量之一，用于定位示意曲线；群体指南不等于个人处方，具体安排应结合年龄、病史与身体机能。
            </p>
          </Tabs.Content>

          <Tabs.Content value="sleep" className="mt-5 focus:outline-none">
            <div className="grid gap-5 lg:grid-cols-2">
              <SleepDurationChart height={300} />
              <SleepRegularityChart height={300} />
            </div>
            <p className="mt-4 text-xs leading-6 text-muted">
              睡眠时长与入睡时刻是行为记录，不是疾病诊断指标。长期失眠、日间嗜睡或疑似睡眠呼吸问题，应寻求专业评估。
            </p>
          </Tabs.Content>

          <Tabs.Content value="trend" className="mt-5 focus:outline-none">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <WeightTrendChart points={demoWeight} height={260} compact />
              <ActivityGaugeChart value={195} height={260} compact />
              <HabitCompletionChart height={260} compact className="md:col-span-2 lg:col-span-1" />
            </div>
            <p className="mt-4 text-xs leading-6 text-muted">
              以上均为模拟记录。真实记录请前往「长寿数据实验室」录入，数据默认保存在你的浏览器本地，不会自动上传。
            </p>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </section>
  );
}
