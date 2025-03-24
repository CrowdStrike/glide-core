import { css } from 'lit';

export default [
  css`
    ::slotted(*) {
      --private-size: 1.125rem;

      block-size: 1.125rem;
      inline-size: 1.125rem;
    }
  `,
];
