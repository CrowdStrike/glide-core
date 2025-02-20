import stylelint from 'stylelint';
import { expect } from 'vitest';

const config = {
  plugins: ['../plugin.js'],
  rules: {
    'glide-core/no-unprefixed-private-custom-property': true,
  },
};

it('warns if a custom property not on the host is unprefixed', async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: `
      .component {
        --color: black;
      }
    `,
    cwd: import.meta.dirname.replace('src', 'dist'),
    config,
  });

  expect(warnings).toHaveLength(1);
});

it('does not warn if a custom property not on the host is prefixed', async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: `
      .component {
        --private-color: black;
      }
    `,
    cwd: import.meta.dirname.replace('src', 'dist'),
    config,
  });

  expect(warnings).toHaveLength(0);
});

it('warns if a custom property on the host is prefixed', async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: `
      :host {
        --private-color: black;
      }
    `,
    cwd: import.meta.dirname.replace('src', 'dist'),
    config,
  });

  expect(warnings).toHaveLength(1);
});

it('does not warn if a custom property on the host is unprefixed', async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: `
      :host {
        --color: black;
      }
    `,
    cwd: import.meta.dirname.replace('src', 'dist'),
    config,
  });

  expect(warnings).toHaveLength(0);
});
