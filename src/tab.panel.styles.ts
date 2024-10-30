import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${focusOutline(':host(:focus-visible) .component')}
    ${visuallyHidden('.hidden')}
  `,
  css`
    :host(:focus-visible) {
      outline: none;
    }

    .component {
      font-family: var(--glide-core-font-sans);
      outline: none;
      padding-inline: var(--padding-inline);
    }
  `,
];
