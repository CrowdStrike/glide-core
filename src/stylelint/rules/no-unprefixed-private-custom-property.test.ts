import stylelint from 'stylelint';
import { expect, test } from '@playwright/test';

const config = {
  plugins: ['../plugin.js'],
  rules: {
    'glide-core/no-unprefixed-private-custom-property': true,
  },
};

test(
  'valid when a custom property not on the host is unprefixed',
  { tag: '@stylelint' },
  async () => {
    const { results } = await stylelint.lint({
      code: `
      .component {
        --color: black;
      }
    `,
      cwd: import.meta.dirname.replace('src', 'dist'),
      config,
    });

    expect(results.at(0)?.warnings).toHaveLength(1);
  },
);

test(
  'valid when a custom property on the host is unprefixed',
  { tag: '@stylelint' },
  async () => {
    const { results } = await stylelint.lint({
      code: `
      :host {
        --color: black;
      }
    `,
      cwd: import.meta.dirname.replace('src', 'dist'),
      config,
    });

    expect(results.at(0)?.warnings).toHaveLength(0);
  },
);

test(
  'invalid when a custom property not on the host is prefixed',
  { tag: '@stylelint' },
  async () => {
    const { results } = await stylelint.lint({
      code: `
      .component {
        --private-color: black;
      }
    `,
      cwd: import.meta.dirname.replace('src', 'dist'),
      config,
    });

    expect(results.at(0)?.warnings).toHaveLength(0);
  },
);

test(
  'invalid when a custom property on the host is prefixed',
  { tag: '@stylelint' },
  async () => {
    const { results } = await stylelint.lint({
      code: `
      :host {
        --private-color: black;
      }
    `,
      cwd: import.meta.dirname.replace('src', 'dist'),
      config,
    });

    expect(results.at(0)?.warnings).toHaveLength(1);
  },
);
