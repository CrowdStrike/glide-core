"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const prefer_to_be_true_or_false_js_1 = require("./prefer-to-be-true-or-false.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('prefer-to-be-true-or-false', prefer_to_be_true_or_false_js_1.preferToBeTrueOrFalse, {
    valid: [
        {
            code: 'expect(host.attribute).to.be.false;',
        },
        {
            code: 'expect(host.attribute).to.be.true;',
        },
        {
            code: 'notUsingExpect.to.equal(false);',
        },
    ],
    invalid: [
        {
            code: 'expect(host.attribute).to.equal(false);',
            output: 'expect(host.attribute).to.be.false;',
            errors: [{ messageId: 'preferToBeFalse' }],
        },
        {
            code: 'expect(host.attribute).to.equal(false)',
            output: 'expect(host.attribute).to.be.false',
            errors: [{ messageId: 'preferToBeFalse' }],
        },
        {
            code: 'expect(host.attribute).to.equal(true);',
            output: 'expect(host.attribute).to.be.true;',
            errors: [{ messageId: 'preferToBeTrue' }],
        },
        {
            code: 'expect(host.attribute).to.equal(true)',
            output: 'expect(host.attribute).to.be.true',
            errors: [{ messageId: 'preferToBeTrue' }],
        },
    ],
});
