import { navItems } from '@/content/site';
import { getAllArticles } from '@/lib/content';

export interface SearchDoc {
  title: string;
  href: string;
  category: string;
  description?: string;
  keywords?: string;
}

/** Builds a serializable, static search index consumed by the header dialog. */
export function buildSearchDocs(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const seen = new Set<string>();
  const add = (doc: SearchDoc) => {
    if (seen.has(doc.href)) return;
    seen.add(doc.href);
    docs.push(doc);
  };

  for (const item of navItems) {
    add({ title: item.label, href: item.href, category: '一级栏目', description: item.en, keywords: `${item.en} ${item.label}` });
    for (const group of item.groups ?? []) {
      for (const child of group.items) {
        add({ title: child.label, href: child.href.split('#')[0] + (child.href.includes('#') ? `#${child.href.split('#')[1]}` : ''), category: item.label, description: child.description });
      }
    }
  }

  for (const a of getAllArticles()) {
    add({
      title: a.title,
      href: `/articles/${a.slug}`,
      category: `深度文章 · ${a.category}`,
      description: a.conclusion || a.description,
      keywords: [...a.tags, ...a.keywords].join(' '),
    });
  }

  return docs;
}
