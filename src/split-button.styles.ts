import { css } from 'lit';
import focusOutline from '@/src/styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.menu-button:focus-visible')}
  `,
  css`
    .component {
      display: inline-flex;
    }
  `,
];
