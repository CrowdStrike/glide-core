import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      background-color: transparent;
      border: none;
      border-radius: var(--cs-spacing-sm);
      display: flex;
      font: inherit;
      gap: var(--gap);
      inline-size: 100%;
      padding-block: var(--padding-block);
      padding-inline: var(--padding-inline);
      user-select: none;

      &.component-active {
        background-color: var(--cs-surface-hover);
      }
    }
  `,
];
