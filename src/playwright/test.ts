import { promises as fs } from 'node:fs';
import {
  type Locator,
  test as baseTest,
  expect as baseExpect,
} from '@playwright/test';
import { type TemplateResult } from 'lit';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { AxeBuilder } from '@axe-core/playwright';
import customElements from '../../custom-elements.json' with { type: 'json' };
import { v8CoverageAttachmentName } from './constants.js';

// Anything the comes from the browser will get serialized before it gets sent
// back to tests, which run in Node.js. So `addEventListener()` can only return
// a subset of event properties. But these should cover most of our use cases.
interface SimpleEvent {
  bubbles: boolean;
  cancelable: boolean;
  composed: boolean;
  defaultPrevented: boolean;
  detail?: unknown;
  target: string | null;
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
          // Locators have a `toString()` implementation that serializes nicely.
          //
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
          // Locators have a `toString()` implementation that serializes nicely.
          //
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

  async toHaveFormData(locator: Locator, name: string, value: unknown) {
    const result = await locator.evaluate((node, name) => {
      return node instanceof HTMLFormElement
        ? {
            tagName: node.tagName,
            value: new FormData(node).get(name),
          }
        : {
            tagName: node.tagName,
            value: null,
          };
    }, name);

    const message =
      result.tagName === 'FORM' && result.value === value
        ? () => ''
        : result.tagName === 'FORM'
          ? () =>
              this.utils.matcherHint('toHaveFormData', result.value, value) +
              '\n\n' +
              // Locators have a `toString()` implementation that serializes nicely.
              //
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              `Locator: ${locator.toString()}\n` +
              `Expected: ${this.utils.printExpected(value)}\n` +
              `Received: ${this.utils.printReceived(result.value)}`
          : () =>
              this.utils.matcherHint('toHaveFormData', result.value, value) +
              '\n\n' +
              // Locators have a `toString()` implementation that serializes nicely.
              //
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              `Locator: ${locator.toString()}\n` +
              `Expected: ${this.utils.printExpected('FORM')}\n` +
              `Received: ${this.utils.printReceived(result.tagName)}`;

    return {
      actual: result.tagName === 'FORM' ? result.value : result.tagName,
      expected: result.tagName === 'FORM' ? value : result.tagName,
      message,
      name: 'toHaveFormData',
      pass: result.tagName === 'FORM' && result.value === value,
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

  callMethod: (
    locator: Locator,
    name: string,
    arguments_?: unknown,
  ) => Promise<unknown>;

  isAccessible: (selector: string) => Promise<string[]>;

  mount: (template: TemplateResult) => Promise<void>;

  removeAttribute: (locator: Locator, name: string) => Promise<void>;

  setAttribute: (
    locator: Locator,
    name: string,
    value: string,
  ) => Promise<void>;

  setProperty: (
    locator: Locator,
    name: string,
    value: unknown,
  ) => Promise<unknown>;
}>({
  // Playwright throws if the first argument isn't a destructured object.
  //
  // eslint-disable-next-line no-empty-pattern
  async addEventListener({}, use) {
    await use((locator: Locator, event, options) => {
      return test.step('addEventListener()', () => {
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
                    event instanceof CustomEvent ? event.detail : undefined,
                  target:
                    event.target instanceof HTMLElement ||
                    event.target instanceof SVGElement
                      ? event.target.id
                      : null,
                } as SimpleEvent);

                resolve(null);
              });

              // The promise is resolved above when an event is dispatched. It also needs to be
              // resolved after a timeout because some tests assert that no events were
              // dispatched after an action.
              //
              // `1000` because actions can take some time to execute, especially in CI.
              setTimeout(resolve, 1000);
            });

            // Wait a tick to catch duplicate events, which tests assert against.
            await new Promise((resolve) => setTimeout(resolve));

            return events;
          },
          {
            event,
            options,
          },
        );
      });
    });
  },

  // Playwright throws if the first argument isn't a destructured object.
  //
  // eslint-disable-next-line no-empty-pattern
  async callMethod({}, use) {
    await use((locator: Locator, name: string, arguments_?: unknown) => {
      return test.step('callMethod()', () => {
        return locator.evaluate(
          (element, { name, arguments_ }) => {
            //

            // @ts-expect-error Elements don't have an index signature. But we don't know in
            // advance what method will be called.
            if (name in element && typeof element[name] === 'function') {
              // @ts-expect-error See above.
              //
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
              return element[name].call(element, arguments_);
            } else {
              throw new Error(
                `${element.tagName} doesn't have a ${name} method.`,
              );
            }
          },
          { name, arguments_ },
        );
      });
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

  async mount({ page }, use) {
    await use(async function mount(template: TemplateResult): Promise<void> {
      return test.step('mount()', async () => {
        for (const string of template.strings) {
          const hasEventListener = /@\w+=$/.test(string);

          if (hasEventListener) {
            throw new Error(
              "Event listeners aren't allowed in templates. They're far too complicated to handle relative to their usefulness. Use the `addEventListener()` fixture instead.",
            );
          }
        }

        // Stop the browser from attempting to fetch a favicon so a 404 doesn't show up
        // in the console.
        await page.route('favicon.ico', (route) => {
          route.abort();
        });

        await page.goto('/playwright.html');

        const renderResult = render(template);
        const html = await collectResult(renderResult);

        let pageError: Error | undefined;

        page.on('pageerror', (error: Error) => {
          pageError = error;
        });

        const componentTags = await page.evaluate((html) => {
          document.body.innerHTML = html;

          const tags: string[] = [];
          const elements = document.body.querySelectorAll('*');

          for (const element of elements) {
            const isComponent = element.tagName.startsWith('GLIDE-CORE');
            const isDuplicate = tags.includes(element.tagName.toLowerCase());

            if (isComponent && !isDuplicate) {
              tags.push(element.tagName.toLowerCase());
            }
          }

          return tags;
        }, html);

        await Promise.all(
          componentTags.map((tag) => {
            let url: string | undefined;

            // Digging through the manifest is only necessary because sub-component names don't
            // map directly to filenames.
            //
            // For example, `glide-core-dropdown-option` maps to `dropdown.option.ts` on disk
            // instead of mapping to `dropdown-option.ts`.
            //
            // If it mapped to the latter, we could simply set `url` to
            // `src/${component.replace('glide-core-', '')}.ts` and call it a day.
            for (const module of customElements.modules) {
              const exportedComponent = module.exports.find(
                ({ kind, name }) => {
                  return kind === 'custom-element-definition' && name === tag;
                },
              );

              if (exportedComponent) {
                url = exportedComponent.declaration.module;
                break;
              }
            }

            if (!url) {
              throw new Error(
                `"${tag}" wasn't found in \`custom-elements.json\`. Does the component exist? If so, is the manifest up to date? Run \`pnpm start\` to update the manifest.`,
              );
            }

            return page.addScriptTag({
              url,
              type: 'module',
            });
          }),
        );

        await page.evaluate(async () => {
          const elements = document.body.querySelectorAll('*');

          for (const element of elements) {
            if ('updateComplete' in element) {
              await element.updateComplete;
            }
          }
        });

        if (pageError) {
          throw pageError;
        }
      });
    });
  },

  async page({ page, browser, browserName }, use, testInfo) {
    testInfo.annotations.push({
      type: 'browser',
      description: `${browserName} ${browser.version()}`,
    });

    // As you'd expect, only Chromium supports coverage collection via V8. If, for some
    // reason, we want to collect coverage for other browsers, we can instrument our
    // code using Instabul. But coverage collection only in Chromium should suffice.
    if (browserName !== 'chromium') {
      return use(page);
    }

    await page.coverage.startJSCoverage();
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

  // Playwright throws if the first argument isn't a destructured object.
  //
  // eslint-disable-next-line no-empty-pattern
  async removeAttribute({}, use) {
    await use((locator: Locator, name: string) => {
      return test.step('removeAttribute()', async () => {
        await locator.evaluate(
          (element, options) => {
            return element.removeAttribute(options.name);
          },
          { name },
        );
      });
    });
  },

  // Playwright throws if the first argument isn't a destructured object.
  //
  // eslint-disable-next-line no-empty-pattern
  async setAttribute({}, use) {
    await use((locator: Locator, name: string, value: string) => {
      return test.step('setAttribute()', () => {
        return locator.evaluate(
          (element, options) => {
            return element.setAttribute(options.name, options.value);
          },
          { name, value },
        );
      });
    });
  },

  // Playwright throws if the first argument isn't a destructured object.
  //
  // eslint-disable-next-line no-empty-pattern
  async setProperty({}, use) {
    await use(async (locator: Locator, name: string, value: unknown) => {
      return test.step('setProperty()', () => {
        return locator.evaluate(
          (element, options) => {
            // @ts-expect-error Elements don't have an index signature. But we don't know in
            // advance what property will be set.
            return (element[options.name] = options.value);
          },
          { name, value },
        );
      });
    });
  },
});
