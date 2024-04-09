import { css } from 'lit';

export default [
  css`
    li {
      --li-gap: 0.625rem;
      --li-border-radius: 0.75rem;

      align-items: center;

      appearance: none;
      appearance: none;
      appearance: none;
      border: 1px solid var(--cs-border-base-light);
      border-inline-start: 1px solid transparent;
      cursor: pointer;
      display: flex;
      font-family: var(--cs-heading-xxs-font-family);
      font-style: var(--cs-heading-xxs-font-style);
      font-weight: var(--cs-heading-xxs-font-weight);
      gap: var(--li-gap);
      justify-content: center;

      outline: none;
      padding-block: var(--cs-spacing-xs);
      padding-inline: var(--cs-spacing-md);
      user-select: none;

      &.first {
        border-inline-end: 1px solid var(--cs-border-base-light);
        border-inline-start: 1px solid var(--cs-border-base-light);
        border-radius: var(--li-border-radius) 0 0 var(--li-border-radius);
      }

      &.last {
        border-inline-end: 1px solid var(--cs-border-base-light);
        border-radius: 0 var(--li-border-radius) var(--li-border-radius) 0;
      }

      &:not(.disabled).checked {
        background-color: var(--cs-surface-selected);
        color: var(--cs-color-white);
      }

      &:not(.disabled):active,
      &:not(.disabled):focus-visible {
        background-color: var(--cs-surface-selected);
        color: var(--cs-color-white);
      }

      &:not(.disabled, :active):hover {
        background-color: var(--cs-surface-hover);
        border-color: transparent;
        box-shadow: var(--cs-glow-sm);
        color: var(--cs-text-primary);
      }

      &.vertical {
        border: 1px solid var(--cs-border-base-light);
        border-block-start: 1px solid transparent;
        &.first {
          border-block-end: 1px solid var(--cs-border-base-light);
          border-block-start: 1px solid var(--cs-border-base-light);
          border-radius: var(--li-border-radius) var(--li-border-radius) 0 0;
        }
        &.last {
          border-block-end: 1px solid var(--cs-border-base-light);
          border-radius: 0 0 var(--li-border-radius) var(--li-border-radius);
        }
      }

      &.disabled {
        background-color: var(--cs-border-base-light);
        border: 1px solid var(--cs-border-base-light);
        border-color: var(--cs-border-base-light);
        color: var(--cs-text-tertiary-disabled);
      }
    }
  `,
];
