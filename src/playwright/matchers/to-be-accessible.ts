import { type Page, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

/**
 * Asserts that an element is accessible according to Axe.
 *
 * @param violations - An array of Rule IDs¹.
 *
 * 1: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
 */
export default expect.extend({
  async toBeAccessible(page: Page, selector: string, violations?: string[]) {
    const result = await new AxeBuilder({ page }).include(selector).analyze();

    const isAccessible =
      violations && result.violations.length !== violations.length
        ? false
        : !violations && result.violations.length > 0
          ? false
          : true;

    const message = isAccessible
      ? () => ''
      : () =>
          this.utils.matcherHint('toBeAccessible', isAccessible, true) +
          '\n\n' +
          `${this.utils.printDiffOrStringify(
            violations ?? [],
            result.violations.filter((violation) => {
              return violations
                ? violations.every((id) => id !== violation.id)
                : result.violations;
            }),
            'Expected',
            'Received',
            true,
          )}`;

    return {
      message,
      pass: isAccessible,
      name: 'toBeAccessible',
      actual: isAccessible,
      expected: true as const,
    };
  },
});
