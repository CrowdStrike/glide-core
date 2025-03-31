import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      background-color: transparent;
      border: none;
      border-radius: var(--glide-core-spacing-base-sm);
      box-sizing: border-box;
      display: flex;
      font: inherit;
      gap: var(--private-gap);
      inline-size: 100%;
      padding-block: var(--private-padding-block);
      padding-inline: var(--private-padding-inline);
      text-decoration: none;
      transition: background-color 100ms ease-in-out;
      user-select: none;

      &.active {
        background-color: var(
          --glide-core-color-interactive-surface-container--hover
        );
      }

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);
        cursor: default;
      }

      &:not(.disabled) {
        color: var(--glide-core-color-static-text-default);
        cursor: pointer;
      }
    }
  `,
];
