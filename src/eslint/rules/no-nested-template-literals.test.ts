import { RuleTester } from '@typescript-eslint/rule-tester';
import { test } from '@playwright/test';
import { noNestedTemplateLiterals } from './no-nested-template-literals.js';

RuleTester.afterAll = test.afterAll;
RuleTester.describe = test.describe;
RuleTester.it = test;

const ruleTester = new RuleTester();

ruleTester.run('no-nested-template-literals', noNestedTemplateLiterals, {
  valid: [
    {
      code: 'console.log(`Hello, @${username}!`);',
    },
    {
      code: 'class TestComponent extends LitElement { render() { return html`<svg width="${this.#triangleWidth}px">`; } }',
    },
  ],
  invalid: [
    {
      code: 'console.log(`Hello, ${`@${username}`}!`);',
      errors: [{ messageId: 'noNestedTemplateLiterals' }],
    },
    {
      code: 'class TestComponent extends LitElement { render() { return html`<svg width=${`${this.#triangleWidth}px`}>`; } }',
      errors: [{ messageId: 'noNestedTemplateLiterals' }],
    },
  ],
});
