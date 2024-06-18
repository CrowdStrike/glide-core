import { css } from 'lit';

export default [
  css`
    .component {
      display: flex;
      flex-direction: column;

      &.vertical {
        flex-direction: row;
      }
    }

    .tab-group {
      display: flex;

      &.primary {
        border-block-end: 1px solid var(--glide-core-border-primary);
      }

      &.secondary {
        border-block-end: 1px solid var(--glide-core-border-base-lighter);
      }

      &.vertical {
        border: 1px solid var(--glide-core-border-base-darker);
        flex-direction: column;
      }
    }
  `,
];
