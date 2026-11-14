import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, BookOpenText, FlaskConical } from 'lucide-react';
import { BrandWordmark } from '@/components/illustrations/brand';
import { footerColumns, navItems, siteNotices } from '@/content/site';
import { evidenceLevels } from '@/content/evidence';
import { siteConfig } from '@/lib/seo';
import type { EvidenceLevel } from '@/lib/types';

export function SiteFooter() {
  return (
    <footer className="border-t border-forest-900/20 bg-forest text-cream">
      <div className="container py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" aria-label="LONGEVIA 首页"><BrandWordmark light /></Link>
            <p className="mt-5 max-w-sm font-serif text-[1.05rem] italic leading-8 text-gold-light">Live Longer. Live Better.</p>
            <p className="mt-1 text-sm text-cream/80">活得更久，也活得更好。</p>
            <p className="mt-5 max-w-sm text-[0.8rem] leading-6 text-cream/60">{siteConfig.description}</p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-light">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[0.84rem] text-cream/75 transition-colors hover:text-cream">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-light">编辑原则</p>
            <ul className="space-y-3 text-[0.8rem] leading-6 text-cream/70">
              <li className="flex gap-2"><FlaskConical className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-light" />区分基础研究、动物实验与人体临床证据</li>
              <li className="flex gap-2"><BookOpenText className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-light" />参考文献可追溯，不编造论文与 DOI</li>
              <li className="flex gap-2"><ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-light" />不贩卖抗衰焦虑，不推荐研究性药物方案</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {(Object.keys(evidenceLevels) as EvidenceLevel[]).map((level) => (
                <Link key={level} href="/about#evidence-standard" className="rounded-full border border-cream/20 px-2.5 py-1 text-[0.68rem] text-cream/65 transition-colors hover:border-gold hover:text-gold-light">
                  {evidenceLevels[level].label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-7">
          <div className="grid gap-4 text-[0.72rem] leading-5 text-cream/55 sm:grid-cols-2">
            <p>{siteNotices.educational}</p>
            <p>{siteNotices.evidence}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 border-t border-cream/10 pt-5 text-[0.72rem] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} LONGEVIA · {siteConfig.chineseName}. 内容仅用于健康教育。</p>
            <nav aria-label="页脚导航" className="flex flex-wrap gap-4">
              <Link href="/about" className="hover:text-cream">关于本站</Link>
              <Link href="/about#evidence-standard" className="hover:text-cream">证据标准</Link>
              <Link href="/about#privacy" className="hover:text-cream">数据隐私</Link>
              <Link href="/lab" className="inline-flex items-center gap-0.5 hover:text-cream">数据实验室 <ArrowUpRight className="h-3 w-3" /></Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
