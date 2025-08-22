import { consistentReferenceElementDeclarations } from './rules/consistent-reference-element-declarations.js';
import { consistentTestFixtureVariableDeclarator } from './rules/consistent-test-fixture-variable-declarator.js';
import { noNestedTemplateLiterals } from './rules/no-nested-template-literals.js';
import { noRedudantPropertyAttribute } from './rules/no-redundant-property-attribute.js';
import { noRedudantPropertyStringType } from './rules/no-redundant-property-string-type.js';
import { conditionallyOpenShadowRoots } from './rules/conditionally-open-shadow-roots.js';
import { publicMemberReturnType } from './rules/public-member-return-type.js';
import { publicGetterDefaultComment } from './rules/public-getter-default-comment.js';
import { eventDispatchFromThis } from './rules/event-dispatch-from-this.js';
import { stringEventName } from './rules/string-event-name.js';
import { slotTypeComment } from './rules/slot-type-comment.js';
import { publicPropertyExpressionType } from './rules/public-property-expression-type.js';
import { useDefaultWithPropertyDecorator } from './rules/use-default-with-property-decorator.js';
import { privateStateDecorators } from './rules/private-state-decorators.js';
import { noProtectedKeyword } from './rules/no-protected-keyword.js';
import { useFinalDecorator } from './rules/use-final-decorator.js';
import { commentMaximumLength } from './rules/comment-maximum-length.js';
import { alwaysTagTests } from './rules/always-tag-tests.js';
import { noTestFail } from './rules/no-test-fail.js';
import { noTestFixme } from './rules/no-test-fixme.js';
import { noToContainClass } from './rules/no-to-contain-class.js';
import { noToHaveClass } from './rules/no-to-have-class.js';
import { oneTagPerTest } from './rules/one-tag-per-test.js';
import { testTagMatchesSuite } from './rules/test-tag-matches-suite.js';
import { noTagsInTestNames } from './rules/no-tags-in-test-names.js';

export default {
  rules: {
    'consistent-reference-element-declarations':
      consistentReferenceElementDeclarations,
    'consistent-test-fixture-variable-declarator':
      consistentTestFixtureVariableDeclarator,
    'no-nested-template-literals': noNestedTemplateLiterals,
    'no-redundant-property-attribute': noRedudantPropertyAttribute,
    'no-redundant-property-string-type': noRedudantPropertyStringType,
    'conditionally-open-shadow-roots': conditionallyOpenShadowRoots,
    'public-member-return-type': publicMemberReturnType,
    'public-getter-default-comment': publicGetterDefaultComment,
    'event-dispatch-from-this': eventDispatchFromThis,
    'string-event-name': stringEventName,
    'slot-type-comment': slotTypeComment,
    'public-property-expression-type': publicPropertyExpressionType,
    'use-default-with-property-decorator': useDefaultWithPropertyDecorator,
    'private-state-decorators': privateStateDecorators,
    'no-protected-keyword': noProtectedKeyword,
    'use-final-decorator': useFinalDecorator,
    'comment-maximum-length': commentMaximumLength,
    'always-tag-tests': alwaysTagTests,
    'no-test-fail': noTestFail,
    'no-test-fixme': noTestFixme,
    'no-to-contain-class': noToContainClass,
    'no-to-have-class': noToHaveClass,
    'one-tag-per-test': oneTagPerTest,
    'test-tag-matches-suite': testTagMatchesSuite,
    'no-tags-in-test-names': noTagsInTestNames,
  },
};
