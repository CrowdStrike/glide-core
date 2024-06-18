import { css } from 'lit';

export default [
  css`
    .component {
      display: flex;
      flex-direction: column;
      gap: var(--glide-core-spacing-md);
      inline-size: 24.25rem;
      inset-block-start: 0;
      inset-inline-end: 0;
      max-block-size: 100%;
      max-inline-size: 100%;
      overflow: hidden;
      padding: var(--glide-core-spacing-sm);
      position: fixed;
    }
  `,
];
