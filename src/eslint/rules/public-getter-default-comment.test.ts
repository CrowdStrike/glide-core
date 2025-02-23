import { RuleTester } from '@typescript-eslint/rule-tester';
import { publicGetterDefaultComment } from './public-getter-default-comment.js';

const ruleTester = new RuleTester();

ruleTester.run('public-getter-default-comment', publicGetterDefaultComment, {
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
