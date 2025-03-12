import { expect, test } from '@playwright/test';
import type GlideCoreTreeItem from './tree.item.js';

test('<glide-core-tree-item>[expanded="true"]', async ({ page }, test) => {
  await page.goto('?id=tree--tree');

  await page
    .locator('glide-core-tree-item')
    .nth(1)
    .evaluate<void, GlideCoreTreeItem>((element) => {
      element.expanded = true;
    });

  await expect(page.locator('glide-core-tree')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-tree-item>[expanded="false"]', async ({ page }, test) => {
  await page.goto('?id=tree--tree');

  await page
    .locator('glide-core-tree-item')
    .nth(1)
    .evaluate<void, GlideCoreTreeItem>((element) => {
      element.expanded = false;
    });

  await expect(page.locator('glide-core-tree')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-tree-item>[selected="true"]', async ({ page }, test) => {
  await page.goto('?id=tree--tree');

  await page
    .locator('glide-core-tree-item')
    .nth(1)
    .evaluate<void, GlideCoreTreeItem>((element) => {
      element.expanded = true;
      element.selected = true;
    });

  await expect(page.locator('glide-core-tree')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-tree-item>[selected="false"]', async ({ page }, test) => {
  await page.goto('?id=tree--tree');

  await page
    .locator('glide-core-tree-item')
    .nth(1)
    .evaluate<void, GlideCoreTreeItem>((element) => {
      element.selected = false;
    });

  await expect(page.locator('glide-core-tree')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
