import * as React from 'react';
import { cn } from '@/lib/utils';

/** Unified palette for every original SVG illustration in the library. */
export const P = {
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

export type IllustrationProps = { className?: string; label?: string };

export function SvgFrame({
  children, viewBox = '0 0 240 180', label, className, dense = false,
}: IllustrationProps & { children: React.ReactNode; viewBox?: string; dense?: boolean }) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label ?? '科学示意图'}
      preserveAspectRatio="xMidYMid meet"
      className={cn('h-auto w-full', className)}
    >
      <circle cx="120" cy="90" r={dense ? 82 : 80} fill={P.cream} opacity="0.75" />
      <circle cx="120" cy="90" r={dense ? 82 : 80} fill="none" stroke={P.olive} strokeWidth="1" />
      {children}
    </svg>
  );
}

export function SvgLabel({
  x, y, children, anchor = 'middle', size = 9, fill = P.muted, weight = 400,
}: { x: number; y: number; children: React.ReactNode; anchor?: 'start' | 'middle' | 'end'; size?: number; fill?: string; weight?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontWeight={weight}
      fontFamily="-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" letterSpacing="0.4">
      {children}
    </text>
  );
}

export function Dot({ cx, cy, r = 3, fill = P.gold }: { cx: number; cy: number; r?: number; fill?: string }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} />;
}

/** Small caption used beneath complex illustrations, rendered as real HTML for readability. */
export function IllustrationCaption({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('mt-3 text-center text-xs leading-5 text-muted', className)}>{children}</p>;
}
