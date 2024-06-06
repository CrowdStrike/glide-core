import { RuleTester } from '@typescript-eslint/rule-tester';
import { noNestedTemplateLiterals } from './no-nested-template-literals.js';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

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
