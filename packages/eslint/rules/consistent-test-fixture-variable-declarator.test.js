"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const consistent_test_fixture_variable_declarator_js_1 = require("./consistent-test-fixture-variable-declarator.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('consistent-test-fixture-variable-declarator', consistent_test_fixture_variable_declarator_js_1.consistentTestFixtureVariableDeclarator, {
    valid: [
        {
            code: 'const notAFixture = html``;',
        },
        {
            code: 'const host = await fixture(html``);',
        },
    ],
    invalid: [
        {
            code: 'const notComponent = await fixture(html``);',
            errors: [
                {
                    messageId: 'consistentNaming',
                },
            ],
        },
    ],
});
