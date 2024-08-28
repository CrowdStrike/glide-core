import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .component {
      ${visuallyHidden}
      inset-block-start: 0;
      inset-inline-end: 0;
      size: 0;
    }
  `,
];
