"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const prefixed_lit_element_class_declaration_js_1 = require("./prefixed-lit-element-class-declaration.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('prefixed-lit-element-class-declaration', prefixed_lit_element_class_declaration_js_1.prefixedClassDeclaration, {
    valid: [
        {
            code: 'export default class GlideCoreAccordion extends LitElement {}',
        },
        {
            code: 'export default class NonLitElement {}',
        },
        {
            code: 'class GlideCoreAccordion extends LitElement {}',
        },
        {
            code: 'class NonLitElement {}',
        },
    ],
    invalid: [
        {
            code: 'export default class Accordion extends LitElement {}',
            output: 'export default class GlideCoreAccordion extends LitElement {}',
            errors: [
                {
                    messageId: 'addPrefix',
                },
            ],
        },
        {
            code: 'class Component extends LitElement {}',
            output: 'class GlideCoreComponent extends LitElement {}',
            errors: [
                {
                    messageId: 'addPrefix',
                },
            ],
        },
    ],
});
