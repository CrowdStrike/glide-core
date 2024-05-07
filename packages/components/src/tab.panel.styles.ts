import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .component {
      font-family: var(--cs-font-sans);
    }

    .hidden {
      ${visuallyHidden};
    }
  `,
];
