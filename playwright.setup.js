export default async () => {
  const response = await fetch('http://localhost:6006/index.json');
  const body = await response.json();
  const stories = {};

  for (const story of Object.values(body.entries)) {
    // Could also be a component's Overview page. The Overview page includes
    // every story for a component. But we screenshot stories in various states
    // individually.
    if (story.type !== 'story') {
      continue;
    }

    if (!stories[story.title]) {
      stories[story.title] = [];
    }

    stories[story.title].push({
      id: story.id,
      themes: ['light', 'dark'],
    });
  }

  process.env.STORIES = JSON.stringify(stories);
};
