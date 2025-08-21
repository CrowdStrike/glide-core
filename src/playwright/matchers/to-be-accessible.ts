import { type Page, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

export default expect.extend({
  /**
   * @param expectedViolations - An array of Rule IDs¹.
   *
   * 1: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
   */
  async toBeAccessible(
    page: Page,
    selector: string,
    expectedViolations?: string[],
  ) {
    const result = await new AxeBuilder({ page }).include(selector).analyze();

    const isAccessible =
      expectedViolations &&
      result.violations.length !== expectedViolations.length
        ? false
        : !expectedViolations && result.violations.length > 0
          ? false
          : true;

    const message = isAccessible
      ? () => ''
      : () =>
          this.utils.matcherHint('toBeAccessible', isAccessible, true) +
          '\n\n' +
          `${this.utils.printDiffOrStringify(
            expectedViolations ?? [],
            result.violations.filter((violation) => {
              return expectedViolations
                ? expectedViolations.every((id) => id !== violation.id)
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
