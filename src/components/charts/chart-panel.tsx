'use client';

import dynamic from 'next/dynamic';
import type { EChartsCoreOption } from 'echarts/core';
import { BarChart3 } from 'lucide-react';
import { SimulatedTag } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import { DEMO_NOTICE } from './theme';

const EChart = dynamic(() => import('./echart').then((m) => m.EChart), {
  ssr: false,
  loading: () => <div className="h-[280px] w-full animate-pulse rounded-lg bg-forest-50" />,
});

export function ChartPanel({
  title, description, unit, source, option, simulated = true, height = 280,
  empty = false, emptyHint = '还没有记录。添加数据后，这里会显示趋势。', caption, className, compact = false,
}: {
  title: string;
  description?: string;
  unit?: string;
  source: string;
  option: EChartsCoreOption;
  simulated?: boolean;
  height?: number;
  empty?: boolean;
  emptyHint?: string;
  caption?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <figure className={cn('surface flex h-full flex-col rounded-xl p-4 sm:p-5', className)}>
      <figcaption className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className={cn('font-display text-forest', compact ? 'text-[0.95rem]' : 'text-base')}>{title}</h3>
          {description && <p className="mt-0.5 text-[0.72rem] leading-5 text-muted">{description}</p>}
        </div>
        {simulated ? <SimulatedTag /> : <span className="rounded-full border border-forest-200 bg-forest-50 px-2.5 py-1 text-[0.68rem] font-semibold text-forest-700">个人记录</span>}
      </figcaption>

      {unit && <p className="mb-1 text-[0.68rem] font-medium text-muted">单位：{unit}</p>}

      {empty ? (
        <div className="flex min-h-[200px] flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-cream/60 px-6 text-center">
          <BarChart3 className="h-7 w-7 text-forest-200" />
          <p className="text-sm font-medium text-forest">暂无数据</p>
          <p className="max-w-xs text-xs leading-5 text-muted">{emptyHint}</p>
        </div>
      ) : (
        <div className="min-w-0 flex-1">
          <EChart option={option} height={height} ariaLabel={`${title}图表`} />
        </div>
      )}

      <div className="mt-2 space-y-1 border-t border-line/70 pt-2.5 text-[0.68rem] leading-5 text-muted">
        <p>数据来源：{source}</p>
        {simulated && <p className="font-medium text-gold-deep">{DEMO_NOTICE} · 不用于医学判断</p>}
        {caption && <p>{caption}</p>}
      </div>
    </figure>
  );
}
