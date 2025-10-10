// The analyzer expects plugins to be JavaScript. But writing plugins in
// JavaScript is unruly and error prone. So we write them in TypeScript,
// then compile and import them as JavaScript.
import addCustomProperties from './dist/cem-analyzer-plugins/add-custom-properties.js';
import addEvents from './dist/cem-analyzer-plugins/add-events.js';
import addRequiredToAttributes from './dist/cem-analyzer-plugins/add-required-to-attributes.js';
import addSlots from './dist/cem-analyzer-plugins/add-slots.js';
import removeBlockComments from './dist/cem-analyzer-plugins/remove-block-comments.js';
import removePrivateMembers from './dist/cem-analyzer-plugins/remove-private-members.js';

export default {
  exclude: [
    './src/**/*stories*',
    './src/**/*test*',
    './src/cem-analzyer-plugins/**',
    './src/eslint/**',
    './src/icons/**',
    './src/library/**',
    './src/stylelint/**',
    './src/styles/**',
    './src/translations/**',
    './src/ts-morph/**',

    // TODO: Remove after Dropdown is moved out.
    './src/dropdown*',
  ],
  globs: ['./src/*.ts'],
  litelement: true,
  plugins: [
    removeBlockComments(),
    removePrivateMembers(),
    addCustomProperties(),
    addEvents(),
    addRequiredToAttributes(),
    addSlots(),
  ],
};
