import { expect, test } from '@playwright/test';
import type GlideCoreTreeItem from './tree.item.js';
import type GlideCoreTreeItemMenu from './tree.item.menu.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Tree) {
  test.describe(story, () => {
    test('<glide-core-tree-item>.expanded', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-tree-item')
        .first()
        .evaluate<void, GlideCoreTreeItem>((element) => {
          element.expanded = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('<glide-core-tree-item>.remove-indentation', async ({
      page,
    }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-tree-item')
        .first()
        .evaluate<void, GlideCoreTreeItem>((element) => {
          element.removeIndentation = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('<glide-core-tree-item>.selected', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-tree-item')
        .first()
        .evaluate<void, GlideCoreTreeItem>((element) => {
          element.selected = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('<glide-core-tree-item-menu>[placement="bottom-start"]', async ({
      page,
    }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-tree-item-menu')
        .first()
        .locator('glide-core-icon-button')
        .hover({ force: true });

      await page
        .locator('glide-core-tree-item-menu')
        .first()
        .locator('glide-core-icon-button')
        .click();

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('<glide-core-tree-item-menu>[placement="top-start"]', async ({
      page,
    }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-tree-item-menu')
        .first()
        .evaluate<void, GlideCoreTreeItemMenu>((element) => {
          element.placement = 'top-start';
        });

      await page
        .locator('glide-core-tree-item-menu')
        .first()
        .locator('glide-core-icon-button')
        .hover({ force: true });

      await page
        .locator('glide-core-tree-item-menu')
        .first()
        .locator('glide-core-icon-button')
        .click();

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
