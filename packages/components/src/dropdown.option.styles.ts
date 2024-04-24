import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      border-radius: var(--cs-spacing-sm);
      display: flex;
      gap: var(--gap);
      padding-block: var(--padding-block);
      padding-inline: var(--padding-inline);
      user-select: none;

      &.active {
        background-color: var(--cs-surface-hover);
      }
    }

    .checked-icon {
      display: inline-flex;
      justify-content: center;
      opacity: 0;

      &.visible {
        opacity: 1;
      }
    }
  `,
];
