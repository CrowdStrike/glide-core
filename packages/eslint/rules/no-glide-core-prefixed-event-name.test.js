"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const no_glide_core_prefixed_event_name_js_1 = require("./no-glide-core-prefixed-event-name.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('no-glide-core-prefixed-event-name', no_glide_core_prefixed_event_name_js_1.noPrefixedEventName, {
    valid: [
        {
            code: "new Event('close')",
        },
        {
            code: "new Event('a-dasherized-event')",
        },
        {
            code: "new Event('close', { bubbles: false })",
        },
        {
            code: "new CustomEvent('event')",
        },
        {
            code: "new CustomEvent('event', { bubbles: false })",
        },
    ],
    invalid: [
        {
            code: "new Event('glide-core-toggle')",
            output: "new Event('toggle')",
            errors: [
                {
                    messageId: 'noPrefix',
                },
            ],
        },
        {
            code: "new Event('glide-core-toggle', { bubbles: false })",
            output: "new Event('toggle', { bubbles: false })",
            errors: [
                {
                    messageId: 'noPrefix',
                },
            ],
        },
        {
            code: "new CustomEvent('glide-core-toggle')",
            output: "new CustomEvent('toggle')",
            errors: [
                {
                    messageId: 'noPrefix',
                },
            ],
        },
        {
            code: "new CustomEvent('glide-core-toggle', { bubbles: false })",
            output: "new CustomEvent('toggle', { bubbles: false })",
            errors: [
                {
                    messageId: 'noPrefix',
                },
            ],
        },
    ],
});
