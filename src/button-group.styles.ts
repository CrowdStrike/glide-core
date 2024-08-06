import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .component {
      border: 1px solid var(--glide-core-border-base);
      border-radius: 0.75rem;
      display: inline-block;
    }

    .label {
      ${visuallyHidden};
    }

    .container {
      appearance: none;
      display: inline-flex;
      margin: 0;
      padding: 0;

      &.vertical {
        flex-direction: column;
      }
    }
  `,
];
