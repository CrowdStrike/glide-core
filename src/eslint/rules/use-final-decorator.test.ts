import { RuleTester } from '@typescript-eslint/rule-tester';
import { useFinalDecorator } from './use-final-decorator.js';

const ruleTester = new RuleTester();

ruleTester.run('use-final-decorator', useFinalDecorator, {
  valid: [
    {
      code: `
        @customElement('glide-core-component')
        @final
        class Component extends LitElement {}
      `,
    },
    {
      code: `
        @final
        @customElement('glide-core-component')
        class Component extends LitElement {}
      `,
    },
    {
      code: `
        class Class {}
      `,
    },
  ],
  invalid: [
    {
      code: `
        @customElement('glide-core-component')
        class Component extends LitElement {}
      `,
      errors: [{ messageId: 'useFinalDecorator' }],
      output: `
        @customElement('glide-core-component')
        @final
        class Component extends LitElement {}
      `,
    },
  ],
});
