import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      background-color: transparent;
      border: none;
      border-radius: var(--glide-core-spacing-sm);
      cursor: pointer;
      display: flex;
      font: inherit;
      gap: var(--gap);
      inline-size: 100%;
      padding-block: var(--padding-block);
      padding-inline: var(--padding-inline);
      transition: background-color 100ms ease-in-out;
      user-select: none;

      &.active {
        background-color: var(--glide-core-surface-hover);
      }
    }
  `,
];
