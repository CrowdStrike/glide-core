/** @type { import('@storybook/web-components').Preview } */
import '@crowdstrike/glide-core-styles';

import './overrides.css';

const preview = {
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export default preview;
