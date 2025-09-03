import {
  type Expect,
  type Locator,
  type Page,
  mergeExpects,
  mergeTests,
} from '@playwright/test';
import addEventListener from './fixtures/add-event-listener.js';
import callMethod from './fixtures/call-method.js';
import mount from './fixtures/mount.js';
import removeAttribute from './fixtures/remove-attribute.js';
import setAttribute from './fixtures/set-attribute.js';
import setProperty from './fixtures/set-property.js';
import toBeAccessible from './matchers/to-be-accessible.js';
import toBeDefined from './matchers/to-be-defined.js';
import toBeExtensible from './matchers/to-be-extensible.js';
import toHaveFormData from './matchers/to-have-form-data.js';
import toDispatchEvents from './matchers/to-dispatch-events.js';

export const expect = mergeExpects(
  toBeAccessible,
  toBeDefined,
  toBeExtensible,
  toDispatchEvents,
  toHaveFormData,
) as Expect<{
  /**
   * Asserts that an element is accessible according to Axe. `violations` is an array of Rule IDs¹.
   *
   * 1: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
   */
  toBeAccessible: (
    page: Page,
    selector: string,
    violations?: string[],
  ) => Promise<void>;

  /**
   * Asserts that an element is a custom element and that it throws when extended.
   */
  toBeDefined: (locator: Locator, name: string) => Promise<void>;

  toBeExtensible: (locator: Locator) => Promise<void>;

  /**
   * Asserts that an element dispatches one or more events, in order, after the action
   * is executed by the matcher.
   */
  toDispatchEvents: (
    locator: Locator,
    action: () => Promise<unknown>,
    events: {
      bubbles?: boolean;
      cancelable?: boolean;
      composed?: boolean;
      defaultPrevented?: boolean;
      type: string;
    }[],
  ) => Promise<void>;

  toHaveFormData: (
    locator: Locator,
    name: string,
    value: unknown,
  ) => Promise<void>;
}>;

export const test = mergeTests(
  addEventListener,
  callMethod,
  mount,
  removeAttribute,
  setAttribute,
  setProperty,
);
