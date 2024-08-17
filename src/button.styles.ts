import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.component:focus-visible')}
  `,
  css`
    :host {
      /* Contains elements with "padding" and "width". Inline by default. */
      display: inline-block;
    }

    .component {
      align-items: center;
      border-color: transparent;
      border-radius: 0.75rem;
      border-style: solid;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--glide-core-heading-xxs-font-family);
      font-style: var(--glide-core-heading-xxs-font-style);
      font-weight: var(--glide-core-heading-xxs-font-weight);
      gap: 0.625rem;
      justify-content: center;
      padding-block: var(--glide-core-spacing-xs);
      padding-inline: var(--glide-core-spacing-md);
      transition-duration: 150ms;
      transition-property: color, background-color, border-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;

      &:focus {
        outline: none;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 1;
      }

      /* We remove spacing using negative margin when an icon is present to help with empty space balancing */
      &.has-prefix,
      ::slotted([slot='prefix']) {
        margin-inline-start: -0.125rem;
      }

      &.has-suffix,
      ::slotted([slot='suffix']) {
        margin-inline-end: -0.125rem;
      }

      &.primary {
        background-color: var(--glide-core-surface-primary);
        border-color: transparent;
        color: var(--glide-core-text-selected);

        &:disabled {
          background-color: var(--glide-core-surface-disabled);
          border-color: transparent;
          color: var(--glide-core-text-tertiary-disabled);
        }

        &:not(:disabled):active {
          background-color: var(--glide-core-surface-selected-hover);
          border-color: transparent;
          color: var(--glide-core-text-selected);
        }

        &:not(:active):hover:not(:disabled) {
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

        &:disabled {
          background-color: var(--glide-core-surface-disabled);
          border-color: transparent;
          color: var(--glide-core-text-tertiary-disabled);
        }

        &:not(:disabled):active {
          background-color: var(--glide-core-surface-selected-hover);
          border-color: transparent;
          color: var(--glide-core-text-selected);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(--glide-core-surface-hover);
          border-color: transparent;
          box-shadow: var(--glide-core-glow-sm);
          color: var(--glide-core-text-primary);
        }
      }

      &.tertiary {
        background-color: transparent;
        border-color: transparent;
        color: var(--glide-core-text-primary);

        &:disabled {
          color: var(--glide-core-text-tertiary-disabled);
        }

        &:not(:disabled):active {
          color: var(--glide-core-text-secondary);
        }

        &:not(:active):hover:not(:disabled) {
          color: var(--glide-core-text-primary-hover);
        }
      }

      &.large {
        block-size: 2.125rem;
        font-size: var(--glide-core-heading-xxs-font-size);
        line-height: 1.5rem;
        min-inline-size: 5.1875rem;
      }

      &.small {
        block-size: 1.75rem;
        font-size: var(--glide-core-body-xs-font-size);
        line-height: 1rem;
        min-inline-size: 4.375rem;
      }
    }
  `,
];
