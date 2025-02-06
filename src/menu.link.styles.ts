import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      background-color: transparent;
      border: none;
      border-radius: var(--glide-core-spacing-sm);
      box-sizing: border-box;
      display: flex;
      font: inherit;
      gap: var(--private-gap);
      inline-size: 100%;
      padding-block: var(--padding-block);
      padding-inline: var(--padding-inline);
      text-decoration: none;
      transition: background-color 100ms ease-in-out;
      user-select: none;

      &.active {
        background-color: var(--glide-core-surface-hover);
      }

      &.disabled {
        color: var(--glide-core-icon-tertiary-disabled);
        cursor: default;
      }

      &:not(.disabled) {
        color: var(--glide-core-text-body-1);
        cursor: pointer;
      }
    }
  `,
];
