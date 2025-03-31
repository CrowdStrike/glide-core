/** @type {import('stylelint').Config} */
export default {
  customSyntax: 'postcss-lit',
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: [
    'stylelint-use-nesting',
    'stylelint-use-logical',
    'stylelint-order',
    './dist/stylelint/plugin',
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
    'glide-core/no-unprefixed-private-custom-property': true,
    // Most of our CSS custom properties follow this format:
    //
    // --glide-core-{collection}-{category*}-{scope*}-{property}-{variant*}--{state*}
    //   * = optional
    //
    // `--state` is not supported by default with this
    // rule, so we have to extend it. The regex applies to
    // the input after the initial `--`.
    //
    // We can't add `glide-core` to this regex, because
    // it's not always applicable. In cases where we're
    // using component-scoped private custom properties,
    // they do not contain the `--glide-core-` prefix.
    'custom-property-pattern': '^[a-z]+(-[a-z0-9]+)*(-{1,2}[a-z0-9]+)*$',
  },
};
