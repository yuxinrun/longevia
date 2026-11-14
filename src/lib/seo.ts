import type { Metadata } from 'next';

export const siteConfig = {
  name: 'LONGEVIA',
  chineseName: '科学抗衰与健康长寿',
  taglineEn: 'Live Longer. Live Better.',
  taglineZh: '活得更久，也活得更好。',
  taglineAcademic: 'The Science of Aging and Longevity.',
  description:
    'LONGEVIA 是科学抗衰与健康长寿知识平台。以循证视角解读衰老生物学、健康寿命、营养代谢、运动机能、睡眠心理与长寿研究进展，并提供本地保存的健康数据工具。',
  /** Set NEXT_PUBLIC_SITE_URL in deployment. Safe default keeps generated links valid. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://longevia.org').replace(/\/+$/, ''),
  /** GitHub Pages project sites live under /<repo>; empty for root / custom-domain sites. */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  locale: 'zh_CN',
};

/** Absolute URL that keeps the deployment base path intact (new URL('/x', base) would drop it). */
export function absoluteUrl(path = '/') {
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${siteConfig.basePath}${suffix}`;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  keywords = [],
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.chineseName}`;
  const canonical = absoluteUrl(path);
  return {
    metadataBase: new URL(absoluteUrl('/')),
    title: fullTitle,
    description,
    keywords: ['科学抗衰', '健康长寿', '衰老生物学', '健康寿命', 'Healthspan', 'Longevity', ...keywords],
    authors: [{ name: 'LONGEVIA 编辑部', url: absoluteUrl('/about') }],
    creator: 'LONGEVIA',
    publisher: 'LONGEVIA',
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: canonical,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  };
}

export function jsonLd(value: Record<string, unknown>) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
