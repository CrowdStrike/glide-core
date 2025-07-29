import { type StoryIndex } from '@storybook/types';
import { type Stories } from './types.js';

export default async () => {
  let response;

  // TODO: explain. because it'll fail when fetching for lint rule projects
  try {
    response = await fetch('http://localhost:6006/index.json');
  } catch {
    return;
  }

  const body = (await response.json()) as StoryIndex;
  const stories: Stories = {};

  for (const story of Object.values(body.entries)) {
    // Could also be a component's Overview page. The Overview page includes every
    // story for a component. But we screenshot stories in various states individually.
    if (story.type !== 'story') {
      continue;
    }

    stories[story.title] ??= [];

    if (stories[story.title]) {
      stories[story.title]?.push({
        id: story.id,
        themes: ['light', 'dark'],
      });
    }
  }

  process.env.STORIES = JSON.stringify(stories);
};
