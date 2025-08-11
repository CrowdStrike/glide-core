import { test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

export default test.extend<{
  isAccessible: (selector: string) => Promise<string[]>;
}>({
  /**
   * @return An array of Rule IDs¹.
   *
   * 1: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
   */
  async isAccessible({ page }, use) {
    await use(async (selector: string) => {
      const result = await new AxeBuilder({ page }).include(selector).analyze();

      return result.violations.map((violation) => {
        return violation.id;
      });
    });
  },
});
