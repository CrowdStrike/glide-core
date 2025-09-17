import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type Tooltip from './tooltip.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-tooltip
        label="Label"
        description="Description"
        .shortcut=${['CMD', 'K']}
      >
        <button slot="target">Target</button>
      </glide-core-tooltip>`,
  );

  await expect(page).toBeAccessible('glide-core-tooltip');
});

test(
  'sets `aria-describedby` on its target when enabled initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const button = page.getByRole('button');
    const container = page.locator('glide-core-private-tooltip-container');
    const containerId = await container.evaluate((element) => element.id);

    await expect(button).toHaveAttribute('aria-describedby', containerId);
  },
);

test(
  'sets `aria-describedby` on its target when enabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" disabled open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');
    const container = page.locator('glide-core-private-tooltip-container');
    const containerId = await container.evaluate((element) => element.id);

    await setProperty(host, 'disabled', false);

    await expect(button).toHaveAttribute('aria-describedby', containerId);
  },
);

test(
  'does not set `aria-describedby` on its target when disabled initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" disabled open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const button = page.getByRole('button');

    await expect(button).not.toHaveAttribute('aria-describedby');
  },
);

test(
  'does not set `aria-describedby` on its target when disabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');

    await setProperty(host, 'disabled', true);

    await expect(button).not.toHaveAttribute('aria-describedby');
  },
);

test(
  'sets `aria-describedby` on its target when not hidden from screenreaders initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const button = page.getByRole('button');
    const container = page.locator('glide-core-private-tooltip-container');
    const containerId = await container.evaluate((element) => element.id);

    await expect(button).toHaveAttribute('aria-describedby', containerId);
  },
);

test(
  'sets `aria-describedby` on its target when unhidden from screenreaders programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open screenreader-hidden>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');
    const container = page.locator('glide-core-private-tooltip-container');
    const containerId = await container.evaluate((element) => element.id);

    await setProperty(host, 'screenreaderHidden', false);

    await expect(button).toHaveAttribute('aria-describedby', containerId);
  },
);

test(
  'does not set `aria-describedby` on its target when hidden from screenreaders initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open screenreader-hidden>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const button = page.getByRole('button');

    await expect(button).not.toHaveAttribute('aria-describedby');
  },
);

test(
  'does not set `aria-describedby` on its target when hidden from screenreaders programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open screenreader-hidden>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');

    await setProperty(host, 'screenreaderHidden', true);

    await expect(button).not.toHaveAttribute('aria-describedby');
  },
);

test('description', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tooltip--tooltip');

  await page
    .locator('glide-core-tooltip')
    .evaluate<void, Tooltip>((element) => {
      element.description = 'Description';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-tooltip')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Label Description"
  `);
});

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tooltip--tooltip');

  await page
    .locator('glide-core-tooltip')
    .evaluate<void, Tooltip>((element) => {
      element.disabled = true;
      element.open = true;
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-tooltip')).toMatchAriaSnapshot(`
    - button "Tooltip:"
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tooltip--tooltip');
  await page.locator('glide-core-tooltip').waitFor();

  await page
    .locator('glide-core-tooltip')
    .evaluate<void, Tooltip>((element) => {
      element.open = true;
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-tooltip')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Label"
  `);
});

test('shortcut', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tooltip--tooltip');

  await page
    .locator('glide-core-tooltip')
    .evaluate<void, Tooltip>((element) => {
      element.shortcut = ['CMD', 'K'];
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-tooltip')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Label CMD + K"
  `);
});
