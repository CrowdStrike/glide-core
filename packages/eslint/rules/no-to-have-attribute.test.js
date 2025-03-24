"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const no_to_have_attribute_js_1 = require("./no-to-have-attribute.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('no-to-have-attribute', no_to_have_attribute_js_1.noToHaveAttribute, {
    valid: [
        {
            code: "expect(host).getAttribute('role');",
        },
        {
            code: "expect(host).hasAttribute('selected');",
        },
    ],
    invalid: [
        {
            code: "expect(host).to.have.attribute('aria-checked', 'true');",
            errors: [{ messageId: 'noToHaveAttribute' }],
        },
        {
            code: "expect(host).to.have.attribute('aria-disabled');",
            errors: [{ messageId: 'noToHaveAttribute' }],
        },
    ],
});
