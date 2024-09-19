import { RuleTester } from '@typescript-eslint/rule-tester';
import { preferToBeTrueOrFalse } from './prefer-to-be-true-or-false.js';

const ruleTester = new RuleTester();

ruleTester.run('prefer-to-be-true-or-false', preferToBeTrueOrFalse, {
  valid: [
    {
      code: 'expect(component.attribute).to.be.false;',
    },
    {
      code: 'expect(component.attribute).to.be.true;',
    },
    {
      code: 'notUsingExpect.to.equal(false);',
    },
  ],
  invalid: [
    {
      code: 'expect(component.attribute).to.equal(false);',
      output: 'expect(component.attribute).to.be.false;',
      errors: [{ messageId: 'preferToBeFalse' }],
    },
    {
      code: 'expect(component.attribute).to.equal(false)',
      output: 'expect(component.attribute).to.be.false',
      errors: [{ messageId: 'preferToBeFalse' }],
    },
    {
      code: 'expect(component.attribute).to.equal(true);',
      output: 'expect(component.attribute).to.be.true;',
      errors: [{ messageId: 'preferToBeTrue' }],
    },
    {
      code: 'expect(component.attribute).to.equal(true)',
      output: 'expect(component.attribute).to.be.true',
      errors: [{ messageId: 'preferToBeTrue' }],
    },
  ],
});
