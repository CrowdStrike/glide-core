import { RuleTester } from '@typescript-eslint/rule-tester';
import { consistentReferenceElementDeclarations } from './consistent-reference-element-declarations.js';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run(
  'consistent-reference-element-declarations',
  consistentReferenceElementDeclarations,
  {
    valid: [
      {
        code: 'class TestComponent extends LitElement { #anElementRef = createRef<HTMLSlotElement>(); }',
      },
      {
        code: 'class TestComponent extends LitElement { #anElementRef = createRef(); }',
      },
      {
        code: 'class TestComponent extends LitElement { #aPrivateField = notUsingARef(); }',
      },
    ],
    invalid: [
      {
        code: 'class TestComponent extends LitElement { elementField = createRef<HTMLSlotElement>(); }',
        errors: [
          { messageId: 'preferPrivateField' },
          { messageId: 'addSuffix' },
        ],
      },
      {
        code: 'class TestComponent extends LitElement { prefixSlotElementRef = createRef<HTMLSlotElement>(); }',
        errors: [{ messageId: 'preferPrivateField' }],
      },
      {
        code: 'class TestComponent extends LitElement { prefixSlotElementRef = createRef(); }',
        errors: [{ messageId: 'preferPrivateField' }],
      },
      {
        code: 'class TestComponent extends LitElement { #prefixSlotElement = createRef<HTMLSlotElement>(); }',
        errors: [{ messageId: 'addSuffix' }],
      },
      {
        code: 'class TestComponent extends LitElement { #prefixSlot = createRef<HTMLSlotElement>(); }',
        errors: [{ messageId: 'addSuffix' }],
      },
      {
        code: 'class TestComponent extends LitElement { #prefixSlot = createRef(); }',
        errors: [{ messageId: 'addSuffix' }],
      },
    ],
  },
);
