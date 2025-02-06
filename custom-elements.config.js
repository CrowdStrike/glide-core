// The analyzer expects JavaScript files. But writing each plugin in JavaScript
// was unruly and error prone. So they're written in TypeScript, then compiled
// and imported as JavaScript.
import addCustomProperties from './dist/cem-analyzer-plugins/add-custom-properties.js';
import addEvents from './dist/cem-analyzer-plugins/add-events.js';
import addRequired from './dist/cem-analyzer-plugins/add-required.js';
import addSlots from './dist/cem-analyzer-plugins/add-slots.js';
import modifyVersionAttribute from './dist/cem-analyzer-plugins/modify-version-attribute.js';
import removeBlockComments from './dist/cem-analyzer-plugins/remove-block-comments.js';

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
  ],
  globs: ['./src/*.ts'],
  litelement: true,
  plugins: [
    removeBlockComments(),
    addCustomProperties(),
    addEvents(),
    addRequired(),
    addSlots(),
    modifyVersionAttribute(),
  ],
};
