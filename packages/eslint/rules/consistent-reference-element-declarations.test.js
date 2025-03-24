"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const consistent_reference_element_declarations_js_1 = require("./consistent-reference-element-declarations.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('consistent-reference-element-declarations', consistent_reference_element_declarations_js_1.consistentReferenceElementDeclarations, {
    valid: [
        {
            code: 'class TestComponent extends LitElement { #anElementRef = createRef<HTMLSlotElement>(); }',
        },
        {
            code: 'class TestComponent extends LitElement { #anElementRef = createRef(); }',
        },
        {
            code: 'class TestComponent extends LitElement { #aPrivateField = notUsingARef(); }',
        },
    ],
    invalid: [
        {
            code: 'class TestComponent extends LitElement { elementField = createRef<HTMLSlotElement>(); }',
            errors: [
                { messageId: 'preferPrivateField' },
                { messageId: 'addSuffix' },
            ],
        },
        {
            code: 'class TestComponent extends LitElement { prefixSlotElementRef = createRef<HTMLSlotElement>(); }',
            errors: [{ messageId: 'preferPrivateField' }],
        },
        {
            code: 'class TestComponent extends LitElement { prefixSlotElementRef = createRef(); }',
            errors: [{ messageId: 'preferPrivateField' }],
        },
        {
            code: 'class TestComponent extends LitElement { #prefixSlotElement = createRef<HTMLSlotElement>(); }',
            errors: [{ messageId: 'addSuffix' }],
        },
        {
            code: 'class TestComponent extends LitElement { #prefixSlot = createRef<HTMLSlotElement>(); }',
            errors: [{ messageId: 'addSuffix' }],
        },
        {
            code: 'class TestComponent extends LitElement { #prefixSlot = createRef(); }',
            errors: [{ messageId: 'addSuffix' }],
        },
        {
            code: 'class TestComponent extends LitElement { #prefixSlotRef = createRef<HTMLSlotElement>(); }',
            errors: [{ messageId: 'addSuffix' }],
        },
    ],
});
