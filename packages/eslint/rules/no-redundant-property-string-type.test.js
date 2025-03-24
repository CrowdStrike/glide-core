"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const no_redundant_property_string_type_js_1 = require("./no-redundant-property-string-type.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('no-redundant-property-string-type', no_redundant_property_string_type_js_1.noRedudantPropertyStringType, {
    valid: [
        {
            // We ignore classes that don't extend LitElement
            code: 'class TestComponent { @property({ type: String }) name = "test" }',
        },
        {
            code: 'class TestComponent extends LitElement { @property() name = "test" }',
        },
        {
            code: 'class TestComponent extends LitElement { @property({ reflect: true }) name = "test" }',
        },
        {
            code: 'class TestComponent extends LitElement { @property({ type: Boolean }) name = false }',
        },
        {
            code: 'class TestComponent extends LitElement { @property({ attribute: "some-name", type: Boolean }) name = false }',
        },
    ],
    invalid: [
        {
            code: 'class TestComponent extends LitElement { @property({ type: String }) name = "test" }',
            output: 'class TestComponent extends LitElement { @property() name = "test" }',
            errors: [{ messageId: 'noRedudantPropertyStringType' }],
        },
        {
            code: 'class TestComponent extends LitElement { @property({ type: String, reflect: true }) name = "test" }',
            output: 'class TestComponent extends LitElement { @property({ reflect: true }) name = "test" }',
            errors: [{ messageId: 'noRedudantPropertyStringType' }],
        },
        {
            code: 'class TestComponent extends LitElement { @property({ attribute: "some-name", type: String, reflect: true }) name = "test" }',
            output: 'class TestComponent extends LitElement { @property({ attribute: "some-name", reflect: true }) name = "test" }',
            errors: [{ messageId: 'noRedudantPropertyStringType' }],
        },
    ],
});
