import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

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
