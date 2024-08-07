import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .component {
      font-family: var(--glide-core-font-sans);
    }

    .hidden {
      ${visuallyHidden};
    }
  `,
];
