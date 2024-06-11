import { RuleTester } from '@typescript-eslint/rule-tester';
import { noRedudantPropertyStringType } from './no-redundant-property-string-type.js';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run(
  'no-redundant-property-string-type',
  noRedudantPropertyStringType,
  {
    valid: [
      {
        // We ignore classes that don't extend LitElement
        code: 'class TestComponent { @property({ type: String }) name = "test" }',
      },
      {
        code: 'class TestComponent extends LitElement { @property() name = "test" }',
      },
      {
        code: 'class TestComponent extends LitElement { @property({ reflect: true }) name = "test" }',
      },
      {
        code: 'class TestComponent extends LitElement { @property({ type: Boolean }) name = false }',
      },
      {
        code: 'class TestComponent extends LitElement { @property({ attribute: "some-name", type: Boolean }) name = false }',
      },
    ],
    invalid: [
      {
        code: 'class TestComponent extends LitElement { @property({ type: String }) name = "test" }',
        output:
          'class TestComponent extends LitElement { @property() name = "test" }',
        errors: [{ messageId: 'noRedudantPropertyStringType' }],
      },
      {
        code: 'class TestComponent extends LitElement { @property({ type: String, reflect: true }) name = "test" }',
        output:
          'class TestComponent extends LitElement { @property({ reflect: true }) name = "test" }',
        errors: [{ messageId: 'noRedudantPropertyStringType' }],
      },
      {
        code: 'class TestComponent extends LitElement { @property({ attribute: "some-name", type: String, reflect: true }) name = "test" }',
        output:
          'class TestComponent extends LitElement { @property({ attribute: "some-name", reflect: true }) name = "test" }',
        errors: [{ messageId: 'noRedudantPropertyStringType' }],
      },
    ],
  },
);
