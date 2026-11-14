import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Callout, SectionHeading } from '@/components/ui/primitives';
import { scientificViews } from '@/content/home';
import { siteNotices } from '@/content/site';

export function ScientificViews() {
  return (
    <section className="section-pad border-y border-line bg-cream-light" aria-labelledby="views-heading">
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-[180px] lg:self-start">
          <SectionHeading
            eyebrow="编辑立场 / Our Position"
            title={<>科学观点</>}
            description="以下七条是本站内容的基本立场。它们决定了我们如何选取研究、如何描述结论，以及哪些话我们不会说。"
          />
          <div className="mt-8 hidden lg:block">
            <div className="border-l-2 border-gold/50 pl-5">
              <p className="font-serif text-[1.05rem] italic leading-8 text-forest-700">
                “不追逐长生不老的幻想，不贩卖抗衰焦虑。”
              </p>
              <p className="mt-2 text-xs text-muted">LONGEVIA 编辑原则</p>
            </div>
          </div>
          <Link href="/about#evidence-standard" className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">
            了解证据标准 <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div>
          <h2 id="views-heading" className="sr-only">科学观点</h2>
          <ol className="divide-y divide-line border-y border-line">
            {scientificViews.map((view, i) => (
              <li key={view.id} className="group grid gap-2 py-6 sm:grid-cols-[3rem_1fr] sm:gap-5">
                <span className="font-display text-xl text-gold-deep tabular">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-[1.12rem] leading-7 text-forest sm:text-[1.2rem]">{view.title}</h3>
                  <p className="mt-2 text-[0.86rem] leading-7 text-muted">{view.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Callout kind="warning" title="关于证据边界" className="mt-8">
            <p>{siteNotices.evidence}</p>
          </Callout>
          <p className="mt-4 flex items-start gap-2 text-xs leading-6 text-muted">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
            {siteNotices.educational}
          </p>
        </div>
      </div>
    </section>
  );
}
