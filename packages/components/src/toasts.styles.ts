import { css } from 'lit';

export default [
  css`
    .component {
      background-color: transparent;
      border: none;
      display: none;
      flex-direction: column-reverse;
      gap: var(--glide-core-spacing-md);
      inline-size: 24.25rem;
      inset-block-start: 0;
      inset-inline-end: 0;
      margin: 0 0 auto auto;
      max-block-size: 100%;
      max-inline-size: 100%;
      overflow: hidden;
      padding: var(--glide-core-spacing-sm);
      position: fixed;

      &:popover-open {
        display: flex;
      }
    }
  `,
];
