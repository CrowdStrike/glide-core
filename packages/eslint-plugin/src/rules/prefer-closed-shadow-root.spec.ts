import { RuleTester } from '@typescript-eslint/rule-tester';
import { preferClosedShadowRoot } from './prefer-closed-shadow-root.js';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('prefer-closed-shadow-root', preferClosedShadowRoot, {
  valid: [
    {
      code: "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: 'closed', }; }",
    },
    {
      code: "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: 'closed', }; @property label = 'test' }",
    },
    {
      code: "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: 'closed' }; }",
    },
    {
      // Ensures extra options like `delegatesFocusTrue` within shadowRootOptions works as expected
      code: "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true, mode: 'closed' }; }",
    },
    {
      // Ignores elements that don't extend LitElement
      code: 'class Example { }',
    },
  ],
  invalid: [
    {
      // No shadowRootOptions at all
      code: 'class Example extends LitElement { }',
      output:
        "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: 'closed' }; }",
      errors: [{ messageId: 'missingShadowRootOptions' }],
    },
    {
      code: "class Example extends LitElement { @property label = 'test' }",
      output:
        "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: 'closed' }; @property label = 'test' }",
      errors: [{ messageId: 'missingShadowRootOptions' }],
    },
    {
      // Has shadowRootOptions, but not mode
      code: 'class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions }; }',
      output:
        "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: 'closed' }; }",
      errors: [{ messageId: 'missingMode' }],
    },
    {
      // Can add to existing shadowRootOptions
      code: 'class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true }; }',
      output:
        "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true, mode: 'closed' }; }",
      errors: [{ messageId: 'missingMode' }],
    },
    {
      // Has shadowRootOptions, but mode is set to "open"
      code: "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: 'open' }; }",
      output:
        "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: 'closed' }; }",
      errors: [{ messageId: 'setModeClosed' }],
    },
    {
      // Has existing shadowRootOptions and mode is set to "open"
      code: "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true, mode: 'open' }; }",
      output:
        "class Example extends LitElement { static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true, mode: 'closed' }; }",
      errors: [{ messageId: 'setModeClosed' }],
    },
  ],
});
