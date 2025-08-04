import { RuleTester } from '@typescript-eslint/rule-tester';
import { test } from '@playwright/test';
import { noRedudantPropertyAttribute } from './no-redundant-property-attribute.js';

RuleTester.afterAll = test.afterAll;
RuleTester.describe = test.describe;
RuleTester.it = test;

const ruleTester = new RuleTester();

ruleTester.run('no-redundant-property-attribute', noRedudantPropertyAttribute, {
  valid: [
    {
      // We ignore classes that don't extend LitElement
      code: 'class TestComponent { @property({ attribute: "name" }) name = "test" }',
    },
    {
      code: 'class TestComponent extends LitElement { @property() name = "test" }',
    },
    {
      code: 'class TestComponent extends LitElement { @property({ reflect: true }) name = "test" }',
    },
    {
      code: 'class TestComponent extends LitElement { @property({ attribute: "name1" }) name2 = "test" }',
    },
  ],
  invalid: [
    {
      code: 'class TestComponent extends LitElement { @property({ attribute: "name" }) name = "test" }',
      output:
        'class TestComponent extends LitElement { @property() name = "test" }',
      errors: [{ messageId: 'noRedudantPropertyAttribute' }],
    },
    {
      code: 'class TestComponent extends LitElement { @property({ attribute: "name", reflect: true }) name = "test" }',
      output:
        'class TestComponent extends LitElement { @property({ reflect: true }) name = "test" }',
      errors: [{ messageId: 'noRedudantPropertyAttribute' }],
    },
    {
      code: 'class TestComponent extends LitElement { @property({ attribute: "name", reflect: true, type: Boolean }) name = "test" }',
      output:
        'class TestComponent extends LitElement { @property({ reflect: true, type: Boolean }) name = "test" }',
      errors: [{ messageId: 'noRedudantPropertyAttribute' }],
    },
  ],
});
