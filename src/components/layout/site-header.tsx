'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import * as Accordion from '@radix-ui/react-accordion';
import { ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { navItems, siteNotices } from '@/content/site';
import { BrandWordmark } from '@/components/illustrations/brand';
import { Button } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import type { SearchDoc } from '@/lib/search';

export function SiteHeader({ searchDocs = [] }: { searchDocs?: SearchDoc[] }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchDocs.slice(0, 8);
    return searchDocs
      .filter((d) => `${d.title} ${d.category} ${d.description ?? ''} ${d.keywords ?? ''}`.toLowerCase().includes(q))
      .slice(0, 24);
  }, [query, searchDocs]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur-md">
      {/* Editorial top strip */}
      <div className="hidden border-b border-line/70 lg:block">
        <div className="container flex h-9 items-center justify-between text-[0.7rem] tracking-wide text-muted">
          <span className="font-serif italic">The Science of Aging and Longevity.</span>
          <span className="flex items-center gap-4">
            <span>循证内容 · 四级证据标注</span>
            <span className="h-3 w-px bg-line" />
            <span>个人数据默认本地保存</span>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="container flex h-[68px] items-center justify-between gap-4">
        <Link href="/" aria-label="LONGEVIA 首页" className="shrink-0">
          <BrandWordmark />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="全站搜索"
            className="flex h-10 items-center gap-2 rounded-full border border-line px-3 text-xs text-muted transition-colors hover:border-forest/40 hover:text-forest sm:px-4"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">搜索知识库</span>
            <kbd className="ml-1 hidden rounded border border-line px-1.5 py-0.5 text-[0.62rem] lg:inline">Ctrl K</kbd>
          </button>
          <Button asChild size="sm" variant="outline" className="hidden md:inline-flex">
            <Link href="/longevity-practice/30-day-plan">开启健康长寿之旅 <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="打开导航菜单"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-forest lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Desktop navigation */}
      <nav aria-label="主导航" className="hidden border-t border-line/70 lg:block" onMouseLeave={() => setOpenMenu(null)}>
        <div className="container flex h-11 items-stretch justify-between">
          {navItems.map((item, index) => (
            <div
              key={item.href}
              className="relative flex items-stretch"
              onMouseEnter={() => setOpenMenu(item.groups ? item.href : null)}
              onFocus={() => item.groups && setOpenMenu(item.href)}
            >
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-1 whitespace-nowrap px-1 text-[0.79rem] font-medium transition-colors xl:px-1.5',
                  isActive(item.href) ? 'text-forest' : 'text-ink/75 hover:text-forest',
                )}
              >
                {item.label}
                {item.groups && <ChevronDown className="h-3 w-3 text-muted" />}
                {isActive(item.href) && <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-gold" />}
              </Link>

              {item.groups && openMenu === item.href && (
                <div className={cn(
                  'absolute top-full z-50 min-w-[310px] border border-line bg-cream-light p-5 shadow-lift animate-fade-in',
                  index >= 8 ? 'right-0' : 'left-0',
                )}>
                  <p className="mb-3 font-display text-base text-forest">{item.label} <span className="ml-1 text-xs font-sans text-muted">{item.en}</span></p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {item.groups.map((group) => (
                      <div key={group.title}>
                        <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">{group.title}</p>
                        <ul className="space-y-1.5">
                          {group.items.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} className="group block text-[0.82rem] text-ink transition-colors hover:text-forest">
                                {child.label}
                                {child.description && <span className="mt-0.5 block text-[0.68rem] leading-4 text-muted">{child.description}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link href={item.href} className="mt-4 inline-flex items-center gap-1 border-t border-line pt-3 text-xs font-medium text-forest hover:text-gold-deep">
                    进入栏目总览 <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile / tablet drawer */}
      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-forest-900/45 backdrop-blur-sm animate-fade-in" />
          <Dialog.Content className="fixed right-0 top-0 z-[61] flex h-full w-[min(90vw,400px)] flex-col overflow-hidden bg-cream shadow-lift">
            <Dialog.Title className="sr-only">LONGEVIA 网站导航</Dialog.Title>
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5">
              <BrandWordmark compact />
              <Dialog.Close asChild>
                <button type="button" aria-label="关闭菜单" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-forest">
                  <X className="h-4.5 w-4.5" />
                </button>
              </Dialog.Close>
            </div>
            <div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-4">
              <Accordion.Root type="multiple" className="space-y-1">
                {navItems.map((item) =>
                  item.groups ? (
                    <Accordion.Item key={item.href} value={item.href} className="border-b border-line/70 pb-1">
                      <Accordion.Header className="flex items-center">
                        <Accordion.Trigger className="group flex flex-1 items-center justify-between py-3 text-left text-[0.95rem] font-medium text-forest">
                          <span>{item.label}<span className="ml-2 text-[0.68rem] font-normal text-muted">{item.en}</span></span>
                          <ChevronDown className="h-4 w-4 text-muted transition-transform group-data-[state=open]:rotate-180" />
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="overflow-hidden pb-2 data-[state=closed]:animate-fade-in">
                        {item.groups.map((group) => (
                          <div key={group.title} className="mb-3">
                            <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">{group.title}</p>
                            <ul className="space-y-1">
                              {group.items.map((child) => (
                                <li key={child.href}>
                                  <Link href={child.href} onClick={() => setMobileOpen(false)} className="block rounded px-2.5 py-1.5 text-[0.85rem] text-ink/85 hover:bg-forest-50 hover:text-forest">
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link href={item.href} onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-1 px-2.5 text-xs font-semibold text-forest">
                          栏目总览 <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </Accordion.Content>
                    </Accordion.Item>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn('flex items-center justify-between border-b border-line/70 py-3 text-[0.95rem] font-medium', isActive(item.href) ? 'text-gold-deep' : 'text-forest')}
                    >
                      {item.label}<span className="text-[0.68rem] font-normal text-muted">{item.en}</span>
                    </Link>
                  ),
                )}
              </Accordion.Root>
            </div>
            <div className="shrink-0 border-t border-line bg-cream-deep px-5 py-4">
              <Button asChild size="sm" className="w-full">
                <Link href="/longevity-practice/30-day-plan" onClick={() => setMobileOpen(false)}>开启健康长寿之旅</Link>
              </Button>
              <p className="mt-3 text-[0.67rem] leading-5 text-muted">{siteNotices.privacy}</p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Site-wide search */}
      <Dialog.Root open={searchOpen} onOpenChange={(v) => { setSearchOpen(v); if (!v) setQuery(''); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-forest-900/45 backdrop-blur-sm animate-fade-in" />
          <Dialog.Content className="fixed left-1/2 top-[12vh] z-[61] w-[min(92vw,640px)] -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-cream-light shadow-lift">
            <Dialog.Title className="sr-only">搜索 LONGEVIA 知识库</Dialog.Title>
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <Search className="h-4.5 w-4.5 shrink-0 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索栏目、文章、书籍、机构…"
                className="w-full bg-transparent text-sm text-forest outline-none placeholder:text-muted/80"
              />
              <Dialog.Close asChild><button aria-label="关闭搜索"><X className="h-4 w-4 text-muted" /></button></Dialog.Close>
            </div>
            <div className="scrollbar-thin max-h-[55vh] overflow-y-auto px-2 py-2">
              {results.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-muted">没有找到相关内容，换个关键词试试。</p>
              ) : (
                <ul>
                  {results.map((doc) => (
                    <li key={doc.href}>
                      <Link href={doc.href} onClick={() => setSearchOpen(false)} className="group flex items-start justify-between gap-3 rounded-lg px-4 py-2.5 hover:bg-forest-50">
                        <span>
                          <span className="block text-[0.88rem] font-medium text-forest">{doc.title}</span>
                          <span className="mt-0.5 block text-xs leading-5 text-muted">{doc.category}{doc.description ? ` · ${doc.description}` : ''}</span>
                        </span>
                        <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="border-t border-line px-5 py-2.5 text-[0.67rem] text-muted">搜索结果来自本站结构化内容索引 · 按 Esc 关闭</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
