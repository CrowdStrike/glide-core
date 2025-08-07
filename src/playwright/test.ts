import {
  type Expect,
  type Locator,
  mergeExpects,
  mergeTests,
} from '@playwright/test';
import addEventListener from './fixtures/add-event-listener.js';
import callMethod from './fixtures/call-method.js';
import isAccessible from './fixtures/is-accessible.js';
import mount from './fixtures/mount.js';
import removeAttribute from './fixtures/remove-attribute.js';
import setAttribute from './fixtures/set-attribute.js';
import setProperty from './fixtures/set-property.js';
import toBeFocused from './matchers/to-be-focused.js';
import toBeRegistered from './matchers/to-be-registered.js';
import toDispatchEvents from './matchers/to-dispatch-events.js';
import toHaveFormData from './matchers/to-have-form-data.js';

export const expect = mergeExpects(
  toBeFocused,
  toBeRegistered,
  toDispatchEvents,
  toHaveFormData,
) as Expect<{
  toBeFocused: (locator: Locator) => Promise<void>;
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
  isAccessible,
  mount,
  removeAttribute,
  setAttribute,
  setProperty,
);
