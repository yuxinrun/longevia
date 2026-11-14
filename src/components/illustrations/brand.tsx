/** Original LONGEVIA mark: a long, gently rising healthspan curve inside a living circle. */
export function BrandMark({ size = 38, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" role="img" aria-label="LONGEVIA 品牌标识" className={className}>
      <circle cx="24" cy="24" r="23" fill="#173D32" />
      <circle cx="24" cy="24" r="20.5" stroke="#C5A66B" strokeOpacity="0.45" strokeWidth="0.8" />
      <path d="M9 32.5C15 32.5 16.5 15.5 24 15.5S33 32.5 39 32.5" stroke="#F6F4EC" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 36.5C16 36.5 17.5 23 24 23s8 13.5 15 13.5" stroke="#C5A66B" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 2.6" />
      <circle cx="24" cy="15.5" r="2.1" fill="#C5A66B" />
      <circle cx="9" cy="32.5" r="1.5" fill="#F6F4EC" />
      <circle cx="39" cy="32.5" r="1.5" fill="#F6F4EC" />
    </svg>
  );
}

export function BrandWordmark({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark size={compact ? 32 : 38} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.28rem] font-semibold tracking-[0.16em] ${light ? 'text-cream' : 'text-forest'}`}>
          LONGEVIA
        </span>
        {!compact && (
          <span className={`mt-1.5 text-[0.62rem] tracking-[0.28em] ${light ? 'text-cream/65' : 'text-muted'}`}>
            科学抗衰与健康长寿
          </span>
        )}
      </span>
    </span>
  );
}
