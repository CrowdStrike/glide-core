import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      background-color: transparent;
      border: none;
      border-radius: var(--glide-core-spacing-base-sm);
      display: flex;
      font: inherit;
      gap: var(--private-gap);
      inline-size: 100%;
      padding-block: var(--private-padding-block);
      padding-inline: var(--private-padding-inline);
      transition: background-color 100ms ease-in-out;
      user-select: none;

      &.active {
        background-color: var(--glide-core-color-interactive-surface-container--hover);
      }

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);
      }

      &:not(.disabled) {
        color: var(--glide-core-color-static-text-default);
        cursor: pointer;
      }
    }
  `,
];
