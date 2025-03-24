"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const no_nested_template_literals_js_1 = require("./no-nested-template-literals.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('no-nested-template-literals', no_nested_template_literals_js_1.noNestedTemplateLiterals, {
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
