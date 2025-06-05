import { css } from 'lit';
import skeleton from './styles/skeleton.js';

export default [
  css`
    ${skeleton('.loading-feedback')}
  `,
  css`
    :host {
      display: inline-block;
      inline-size: 100%;
    }

    .component {
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
    }

    .default-slot {
      &.loading {
        display: none;
      }
    }
  `,
];
