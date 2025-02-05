import { RuleTester } from '@typescript-eslint/rule-tester';
import { preferToBeTrueOrFalse } from './prefer-to-be-true-or-false.js';

const ruleTester = new RuleTester();

ruleTester.run('prefer-to-be-true-or-false', preferToBeTrueOrFalse, {
  valid: [
    {
      code: 'expect(host.attribute).to.be.false;',
    },
    {
      code: 'expect(host.attribute).to.be.true;',
    },
    {
      code: 'notUsingExpect.to.equal(false);',
    },
  ],
  invalid: [
    {
      code: 'expect(host.attribute).to.equal(false);',
      output: 'expect(host.attribute).to.be.false;',
      errors: [{ messageId: 'preferToBeFalse' }],
    },
    {
      code: 'expect(host.attribute).to.equal(false)',
      output: 'expect(host.attribute).to.be.false',
      errors: [{ messageId: 'preferToBeFalse' }],
    },
    {
      code: 'expect(host.attribute).to.equal(true);',
      output: 'expect(host.attribute).to.be.true;',
      errors: [{ messageId: 'preferToBeTrue' }],
    },
    {
      code: 'expect(host.attribute).to.equal(true)',
      output: 'expect(host.attribute).to.be.true',
      errors: [{ messageId: 'preferToBeTrue' }],
    },
  ],
});
