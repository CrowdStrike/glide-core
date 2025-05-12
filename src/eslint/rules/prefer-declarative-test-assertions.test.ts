import { RuleTester } from '@typescript-eslint/rule-tester';
import { preferDeclarativeTestAssertions } from './prefer-declarative-test-assertions.js';

const ruleTester = new RuleTester();

ruleTester.run(
  'prefer-declarative-test-assertions',
  preferDeclarativeTestAssertions,
  {
    valid: [
      {
        code: `
          it('is empty string', () => {
            expect('').to.be.empty.string
          });
        `,
      },
      {
        code: `
          it('is null', () => {
            expect(null).to.be.null
          });
        `,
      },
    ],
    invalid: [
      {
        code: `
          it('is empty string', () => {
            expect('').to.equal('')
          });
        `,
        errors: [{ messageId: 'preferToBeEmptyString' }],
      },
      {
        code: `
          it('is empty string', () => {
            expect('').to.be.equal('')
          });
        `,
        errors: [{ messageId: 'preferToBeEmptyString' }],
      },
      {
        code: `
          it('is null', () => {
            expect(null).to.equal(null)
          });
        `,
        errors: [{ messageId: 'preferToBeNull' }],
      },
      {
        code: `
          it('is null', () => {
            expect(null).to.be.equal(null)
          });
        `,
        errors: [{ messageId: 'preferToBeNull' }],
      },
    ],
  },
);
