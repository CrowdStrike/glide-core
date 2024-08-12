import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    :host(:focus-visible) {
      outline: none;
    }

    /* stylelint-disable-next-line csstools/use-nesting */
    :host(:focus-visible) .component {
      ${focusOutline};
    }

    .component {
      font-family: var(--glide-core-font-sans);
      outline: none;

      &:focus {
        outline: none;
      }
    }

    .hidden {
      ${visuallyHidden};
    }
  `,
];
