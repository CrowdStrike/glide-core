import { consistentReferenceElementDeclarations } from './rules/consistent-reference-element-declarations.js';
import { noNestedTemplateLiterals } from './rules/no-nested-template-literals.js';
import { noPrefixedEventName } from './rules/no-glide-core-prefixed-event-name.js';
import { noRedudantPropertyAttribute } from './rules/no-redundant-property-attribute.js';
import { noRedudantPropertyStringType } from './rules/no-redundant-property-string-type.js';
import { noSkipTests } from './rules/no-skip-tests.js';
import { preferClosedShadowRoot } from './rules/prefer-closed-shadow-root.js';
import { prefixedClassDeclaration } from './rules/prefixed-lit-element-class-declaration.js';

const rules = {
  'consistent-reference-element-declarations':
    consistentReferenceElementDeclarations,
  'no-glide-core-prefixed-event-name': noPrefixedEventName,
  'no-nested-template-literals': noNestedTemplateLiterals,
  'no-redundant-property-attribute': noRedudantPropertyAttribute,
  'no-redundant-property-string-type': noRedudantPropertyStringType,
  'prefer-closed-shadow-root': preferClosedShadowRoot,
  'prefixed-lit-element-class-declaration': prefixedClassDeclaration,
  'no-skip-tests': noSkipTests,
};

export default { rules };
