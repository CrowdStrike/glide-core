import { RuleTester } from '@typescript-eslint/rule-tester';
import { consistentQuotedAttributes } from './consistent-quoted-attributes.js';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('consistent-quoted-attributes', consistentQuotedAttributes, {
  valid: [
    {
      code: 'class TestComponent extends LitElement { render() { return html`<svg width="100px">`; } }',
    },
    {
      code: 'class TestComponent extends LitElement { render() { return html`<svg width="${this.#triangleWidth}px">`; } }',
    },
    {
      code: 'class TestComponent extends LitElement { render() { return html`<svg width="${this.#triangleWidth}px" height="${this.#triangleHeight}px">`; } }',
    },
    {
      code: 'class TestComponent extends LitElement { render() { return html`<svg width=${this.#triangleWidthInPixels}>`; } }',
    },
  ],
  invalid: [
    {
      code: "class TestComponent extends LitElement { render() { return html`<svg width='100px'>`; } }",
      errors: [{ messageId: 'consistentQuotedAttributes' }],
    },
    {
      code: "class TestComponent extends LitElement { render() { return html`<svg width='${this.#triangleWidth}px'>`; } }",
      errors: [{ messageId: 'consistentQuotedAttributes' }],
    },
    {
      code: 'class TestComponent extends LitElement { render() { return html`<svg width=100px>`; } }',
      errors: [{ messageId: 'consistentQuotedAttributes' }],
    },
  ],
});
