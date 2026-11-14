import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { LabDashboard } from '@/components/lab/lab-dashboard';
import { Badge, Callout } from '@/components/ui/primitives';
import { Illustration } from '@/components/illustrations';
import { buildMetadata } from '@/lib/seo';
import { siteNotices } from '@/content/site';

export const metadata: Metadata = buildMetadata({
  title: '长寿数据实验室',
  description: '在本地浏览器记录体重、腰围、静息心率、血压、睡眠、步数与运动，查看八类长期趋势图表，支持数据导出、备份与删除。',
  path: '/lab',
  keywords: ['健康数据记录', '数据可视化', '本地存储', '健康仪表盘'],
});

export default function LabPage() {
  return (
    <>
      <PageHeader
        eyebrow="长寿数据实验室 / Longevity Lab"
        title="把健康变化变成可回顾的长期记录"
        en="Personal Health Data, Kept Local"
        description="记录日期、体重、腰围、静息心率、血压、睡眠时长、每日步数、运动时长与力量训练，查看长期趋势。所有数据默认保存在你的浏览器本地，不会自动上传。"
        crumbs={[{ label: '长寿数据实验室' }]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="forest">默认本地保存</Badge>
          <Badge tone="outline">八类趋势图表</Badge>
          <Badge tone="outline">导出 / 导入 / 删除</Badge>
          <Badge tone="outline">不推断寿命或疾病风险</Badge>
        </div>
      </PageHeader>

      <section className="border-b border-line bg-cream-light">
        <div className="container grid gap-6 py-8 lg:grid-cols-[1fr_220px] lg:items-center">
          <Callout kind="warning" title="仪表盘的边界">
            <p>本站不会根据少量数据自动推断你的生物年龄、剩余寿命或疾病风险。图表只描述记录，不用于诊断、也不把相关性解释为因果关系。</p>
          </Callout>
          <div className="hidden lg:block"><Illustration name="lab" /></div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container">
          <LabDashboard />
        </div>
      </section>

      <section className="section-pad border-t border-line bg-cream-light">
        <div className="container max-w-3xl">
          <span className="eyebrow">隐私与扩展</span>
          <h2 className="editorial-title mt-4 text-[1.7rem] sm:text-[2.1rem]">数据是你的，不是平台的</h2>
          <p className="mt-4 text-[0.88rem] leading-8 text-muted">{siteNotices.privacy} 记录可注明测量单位、测量条件与来源（自测 / 体检报告 / 医疗机构 / 其他），导出的备份文件也保留这些标记。</p>
          <p className="mt-3 text-[0.88rem] leading-8 text-muted">项目在架构上预留了后端 API、用户系统与数据同步能力，但当前版本不实现上传。未来任何同步都需要明确授权，并说明数据用途、保存期限与删除方式。</p>
        </div>
      </section>
    </>
  );
}
