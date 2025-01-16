import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      background-color: var(--glide-core-surface-base-dark);
      border-radius: var(--glide-core-spacing-xs);
      display: flex;
      font-family: var(--glide-core-body-md-font-family);
      font-size: var(--glide-core-body-sm-font-size);
      font-style: var(--glide-core-body-sm-font-style);
      font-weight: var(--glide-core-body-sm-font-weight);
      inline-size: max-content;
      inset-block-start: 50%;
      line-height: var(--glide-core-body-sm-line-height);
      padding: var(--glide-core-spacing-xs) var(--glide-core-spacing-sm);

      &.reversed {
        flex-direction: row-reverse;
      }
    }

    .label {
      color: var(--glide-core-text-selected-2);
      display: block;
      hyphens: auto;
      max-inline-size: 11.25rem;
      min-inline-size: 1.875rem;
      overflow-wrap: anywhere;
    }

    .shortcut {
      color: var(--glide-core-text-body-lighter);
      display: none;
      white-space: nowrap;

      &.visible {
        display: inline-block;
      }

      &.reversed {
        margin-inline-end: var(--glide-core-spacing-xs);
      }

      &:not(.reversed) {
        margin-inline-start: var(--glide-core-spacing-xs);
      }
    }

    kbd {
      font-family: var(--glide-core-body-md-font-family);
    }
  `,
];
