import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .component {
      display: flex;

      & .vertical {
        display: flex;
        flex-direction: column;
      }

      .label {
        display: inline-block;
      }

      legend {
        ${visuallyHidden};
      }
    }
  `,
];
