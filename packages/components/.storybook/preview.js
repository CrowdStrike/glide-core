/** @type { import('@storybook/web-components').Preview } */
import '@crowdstrike/glide-core-styles';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export default preview;
