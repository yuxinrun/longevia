'use client';

import { useEffect, useMemo, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Bookmark, ExternalLink, Search } from 'lucide-react';
import { Badge, Callout } from '@/components/ui/primitives';
import { bookKindOrder, bookVerificationNote, books } from '@/content/books';
import { websiteResources, websiteVerificationNote } from '@/content/websites';
import { readJSON, STORAGE_KEYS, writeJSON } from '@/lib/storage';
import type { Book, WebsiteResource } from '@/lib/types';

type Kind = 'book' | 'site';

export function ResourceExplorer() {
  const [tab, setTab] = useState<Kind>('book');
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('全部');
  const [category, setCategory] = useState('全部');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    setFavorites(readJSON(STORAGE_KEYS.favorites, [] as string[]));
    const hash = window.location.hash;
    if (hash.includes('sites')) setTab('site');
    if (hash.includes('books')) setTab('book');
    if (hash.includes('books-china')) setRegion('国内');
    if (hash.includes('books-international') || hash.includes('sites-international')) setRegion('国外');
  }, []);

  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(next);
    writeJSON(STORAGE_KEYS.favorites, next);
  };

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) =>
      (region === '全部' || b.region === region) &&
      (category === '全部' || b.kind === category) &&
      (!onlyFavorites || favorites.includes(b.id)) &&
      (!q || `${b.title} ${b.authors} ${b.publisher} ${b.summary} ${b.topics.join(' ')}`.toLowerCase().includes(q)),
    );
  }, [query, region, category, onlyFavorites, favorites]);

  const filteredSites = useMemo(() => {
    const q = query.trim().toLowerCase();
    return websiteResources.filter((w) =>
      (region === '全部' || (region === '国内' ? w.region === '中国' : w.region !== '中国')) &&
      (category === '全部' || w.orgType.includes(category)) &&
      (!onlyFavorites || favorites.includes(w.id)) &&
      (!q || `${w.name} ${w.en ?? ''} ${w.orgType} ${w.summary} ${w.fields.join(' ')}`.toLowerCase().includes(q)),
    );
  }, [query, region, category, onlyFavorites, favorites]);

  const siteCategories = ['政府机构', '国际公共卫生机构', '文献检索平台', '系统综述数据库', '同行评审期刊', '研究机构', '大学研究中心', '专业学会'];

  return (
    <section aria-labelledby="resource-explorer-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">结构化资源库 / Resources</span>
          <h2 id="resource-explorer-heading" className="editorial-title mt-3 text-[1.7rem] sm:text-[2.1rem]">搜索、筛选与收藏</h2>
        </div>
        <span className="text-xs text-muted">已收藏 {favorites.length} 项</span>
      </div>

      <Tabs.Root value={tab} onValueChange={(v) => { setTab(v as Kind); setCategory('全部'); setOpen(null); }} className="mt-6">
        <Tabs.List aria-label="资源类型" className="flex gap-2">
          <Tabs.Trigger value="book" className="rounded-full border border-line px-5 py-2 text-sm font-medium text-forest data-[state=active]:border-forest data-[state=active]:bg-forest data-[state=active]:text-cream">国内外书籍（{books.length}）</Tabs.Trigger>
          <Tabs.Trigger value="site" className="rounded-full border border-line px-5 py-2 text-sm font-medium text-forest data-[state=active]:border-forest data-[state=active]:bg-forest data-[state=active]:text-cream">专业网站（{websiteResources.length}）</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索书名、作者、机构或研究领域…" aria-label="搜索资源"
            className="w-full rounded-full border border-line bg-cream-light py-2.5 pl-9 pr-4 text-sm text-forest outline-none focus:border-forest" />
        </label>
        <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="按地区筛选" className="rounded-full border border-line bg-cream-light px-4 py-2.5 text-sm text-forest outline-none focus:border-forest">
          <option>全部</option><option>国外</option><option>国内</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="按分类筛选" className="rounded-full border border-line bg-cream-light px-4 py-2.5 text-sm text-forest outline-none focus:border-forest">
          <option>全部</option>
          {(tab === 'book' ? [...bookKindOrder] : siteCategories).map((c) => <option key={c}>{c}</option>)}
        </select>
        <button type="button" onClick={() => setOnlyFavorites(!onlyFavorites)} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm ${onlyFavorites ? 'border-gold bg-gold-light/50 text-forest' : 'border-line text-forest'}`}>仅看收藏</button>
      </div>

      <p className="mt-3 text-xs text-muted">当前显示 {tab === 'book' ? filteredBooks.length : filteredSites.length} 项 · 点击卡片展开完整字段</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {tab === 'book' && filteredBooks.map((b) => <BookCard key={b.id} book={b} open={open === b.id} onToggle={() => setOpen(open === b.id ? null : b.id)} favorite={favorites.includes(b.id)} onFavorite={() => toggleFavorite(b.id)} />)}
        {tab === 'site' && filteredSites.map((w) => <SiteCard key={w.id} site={w} open={open === w.id} onToggle={() => setOpen(open === w.id ? null : w.id)} favorite={favorites.includes(w.id)} onFavorite={() => toggleFavorite(w.id)} />)}
      </div>
      {(tab === 'book' ? filteredBooks.length : filteredSites.length) === 0 && (
        <p className="mt-6 rounded-lg border border-dashed border-line p-10 text-center text-sm text-muted">没有匹配的资源，试试放宽筛选条件。</p>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Callout kind="note" title="书目信息核验"><p>{bookVerificationNote}</p></Callout>
        <Callout kind="note" title="外链核验"><p>{websiteVerificationNote}</p></Callout>
      </div>
      <p className="mt-4 text-[0.76rem] leading-6 text-muted">收藏仅保存在当前浏览器的本地存储中，可在数据实验室导出备份或删除。本站不销售任何书籍、补剂或检测服务，链接仅指向官方网站。</p>
    </section>
  );
}

function FavoriteButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={active ? '取消收藏' : '收藏'} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${active ? 'border-gold bg-gold-light/60 text-forest' : 'border-line text-muted hover:border-forest hover:text-forest'}`}>
      <Bookmark className={`h-3.5 w-3.5 ${active ? 'fill-current' : ''}`} />
    </button>
  );
}

function BookCard({ book, open, onToggle, favorite, onFavorite }: { book: Book; open: boolean; onToggle: () => void; favorite: boolean; onFavorite: () => void }) {
  const fields = [
    { label: '英文书名 / 书名', value: book.title },
    { label: '正式中文译名', value: book.chineseTitle ?? '未核验到正式中文版本，本站不列具体译名' },
    { label: '作者', value: book.authors },
    { label: '出版社', value: book.publisher },
    { label: '出版年份', value: String(book.year) },
    { label: 'ISBN', value: book.isbn ?? '未核验，本站不列具体编号' },
    { label: '内容简介', value: book.summary },
    { label: '核心观点', value: book.viewpoints },
    { label: '适合读者', value: book.audience },
    { label: '科学价值', value: book.scientificValue },
    { label: '作者观点的局限', value: book.limitations },
  ];
  return (
    <article className="surface flex flex-col rounded-xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge tone="outline">{book.region}书籍</Badge>
            <Badge tone="gold">{book.kind}</Badge>
            {book.needsVerification && <Badge tone="neutral">书目待核验</Badge>}
          </div>
          <h3 className="mt-3 font-display text-[1.08rem] leading-7 text-forest">{book.title}</h3>
          <p className="mt-1 text-[0.76rem] text-muted">{book.authors} · {book.publisher} · {book.year}</p>
        </div>
        <FavoriteButton active={favorite} onClick={onFavorite} />
      </div>
      <p className="mt-3 text-[0.82rem] leading-7 text-ink/85">{book.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">{book.topics.map((t) => <span key={t} className="rounded-full bg-forest-50 px-2.5 py-0.5 text-[0.68rem] text-forest-700">{t}</span>)}</div>

      {open && (
        <dl className="mt-5 space-y-2.5 border-t border-line pt-4">
          {fields.map((f) => (
            <div key={f.label}>
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-gold-deep">{f.label}</dt>
              <dd className="mt-0.5 text-[0.8rem] leading-7 text-ink/85">{f.value}</dd>
            </div>
          ))}
          {book.needsVerification && <div className="rounded-lg border border-gold/40 bg-gold-light/20 px-3 py-2"><dt className="text-[0.68rem] font-semibold text-gold-deep">核验说明</dt><dd className="mt-0.5 text-[0.78rem] leading-6 text-ink/85">{book.needsVerification}</dd></div>}
        </dl>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
        <button type="button" onClick={onToggle} className="text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">{open ? '收起详细字段' : '展开完整字段'}</button>
        <a href={book.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-forest underline decoration-gold decoration-1 underline-offset-4">出版社 / 机构官方入口 <ExternalLink className="h-3 w-3" /></a>
      </div>
      <p className="mt-2 text-[0.7rem] leading-5 text-muted">科普作品、专业教材与学术著作的性质不同，不能全部视为权威教材；作者个人观点不等于研究结论。</p>
    </article>
  );
}

function SiteCard({ site, open, onToggle, favorite, onFavorite }: { site: WebsiteResource; open: boolean; onToggle: () => void; favorite: boolean; onFavorite: () => void }) {
  const fields = [
    { label: '名称', value: `${site.name}${site.en ? ` (${site.en})` : ''}` },
    { label: '国家或地区', value: site.region },
    { label: '机构性质', value: site.orgType },
    { label: '研究领域', value: site.fields.join(' / ') },
    { label: '内容简介', value: site.summary },
    { label: '推荐阅读', value: site.recommended },
    { label: '适合人群', value: site.audience },
    { label: '权威性', value: site.authority },
    { label: '局限', value: site.limitations },
  ];
  return (
    <article className="surface flex flex-col rounded-xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge tone="outline">{site.region}</Badge>
            <Badge tone={site.verified ? 'forest' : 'gold'}>{site.verified ? '官方入口' : '待核验'}</Badge>
          </div>
          <h3 className="mt-3 font-display text-[1.08rem] leading-7 text-forest">{site.name}</h3>
          <p className="mt-1 text-[0.76rem] text-muted">{site.orgType}</p>
        </div>
        <FavoriteButton active={favorite} onClick={onFavorite} />
      </div>
      <p className="mt-3 text-[0.82rem] leading-7 text-ink/85">{site.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">{site.fields.map((f) => <span key={f} className="rounded-full bg-forest-50 px-2.5 py-0.5 text-[0.68rem] text-forest-700">{f}</span>)}</div>

      {open && (
        <dl className="mt-5 space-y-2.5 border-t border-line pt-4">
          {fields.map((f) => (
            <div key={f.label}>
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-gold-deep">{f.label}</dt>
              <dd className="mt-0.5 text-[0.8rem] leading-7 text-ink/85">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
        <button type="button" onClick={onToggle} className="text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">{open ? '收起详细字段' : '展开完整字段'}</button>
        <a href={site.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-forest underline decoration-gold decoration-1 underline-offset-4">访问官方链接 <ExternalLink className="h-3 w-3" /></a>
      </div>
      {!site.verified && <p className="mt-2 text-[0.7rem] leading-5 text-gold-deep">该资源的独立官方域名未核验，链接指向上级机构官方入口，引用前请核实。</p>}
    </article>
  );
}
