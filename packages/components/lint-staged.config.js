export default {
  '*.ts': 'lit-analyzer',
  '*.{js,ts}': 'eslint --fix',
  '*': 'prettier --ignore-unknown --write',
};
