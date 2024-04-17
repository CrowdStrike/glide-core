import { css } from 'lit';
import { visuallyHidden } from './styles.js';

export default [
  css`
    :host {
      font-family: var(--cs-font-sans);
    }

    .hidden {
      ${visuallyHidden};
    }
  `,
];
