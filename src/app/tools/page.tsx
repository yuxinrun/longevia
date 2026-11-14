import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Badge, Callout } from '@/components/ui/primitives';
import { CalculationSteps, ToolShell } from '@/components/tools/tool-shell';
import { BmiTool, BmrTool, ProteinTool, WhtrTool } from '@/components/tools/calculators';
import { ActivityLogger, TrainingLogger, TrendTool, WeeklyExerciseTool } from '@/components/tools/recorders';
import { SleepTracker } from '@/components/tools/sleep-tracker';
import { DailyChecklist } from '@/components/tools/habit-checklist';
import { buildMetadata } from '@/lib/seo';
import { siteNotices } from '@/content/site';

export const metadata: Metadata = buildMetadata({
  title: '实用工具',
  description: 'BMI、腰高比、基础代谢、蛋白质摄入、活动与睡眠记录、体重腰围趋势、训练记录和健康习惯打卡。所有工具展示计算过程、单位、数据来源与适用范围，默认本地保存。',
  path: '/tools',
  keywords: ['健康计算器', 'BMI', '腰高比', 'BMR', '睡眠记录', '健康打卡'],
});

const toolNav = [
  { href: '#bmi', label: 'BMI' }, { href: '#whtr', label: '腰高比' }, { href: '#bmr', label: 'BMR' },
  { href: '#activity', label: '活动量' }, { href: '#weekly', label: '每周运动' }, { href: '#protein', label: '蛋白质' },
  { href: '#sleep', label: '睡眠记录' }, { href: '#trend', label: '体重腰围' }, { href: '#training', label: '训练记录' },
  { href: '#habits', label: '习惯打卡' },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="实用工具 / Tools"
        title="能真正使用的健康工具"
        en="Calculators, Logs & Trackers"
        description="十个可交互工具，覆盖身体指标估算、活动与睡眠记录、体重腰围趋势、训练记录和健康习惯打卡。每个工具都展示计算过程、单位、数据来源、估算误差、适用范围与免责说明。"
        crumbs={[{ label: '实用工具' }]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="forest">10 个可交互工具</Badge>
          <Badge tone="outline">数据默认本地保存</Badge>
          <Badge tone="outline">可导出 / 可删除</Badge>
          <Badge tone="outline">不用于诊断</Badge>
        </div>
      </PageHeader>

      <div className="border-b border-line bg-cream-light">
        <div className="container flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="工具快速导航" className="scrollbar-thin flex gap-2 overflow-x-auto pb-1">
            {toolNav.map((t) => (
              <a key={t.href} href={t.href} className="shrink-0 rounded-full border border-line bg-cream px-3 py-1.5 text-xs text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream">{t.label}</a>
            ))}
          </nav>
          <Link href="/lab" className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">
            前往数据实验室查看完整仪表盘 <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <section className="section-pad bg-cream" aria-label="工具列表">
        <div className="container space-y-6">
          <BmiTool />
          <WhtrTool />
          <BmrTool />
          <ActivityLogger />
          <WeeklyExerciseTool />
          <ProteinTool />
          <SleepTracker />
          <TrendTool />
          <TrainingLogger />
          <ToolShell
            id="habits" index="10" title="健康习惯打卡工具" en="Habit Checklist"
            description="勾选十项常见健康行为，回顾习惯模式。打卡不设置强制目标，不因未完成而制造健康焦虑。"
            unit="项目数 项、完成率 %；数据默认保存在本地浏览器"
          >
            <CalculationSteps formula="单项完成率 = 勾选该项目的天数 ÷ 有记录的天数 × 100%" steps={['每天记录一次勾选结果', '按项目统计有记录天数中的勾选比例', '完成率只描述记录行为，不代表健康水平']} />
            <div className="mt-5"><DailyChecklist embedded /></div>
          </ToolShell>
        </div>
      </section>

      <section className="section-pad border-t border-line bg-cream-light">
        <div className="container grid gap-6 lg:grid-cols-2">
          <div>
            <span className="eyebrow">我们不做什么</span>
            <h2 className="editorial-title mt-4 text-[1.7rem] sm:text-[2.1rem]">不提供所谓的精准预测</h2>
            <p className="mt-4 text-[0.88rem] leading-8 text-muted">
              本站不开发「精准寿命预测器」「逆龄年龄计算器」或「精准衰老速度检测器」。少量自报数据无法推断生物年龄、剩余寿命或疾病风险，把这种推断包装成产品既不科学，也容易制造健康焦虑。
            </p>
            <Callout kind="warning" title="医疗安全" className="mt-5"><p>{siteNotices.educational}</p></Callout>
          </div>
          <div className="surface rounded-xl p-6 sm:p-7">
            <p className="flex items-center gap-2 font-display text-[1.2rem] text-forest"><ShieldCheck className="h-5 w-5" /> 数据隐私</p>
            <ul className="mt-4 space-y-3 text-[0.84rem] leading-7 text-muted">
              <li>· 所有记录默认保存在当前浏览器的 localStorage，不会自动上传。</li>
              <li>· 数据实验室提供导出、导入备份与删除全部数据。</li>
              <li>· 导出的备份文件带数据来源标记与结构版本信息。</li>
              <li>· 未来若引入账号与云同步，会在明确授权后才启用；当前同步开关保留但从不自动开启。</li>
            </ul>
            <Link href="/about#privacy" className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-forest underline decoration-gold decoration-1 underline-offset-4">阅读完整隐私说明 <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
