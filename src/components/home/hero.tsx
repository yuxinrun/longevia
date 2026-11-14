import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/primitives';
import { siteConfig } from '@/lib/seo';
import { coreConcepts, homeTrustPoints } from '@/content/home';

const heroTall = `${siteConfig.basePath}/images/hero-tall.webp`;
const heroWide = `${siteConfig.basePath}/images/hero-wide.webp`;

/** Original scientific line art layered over the desktop hero photograph. */
function HeroLineArt() {
  return (
    <svg viewBox="0 0 420 520" fill="none" aria-hidden="true" className="pointer-events-none absolute right-0 top-0 hidden h-full w-[38%] opacity-[0.22] lg:block" preserveAspectRatio="xMidYMid slice">
      <g stroke="#C5A66B" strokeWidth="1.3">
        <path d="M250 -20c0 120 140 110 140 230s-140 110-140 230" />
        <path d="M390 -20c0 120-140 110-140 230s140 110 140 230" />
        {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460].map((y, i) => (
          <line key={y} x1={i % 2 ? 265 : 285} y1={y} x2={i % 2 ? 375 : 355} y2={y} />
        ))}
        <circle cx="320" cy="220" r="5" fill="#C5A66B" stroke="none" />
      </g>
      <g stroke="#F6F4EC" strokeWidth="1.1" opacity="0.7">
        <path d="M40 470h350" />
        {[60, 130, 200, 270, 340, 390].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="463" x2={x} y2="477" />
            <circle cx={x} cy="470" r={i === 3 ? 4 : 2.4} fill="#C5A66B" stroke="none" />
          </g>
        ))}
      </g>
      <circle cx="96" cy="92" r="46" stroke="#F6F4EC" strokeWidth="1" opacity="0.5" />
      <circle cx="96" cy="92" r="62" stroke="#F6F4EC" strokeWidth="0.7" opacity="0.3" strokeDasharray="3 6" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative bg-forest text-cream lg:isolate" aria-labelledby="hero-title">
      {/* Mobile: photograph above the copy. Desktop: full-bleed background layer. */}
      <div className="relative h-[34vh] min-h-[250px] w-full overflow-hidden sm:h-[38vh] lg:absolute lg:inset-0 lg:h-full lg:min-h-0">
        <Image
          src={heroTall} alt="晨光中在户外自然行走的银发女性，背景有家人身影" fill priority
          sizes="(max-width: 1023px) 100vw, 1px" quality={85}
          className="object-cover object-[center_26%] lg:hidden"
        />
        <Image
          src={heroWide} alt="清晨林间小路上，不同年龄段的三位家人自然同行、面带微笑" fill priority
          sizes="(min-width: 1024px) 100vw, 1px" quality={85}
          className="hidden object-cover object-[center_42%] lg:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest/25 to-forest lg:bg-gradient-to-r lg:from-forest lg:via-forest/88 lg:to-forest/5" />
      </div>

      <HeroLineArt />

      <div className="relative bg-forest lg:bg-transparent">
        <div className="container py-12 sm:py-14 lg:py-28 xl:py-32">
          <div className="max-w-[42rem] animate-fade-up">
            <p className="mb-5 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold-light sm:mb-7">
              <span className="h-px w-8 bg-gold-light" /> Understand Aging. Extend Healthspan.
            </p>
            <h1 id="hero-title" className="font-display text-[2.2rem] font-medium leading-[1.24] tracking-[-0.03em] text-cream-light text-shadow-hero sm:text-[3.2rem] lg:text-[3.85rem] xl:text-[4.2rem]">
              衰老无法停止，<br className="hidden sm:block" />但健康可以主动管理。
            </h1>
            <p className="mt-5 max-w-xl font-serif text-[1.02rem] italic leading-8 text-gold-light/90 sm:mt-6 sm:text-[1.15rem]">
              The Science of Aging and Longevity.
            </p>
            <p className="mt-4 max-w-xl text-[0.94rem] leading-[1.95] text-cream/85 sm:text-[1.02rem]">
              探索衰老背后的生命科学，用运动、营养、睡眠与循证健康管理，建立更长久、更有质量的生活。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" variant="gold">
                <Link href="/aging-science">探索衰老科学 <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="light">
                <Link href="/longevity-practice/30-day-plan">开启健康长寿之旅 <MoveUpRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2 border-t border-cream/20 pt-6 text-[0.72rem] text-cream/70 sm:mt-10">
              {homeTrustPoints.map((point) => (
                <li key={point} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold" />{point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-cream/15 bg-forest-900/30 backdrop-blur-[2px] lg:bg-forest-900/30">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-4 text-[0.72rem] text-cream/75 sm:text-xs">
          <p className="font-serif italic">Live Longer. Live Better. <span className="ml-2 font-sans not-italic">活得更久，也活得更好。</span></p>
          <p className="text-cream/55">{siteConfig.chineseName} · 科学证据与医疗安全声明见页脚</p>
        </div>
      </div>
    </section>
  );
}

/** A slim band that keeps the Lifespan / Healthspan distinction visible near the fold. */
export function ConceptBand() {
  return (
    <section className="border-b border-line bg-cream-light" aria-label="核心概念">
      <div className="container grid gap-px py-8 sm:grid-cols-2 lg:grid-cols-5 lg:py-10">
        {coreConcepts.map((c, i) => (
          <div key={c.en} className={`flex flex-col gap-1 px-0 py-3 sm:px-5 lg:border-r lg:border-line ${i === 4 ? 'lg:border-r-0' : ''} ${i === 0 ? 'lg:pl-0' : ''}`}>
            <span className="font-display text-[1.05rem] tracking-wide text-forest">{c.en}</span>
            <span className="text-xs font-medium text-ink">{c.zh}</span>
            <span className="text-[0.7rem] leading-5 text-muted">{c.desc}</span>
          </div>
        ))}
      </div>
      <div className="container pb-8 lg:pb-10">
        <p className="border-l-2 border-gold pl-4 text-[0.82rem] leading-6 text-forest-700">
          延长寿命与延长健康寿命，并不是完全相同的目标。本站关注的重点是后者。
        </p>
      </div>
    </section>
  );
}
