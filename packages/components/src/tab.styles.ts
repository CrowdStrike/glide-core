import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--glide-core-heading-xxs-font-family);
      font-size: var(--glide-core-heading-xxxs-font-size);
      font-style: var(--glide-core-heading-xxs-font-style);
      gap: 0.4375rem;
      justify-content: center;
      line-height: 1.1875rem;
      padding-block: var(--glide-core-spacing-xs);
      padding-inline: var(--glide-core-spacing-md);
    }

    /* Primary */

    .primary {
      border: 1px solid transparent;
      border-block-end-width: 0;
      border-end-end-radius: 0;
      border-end-start-radius: 0;
      border-start-end-radius: var(--glide-core-spacing-sm);
      border-start-start-radius: var(--glide-core-spacing-sm);
      font-weight: var(--glide-core-heading-xxs-font-weight);

      &.active,
      &.tab:hover:not(.disabled) {
        background-color: var(--glide-core-surface-base);
        border: 1px solid var(--glide-core-border-primary);

        /* hide the outer tab-group bottom border */
        border-block-end: 1px solid var(--glide-core-surface-base);
        margin-block-end: -1px;
      }
    }

    .tab:hover {
      color: var(--glide-core-text-primary);
    }

    .disabled {
      border: none;
      color: var(--glide-core-text-tertiary-disabled);
      pointer-events: none;
    }

    /* Secondary */

    .secondary {
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      font-weight: var(--glide-core-body-sm-font-weight);

      &.active {
        border-block-end: 2px solid var(--glide-core-border-focus);
      }
    }

    /* Vertical */

    .vertical {
      flex-direction: column;
      font-weight: var(--glide-core-body-sm-font-weight);
      padding-inline: var(--glide-core-spacing-xxs);

      & .default-slot {
        transform: rotate(180deg);
        writing-mode: vertical-lr;
      }

      &.active {
        border-inline-start: 2px solid var(--glide-core-border-focus);
      }

      &.active,
      &.disabled,
      &.tab-wrapper:hover {
        background-color: var(--glide-core-surface-base);
      }
    }
  `,
];
