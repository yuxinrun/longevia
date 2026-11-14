import type { MetadataRoute } from 'next';
import { navItems } from '@/content/site';
import { getAllArticles } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = new Set<string>(['/']);
  for (const item of navItems) {
    staticPaths.add(item.href);
    for (const group of item.groups ?? []) {
      for (const child of group.items) staticPaths.add(child.href.split('#')[0]);
    }
  }
  const routes: MetadataRoute.Sitemap = [...staticPaths].map((p) => ({
    url: absoluteUrl(p),
    lastModified: now,
    changeFrequency: p === '/' ? 'weekly' : 'monthly',
    priority: p === '/' ? 1 : 0.7,
  }));
  for (const a of getAllArticles()) {
    routes.push({
      url: absoluteUrl(`/articles/${a.slug}`),
      lastModified: a.updated ? new Date(a.updated) : new Date(a.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }
  return routes;
}
