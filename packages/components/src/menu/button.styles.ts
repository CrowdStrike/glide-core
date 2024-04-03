import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      background-color: transparent;
      border: none;
      border-radius: var(--cs-spacing-sm);
      display: flex;
      gap: var(--gap);
      font: inherit;
      padding-block: var(--padding-block);
      padding-inline: var(--padding-inline);
      user-select: none;
      width: 100%;

      &.component--active {
        background-color: var(--cs-surface-hover);
      }
    }
  `,
];
