/** @type { import('@storybook/web-components').Preview } */
import '@crowdstrike/glide-core-styles';

// Refer to: https://storybook.js.org/docs/api/parameters
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    // Automatically "show code" in the demos by default
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export default preview;
