/** @type {import('stylelint').Config} */
export default {
  customSyntax: 'postcss-lit',
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: [
    'stylelint-use-nesting',
    'stylelint-use-logical',
    'stylelint-order',
  ],
  rules: {
    // https://github.com/w3c/csswg-drafts/issues/9496
    'csstools/use-nesting': ['always', { except: [/^:host/] }],
    'csstools/use-logical': 'always',
    // We prefer using the longhand properties rather than
    // shorthand as they're more explicit.
    'declaration-block-no-redundant-longhand-properties': null,
    'no-descending-specificity': null,
    'order/properties-alphabetical-order': true,
    'prettier/prettier': true,
  },
};
