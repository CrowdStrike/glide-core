"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const string_event_name_js_1 = require("./string-event-name.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('string-event-name', string_event_name_js_1.stringEventName, {
    valid: [
        {
            code: `
        this.dispatchEvent(new Event('change'));
      `,
        },
        {
            code: `
        this.dispatchEvent(new CustomEvent('change'));
      `,
        },
    ],
    invalid: [
        {
            code: `
        const variable = 'change';
        this.dispatchEvent(new Event(variable));
      `,
            errors: [
                {
                    messageId: 'stringEventName',
                },
            ],
        },
        {
            code: `
        const variable = 'change';
        this.dispatchEvent(new CustomEvent(variable));
      `,
            errors: [
                {
                    messageId: 'stringEventName',
                },
            ],
        },
    ],
});
