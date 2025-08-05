import { RuleTester } from '@typescript-eslint/rule-tester';
import { test } from '@playwright/test';
import { noProtectedKeyword } from './no-protected-keyword.js';

RuleTester.afterAll = test.afterAll;
RuleTester.describe = test.describe;
RuleTester.it = test;

const ruleTester = new RuleTester();

ruleTester.run('no-protected-keyword', noProtectedKeyword, {
  valid: [
    {
      code: `
        class Component extends LitElement {
          method() {}
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          override method() {}
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          private method() {}
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          property = true;
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          override property = true;
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          private property = true;
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          readonly property = true;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        class Component extends LitElement {
          protected method() {}
        }
      `,
      errors: [{ messageId: 'noProtectedKeyword' }],
      output: `
        class Component extends LitElement {
          method() {}
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          protected override method() {}
        }
      `,
      errors: [{ messageId: 'noProtectedKeyword' }],
      output: `
        class Component extends LitElement {
          override method() {}
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          protected property = true;
        }
      `,
      errors: [{ messageId: 'noProtectedKeyword' }],
      output: `
        class Component extends LitElement {
          property = true;
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          protected override property = true;
        }
      `,
      errors: [{ messageId: 'noProtectedKeyword' }],
      output: `
        class Component extends LitElement {
          override property = true;
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          protected readonly property = true;
        }
      `,
      errors: [{ messageId: 'noProtectedKeyword' }],
      output: `
        class Component extends LitElement {
          readonly property = true;
        }
      `,
    },
  ],
});
