import { RuleTester } from '@typescript-eslint/rule-tester';
import { betterTestAssertions } from './better-test-assertions.js';

const ruleTester = new RuleTester();

ruleTester.run('better-test-assertions', betterTestAssertions, {
  valid: [
    {
      code: `
        it('preferToBeEmptyString', () => {
          expect('').to.be.empty.string;
        });
      `,
    },
    {
      code: `
        it('preferToBeNull', () => {
          expect(null).to.be.null;
        });
      `,
    },
    {
      code: `
        it('preferToBeUndefined', () => {
          expect(undefined).to.be.undefined;
        });
      `,
    },
    {
      code: `
        it('preferToBeTrue', () => {
          expect(true).to.be.true
        });
      `,
    },
    {
      code: `
        it('preferToBeFalse', () => {
          expect(false).to.be.false
        });
      `,
    },
    {
      code: `
        it('preferToEqual', () => {
          expect('test').to.equal('test');
        });
      `,
    },
    {
      code: `
        it('preferToDeepEqual', () => {
          expect('test').to.deep.equal('test');
        });
      `,
    },
    {
      code: `
        it('preferToNotEqual', () => {
          expect('test').to.not.equal('test');
        });
      `,
    },
    {
      code: `
        it('preferToNotDeepEqual', () => {
          expect('test').to.not.deep.equal('test');
        });
      `,
    },
    {
      code: `
        it('preferToNotBe', () => {
          expect(true).to.not.be.false;
        });
      `,
    },
  ],
  invalid: [
    {
      code: `
        it('preferToBeEmptyString', () => {
          expect('').to.equal('');
        });
      `,
      errors: [{ messageId: 'preferToBeEmptyString' }],
    },
    {
      code: `
        it('preferToBeNull', () => {
          expect(null).to.equal(null);
        });
      `,
      errors: [{ messageId: 'preferToBeNull' }],
    },
    {
      code: `
        it('preferToBeUndefined', () => {
          expect(undefined).to.equal(undefined);
        });
      `,
      errors: [{ messageId: 'preferToBeUndefined' }],
    },
    {
      code: `
        it('preferToBeTrue', () => {
          expect(true).to.equal(true);
        });
      `,
      errors: [{ messageId: 'preferToBeTrue' }],
    },
    {
      code: `
        it('preferToBeFalse', () => {
          expect(false).to.equal(false);
        });
      `,
      errors: [{ messageId: 'preferToBeFalse' }],
    },
    {
      code: `
        it('preferToEqual', () => {
          expect('test').to.be.equal('test');
        });
      `,
      errors: [{ messageId: 'preferToEqual' }],
    },
    {
      code: `
        it('preferToDeepEqual', () => {
          expect('test').to.be.deep.equal('test');
        });
      `,
      errors: [{ messageId: 'preferToDeepEqual' }],
    },
    {
      code: `
        it('preferToNotEqual', () => {
          expect('test').not.to.equal('test');
        });
      `,
      errors: [{ messageId: 'preferToNotEqual' }],
    },
    {
      code: `
        it('preferToNotDeepEqual', () => {
          expect('test').not.to.deep.equal('test');
        });
      `,
      errors: [{ messageId: 'preferToNotDeepEqual' }],
    },
    {
      code: `
        it('preferToNotBe', () => {
          expect(true).not.to.be.false;
        });
      `,
      errors: [{ messageId: 'preferToNotBe' }],
    },
  ],
});
