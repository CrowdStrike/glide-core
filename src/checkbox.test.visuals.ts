import { expect, test } from '@playwright/test';

test.describe('Checkbox', () => {
  test.describe('Light Mode', () => {
    test.describe('horizontal', () => {
      test('checked', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--checkbox');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.checked = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('disabled', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--checkbox');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.disabled = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('hide-label', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--checkbox');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.hideLabel = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('indeterminate', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--checkbox');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.indeterminate = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('required', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--checkbox');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.required = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('slot="description"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--checkbox');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          node.append(div);

          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('summary', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--checkbox');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.summary = 'Summary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('tooltip', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--checkbox');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.tooltip = 'Tooltip';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('value', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--checkbox');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.value = 'one';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });

  test.describe('vertical', () => {
    test('checked', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--checkbox');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.checked = true;
        node.orientation = 'vertical';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--checkbox');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.disabled = true;
        node.orientation = 'vertical';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--checkbox');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.hideLabel = true;
        node.orientation = 'vertical';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('indeterminate', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--checkbox');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.indeterminate = true;
        node.orientation = 'vertical';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--checkbox');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.orientation = 'vertical';
        node.required = true;
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--checkbox');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        const div = document.createElement('div');

        div.textContent = 'Description';
        div.slot = 'description';

        node.append(div);
        node.orientation = 'vertical';

        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('summary', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--checkbox');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.orientation = 'vertical';
        node.summary = 'Summary';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--checkbox');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.orientation = 'vertical';
        node.tooltip = 'Tooltip';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('value', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--checkbox');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.orientation = 'vertical';
        node.value = 'one';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('With Error', () => {
  test.describe('Light Mode', () => {
    test.describe('horizontal', () => {
      test('checked', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.checked = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('disabled', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.disabled = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('hide-label', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.hideLabel = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('indeterminate', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.indeterminate = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('required', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.required = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('slot="description"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          node.append(div);

          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('summary', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.summary = 'Summary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('tooltip', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.tooltip = 'Tooltip';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('value', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox');

        await handle.evaluate((node) => {
          node.value = 'one';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });

  test.describe('vertical', () => {
    test('checked', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--with-error');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.checked = true;
        node.orientation = 'vertical';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--with-error');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.disabled = true;
        node.orientation = 'vertical';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--with-error');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.hideLabel = true;
        node.orientation = 'vertical';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('indeterminate', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--with-error');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.indeterminate = true;
        node.orientation = 'vertical';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--with-error');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.orientation = 'vertical';
        node.required = true;
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--with-error');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        const div = document.createElement('div');

        div.textContent = 'Description';
        div.slot = 'description';

        node.append(div);
        node.orientation = 'vertical';

        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('summary', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--with-error');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.orientation = 'vertical';
        node.summary = 'Summary';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--with-error');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.orientation = 'vertical';
        node.tooltip = 'Tooltip';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('value', async ({ page }, test) => {
      await page.goto('/iframe.html?id=checkbox--with-error');

      const handle = await page.waitForSelector('glide-core-checkbox');

      await handle.evaluate((node) => {
        node.orientation = 'vertical';
        node.value = 'one';
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
