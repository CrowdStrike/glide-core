"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const public_getter_default_comment_js_1 = require("./public-getter-default-comment.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('public-getter-default-comment', public_getter_default_comment_js_1.publicGetterDefaultComment, {
    valid: [
        {
            code: `
        export default class {
          /**
           * @default {string}
           */
          get property() {}
          set property() {}
        }
      `,
        },
        {
            code: `
        export default class {
          get #property() {}
          set #property() {}
        }
      `,
        },
        {
            code: `
        export default class {
          private get property() {}
          private set property() {}
        }
      `,
        },
        {
            code: `
        export default class {
          get privateProperty() {}
          set privateProperty() {}
        }
      `,
        },
        {
            code: `
        export default class {
          override get property() {}
          override set property() {}
        }
      `,
        },
        {
            code: `
        export default class {
          override get property() {}
        }
      `,
        },
    ],
    invalid: [
        {
            code: `
        export default class {
          /**
           * Description
           */
          get property() {}
          set property() {}
        }
      `,
            errors: [
                {
                    messageId: 'addDefaultTag',
                },
            ],
        },
        {
            code: `
        export default class {
          get property() {}
          set property() {}
        }
      `,
            errors: [
                {
                    messageId: 'addCommentAndDefaultTag',
                },
            ],
        },
        {
            code: `
        export default class {
          /*
           * @default {string}
           */
          get property() {}
          set property() {}
        }
      `,
            errors: [
                {
                    messageId: 'useJsDocComment',
                },
            ],
        },
    ],
});
