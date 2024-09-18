import { consistentReferenceElementDeclarations } from './rules/consistent-reference-element-declarations.js';
import { consistentTestFixtureVariableDeclarator } from './rules/consistent-test-fixture-variable-declarator.js';
import { noNestedTemplateLiterals } from './rules/no-nested-template-literals.js';
import { noOnlyTests } from './rules/no-only-tests.js';
import { noPrefixedEventName } from './rules/no-glide-core-prefixed-event-name.js';
import { noRedudantPropertyAttribute } from './rules/no-redundant-property-attribute.js';
import { noRedudantPropertyStringType } from './rules/no-redundant-property-string-type.js';
import { noSkipTests } from './rules/no-skip-tests.js';
import { noSpacePress } from './rules/no-space-press.js';
import { noToHaveAttribute } from './rules/no-to-have-attribute.js';
import { preferClosedShadowRoot } from './rules/prefer-closed-shadow-root.js';
import { prefixedClassDeclaration } from './rules/prefixed-lit-element-class-declaration.js';

const rules = {
  'consistent-reference-element-declarations':
    consistentReferenceElementDeclarations,
  'consistent-test-fixture-variable-declarator':
    consistentTestFixtureVariableDeclarator,
  'no-glide-core-prefixed-event-name': noPrefixedEventName,
  'no-nested-template-literals': noNestedTemplateLiterals,
  'no-only-tests': noOnlyTests,
  'no-redundant-property-attribute': noRedudantPropertyAttribute,
  'no-redundant-property-string-type': noRedudantPropertyStringType,
  'no-skip-tests': noSkipTests,
  'no-space-press': noSpacePress,
  'no-to-have-attribute': noToHaveAttribute,
  'prefer-closed-shadow-root': preferClosedShadowRoot,
  'prefixed-lit-element-class-declaration': prefixedClassDeclaration,
};

export default { rules };
