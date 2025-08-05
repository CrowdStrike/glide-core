import { expect, test } from './playwright/test.js';
import type Menu from './menu.js';
import type Option from './option.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Menu');

for (const story of stories) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('loading', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.loading = true;
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('offset', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.offset = 50;
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('open', () => {
          test('open=${true}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-menu')
              .first()
              .evaluate<void, Menu>((element) => {
                element.open = true;
              });

            await page
              .locator('glide-core-menu glide-core-menu')
              .evaluate<void, Menu>((element) => {
                element.open = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('open=${false}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-menu').first().waitFor();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('<glide-core-option>.description', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await page
            .locator('glide-core-option')
            .first()
            .evaluate<void, Option>((element) => {
              element.description = 'Description';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-option>.disabled', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await page
            .locator('glide-core-option')
            .first()
            .evaluate<void, Option>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-option>:hover', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await page.locator('glide-core-option').first().hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-option>[slot="content"]', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await page
            .locator('glide-core-option')
            .first()
            .evaluate<void, Option>((element) => {
              const content = document.createElement('div');

              content.slot = 'content';

              // Including this increases our confidence that layout styling is only applied to
              // the slot when it falls back.
              content.innerHTML = `
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    slot="target"
                    height="1rem"
                    width="1rem"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  </svg>

                  One
              `;

              element.append(content);
              element.label = '';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
