import { css } from 'lit';

export default [
  css`
    li {
      --li-gap: 0.625rem;
      /* 
      we don't want a gap between the outer ul border with radius 0.75rem, so
      use one less pixel, or 0.6875rem
    */
      --li-border-radius: 0.6875rem;
      --li-border-width: 1px;
      --li-font-size: 1rem;

      align-items: center;

      appearance: none;
      appearance: none;
      appearance: none;

      border: none;
      border-inline-end: 1px solid var(--cs-border-base-lighter);

      cursor: pointer;
      display: flex;
      font-family: var(--cs-heading-xxs-font-family);
      font-size: var(--li-font-size);
      font-style: var(--cs-heading-xxs-font-style);
      font-weight: var(--cs-heading-xxs-font-weight);
      gap: var(--li-gap);
      justify-content: center;
      line-height: 1;

      outline: none;
      padding-block: var(--cs-spacing-xs);
      padding-inline: var(--cs-spacing-md);

      transition-duration: 150ms;
      transition-property: color, background-color, border-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;

      &.icon-only {
        padding: var(--cs-spacing-xs);
      }

      &.first {
        border-radius: var(--li-border-radius) 0 0 var(--li-border-radius);
      }

      &.last {
        border-radius: 0 var(--li-border-radius) var(--li-border-radius) 0;
      }

      &.vertical {
        border: none;
        border-block-end: 1px solid var(--cs-border-base-lighter);
        &.first {
          border-radius: var(--li-border-radius) var(--li-border-radius) 0 0;
        }
        &.last {
          border-radius: 0 0 var(--li-border-radius) var(--li-border-radius);
        }
      }

      &:not(.disabled).checked {
        background-color: var(--cs-surface-selected);
        border-color: var(--cs-surface-selected);
        color: var(--cs-color-white);
      }

      &:not(.disabled):active,
      &:not(.disabled):focus-visible {
        background-color: var(--cs-surface-selected);
        border-color: var(--cs-surface-selected);
        color: var(--cs-color-white);
      }

      &:not(.disabled, :active):hover {
        background-color: var(--cs-surface-hover);
        border-color: transparent;
        box-shadow: var(--cs-glow-sm);
        color: var(--cs-text-primary);
      }

      &.disabled {
        background-color: var(--cs-border-base-lighter);
        border-color: var(--cs-border-base-lighter);
        color: var(--cs-text-tertiary-disabled);
      }
    }
  `,
];
