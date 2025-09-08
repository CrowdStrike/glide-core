import { expect, test } from './playwright/test.js';
import type Dropdown from './dropdown.js';
import type DropdownOption from './dropdown.option.js';

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
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
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=dropdown--dropdown');

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
    - text: Label
    - button "Label"
  `);
});

test.describe('filter("add")', () => {
  test('open=${true}', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.addButton = true;
        element.filterable = true;
        element.open = true;
      });

    await page.getByRole('combobox').fill('add');

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - combobox "Label 1 items" [expanded]
      - listbox "add":
        - option "add (Add)"
    `);
  });

  test('open=${false}', { tag: '@accessibility' }, async ({ page }) => {
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

  test('required', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.addButton = true;
        element.filterable = true;
        element.open = true;
        element.required = true;
      });

    await page.getByRole('combobox').fill('add');
    await page.getByRole('combobox').focus();

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - combobox "Label 1 items" [expanded]
      - status "1 items"
      - listbox "add":
        - option "add (Add)"
    `);
  });
});

test.describe('filter("noMatchingOptions")', () => {
  test('open=${true}', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.filterable = true;
        element.open = true;
      });

    await page.getByRole('combobox').fill('noMatchingOptions');

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - combobox "Label 0 items" [expanded]: noMatchingOptions
      - listbox "noMatchingOptions": No matching options
    `);
  });

  test('open=${false}', { tag: '@accessibility' }, async ({ page }) => {
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

  test('required', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.filterable = true;
        element.open = true;
        element.required = true;
      });

    await page.getByRole('combobox').fill('noMatchingOptions');
    await page.getByRole('combobox').focus();

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - combobox "Label 0 items" [expanded]
      - status "0 items"
      - listbox "noMatchingOptions": No matching options
    `);
  });
});

test.describe('filter("o")', () => {
  test('open=${true}', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.addButton = true;
        element.filterable = true;
        element.open = true;
      });

    await page.getByRole('combobox').fill('o');

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - combobox "Label 3 items" [expanded]
      - status "3 items"
      - listbox "o":
        - option "One"
        - option "Two"
        - option "o (Add)"
    `);
  });

  test('open=${false}', { tag: '@accessibility' }, async ({ page }) => {
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

  test('required', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.filterable = true;
        element.open = true;
        element.required = true;
      });

    await page.getByRole('combobox').fill('o');
    await page.getByRole('combobox').focus();

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - combobox "Label 2 items" [expanded]
      - status "2 items"
      - listbox "o":
        - option "One"
        - option "Two"
    `);
  });
});

test('hide-label', { tag: '@accessibility' }, async ({ page }) => {
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

test('loading', { tag: '@accessibility' }, async ({ page }) => {
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
  test('open=${true}', { tag: '@accessibility' }, async ({ page }) => {
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

  test('open=${false}', { tag: '@accessibility' }, async ({ page }) => {
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

  test(
    '<glide-core-dropdown-option>.count',
    { tag: '@accessibility' },
    async ({ page }) => {
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
    },
  );

  test(
    '<glide-core-dropdown-option>.disabled',
    { tag: '@accessibility' },
    async ({ page }) => {
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
    },
  );

  test(
    '<glide-core-dropdown-option>.editable',
    { tag: '@accessibility' },
    async ({ page }) => {
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
    },
  );
});

test.describe('multiple=${false}', () => {
  test('open=${true}', { tag: '@accessibility' }, async ({ page }) => {
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

  test('open=${false}', { tag: '@accessibility' }, async ({ page }) => {
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

  test('placeholder', { tag: '@accessibility' }, async ({ page }) => {
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

  test('select-all', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=dropdown--dropdown');

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, Dropdown>((element) => {
        element.multiple = false;
        element.open = true;
        element.selectAll = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
      - text: Label
      - button "Label" [expanded]
      - listbox:
        - option "One"
        - option "Two"
        - option "Three"
    `);
  });

  test('slot="description"', { tag: '@accessibility' }, async ({ page }) => {
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

  test('tooltip', { tag: '@accessibility' }, async ({ page }) => {
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

  test(
    '<glide-core-dropdown-option>.count',
    { tag: '@accessibility' },
    async ({ page }) => {
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
    },
  );

  test(
    '<glide-core-dropdown-option>.disabled',
    { tag: '@accessibility' },
    async ({ page }) => {
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
    },
  );

  test(
    '<glide-core-dropdown-option>.editable',
    { tag: '@accessibility' },
    async ({ page }) => {
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
    },
  );
});

test('required', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=dropdown--dropdown');

  await page
    .locator('glide-core-dropdown')
    .evaluate<void, Dropdown>((element) => {
      element.open = true;
      element.required = true;
    });

  await page.getByRole('button').focus();

  await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot(`
    - text: Label
    - button "Label"
  `);
});
