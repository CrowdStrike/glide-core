import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .radio-group {
      appearance: none;
      border: 1px solid var(--cs-border-base);
      border-radius: 0.75rem;
      display: inline-flex;
      margin: 0;
      padding: 0;

      &.vertical {
        flex-direction: column;
      }
    }

    .label {
      ${visuallyHidden};
    }
  `,
];
