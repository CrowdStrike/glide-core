export default {
  '*.ts': 'lit-analyzer',
  '*.{js,ts}': 'eslint',
  '*.styles.ts': 'stylelint --custom-syntax postcss-lit',
  '*': 'prettier --ignore-unknown',
};
