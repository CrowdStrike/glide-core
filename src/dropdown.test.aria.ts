import { expect, test } from '@playwright/test';
import type Dropdown from './dropdown.js';
import type DropdownOption from './dropdown.option.js';

test('disabled=${true}', async ({ page }) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, Dropdown>((element) => {
      element.disabled = true;

      // So we can verify the snapshot doesn't include `[expanded]`.
      element.open = true;
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
    - text: Label
    - button "Label" [disabled]
  `);
});

test('disabled=${false}', async ({ page }) => {
  await page.goto('?id=dropdown--dropdown');

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
    - text: Label
    - button "Label"
  `);
});

test.describe('filterable', () => {
  test('open=${true}', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.filterable = true;
        element.open = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - combobox "Label" [expanded]
      - listbox:
        - option "One"
        - option "Two"
        - option "Three"
    `);
  });

  test('open=${false}', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.filterable = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - combobox "Label"
    `);
  });
});

test('hide-label', async ({ page }) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, Dropdown>((element) => {
      element.hideLabel = true;
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
    - text: Label
    - button "Label"
  `);
});

test('loading', async ({ page }) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, Dropdown>((element) => {
      element.loading = true;
      element.open = true;
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
    - text: Label
    - button "Label Loading" [expanded]
  `);
});

test.describe('multiple=${true}', () => {
  test('open=${true}', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.multiple = true;
        element.open = true;
        element.value = ['one', 'two'];
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label One, Two,
      - list:
        - listitem:
          - text: One
          - 'button "Remove tag: One"'
        - listitem:
          - text: Two
          - 'button "Remove tag: Two"'
      - button "One, Two, Label" [expanded]
      - listbox:
        - option "One" [selected]:
          - checkbox "One" [checked]
        - option "Two" [selected]:
          - checkbox "Two" [checked]
        - option "Three":
          - checkbox "Three"
    `);
  });

  test('open=${false}', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.multiple = true;
        element.value = ['one', 'two'];
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label One, Two,
      - list:
        - listitem:
          - text: One
          - 'button "Remove tag: One"'
        - listitem:
          - text: Two
          - 'button "Remove tag: Two"'
      - button "One, Two, Label"
    `);
  });

  test('<glide-core-dropdown-option>.count', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.multiple = true;
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, DropdownOption>((element) => {
        element.count = 1000;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - button "Label" [expanded]
      - listbox:
        - option /One \\d+\\+/:
          - checkbox "One"
        - option "Two":
          - checkbox "Two"
        - option "Three":
          - checkbox "Three"
    `);
  });

  test('<glide-core-dropdown-option>.disabled', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.multiple = true;
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, DropdownOption>((element) => {
        element.disabled = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - button "Label" [expanded]
      - listbox:
        - option "One" [disabled]:
          - checkbox "One" [disabled]
        - option "Two":
          - checkbox "Two"
        - option "Three":
          - checkbox "Three"
    `);
  });

  test('<glide-core-dropdown-option>.editable', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.multiple = true;
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, DropdownOption>((element) => {
        element.editable = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - button "Label" [expanded]
      - listbox:
        - 'option "One Edit option: One"':
          - checkbox "One"
          - 'button "Edit option: One"'
        - option "Two":
          - checkbox "Two"
        - option "Three":
          - checkbox "Three"
    `);
  });
});

test.describe('multiple=${false}', () => {
  test('open=${true}', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.open = true;
        element.value = ['one'];
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label One, One
      - button "One, Label" [expanded]
      - listbox:
        - option "One" [selected]
        - option "Two"
        - option "Three"
    `);
  });

  test('open=${false}', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.value = ['one'];
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label One, One
      - button "One, Label"
    `);
  });

  test('<glide-core-dropdown-option>.count', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, DropdownOption>((element) => {
        element.count = 1000;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - button "Label" [expanded]
      - listbox:
        - option /One \\d+\\+/
        - option "Two"
        - option "Three"
    `);
  });

  test('<glide-core-dropdown-option>.disabled', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, DropdownOption>((element) => {
        element.disabled = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - button "Label" [expanded]
      - listbox:
        - option "One" [disabled]
        - option "Two"
        - option "Three"
    `);
  });

  test('<glide-core-dropdown-option>.editable', async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-dropdown-option')
      .first()
      .evaluate<void, DropdownOption>((element) => {
        element.editable = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - button "Label" [expanded]
      - listbox:
        - 'option "One Edit option: One"':
          - 'button "Edit option: One"'
        - option "Two"
        - option "Three"
    `);
  });
});

test('placeholder', async ({ page }) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, Dropdown>((element) => {
      element.placeholder = 'Placeholder';
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
    - text: Label Placeholder
    - button "Label"
  `);
});

test('select-all', async ({ page }) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, Dropdown>((element) => {
      element.multiple = true;
      element.open = true;
      element.selectAll = true;
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
    - text: Label
    - button "Label" [expanded]
    - listbox:
      - option "Select all":
        - checkbox "Select all"
      - option "One":
        - checkbox "One"
      - option "Two":
        - checkbox "Two"
      - option "Three":
        - checkbox "Three"
  `);
});

test('slot="description"', async ({ page }) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, Dropdown>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
    - text: Label
    - button "Label"
    - text: Description
  `);
});

test('tooltip', async ({ page }) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, Dropdown>((element) => {
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Tooltip"
    - text: Label
    - button "Label"
  `);
});
