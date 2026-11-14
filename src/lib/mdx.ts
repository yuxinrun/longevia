export interface Heading { id: string; label: string }

/** Extract level-2 headings from an MDX source for the table of contents. */
export function extractHeadings(content: string): Heading[] {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((match, i) => ({
    id: `sec-${i + 1}`,
    label: match[1].replace(/[*_`]/g, '').trim(),
  }));
}

/**
 * Minimal rehype plugin that assigns stable sequential ids to h2 nodes.
 * Ids match extractHeadings() so anchors work without any extra dependency.
 */
export function rehypeSectionIds() {
  return (tree: unknown): unknown => {
    let index = 0;
    const walk = (node: Record<string, unknown> | undefined) => {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'element' && node.tagName === 'h2') {
        index += 1;
        const props = (node.properties ?? {}) as Record<string, unknown>;
        node.properties = { ...props, id: `sec-${index}` };
      }
      const children = node.children;
      if (Array.isArray(children)) children.forEach((child) => walk(child as Record<string, unknown>));
    };
    walk(tree as Record<string, unknown>);
    return tree;
  };
}
