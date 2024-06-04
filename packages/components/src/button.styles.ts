import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    :host {
      /* Contains elements with "padding" and "width". Inline by default. */
      display: inline-block;
    }

    .component {
      align-items: center;
      border-color: transparent;
      border-radius: var(--cs-spacing-sm);
      border-style: solid;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--cs-heading-xxs-font-family);
      font-style: var(--cs-heading-xxs-font-style);
      font-weight: var(--cs-heading-xxs-font-weight);
      gap: 0.625rem;
      justify-content: center;
      padding-block: var(--cs-spacing-xs);
      padding-inline: var(--cs-spacing-md);
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

      &:disabled {
        cursor: default;
        opacity: 1;
      }

      &.primary {
        background-color: var(--cs-surface-primary);
        border-color: transparent;
        color: var(--cs-text-selected);

        &:disabled {
          background-color: var(--cs-surface-disabled);
          border-color: transparent;
          color: var(--cs-text-tertiary-disabled);
        }

        &:not(:disabled):active {
          background-color: var(--cs-surface-selected-hover);
          border-color: transparent;
          color: var(--cs-text-selected);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(--cs-surface-hover);
          border-color: transparent;
          box-shadow: var(--cs-glow-sm);
          color: var(--cs-text-primary);
        }
      }

      &.secondary {
        background-color: transparent;
        border-color: var(--cs-border-primary);
        color: var(--cs-text-primary);

        &:disabled {
          background-color: var(--cs-surface-disabled);
          border-color: transparent;
          color: var(--cs-text-tertiary-disabled);
        }

        &:not(:disabled):active {
          background-color: var(--cs-surface-selected-hover);
          border-color: transparent;
          color: var(--cs-text-selected);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(--cs-surface-hover);
          border-color: transparent;
          box-shadow: var(--cs-glow-sm);
          color: var(--cs-text-primary);
        }
      }

      &.tertiary {
        background-color: transparent;
        border-color: transparent;
        color: var(--cs-text-primary);

        &:disabled {
          color: var(--cs-text-tertiary-disabled);
        }

        &:not(:disabled):active {
          color: var(--cs-text-secondary);
        }

        &:not(:active):hover:not(:disabled) {
          color: var(--cs-text-primary-hover);
        }
      }

      &.large {
        block-size: 2.125rem;
        font-size: var(--cs-heading-xxs-font-size);
        line-height: 1.5rem;
        min-inline-size: 5.1875rem;
      }

      &.small {
        block-size: 1.75rem;
        font-size: var(--cs-body-xs-font-size);
        line-height: 1rem;
        min-inline-size: 4.375rem;
      }
    }
  `,
];
