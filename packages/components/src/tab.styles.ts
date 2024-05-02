import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--cs-heading-xxs-font-family);
      font-size: var(--cs-heading-xxxs-font-size);
      font-style: var(--cs-heading-xxs-font-style);
      gap: 0.4375rem;
      justify-content: center;
      line-height: 1.1875rem;
      padding-block: var(--cs-spacing-xs);
      padding-inline: var(--cs-spacing-md);
    }

    /* Primary */

    .primary {
      border: 1px solid transparent;
      border-block-end-width: 0;
      border-end-end-radius: 0;
      border-end-start-radius: 0;
      border-start-end-radius: var(--cs-spacing-sm);
      border-start-start-radius: var(--cs-spacing-sm);
      font-weight: var(--cs-heading-xxs-font-weight);

      &.active,
      &.tab:hover:not(.disabled) {
        background-color: var(--cs-surface-base);
        border: 1px solid var(--cs-border-primary);

        /* hide the outer tab-group bottom border */
        border-block-end: 1px solid var(--cs-surface-base);
        margin-block-end: -1px;
      }
    }

    .tab:hover {
      color: var(--cs-text-primary);
    }

    .disabled {
      border: none;
      color: var(--cs-text-tertiary-disabled);
      pointer-events: none;
    }

    /* Secondary */

    .secondary {
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      font-weight: var(--cs-body-sm-font-weight);

      &.active {
        border-block-end: 2px solid var(--cs-border-focus);
      }
    }

    /* Vertical */

    .vertical {
      flex-direction: column;
      font-weight: var(--cs-body-sm-font-weight);
      padding-inline: var(--cs-spacing-xxs);

      & .default-slot {
        transform: rotate(180deg);
        writing-mode: vertical-lr;
      }

      &.active {
        border-inline-start: 2px solid var(--cs-border-focus);
      }

      &.active,
      &.disabled,
      &.tab-wrapper:hover {
        background-color: var(--cs-surface-base);
      }
    }
  `,
];
