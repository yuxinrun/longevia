/** Shared visual language for every ECharts option in LONGEVIA. */
export const C = {
  forest: '#173D32',
  soft: '#244F40',
  leaf: '#8FAE8B',
  olive: '#DCE6D8',
  gold: '#C5A66B',
  goldLight: '#E4D5B7',
  cream: '#F6F4EC',
  ink: '#303632',
  muted: '#858C84',
  line: '#DFDDD2',
} as const;

export const SERIES_COLORS = [C.forest, C.gold, C.leaf, C.soft, '#B08968', '#A9BCA2'];

export const AXIS_LABEL = { color: C.muted, fontSize: 11, fontFamily: 'sans-serif' };
export const AXIS_LINE = { lineStyle: { color: C.line } };
export const SPLIT_LINE = { show: true, lineStyle: { color: C.line, type: 'dashed' as const, opacity: 0.8 } };

export const TOOLTIP = {
  trigger: 'axis' as const,
  backgroundColor: '#FBF9F3',
  borderColor: C.line,
  borderWidth: 1,
  padding: [10, 14],
  textStyle: { color: C.ink, fontSize: 12 },
  extraCssText: 'box-shadow: 0 8px 32px rgba(23,61,50,0.12); border-radius: 8px; max-width: 260px; white-space: normal;',
};

export const LEGEND = {
  bottom: 0,
  itemWidth: 10,
  itemHeight: 10,
  icon: 'roundRect' as const,
  textStyle: { color: C.ink, fontSize: 11 },
};

export const GRID = { left: 8, right: 14, top: 28, bottom: 44, containLabel: true };

export const DEMO_NOTICE = '模拟数据 · 仅用于演示图表交互，不代表真实人群研究结果';

export const SIMULATED_SOURCE = '数据来源：LONGEVIA 示意性模拟数据（非研究数据）';

/** Colour for area fills under a line, kept subtle to match the editorial style. */
export function areaFill(color: string, opacity = 0.16) {
  return {
    type: 'linear' as const, x: 0, y: 0, x2: 0, y2: 1,
    colorStops: [
      { offset: 0, color: `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}` },
      { offset: 1, color: `${color}00` },
    ],
  };
}
