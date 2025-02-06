import stylelint, { type PostcssResult } from 'stylelint';
import { Declaration, type Root } from 'postcss';

const ruleName = 'glide-core/no-unprefixed-private-custom-property';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected(selector) {
    return `Unprefixed custom property in \`${selector}\`. If the custom property is meant to be public, move it inside a \`:host\` selector. Otherwise, prefix it with "private".`;
  },
});

function rule(actualOptions: unknown) {
  return (root: Root, result: PostcssResult) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: actualOptions,
      possible: [true],
    });

    if (!validOptions) {
      return;
    }

    root.walkRules((rule) => {
      if (rule.selector.startsWith(':host')) {
        for (const node of rule.nodes) {
          if (
            node instanceof Declaration &&
            node.prop.startsWith('--') &&
            node.prop.startsWith('--private')
          ) {
            stylelint.utils.report({
              result,
              ruleName,
              message: messages.rejected(rule.selector),
              node,
              word: rule.selector,
            });
          }
        }
      }

      if (!rule.selector.startsWith(':host')) {
        for (const node of rule.nodes) {
          if (
            node instanceof Declaration &&
            node.prop.startsWith('--') &&
            !node.prop.startsWith('--private')
          ) {
            stylelint.utils.report({
              result,
              ruleName,
              message: messages.rejected(rule.selector),
              node,
              word: rule.selector,
            });
          }
        }
      }
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;

rule.meta = {
  url: `https://github.com/CrowdStrike/glide-core/blob/main/src/stylelint/rules/${ruleName}.ts`,
};

export default rule;
