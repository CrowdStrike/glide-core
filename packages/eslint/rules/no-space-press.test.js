"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const no_space_press_js_1 = require("./no-space-press.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('no-space-press', no_space_press_js_1.noSpacePress, {
    valid: [
        {
            code: "await sendKeys({ down: 'Shift' })",
        },
        {
            code: "await sendKeys({ press: 'Shift' })",
        },
        {
            code: "await sendKeys({ up: 'Shift' })",
        },
        {
            code: "some.nested.key.thing === 'Space'",
        },
        {
            code: "some.nested.key.thing === ' '",
        },
    ],
    invalid: [
        {
            code: "sendKeys({ down: 'Space' });",
            output: "sendKeys({ down: ' ' });",
            errors: [{ messageId: 'preferWhitespace' }],
        },
        {
            code: "await sendKeys({ down: 'Space' });",
            output: "await sendKeys({ down: ' ' });",
            errors: [{ messageId: 'preferWhitespace' }],
        },
        {
            code: "sendKeys({ press: 'Space' });",
            output: "sendKeys({ press: ' ' });",
            errors: [{ messageId: 'preferWhitespace' }],
        },
        {
            code: "await sendKeys({ press: 'Space' });",
            output: "await sendKeys({ press: ' ' });",
            errors: [{ messageId: 'preferWhitespace' }],
        },
        {
            code: "sendKeys({ up: 'Space' });",
            output: "sendKeys({ up: ' ' });",
            errors: [{ messageId: 'preferWhitespace' }],
        },
        {
            code: "await sendKeys({ up: 'Space' });",
            output: "await sendKeys({ up: ' ' });",
            errors: [{ messageId: 'preferWhitespace' }],
        },
        {
            code: "event.key === 'Space'",
            output: "event.key === ' '",
            errors: [{ messageId: 'preferWhitespace' }],
        },
        {
            code: "event.key !== 'Space'",
            output: "event.key !== ' '",
            errors: [{ messageId: 'preferWhitespace' }],
        },
    ],
});
