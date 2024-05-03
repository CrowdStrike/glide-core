import { css } from 'lit';

export default [
  css`
    .wrapper {
      display: flex;
      flex-direction: column;

      &.vertical {
        flex-direction: row;
      }
    }

    .tab-group {
      display: flex;

      &.primary {
        border-block-end: 1px solid var(--cs-border-primary);
      }

      &.secondary {
        border-block-end: 1px solid var(--cs-border-base-lighter);
      }

      &.vertical {
        border: 1px solid var(--cs-border-base-darker);
        flex-direction: column;
      }
    }
  `,
];
