import { expect, test } from '@playwright/test';
import type GlideCoreDropdown from './dropdown.js';
import type GlideCoreDropdownOption from './dropdown.option.js';

test('add-button-label', async ({ page }, test) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, GlideCoreDropdown>((element) => {
      element.addButtonLabel = 'Add';
      element.open = true;
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('disabled=${true}', async ({ page }, test) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, GlideCoreDropdown>((element) => {
      element.disabled = true;

      // So we can verify the snapshot doesn't include `[expanded]`.
      element.open = true;
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('disabled=${false}', async ({ page }, test) => {
  await page.goto('?id=dropdown--dropdown');

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test.describe('filterable', () => {
  test('open=${true}', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.filterable = true;
        element.open = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });

  test('open=${false}', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.filterable = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });
});

test('hide-label', async ({ page }, test) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, GlideCoreDropdown>((element) => {
      element.hideLabel = true;
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('loading', async ({ page }, test) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, GlideCoreDropdown>((element) => {
      element.loading = true;
      element.open = true;
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test.describe('multiple=${true}', () => {
  test('open=${true}', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.multiple = true;
        element.open = true;
        element.value = ['one', 'two'];
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });

  test('open=${false}', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.multiple = true;
        element.value = ['one', 'two'];
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });

  test('<glide-core-dropdown-option>.count', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.multiple = true;
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, GlideCoreDropdownOption>((element) => {
        element.count = 1000;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });

  test('<glide-core-dropdown-option>.disabled', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.multiple = true;
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, GlideCoreDropdownOption>((element) => {
        element.disabled = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });

  test('<glide-core-dropdown-option>.editable', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.multiple = true;
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, GlideCoreDropdownOption>((element) => {
        element.editable = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });
});

test.describe('multiple=${false}', () => {
  test('open=${true}', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.open = true;
        element.value = ['one'];
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });

  test('open=${false}', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.value = ['one'];
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });

  test('<glide-core-dropdown-option>.count', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, GlideCoreDropdownOption>((element) => {
        element.count = 1000;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });

  test('<glide-core-dropdown-option>.disabled', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, GlideCoreDropdownOption>((element) => {
        element.disabled = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });

  test('<glide-core-dropdown-option>.editable', async ({ page }, test) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, GlideCoreDropdownOption>((element) => {
        element.editable = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });
});

test('placeholder', async ({ page }, test) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, GlideCoreDropdown>((element) => {
      element.placeholder = 'Placeholder';
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('select-all', async ({ page }, test) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, GlideCoreDropdown>((element) => {
      element.multiple = true;
      element.open = true;
      element.selectAll = true;
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('slot="description"', async ({ page }, test) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, GlideCoreDropdown>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('tooltip', async ({ page }, test) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, GlideCoreDropdown>((element) => {
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
