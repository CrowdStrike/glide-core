import { RuleTester } from '@typescript-eslint/rule-tester';
import { consistentTestFixtureVariableDeclarator } from './consistent-test-fixture-variable-declarator.js';

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
