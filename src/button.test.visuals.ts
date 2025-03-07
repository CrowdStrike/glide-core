import { expect, test } from '@playwright/test';
import type GlideCoreButton from './button.js';

test.describe('button--button', () => {
  test.describe('globals=theme:light', () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('hover', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.disabled = true;
          });

        await page.locator('glide-core-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="primary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
        await page.locator('glide-core-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'secondary';
          });

        await page.locator('glide-core-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'tertiary';
          });

        await page.locator('glide-core-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('press', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.disabled = true;
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="primary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
        await page.locator('glide-core-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'secondary';
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'tertiary';
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('size="small"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.size = 'small';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="primary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-button').waitFor();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="secondary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.variant = 'secondary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="tertiary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.variant = 'tertiary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('hover', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.disabled = true;
          });

        await page.locator('glide-core-button').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="primary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page.locator('glide-core-button').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'secondary';
          });

        await page.locator('glide-core-button').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'tertiary';
          });

        await page.locator('glide-core-button').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('press', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.disabled = true;
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="primary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page.locator('glide-core-button').hover();
        await page.mouse.down();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'secondary';
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'tertiary';
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('size="small"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.size = 'small';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="primary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-button').waitFor();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="secondary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.variant = 'secondary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="tertiary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.variant = 'tertiary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('button--with-icons', () => {
  test.describe('globals=theme:light', () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('hover', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.disabled = true;
          });

        await page.locator('glide-core-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="primary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
        await page.locator('glide-core-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'secondary';
          });

        await page.locator('glide-core-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'tertiary';
          });

        await page.locator('glide-core-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('press', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.disabled = true;
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="primary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
        await page.locator('glide-core-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'secondary';
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'tertiary';
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('size="small"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.size = 'small';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="primary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-button').waitFor();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="secondary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.variant = 'secondary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="tertiary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.variant = 'tertiary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('hover', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.disabled = true;
          });

        await page.locator('glide-core-button').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="primary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page.locator('glide-core-button').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'secondary';
          });

        await page.locator('glide-core-button').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'tertiary';
          });

        await page.locator('glide-core-button').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('press', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.disabled = true;
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="primary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page.locator('glide-core-button').hover();
        await page.mouse.down();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'secondary';
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-button')
          .evaluate<void, GlideCoreButton>((element) => {
            element.variant = 'tertiary';
          });

        await page.locator('glide-core-button').hover();
        await page.mouse.down();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('size="small"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.size = 'small';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="primary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-button').waitFor();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="secondary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.variant = 'secondary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="tertiary"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-button')
        .evaluate<void, GlideCoreButton>((element) => {
          element.variant = 'tertiary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
