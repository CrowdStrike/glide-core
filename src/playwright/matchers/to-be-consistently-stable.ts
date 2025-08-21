import { type Locator, expect } from '@playwright/test';

export default expect.extend({
  /**
   * Ensures an element is consistently visually stable.
   *
   * Playwright has a built-in check for stability. But it only waits a couple frames
   * and doesn't attempt to assess permanent stability. So an element can be stable
   * for a couple frames, unstable for a couple more, then finally stable and
   * Playwright's check will pass.
   *
   * We've found that elements that use Floating UI can be intermittently stable
   * while Floating UI does a recaluation or two. This matcher is for those cases,
   * and for visual tests in particular.
   *
   * We have't found a use for this matcher in the absence of Floating UI. So you
   * should reconsider using it if Floating UI isn't in play. There's a good chance
   * your code needs to be adjusted instead.
   */
  async toBeConsistentlyStable(locator: Locator) {
    const isStable = await new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(false), this.timeout);

      let consecutiveMatches = 0;
      let previousScreenshot = Buffer.from(new ArrayBuffer(0));

      (async () => {
        while (true) {
          const currentScreenshot = await locator.screenshot({
            animations: 'disabled',
          });

          if (
            previousScreenshot?.equals(currentScreenshot) &&
            consecutiveMatches === 3
          ) {
            resolve(true);
            break;
          } else if (previousScreenshot?.equals(currentScreenshot)) {
            consecutiveMatches += 1;
          } else {
            consecutiveMatches = 0;
          }

          previousScreenshot = currentScreenshot;

          // 250 is large enough not to saturate a machine's cores but small enough that the
          // the matcher will return relatively quickly. Still, this matcher will add at
          // least 750 milliseconds to your test. So only use it if you have to.
          await new Promise((resolve) => setTimeout(resolve, 250));
        }
      })();
    });

    const message = isStable
      ? () => ''
      : () =>
          this.utils.matcherHint('toBeConsistentlyStable', false, true) +
          '\n\n' +
          // Locators have a `toString()` implementation that serializes nicely.
          //
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          `Locator: ${locator.toString()}\n` +
          `Expected: ${this.utils.printExpected(true)}\n` +
          `Received: ${this.utils.printReceived(false)}`;

    return {
      message,
      pass: isStable,
      name: 'toBeConsistentlyStable',
      actual: isStable,
      expected: true as const,
    };
  },
});
