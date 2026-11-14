import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { knowledgeIcons } from '@/components/illustrations/knowledge-icons';
import { SectionHeading } from '@/components/ui/primitives';
import { knowledgeEntries } from '@/content/home';

export function KnowledgeEntries() {
  return (
    <section className="section-pad bg-cream" aria-labelledby="knowledge-heading" id="knowledge">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">知识地图 / Knowledge Map</span>
            <h2 id="knowledge-heading" className="editorial-title mt-4 text-[1.9rem] leading-tight sm:text-[2.4rem] lg:text-[2.7rem]">
              从八个入口，<br />开始理解健康长寿
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              衰老科学不是一门孤立的学科。我们把它拆成机制、功能、营养、运动、睡眠、心理、研究与个人数据八条可进入的路径。
            </p>
          </div>
          <Link href="/aging-science" className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-forest underline decoration-gold decoration-1 underline-offset-4 hover:text-gold-deep">
            浏览全部栏目 <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {knowledgeEntries.map((entry) => {
            const Icon = knowledgeIcons[entry.icon];
            return (
              <Link
                key={entry.index}
                href={entry.href}
                className="group surface surface-hover relative flex min-h-[218px] flex-col rounded-xl p-5 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="h-[58px] w-[58px] transition-transform duration-300 group-hover:scale-105"><Icon /></div>
                  <span className="font-display text-xs text-muted/70">{entry.index}</span>
                </div>
                <h3 className="mt-auto font-display text-[1.05rem] leading-6 text-forest">{entry.title}</h3>
                <p className="mt-2 pr-5 text-xs leading-6 text-muted">{entry.description}</p>
                <ArrowUpRight className="absolute bottom-5 right-5 h-4 w-4 text-gold-deep transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
