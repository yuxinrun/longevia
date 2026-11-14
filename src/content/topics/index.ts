import type { TopicPage } from '@/lib/types';
import { agingScienceTopics } from './aging-science';
import { healthspanTopics } from './healthspan';
import { nutritionTopics } from './nutrition';
import { fitnessTopics } from './fitness';
import { sleepMindTopics } from './sleep-mind';
import { practiceTopics } from './practice';

export const topicPages: TopicPage[] = [
  ...agingScienceTopics,
  ...healthspanTopics,
  ...nutritionTopics,
  ...fitnessTopics,
  ...sleepMindTopics,
  ...practiceTopics,
];

export function getTopic(section: string, slug: string) {
  return topicPages.find((p) => p.section === section && p.slug === slug) ?? null;
}

export function getTopicsBySection(section: string) {
  return topicPages.filter((p) => p.section === section);
}

export function getAllTopicParams() {
  return topicPages.map((p) => ({ section: p.section, slug: p.slug }));
}

export const topicSectionSlugs = [
  'aging-science', 'healthspan', 'nutrition', 'fitness', 'sleep-mind', 'longevity-practice',
] as const;
