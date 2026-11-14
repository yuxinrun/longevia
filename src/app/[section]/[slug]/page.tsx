import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TopicTemplate } from '@/components/article/topic-template';
import { MechanismDatabase, SupplementDatabase } from '@/components/knowledge/databases';
import { ExerciseAtlasGrid, TrainingPlanExplorer } from '@/components/fitness/plans-atlas';
import { AgeLifestyleGrids, Plan30Explorer } from '@/components/practice/plan-modules';
import { DailyChecklist } from '@/components/tools/habit-checklist';
import { SleepTracker } from '@/components/tools/sleep-tracker';
import { getTopic, getAllTopicParams } from '@/content/topics';
import { sectionMeta } from '@/content/site';
import { getRelatedArticles } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return getAllTopicParams();
}

export function generateMetadata({ params }: { params: { section: string; slug: string } }): Metadata {
  const topic = getTopic(params.section, params.slug);
  if (!topic) return buildMetadata({ path: `/${params.section}/${params.slug}`, noIndex: true });
  return buildMetadata({
    title: topic.title,
    description: `${topic.conclusion} ${topic.lead}`.slice(0, 160),
    path: `/${topic.section}/${topic.slug}`,
    keywords: [topic.en, sectionMeta[topic.section]?.en ?? '', topic.title],
  });
}

/** Interactive modules are attached to the matching topic without duplicating content. */
function InteractiveModule({ section, slug }: { section: string; slug: string }) {
  const key = `${section}/${slug}`;
  switch (key) {
    case 'aging-science/mechanisms': return <MechanismDatabase />;
    case 'nutrition/supplements': return <SupplementDatabase />;
    case 'fitness/plans': return <TrainingPlanExplorer />;
    case 'fitness/exercises': return <ExerciseAtlasGrid />;
    case 'longevity-practice/30-day-plan': return <Plan30Explorer />;
    case 'longevity-practice/daily-checklist': return <DailyChecklist />;
    case 'longevity-practice/age-groups': return <AgeLifestyleGrids />;
    case 'longevity-practice/lifestyles': return <AgeLifestyleGrids />;
    case 'sleep-mind/sleep-plan': return <SleepTracker />;
    default: return null;
  }
}

export default function TopicDetailPage({ params }: { params: { section: string; slug: string } }) {
  const topic = getTopic(params.section, params.slug);
  if (!topic) notFound();
  const related = getRelatedArticles(topic.relatedArticles, `/${topic.section}`, 3);
  return (
    <TopicTemplate topic={topic} related={related}>
      <InteractiveModule section={params.section} slug={params.slug} />
    </TopicTemplate>
  );
}
