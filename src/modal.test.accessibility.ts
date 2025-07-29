import { expect, test } from '@playwright/test';
import type Modal from './modal.js';

test('open', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=modal--modal');

  await page.locator('glide-core-modal').evaluate<void, Modal>((element) => {
    element.open = true;
  });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot(`
    - dialog:
      - banner:
        - heading "Label" [level=2]
        - toolbar:
          - button "Close"
      - region "Label": Content
      - contentinfo
  `);
});

test(
  'severity="informational"',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=modal--modal');

    await page.locator('glide-core-modal').evaluate<void, Modal>((element) => {
      element.open = true;
      element.severity = 'informational';
    });

    await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot(`
    - dialog:
      - banner:
        - 'heading "Severity: Informational - Label" [level=2]'
        - toolbar:
          - button "Close"
      - 'region "Severity: Informational - Label"'
      - contentinfo
  `);
  },
);

test('severity="medium"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=modal--modal');

  await page.locator('glide-core-modal').evaluate<void, Modal>((element) => {
    element.open = true;
    element.severity = 'medium';
  });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot(`
    - dialog:
      - banner:
        - 'heading "Severity: Medium - Label" [level=2]'
        - toolbar:
          - button "Close"
      - 'region "Severity: Medium - Label"'
      - contentinfo
  `);
});

test('severity="critical"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=modal--modal');

  await page.locator('glide-core-modal').evaluate<void, Modal>((element) => {
    element.open = true;
    element.severity = 'critical';
  });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot(`
    - dialog:
      - banner:
        - 'heading "Severity: Critical - Label" [level=2]'
        - toolbar:
          - button "Close"
      - 'region "Severity: Critical - Label"'
      - contentinfo
  `);
});

test('slot="header-actions"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=modal--with-header-actions');

  await page.locator('glide-core-modal').evaluate<void, Modal>((element) => {
    element.open = true;
  });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot(`
    - dialog:
      - banner:
        - heading "Label" [level=2]
        - toolbar:
          - button "Edit"
          - button "Settings"
          - button "Close"
      - region "Label": Content
      - contentinfo
  `);
});

test('slot="primary"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=modal--with-primary-button');

  await page.locator('glide-core-modal').evaluate<void, Modal>((element) => {
    element.open = true;
  });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot(`
    - dialog:
      - banner:
        - heading "Label" [level=2]
        - toolbar:
          - button "Close"
      - region "Label": Content
      - contentinfo:
        - list:
          - listitem:
            - button "Primary"
  `);
});

test('slot="secondary"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=modal--with-secondary-button');

  await page.locator('glide-core-modal').evaluate<void, Modal>((element) => {
    element.open = true;
  });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot(`
    - dialog:
      - banner:
        - heading "Label" [level=2]
        - toolbar:
          - button "Close"
      - region "Label": Content
      - contentinfo:
        - list:
          - listitem:
            - button "Secondary"
  `);
});

test('slot="tertiary"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=modal--with-tertiary-tooltip-and-button');

  await page.locator('glide-core-modal').evaluate<void, Modal>((element) => {
    element.open = true;
  });

  await page.locator('glide-core-tooltip').first().getByRole('button').focus();

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot(`
    - dialog:
      - banner:
        - heading "Label" [level=2]
        - toolbar:
          - button "Close"
      - region "Label": Content
      - contentinfo:
        - list:
          - listitem:
            - button "Tooltip:"
            - tooltip "Tooltip"
  `);
});
