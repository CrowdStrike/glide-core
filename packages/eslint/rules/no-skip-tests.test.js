"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const no_skip_tests_js_1 = require("./no-skip-tests.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('no-skip-tests', no_skip_tests_js_1.noSkipTests, {
    valid: [
        {
            code: "it('is a valid test', function () {})",
        },
        {
            code: "it.only('uses some other method on it', function () {})",
        },
        {
            // Verifies we ignore CallExpressions without `arguments`, which would mean
            // we aren't using `it` as a function (for some reason).
            code: 'it',
        },
    ],
    invalid: [
        {
            code: "it.skip('is skipping a test', function () {})",
            errors: [{ messageId: 'noSkip' }],
        },
    ],
});
