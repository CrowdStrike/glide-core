import stylelint from 'stylelint';
import noUnprefixedPrivateCustomPropertyName from './rules/no-unprefixed-private-custom-property.js';

export default [
  stylelint.createPlugin(
    noUnprefixedPrivateCustomPropertyName.ruleName,
    noUnprefixedPrivateCustomPropertyName,
  ),
];
