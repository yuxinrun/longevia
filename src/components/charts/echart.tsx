'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { BarChart, GaugeChart, HeatmapChart, LineChart, PieChart, ScatterChart } from 'echarts/charts';
import {
  GridComponent, LegendComponent, MarkAreaComponent, MarkLineComponent,
  TooltipComponent, VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsCoreOption } from 'echarts/core';
import { cn } from '@/lib/utils';

echarts.use([
  BarChart, LineChart, PieChart, GaugeChart, ScatterChart, HeatmapChart,
  GridComponent, TooltipComponent, LegendComponent, MarkLineComponent,
  MarkAreaComponent, VisualMapComponent, CanvasRenderer,
]);

/** Thin, reusable ECharts renderer. Handles resize and option updates, nothing else. */
export function EChart({
  option, height = 280, className, ariaLabel,
}: {
  option: EChartsCoreOption;
  height?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const instance = useRef<ReturnType<typeof echarts.init> | null>(null);

  useEffect(() => {
    if (!container.current) return;
    const chart = echarts.init(container.current, undefined, { renderer: 'canvas' });
    instance.current = chart;
    chart.setOption(option);
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      chart.dispose();
      instance.current = null;
    };
    // Initialise once; subsequent option changes are handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    instance.current?.setOption(option, true);
  }, [option]);

  return (
    <div
      ref={container}
      style={{ height }}
      className={cn('w-full max-w-full', className)}
      role="img"
      aria-label={ariaLabel ?? '数据图表'}
    />
  );
}
