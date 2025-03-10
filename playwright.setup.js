export default async () => {
  const response = await fetch('http://localhost:6006/index.json');
  const body = await response.json();
  const stories = {};

  for (const story of Object.values(body.entries)) {
    // TODO: say what else it can be
    if (story.type !== 'story') {
      continue;
    }

    if (!stories[story.title]) {
      stories[story.title] = [];
    }

    stories[story.title].push(
      `?id=${story.id}&globals=theme:light`,
      `?id=${story.id}&globals=theme:dark`,
    );
  }

  process.env.STORIES = JSON.stringify(stories);
};
