import { css } from 'lit';
import skeleton from './styles/skeleton.js';

export default [
  css`
    ${skeleton('.loading-feedback')}
  `,
  css`
    .default-slot {
      &.loading {
        display: none;
      }
    }
  `,
];
