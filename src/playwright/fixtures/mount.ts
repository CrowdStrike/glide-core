import { promises as fs } from 'node:fs';
import { test } from '@playwright/test';
import { type TemplateResult } from 'lit';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import customElements from '../../../custom-elements.json' with { type: 'json' };
import { v8CoverageAttachmentName } from './../constants.js';

export default test.extend<{
  mount: (template: TemplateResult) => Promise<void>;
}>({
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

        for (const tag of componentTags) {
          const isAlreadyRegistered = await page.evaluate((tag) => {
            return Boolean(window.customElements.get(tag));
          }, tag);

          // Some components import other components because they depend on them. So a
          // tag may already be registered. If it is, we move on so we don't cause an
          // error when the component is registered again via `addScriptTag()` below.
          if (isAlreadyRegistered) {
            continue;
          }

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
            const exportedComponent = module.exports.find(({ kind, name }) => {
              return kind === 'custom-element-definition' && name === tag;
            });

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

          await page.addScriptTag({
            url,
            type: 'module',
          });
        }

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
    if (browserName !== 'chromium' || process.env.PLAYWRIGHT_SKIP_COVERAGE) {
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
});
