import { css } from 'lit';

export default [
  css`
    .component {
      background-color: var(
        --glide-core-private-color-tooltip-surface-container
      );
      border-radius: var(--glide-core-spacing-base-xs);
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      inline-size: max-content;
      inset-block-start: 50%;
      padding: var(--glide-core-spacing-base-xxs)
        var(--glide-core-spacing-base-xs);
    }

    .label-and-shortcut {
      display: flex;
    }

    .label {
      color: var(--glide-core-color-static-text-onsolid);
      hyphens: auto;
      max-inline-size: 11.25rem;
      min-inline-size: 1.875rem;
      overflow-wrap: anywhere;
    }

    .description {
      color: var(--glide-core-color-static-text-onsolid);
      hyphens: auto;
      margin-block-start: var(--glide-core-spacing-base-xs);
      max-inline-size: 11.25rem;
      min-inline-size: 1.875rem;
      overflow-wrap: anywhere;
    }

    .shortcut {
      color: var(--glide-core-private-color-tooltip-text-shortcut);
      display: none;
      margin-inline-start: var(--glide-core-spacing-base-xs);
      white-space: nowrap;

      &.visible {
        display: inline-block;
      }
    }

    kbd {
      font-family: var(--glide-core-typography-family-primary);
    }
  `,
];
