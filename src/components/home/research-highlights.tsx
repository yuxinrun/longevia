import Link from 'next/link';
import { ArrowUpRight, ExternalLink, FlaskConical } from 'lucide-react';
import { Badge, EvidenceBadge, SectionHeading } from '@/components/ui/primitives';
import { researchHighlights } from '@/content/home';

export function ResearchHighlights() {
  return (
    <section className="section-pad bg-cream" aria-labelledby="research-heading">
      <div className="container">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="研究精选 / Research Digest"
            title="值得关注的研究与来源"
            description="这里列出的都是可追溯的权威来源或研究主题入口。我们标注研究类型与年份，不把新闻标题当作研究结论，也不编造样本量与结果。"
          />
          <Link href="/research" className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">
            进入研究前沿 <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div id="research-heading" className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {researchHighlights.map((item) => (
            <article key={item.id} className="group surface surface-hover flex flex-col rounded-xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <EvidenceBadge level={item.evidence} />
                <Badge tone="outline">{item.type}</Badge>
              </div>
              <h3 className="mt-4 font-display text-[1.08rem] leading-7 text-forest">{item.title}</h3>
              <p className="mt-2.5 text-[0.83rem] leading-7 text-muted">{item.summary}</p>
              {item.controversial && (
                <p className="mt-3 border-l-2 border-gold-deep bg-gold-light/20 px-3 py-2 text-[0.74rem] leading-5 text-ink">
                  <strong>争议提示：</strong>{item.controversial}
                </p>
              )}
              <div className="mt-auto pt-5">
                <div className="border-t border-line pt-3 text-[0.72rem] leading-5 text-muted">
                  <p className="flex items-center gap-1.5 text-forest-700"><FlaskConical className="h-3 w-3" /> {item.year} · {item.type}</p>
                  <p className="mt-1.5">{item.source}</p>
                  <p className="mt-1 text-muted/85">{item.note}</p>
                </div>
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4 hover:text-gold-deep">
                  查看官方来源 <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
