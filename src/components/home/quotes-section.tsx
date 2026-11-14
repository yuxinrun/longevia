'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote as QuoteIcon } from 'lucide-react';
import { homeQuotes } from '@/content/home';
import { quoteOfTheDay } from '@/content/quotes';

export function QuotesSection() {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setActive((v) => (v + 1) % homeQuotes.length), 8000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const current = homeQuotes[active];
  const daily = quoteOfTheDay();

  const go = (delta: number) => setActive((v) => (v + delta + homeQuotes.length) % homeQuotes.length);

  return (
    <section className="section-pad bg-forest text-cream" aria-labelledby="quotes-heading">
      <div className="container grid gap-12 lg:grid-cols-[1.6fr_0.7fr] lg:gap-20">
        <div>
          <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold-light">
            <span className="h-px w-8 bg-gold-light" /> 原创金句 / Editorial Lines
          </p>
          <h2 id="quotes-heading" className="sr-only">LONGEVIA 原创金句</h2>
          <div className="mt-9 min-h-[220px] sm:min-h-[200px]">
            <QuoteIcon className="h-8 w-8 text-gold/70" aria-hidden="true" />
            <blockquote key={current.id} className="mt-5 animate-fade-up font-display text-[1.7rem] leading-[1.6] tracking-[-0.01em] text-cream-light sm:text-[2.15rem] lg:text-[2.5rem]">
              “{current.text}”
            </blockquote>
            <p className="mt-6 text-[0.74rem] text-cream/55">{current.origin} · 主题：{current.theme}</p>
          </div>

          <div className="mt-8 flex items-center gap-5 border-t border-cream/15 pt-6">
            <div className="flex gap-2" role="tablist" aria-label="金句切换">
              {homeQuotes.map((q, i) => (
                <button
                  key={q.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`第 ${i + 1} 条金句`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${i === active ? 'w-8 bg-gold' : 'w-3 bg-cream/30 hover:bg-cream/60'}`}
                />
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="上一条金句" className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="下一条金句" className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <aside className="border-t border-cream/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-light">每日知识 / Daily Note</p>
          <p className="mt-6 font-serif text-[1.12rem] leading-8 text-cream/90">“{daily.text}”</p>
          <p className="mt-4 text-xs text-cream/50">{daily.origin}</p>
          <div className="mt-10 border-t border-cream/15 pt-6">
            <p className="text-[0.72rem] leading-6 text-cream/55">
              本站金句全部为编辑部原创，不归属任何科学家，也不将营销口号包装成研究结论。
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
