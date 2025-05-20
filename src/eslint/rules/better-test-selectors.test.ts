import { RuleTester } from '@typescript-eslint/rule-tester';
import { betterTestSelectors } from './better-test-selectors.js';

const ruleTester = new RuleTester();

ruleTester.run('better-test-selectors', betterTestSelectors, {
  valid: [
    {
      code: `
        element.shadowRoot?.querySelector('button');
      `,
    },
    {
      code: `
        it('avoidDataTestSelector', () => {
          host.querySelector('glide-core-button');
        });
      `,
    },
    {
      code: `
        it('avoidDataTestSelector', () => {
          document.querySelector('glide-core-button');
        });
      `,
    },
    {
      code: `
        it('useDataTestSelector', () => {
          host.shadowRoot?.querySelector('[data-test="button"]');
        });
      `,
    },
  ],
  invalid: [
    {
      code: `
      it('avoidDataTestSelector', () => {
        host.querySelector('[data-test="button"]')
      });
    `,
      errors: [{ messageId: 'avoidDataTestSelector' }],
    },
    {
      code: `
      it('avoidDataTestSelector', () => {
        document.querySelector('[data-test="toasts"]')
      });
    `,
      errors: [{ messageId: 'avoidDataTestSelector' }],
    },
    {
      code: `
        it('useStringLiteralSelector', () => {
          const selector = '[data-test="button"]';
          host.shadowRoot?.querySelector(selector);
        });
      `,
      errors: [{ messageId: 'useStringLiteralSelector' }],
    },
    {
      code: `
        it('useDataTestSelector', () => {
          const host = await fixture(html\`
            <glide-core-button label="Label"></glide-core-button>
          \`);

          host.shadowRoot?.querySelector('button');
        });
      `,
      errors: [{ messageId: 'useDataTestSelector' }],
    },
    {
      code: `
        it('useDataTestSelector', () => {
          host.querySelector('glide-core-button')?.shadowRoot?.querySelector('button');
        });
      `,
      errors: [{ messageId: 'useDataTestSelector' }],
    },
    {
      code: `
        it('useDataTestSelector', () => {
          host.querySelector('glide-core-button')?.shadowRoot?.querySelector('button');
        });
      `,
      errors: [{ messageId: 'useDataTestSelector' }],
    },
    {
      code: `
        it('useDataTestSelector', () => {
          host.querySelector('glide-core-button')
            ?.shadowRoot
            ?.getElementById('button');
        });
      `,
      errors: [{ messageId: 'useDataTestSelector' }],
    },
    {
      code: `
        it('useDataTestSelector', () => {
          host.querySelector('glide-core-button')
            ?.shadowRoot
            ?.getElementsByClassName('button');
        });
      `,
      errors: [{ messageId: 'useDataTestSelector' }],
    },
  ],
});
