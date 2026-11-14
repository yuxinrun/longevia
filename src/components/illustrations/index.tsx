import type { ComponentType } from 'react';
import type { IllustrationProps } from './shared';
import { knowledgeIcons } from './knowledge-icons';
import { biologyIllustrations } from './biology';
import { bodyIllustrations } from './body';
import { lifestyleIllustrations } from './lifestyle';
import { researchIllustrations } from './research';
import { exerciseIllustrations } from './exercises';

/** Central registry for all 48 original SVG illustrations. */
export const illustrations: Record<string, ComponentType<IllustrationProps>> = {
  ...knowledgeIcons,
  ...biologyIllustrations,
  ...bodyIllustrations,
  ...lifestyleIllustrations,
  ...researchIllustrations,
  ...exerciseIllustrations,
};

export const illustrationKeys = Object.keys(illustrations);

export function Illustration({ name, className }: { name?: string; className?: string }) {
  if (!name) return null;
  const Component = illustrations[name];
  if (!Component) return null;
  return <Component className={className} />;
}

export { IllustrationCaption, P } from './shared';
export { knowledgeIcons } from './knowledge-icons';
