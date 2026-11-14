import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { absoluteUrl, buildMetadata, jsonLd, siteConfig } from '@/lib/seo';
import { buildSearchDocs } from '@/lib/search';

export const metadata: Metadata = buildMetadata();
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#173D32',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchDocs = buildSearchDocs();
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': absoluteUrl('/#organization'),
        name: siteConfig.name,
        alternateName: siteConfig.chineseName,
        url: absoluteUrl('/'),
        description: siteConfig.description,
        slogan: `${siteConfig.taglineEn} ${siteConfig.taglineZh}`,
      },
      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#website'),
        url: absoluteUrl('/'),
        name: `${siteConfig.name} — ${siteConfig.chineseName}`,
        inLanguage: 'zh-CN',
        publisher: { '@id': absoluteUrl('/#organization') },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${absoluteUrl('/resources')}?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-cream">
          跳转到主要内容
        </a>
        <SiteHeader searchDocs={searchDocs} />
        <main id="main" className="min-h-[60vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
