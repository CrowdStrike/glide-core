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
import waitForVisualSettlement from './fixtures/wait-for-visual-settlement.js';
import toBeAccessible from './matchers/to-be-accessible.js';
import toBeRegistered from './matchers/to-be-registered.js';
import toDispatchEvents from './matchers/to-dispatch-events.js';
import toHaveFormData from './matchers/to-have-form-data.js';

export const expect = mergeExpects(
  toBeAccessible,
  toBeRegistered,
  toDispatchEvents,
  toHaveFormData,
) as Expect<{
  toBeAccessible: (
    page: Page,
    selector: string,
    violations?: string[],
  ) => Promise<void>;

  toBeRegistered: (locator: Locator, name: string) => Promise<void>;

  toDispatchEvents: (
    locator: Locator,
    action: () => Promise<unknown>,
    expectedEvents: {
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
  waitForVisualSettlement,
);
