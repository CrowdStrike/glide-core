import { consistentReferenceElementDeclarations } from './rules/consistent-reference-element-declarations.js';
import { consistentTestFixtureVariableDeclarator } from './rules/consistent-test-fixture-variable-declarator.js';
import { noNestedTemplateLiterals } from './rules/no-nested-template-literals.js';
import { noOnlyTests } from './rules/no-only-tests.js';
import { noRedudantPropertyAttribute } from './rules/no-redundant-property-attribute.js';
import { noRedudantPropertyStringType } from './rules/no-redundant-property-string-type.js';
import { noSkipTests } from './rules/no-skip-tests.js';
import { noSpacePress } from './rules/no-space-press.js';
import { noToHaveAttribute } from './rules/no-to-have-attribute.js';
import { preferClosedShadowRoot } from './rules/prefer-shadow-root-mode.js';
import { betterTestAssertions } from './rules/better-test-assertions.js';
import { publicMemberReturnType } from './rules/public-member-return-type.js';
import { publicGetterDefaultComment } from './rules/public-getter-default-comment.js';
import { eventDispatchFromThis } from './rules/event-dispatch-from-this.js';
import { stringEventName } from './rules/string-event-name.js';
import { slotTypeComment } from './rules/slot-type-comment.js';
import { publicPropertyExpressionType } from './rules/public-property-expression-type.js';
import { useDefaultWithPropertyDecorator } from './rules/use-default-with-property-decorator.js';
import { privateStateDecorators } from './rules/private-state-decorators.js';

export default {
  rules: {
    'consistent-reference-element-declarations':
      consistentReferenceElementDeclarations,
    'consistent-test-fixture-variable-declarator':
      consistentTestFixtureVariableDeclarator,
    'no-nested-template-literals': noNestedTemplateLiterals,
    'no-only-tests': noOnlyTests,
    'no-redundant-property-attribute': noRedudantPropertyAttribute,
    'no-redundant-property-string-type': noRedudantPropertyStringType,
    'no-skip-tests': noSkipTests,
    'no-space-press': noSpacePress,
    'no-to-have-attribute': noToHaveAttribute,
    'prefer-shadow-root-mode': preferClosedShadowRoot,
    'better-test-assertions': betterTestAssertions,
    'public-member-return-type': publicMemberReturnType,
    'public-getter-default-comment': publicGetterDefaultComment,
    'event-dispatch-from-this': eventDispatchFromThis,
    'string-event-name': stringEventName,
    'slot-type-comment': slotTypeComment,
    'public-property-expression-type': publicPropertyExpressionType,
    'use-default-with-property-decorator': useDefaultWithPropertyDecorator,
    'private-state-decorators': privateStateDecorators,
  },
};
