import { RuleTester } from '@typescript-eslint/rule-tester';
import { test } from '@playwright/test';
import { consistentTestFixtureVariableDeclarator } from './consistent-test-fixture-variable-declarator.js';

RuleTester.afterAll = test.afterAll;
RuleTester.describe = test.describe;
RuleTester.it = test;

const ruleTester = new RuleTester();

ruleTester.run(
  'consistent-test-fixture-variable-declarator',
  consistentTestFixtureVariableDeclarator,
  {
    valid: [
      {
        code: 'const notAFixture = html``;',
      },
      {
        code: 'const host = await fixture(html``);',
      },
    ],
    invalid: [
      {
        code: 'const notComponent = await fixture(html``);',
        errors: [
          {
            messageId: 'consistentNaming',
          },
        ],
      },
    ],
  },
);
