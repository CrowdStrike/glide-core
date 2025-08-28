import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type Popover from './popover.js';
import type PopoverContainer from './popover.container.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-popover>
        <glide-core-popover-container>
          Content
        <glide-core-popover-container>

        <button slot="target">Target</button>
      </glide-core-popover>`,
  );

  await expect(page).toBeAccessible('glide-core-popover');
});

test(
  'sets `aria-expanded` on its target when open initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <glide-core-popover-container>
            Content
          <glide-core-popover-container>

          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const button = page.getByRole('button');

    await expect(button).toHaveAttribute('aria-expanded', 'true');
  },
);

test(
  'sets `aria-expanded` on its target when opened programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-popover>
          <glide-core-popover-container>
            Content
          <glide-core-popover-container>

          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const button = page.getByRole('button');

    await setProperty(host, 'open', true);

    await expect(button).toHaveAttribute('aria-expanded', 'true');
  },
);

test(
  'sets `aria-expanded` on its target when closed initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover>
          <glide-core-popover-container>
            Content
          <glide-core-popover-container>

          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const button = page.getByRole('button');

    await expect(button).toHaveAttribute('aria-expanded', 'false');
  },
);

test(
  'sets `aria-expanded` on its target when closed programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <glide-core-popover-container>
            Content
          <glide-core-popover-container>

          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const button = page.getByRole('button');

    await setProperty(host, 'open', false);

    await expect(button).toHaveAttribute('aria-expanded', 'false');
  },
);

test(
  'sets `aria-expanded` on its target when enabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-popover disabled open>
          <glide-core-popover-container>
            Content
          <glide-core-popover-container>
         
          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const button = page.getByRole('button');

    await setProperty(host, 'disabled', false);

    await expect(button).toHaveAttribute('aria-expanded', 'true');
  },
);

test(
  'sets `aria-expanded` on its target when disabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
         <glide-core-popover-container>
            Content
          <glide-core-popover-container>
          
          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const button = page.getByRole('button');

    await setProperty(host, 'disabled', true);

    await expect(button).toHaveAttribute('aria-expanded', 'false');
  },
);

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=popover--popover');

  await page
    .locator('glide-core-popover')
    .evaluate<void, Popover>((element) => {
      element.disabled = true;
      element.open = true;
    });

  await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot(`
    - button
  `);
});

test('open=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=popover--popover');

  await page
    .locator('glide-core-popover')
    .evaluate<void, Popover>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot(`
    - button
  `);
});

test('open=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=popover--popover');
  await page.locator('glide-core-popover').waitFor();

  await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot(`
    - button
  `);
});

test(
  '<glide-core-popover-container>[role="dialog"]',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=popover--popover');

    await page
      .locator('glide-core-popover')
      .evaluate<void, Popover>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-popover-container')
      .evaluate<void, PopoverContainer>((element) => {
        element.role = 'dialog';
      });

    await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot(`
      - button "Target" [expanded]
      - dialog: Content
    `);
  },
);
