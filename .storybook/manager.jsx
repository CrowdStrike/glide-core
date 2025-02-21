import '../src/styles/fonts.css';
import '../src/styles/variables.css';
import { addons, types, useStorybookApi } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import { html } from 'lit';
import { IconButton, Icons } from '@storybook/components';
import logo from './assets/logo.png';
import React from 'react';

addons.register('github', () => {
  addons.add('github/toolextra', {
    type: types.TOOLEXTRA,
    title: 'GitHub',
    render() {
      const { getCurrentStoryData } = useStorybookApi();

      if (!getCurrentStoryData()) {
        return null;
      }

      const { importPath, title } = getCurrentStoryData();

      return (
        <IconButton>
          <a
            aria-label={`${title}'s source code`}
            href={`https://github.com/CrowdStrike/glide-core/blob/main/${importPath
              .replace(/^\.\//, '') // Remove the leading `./`
              .replace('.stories', '')}`}
          >
            <Icons icon="github" style={{ color: 'white' }} />
          </a>
        </IconButton>
      );
    },
  });
});

addons.setConfig({
  // We've found people trigger shortcuts accidentally more than not.
  enableShortcuts: false,
  theme: create({
    base: 'dark',
    brandImage: logo,
    brandTitle: 'Glide Core',
    fontBase: '"Nunito", sans-serif',
    fontCode: 'monospace',
  }),
  toolbar: {
    fullscreen: {
      hidden: true, // Just clutter. Rarely used.
    },
  },
});
