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
    'no-descending-specificity': null,
    'order/properties-alphabetical-order': true,
    'prettier/prettier': true,
  },
};
