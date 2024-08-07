import { css } from 'lit';

export default [
  css`
    ::slotted(*) {
      --size: 1.25rem;

      block-size: 1.25rem;
      inline-size: 1.25rem;
    }
  `,
];
