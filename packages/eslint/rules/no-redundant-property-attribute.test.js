"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const no_redundant_property_attribute_js_1 = require("./no-redundant-property-attribute.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('no-redundant-property-attribute', no_redundant_property_attribute_js_1.noRedudantPropertyAttribute, {
    valid: [
        {
            // We ignore classes that don't extend LitElement
            code: 'class TestComponent { @property({ attribute: "name" }) name = "test" }',
        },
        {
            code: 'class TestComponent extends LitElement { @property() name = "test" }',
        },
        {
            code: 'class TestComponent extends LitElement { @property({ reflect: true }) name = "test" }',
        },
        {
            code: 'class TestComponent extends LitElement { @property({ attribute: "name1" }) name2 = "test" }',
        },
    ],
    invalid: [
        {
            code: 'class TestComponent extends LitElement { @property({ attribute: "name" }) name = "test" }',
            output: 'class TestComponent extends LitElement { @property() name = "test" }',
            errors: [{ messageId: 'noRedudantPropertyAttribute' }],
        },
        {
            code: 'class TestComponent extends LitElement { @property({ attribute: "name", reflect: true }) name = "test" }',
            output: 'class TestComponent extends LitElement { @property({ reflect: true }) name = "test" }',
            errors: [{ messageId: 'noRedudantPropertyAttribute' }],
        },
        {
            code: 'class TestComponent extends LitElement { @property({ attribute: "name", reflect: true, type: Boolean }) name = "test" }',
            output: 'class TestComponent extends LitElement { @property({ reflect: true, type: Boolean }) name = "test" }',
            errors: [{ messageId: 'noRedudantPropertyAttribute' }],
        },
    ],
});
