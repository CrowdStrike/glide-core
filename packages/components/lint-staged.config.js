export default {
  '*.ts': 'lit-analyzer',
  '*.{js,ts}': 'eslint --fix',
  '*.styles.ts': 'stylelint --custom-syntax postcss-lit --fix',
  '*': 'prettier --ignore-unknown --write',
};
