import { test } from '@playwright/test';

export default test.extend<{
  waitForVisualSettlement: (description: string) => Promise<void>;
}>({
  async waitForVisualSettlement({ page }, use) {
    await use(async (description: string) => {
      return test.step(description, async () => {
        let previousScreenshot: Buffer | null = null;

        while (true) {
          // https://github.com/CrowdStrike/glide-core/pull/1071#discussion_r2283391089
          await new Promise((resolve) => setTimeout(resolve, 500));

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
