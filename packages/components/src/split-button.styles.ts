import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

// These styles are shared between `glide-core-split-button` and `glide-core-split-link`.
export default [
  css`
    .component {
      align-items: center;
      border-color: transparent;
      border-radius: 0.75rem 0 0 0.75rem;
      border-style: solid;
      border-width: 1px 0 1px 1px;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--glide-core-heading-xxs-font-family);
      font-style: var(--glide-core-heading-xxs-font-style);
      font-weight: var(--glide-core-heading-xxs-font-weight);
      gap: 0.625rem;
      justify-content: center;
      padding-block: var(--glide-core-spacing-xs);
      padding-inline: var(--glide-core-spacing-md);
      padding-inline-end: var(--glide-core-spacing-xs);
      text-decoration: none;
      transition-duration: 150ms;
      transition-property: color, background-color, border-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
      }

      &.disabled {
        cursor: default;
        opacity: 1;
        pointer-events: none;
      }

      &.primary {
        background-color: var(--glide-core-surface-primary);
        border-color: transparent;
        color: var(--glide-core-text-selected);

        /* Since the "disabled" styles are shared between a link and a button, we use a disabled class and not a pseudo-class */
        &.disabled {
          background-color: var(--glide-core-surface-disabled);
          border-color: transparent;
          color: var(--glide-core-text-tertiary-disabled);
        }

        &:not(.disabled):active {
          background-color: var(--glide-core-surface-selected-hover);
          border-color: transparent;
          color: var(--glide-core-text-selected);
        }

        &:not(:active):hover:not(.disabled) {
          background-color: var(--glide-core-surface-hover);
          border-color: transparent;
          box-shadow: var(--glide-core-glow-sm);
          color: var(--glide-core-text-primary);
        }
      }

      &.secondary {
        background-color: transparent;
        border-color: var(--glide-core-border-primary);
        color: var(--glide-core-text-primary);

        &.disabled {
          background-color: var(--glide-core-surface-disabled);
          border-color: transparent;
          color: var(--glide-core-text-tertiary-disabled);
        }

        &:not(.disabled):active {
          background-color: var(--glide-core-surface-selected-hover);
          border-color: transparent;
          color: var(--glide-core-text-selected);
        }

        &:not(:active):hover:not(.disabled) {
          background-color: var(--glide-core-surface-hover);
          border-color: transparent;
          box-shadow: var(--glide-core-glow-sm);
          color: var(--glide-core-text-primary);
        }
      }

      &.small {
        block-size: 1.75rem;
        box-sizing: border-box;
        font-size: var(--glide-core-body-xs-font-size);
        line-height: 1rem;
      }

      &.large {
        block-size: 2.125rem;
        box-sizing: border-box;
        font-size: var(--glide-core-body-xxs-font-size);
        line-height: 1.5rem;
      }
    }
  `,
];
