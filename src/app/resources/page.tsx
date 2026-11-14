import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { ResourceExplorer } from '@/components/resources/resource-explorer';
import { Badge, Callout } from '@/components/ui/primitives';
import { Illustration } from '@/components/illustrations';
import { books } from '@/content/books';
import { websiteResources } from '@/content/websites';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '书籍与网站资源库',
  description: '检索国内外抗衰、衰老与长寿专业书籍、权威研究机构、专业网站与学术资源；支持搜索、筛选、分类与本地收藏，并明确标注书目核验状态。',
  path: '/resources',
  keywords: ['长寿书单', '衰老生物学书籍', 'NIA', 'WHO', 'PubMed', '中国居民膳食指南'],
});

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="书籍与网站 / Resources"
        title="可检索、可核验的延伸阅读"
        en="Books, Institutions & Journals"
        description="收录国内外衰老与长寿相关书籍、权威研究机构、专业网站与学术期刊。资源卡片区分科普作品、专业教材、学术著作与机构指南，并明确标注尚未核验的书目字段。"
        crumbs={[{ label: '书籍与网站' }]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="forest">{books.length} 本书籍</Badge>
          <Badge tone="forest">{websiteResources.length} 个专业网站</Badge>
          <Badge tone="outline">搜索 / 筛选 / 收藏</Badge>
          <Badge tone="outline">外链指向官方入口</Badge>
        </div>
      </PageHeader>

      {/* Anchors used by the main navigation dropdown. */}
      <span id="books-international" className="sr-only">国外书籍</span>
      <span id="books-china" className="sr-only">国内书籍</span>
      <span id="sites-international" className="sr-only">国外专业网站</span>
      <span id="sites-china" className="sr-only">国内专业网站</span>

      <section className="section-pad bg-cream">
        <div className="container">
          <ResourceExplorer />
        </div>
      </section>

      <section className="section-pad border-t border-line bg-cream-light">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <span className="eyebrow">如何区分资源</span>
            <h2 className="editorial-title mt-4 text-[1.7rem] sm:text-[2.1rem]">科普、教材与学术著作不等价</h2>
            <ul className="mt-6 space-y-3 text-[0.86rem] leading-7 text-muted">
              <li>· <strong className="text-forest">科普作品</strong>：适合入门，但常包含作者个人观点与前瞻性判断，不能视为权威教材。</li>
              <li>· <strong className="text-forest">专业教材</strong>：适合建立系统框架，需注明引用版次，内容会随时间更新。</li>
              <li>· <strong className="text-forest">学术著作与指南</strong>：适合查阅文献脉络与权威建议，但不等同于个体化医疗方案。</li>
              <li>· <strong className="text-forest">机构官方网站</strong>：适合核验政策、指南与原始数据；新闻稿与专题页面不是系统综述。</li>
            </ul>
            <Callout kind="warning" title="关于购买与商业关系" className="mt-6">
              <p>本站不销售书籍、补剂或检测服务，不含联盟营销链接。外链仅指向出版社或机构官方入口，是否购买与如何判断请自行决定。</p>
            </Callout>
          </div>
          <div className="surface rounded-xl p-6"><Illustration name="evidencePyramid" /></div>
        </div>
      </section>
    </>
  );
}
