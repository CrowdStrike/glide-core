import { promises as fs } from 'node:fs';
import crypto from 'node:crypto';
import {
  type Locator,
  test as baseTest,
  expect as baseExpect,
} from '@playwright/test';
import { type TemplateResult } from 'lit';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { AxeBuilder } from '@axe-core/playwright';
import { componentAnnotation, v8CoverageAttachmentName } from './constants.js';

// TODO: add setProperty()
// TODO: find a way to hide COMPONENT_TEST

export interface SimpleEvent {
  bubbles: boolean;
  cancelable: boolean;
  composed: boolean;
  defaultPrevented: boolean;
  detail?: unknown;
}

export const expect = baseExpect.extend({
  async toBeFocused(locator: Locator) {
    const isFocused = await locator.evaluate((node) => {
      return document.activeElement === node;
    });

    const message = isFocused
      ? () => ''
      : () =>
          this.utils.matcherHint('isFocused', false, true) +
          '\n\n' +
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          `Locator: ${locator.toString()}\n` +
          `Expected: ${this.utils.printExpected(true)}\n` +
          `Received: ${this.utils.printReceived(false)}`;

    return {
      actual: isFocused,
      expected: true as const,
      message,
      name: 'isFocused',
      pass: isFocused,
    };
  },
  async toBeRegistered(locator: Locator, name: string) {
    const isRegistered = await locator.evaluate((node, name) => {
      return window.customElements.get(name) === node.constructor;
    }, name);

    const message = isRegistered
      ? () => ''
      : () =>
          this.utils.matcherHint('toBeRegistered', isRegistered, true) +
          '\n\n' +
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          `Locator: ${locator.toString()}\n` +
          `Expected: ${this.utils.printExpected(true)}\n` +
          `Received: ${this.utils.printReceived(false)}`;

    return {
      message,
      pass: isRegistered,
      name: 'toBeRegistered',
      actual: isRegistered,
      expected: true as const,
    };
  },
});

export const test = baseTest.extend<{
  addEventListener: (
    locator: Locator,
    event: string,
    options?: {
      preventDefault?: true;
      stopPropagation?: true;
      stopImmediatePropagation?: true;
    },
  ) => Promise<SimpleEvent[]>;
  isAccessible: (selector: string) => Promise<string[]>;
  mount: (template: TemplateResult, story: string) => Promise<void>;
  setAttribute: (
    locator: Locator,
    name: string,
    value: string,
  ) => Promise<void>;
}>({
  // TODO: JSDoc about how it times out after a secon

  // eslint-disable-next-line no-empty-pattern
  async addEventListener({}, use) {
    await use((locator: Locator, event, options) => {
      return locator.evaluate(
        async (node, { event, options }) => {
          const events: SimpleEvent[] = [];

          await new Promise((resolve) => {
            node.addEventListener(event, (event: Event) => {
              if (options?.preventDefault) {
                event.preventDefault();
              }

              if (options?.stopPropagation) {
                event.stopPropagation();
              }

              if (options?.stopImmediatePropagation) {
                event.stopImmediatePropagation();
              }

              events.push({
                bubbles: event.bubbles,
                cancelable: event.cancelable,
                composed: event.composed,
                defaultPrevented: event.defaultPrevented,
                detail:
                  event instanceof CustomEvent
                    ? (event.detail as unknown)
                    : undefined,
              } as SimpleEvent);

              resolve(null);
            });

            // TODO: why 500?
            setTimeout(resolve, 100);
          });

          await new Promise((resolve) => setTimeout(resolve));
          return events;
        },
        {
          event,
          options,
        },
      );
    });
  },
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
  async mount({ page }, use, testInfo) {
    await use(async function (
      template: TemplateResult,
      story: string,
    ): Promise<void> {
      await page.goto(`?path=/story/${story}`);

      // TODO: say what this is used for
      testInfo.annotations.push({
        type: componentAnnotation.type,
      });

      await page.evaluate(() => {
        return new Promise((resolve) => {
          // We don't want to return and let testing resume until we know that the components
          // under test have been registered. And they won't be registered until Storybook
          // loads them via `vite-app.js`.
          //
          // We could query for that script and wait for it to load. But the script's name is
          // an implementation detail of Vite. Additonally, just because that script has
          // loaded doesn't mean its imports have if they're imported programatically.
          //
          // So we dispatch an event in each "Test" story's `render()` method and listen for
          // the event here. Having to dispatch the event is unfortunate. But it is a robust
          // way to determine when to return control back to the test.
          window.addEventListener('storybookready', () => {
            resolve(null);
          });
        });
      });

      const renderResult = render(template);
      const html = await collectResult(renderResult);

      // TODO: explain all this
      const eventListeners: { name: string; callback: string }[] = [];
      let htmlWithPlaceholderEventListeners = '';

      for (const [index, string] of template.strings.entries()) {
        const value = template.values[index];
        const hasEventListener = /@\w+=$/.test(string);

        if (typeof value === 'function' && hasEventListener) {
          const eventName = /(\w+)=$/.exec(string)?.at(1);

          if (eventName) {
            htmlWithPlaceholderEventListeners += string.replace(
              `@${eventName}=`,
              `_=${eventName}`,
            );

            const id = crypto.randomUUID();
            await page.exposeFunction(id, value);

            eventListeners.push({
              name: eventName,
              callback: id,
            });
          }
        } else if (index < template.strings.length - 1) {
          htmlWithPlaceholderEventListeners += string + JSON.stringify(value);
        } else {
          htmlWithPlaceholderEventListeners += string;
        }
      }

      await page.evaluate(
        async ({ eventListeners, html, htmlWithPlaceholderEventListeners }) => {
          const template = document.createElement('template');
          template.innerHTML = htmlWithPlaceholderEventListeners;

          const indexes: string[] = [];

          for (const [index, element] of Object.entries(
            template.content.querySelectorAll('*'),
          )) {
            if (element.matches('[_]')) {
              indexes.push(index);
            }
          }

          document.body.innerHTML = html;

          for (const element of document.body.querySelectorAll('*')) {
            if ('updateComplete' in element) {
              // TODO: explain
              await element.updateComplete;
            }
          }

          for (const [index, element] of Object.entries(
            document.body.querySelectorAll('*'),
          )) {
            const hasEventListener = indexes.includes(index);

            if (hasEventListener) {
              const eventListener = eventListeners.shift();

              if (eventListener) {
                element.addEventListener(eventListener.name, (event: Event) => {
                  const simpleEvent: SimpleEvent = {
                    bubbles: event.bubbles,
                    cancelable: event.cancelable,
                    composed: event.composed,
                    defaultPrevented: event.defaultPrevented,
                  };

                  if (event instanceof CustomEvent) {
                    simpleEvent.detail = event.detail;
                  }

                  // TODO: explain
                  //
                  // @ts-expect-error TODO
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                  window[eventListener.callback](simpleEvent);
                });
              }
            }
          }
        },
        {
          eventListeners,
          html,
          htmlWithPlaceholderEventListeners: htmlWithPlaceholderEventListeners,
        },
      );
    });
  },
  async page({ page, browserName }, use, testInfo) {
    if (browserName !== 'chromium') {
      return use(page);
    }

    await page.coverage.startJSCoverage({
      resetOnNavigation: false,
    });

    await use(page);

    const v8Coverage = await page.coverage.stopJSCoverage();
    const v8CoveragePath = testInfo.outputPath(v8CoverageAttachmentName);

    await fs.writeFile(v8CoveragePath, JSON.stringify({ result: v8Coverage }));

    testInfo.attachments.push({
      name: v8CoverageAttachmentName,
      contentType: 'application/json',
      path: v8CoveragePath,
    });
  },
  // eslint-disable-next-line no-empty-pattern
  async setAttribute({}, use) {
    await use((locator: Locator, name: string, value: string) => {
      return locator.evaluate(
        (element, options) => {
          element.setAttribute(options.name, options.value);
        },
        { name, value },
      );
    });
  },
});
