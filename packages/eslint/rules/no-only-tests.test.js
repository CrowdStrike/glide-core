"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const no_only_tests_js_1 = require("./no-only-tests.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('no-only-tests', no_only_tests_js_1.noOnlyTests, {
    valid: [
        {
            code: "it('is a valid test', function () {})",
        },
        {
            code: "it.skip('uses some other method on it', function () {})",
        },
        {
            // Verifies we ignore CallExpressions without `arguments`, which would mean
            // we aren't using `it` as a function (for some reason).
            code: 'it',
        },
    ],
    invalid: [
        {
            code: "it.only('is onlying a test', function () {})",
            errors: [{ messageId: 'noOnly' }],
        },
    ],
});
