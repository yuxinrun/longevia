'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ArticleCard } from '@/components/article/article-card';
import { evidenceLevels } from '@/content/evidence';
import type { ArticleMeta, EvidenceLevel } from '@/lib/types';

export function ArticleExplorer({ articles }: { articles: ArticleMeta[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部');
  const [level, setLevel] = useState<'all' | EvidenceLevel>('all');

  const categories = useMemo(() => {
    const names = new Set(articles.map((a) => a.category));
    return ['全部', ...names];
  }, [articles]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) =>
      (category === '全部' || a.category === category) &&
      (level === 'all' || a.evidence === level) &&
      (!q || `${a.title} ${a.conclusion} ${a.description} ${a.tags.join(' ')}`.toLowerCase().includes(q)),
    );
  }, [articles, query, category, level]);

  return (
    <section aria-labelledby="article-explorer-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">首批深度文章 / Long Reads</span>
          <h2 id="article-explorer-heading" className="editorial-title mt-3 text-[1.7rem] sm:text-[2.1rem]">把结论放回证据里</h2>
        </div>
        <span className="text-xs text-muted">共 {list.length} 篇</span>
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索文章标题、结论或关键词…" aria-label="搜索文章"
            className="w-full rounded-full border border-line bg-cream-light py-2.5 pl-9 pr-4 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="按栏目筛选" className="rounded-full border border-line bg-cream-light px-4 py-2.5 text-sm text-forest outline-none focus:border-forest">
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value as typeof level)} aria-label="按证据等级筛选" className="rounded-full border border-line bg-cream-light px-4 py-2.5 text-sm text-forest outline-none focus:border-forest">
          <option value="all">全部证据等级</option>
          {(Object.keys(evidenceLevels) as EvidenceLevel[]).map((l) => <option key={l} value={l}>{evidenceLevels[l].label}</option>)}
        </select>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => <ArticleCard key={a.slug} article={a} />)}
      </div>
      {list.length === 0 && <p className="mt-6 rounded-lg border border-dashed border-line p-10 text-center text-sm text-muted">没有匹配的文章，试试放宽筛选条件。</p>}
    </section>
  );
}
