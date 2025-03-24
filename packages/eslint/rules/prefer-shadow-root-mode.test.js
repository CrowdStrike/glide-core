"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const prefer_shadow_root_mode_js_1 = require("./prefer-shadow-root-mode.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('prefer-shadow-root-mode', prefer_shadow_root_mode_js_1.preferClosedShadowRoot, {
    valid: [
        {
            code: 'class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: shadowRootMode, }; }',
        },
        {
            code: "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: shadowRootMode, }; @property label = 'test' }",
        },
        {
            // Ensures extra options like `delegatesFocusTrue` within shadowRootOptions works as expected
            code: 'class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true, mode: shadowRootMode, }; }',
        },
        {
            // Ignores elements that don't extend LitElement
            code: 'class Example { }',
        },
    ],
    invalid: [
        {
            // No shadowRootOptions
            code: 'class Example extends LitElement { }',
            errors: [{ messageId: 'missingShadowRootOptions' }],
        },
        {
            // No shadowRootOptions
            code: "class Example extends LitElement { @property label = 'test' }",
            errors: [{ messageId: 'missingShadowRootOptions' }],
        },
        {
            // Has shadowRootOptions, but not mode
            code: 'class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions }; }',
            errors: [{ messageId: 'missingMode' }],
        },
        {
            // Can add to existing shadowRootOptions
            code: 'class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true }; }',
            errors: [{ messageId: 'missingMode' }],
        },
        {
            // Has mode but it's not using our library
            code: "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: 'closed' }; }",
            errors: [{ messageId: 'wrongMode' }],
        },
    ],
});
