import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'closes when its close button is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-modal label="Label" open> Content </glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');
    const closeButton = page.getByTestId('close-button');

    await closeButton.click();

    await expect(host).not.toHaveAttribute('open');
  },
);

test(
  'closes when its back button is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-modal label="Label" back-button open>
          Content
        </glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');
    const backButton = page.getByTestId('back-button');

    await backButton.click();

    await expect(host).not.toHaveAttribute('open');
  },
);

test(
  'closes when clicked outside',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-modal label="Label" open> Content </glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');

    await page.mouse.click(0, 0);

    await expect(host).not.toHaveAttribute('open');
  },
);

test(
  'does not close when clicked inside',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-modal label="Label" open> Content </glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');
    const dialog = page.getByRole('dialog');

    await dialog.click();

    await expect(host).toHaveAttribute('open');
  },
);

test(
  'does not close when `click()` is called on slotted element',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-modal label="Label" open>
          <input />
        </glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');
    const textbox = page.getByRole('textbox');

    await callMethod(textbox, 'click');

    await expect(host).toHaveAttribute('open');
  },
);

test(
  'does not close when the label of a slotted element is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-modal label="Label" open>
          <label for="input"> Label </label>
          <input id="input" />
        </glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');
    const label = page.locator('label');

    await label.click();

    await expect(host).toHaveAttribute('open');
  },
);

test('locks scroll on open', { tag: '@mouse' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-modal label="Label" open> Content </glide-core-modal>`,
  );

  const root = page.locator('html');

  // eslint-disable-next-line @crowdstrike/glide-core/no-to-have-class
  await expect(root).toHaveClass('private-glide-core-modal-lock-scroll');
});

test(
  'unlocks scroll on close',
  { tag: '@mouse' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-modal label="Label" open> Content </glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');
    const root = page.locator('html');

    await setProperty(host, 'open', false);

    // eslint-disable-next-line @crowdstrike/glide-core/no-to-have-class
    await expect(root).not.toHaveClass('private-glide-core-modal-lock-scroll');
  },
);
