import { test } from '@playwright/test';

export default test.extend<{
  waitForVisualSettlement: (description: string) => Promise<void>;
}>({
  async waitForVisualSettlement({ page }, use) {
    await use(async (description: string) => {
      return test.step(description, async () => {
        let previousScreenshot: Buffer | null = null;

        while (true) {
          await page.evaluate(() => new Promise(requestAnimationFrame));

          const currentScreenshot = await page.screenshot({
            animations: 'disabled',
          });

          if (previousScreenshot?.equals(currentScreenshot)) {
            return;
          }

          previousScreenshot = currentScreenshot;
        }
      });
    });
  },
});
