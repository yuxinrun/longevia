import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { ArticleMeta, Reference } from '@/lib/types';
import { readingTime } from '@/lib/utils';

/** Server-side MDX content loader. Files live in src/content/articles/*.mdx */
const ARTICLES_DIR = path.join(process.cwd(), 'src', 'content', 'articles');

type Frontmatter = Partial<ArticleMeta> & { references?: Reference[] };

let cache: { meta: ArticleMeta; content: string }[] | null = null;

function loadAll() {
  if (cache) return cache;
  if (!fs.existsSync(ARTICLES_DIR)) {
    cache = [];
    return cache;
  }
  cache = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const fm = data as Frontmatter;
      const meta: ArticleMeta = {
        slug,
        title: fm.title ?? slug,
        conclusion: fm.conclusion ?? '',
        description: fm.description ?? '',
        category: fm.category ?? '知识库',
        categoryHref: fm.categoryHref ?? '/aging-science',
        audience: fm.audience ?? '关注健康长寿的普通读者',
        date: fm.date ?? '2026-01-01',
        updated: fm.updated,
        author: fm.author ?? 'LONGEVIA 编辑部',
        evidence: fm.evidence ?? 'moderate',
        readingMinutes: fm.readingMinutes ?? readingTime(content),
        tags: fm.tags ?? [],
        keywords: fm.keywords ?? [],
        illustration: fm.illustration,
        charts: fm.charts ?? [],
        references: fm.references ?? [],
        related: fm.related ?? [],
        featured: fm.featured ?? false,
      };
      return { meta, content };
    })
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
  return cache;
}

export function getAllArticles(): ArticleMeta[] {
  return loadAll().map((a) => a.meta);
}

export function getAllArticleSlugs(): string[] {
  return loadAll().map((a) => a.meta.slug);
}

export function getArticle(slug: string) {
  return loadAll().find((a) => a.meta.slug === slug) ?? null;
}

export function getFeaturedArticles(limit = 6) {
  const all = getAllArticles();
  const featured = all.filter((a) => a.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function getArticlesByCategoryHref(href: string, limit = 8) {
  return getAllArticles().filter((a) => a.categoryHref === href).slice(0, limit);
}

export function getRelatedArticles(slugs: string[], fallbackCategoryHref: string, limit = 3): ArticleMeta[] {
  const all = getAllArticles();
  const picked = slugs.map((s) => all.find((a) => a.slug === s)).filter((a): a is ArticleMeta => Boolean(a));
  if (picked.length >= limit) return picked.slice(0, limit);
  const extra = all.filter((a) => !slugs.includes(a.slug) && a.categoryHref === fallbackCategoryHref);
  return [...picked, ...extra].slice(0, limit);
}

export function getAllCategories() {
  const map = new Map<string, { name: string; href: string; count: number }>();
  for (const a of getAllArticles()) {
    const key = a.categoryHref;
    const prev = map.get(key);
    map.set(key, { name: a.category, href: key, count: (prev?.count ?? 0) + 1 });
  }
  return [...map.values()];
}
