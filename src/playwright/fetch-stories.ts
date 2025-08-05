import { type StoryIndex, type DocsIndexEntry } from '@storybook/types';

// eslint-disable-next-line unicorn/prevent-abbreviations
type DocsIndexEntryWithThemes = DocsIndexEntry & {
  themes: string[];
};

export default async (
  component: string,
): Promise<DocsIndexEntryWithThemes[]> => {
  const response = await fetch('http://localhost:6006/index.json');
  const index = (await response.json()) as StoryIndex;

  return Object.values(index.entries)
    .filter((entry): entry is DocsIndexEntry => {
      return (
        entry.title.toLowerCase() === component.toLowerCase() &&
        entry.type === 'story'
      );
    })
    .map((story) => {
      return {
        ...story,
        themes: ['light', 'dark'],
      };
    });
};
