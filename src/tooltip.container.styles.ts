import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      background-color: var(
        --glide-core-private-color-tooltip-surface-container
      );
      border-radius: var(--glide-core-spacing-base-xs);
      display: flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      inline-size: max-content;
      inset-block-start: 50%;
      padding: var(--glide-core-spacing-base-xs)
        var(--glide-core-spacing-base-sm);

      &.reversed {
        flex-direction: row-reverse;
      }
    }

    .label {
      color: var(--glide-core-color-static-text-onsolid);
      display: block;
      hyphens: auto;
      max-inline-size: 11.25rem;
      min-inline-size: 1.875rem;
      overflow-wrap: anywhere;
    }

    .shortcut {
      color: var(--glide-core-private-color-tooltip-text-shortcut);
      display: none;
      white-space: nowrap;

      &.visible {
        display: inline-block;
      }

      &.reversed {
        margin-inline-end: var(--glide-core-spacing-base-xs);
      }

      &:not(.reversed) {
        margin-inline-start: var(--glide-core-spacing-base-xs);
      }
    }

    kbd {
      font-family: var(--glide-core-typography-family-primary);
    }
  `,
];
