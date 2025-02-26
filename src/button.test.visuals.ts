import { expect, test } from '@playwright/test';

test.describe('Button', () => {
  test.describe('Light Mode', () => {
    test.describe('disabled', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('size', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('variant', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button');
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });

  test.describe('Dark Mode', () => {
    test.describe('disabled', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button&globals=theme:dark');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button&globals=theme:dark');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button&globals=theme:dark');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('size', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button&globals=theme:dark');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button&globals=theme:dark');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button&globals=theme:dark');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('variant', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button&globals=theme:dark');
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button&globals=theme:dark');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--button&globals=theme:dark');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });
});

test.describe('With Icons', () => {
  test.describe('Light Mode', () => {
    test.describe('disabled', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--with-icons');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--with-icons');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--with-icons');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('size', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--with-icons');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--with-icons');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--with-icons');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('variant', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--with-icons');

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--with-icons');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button--with-icons');

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });

  test.describe('Dark Mode', () => {
    test.describe('disabled', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.disabled = true;
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('size', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.size = 'small';
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('variant', () => {
      test('variant="primary"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button--with-icons&globals=theme:dark',
        );

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.variant = 'secondary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button');

        await handle?.evaluate((node) => {
          node.variant = 'tertiary';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });
});
