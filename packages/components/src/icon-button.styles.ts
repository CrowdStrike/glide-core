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
      block-size: 1.625rem;
      border-color: transparent;
      border-radius: var(--cs-spacing-xs);
      border-style: solid;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      inline-size: 1.625rem;
      justify-content: center;
      padding-inline: 0;
      transition-duration: 150ms;
      transition-property: color, background-color, border-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
        outline-offset: 3px;
      }

      &:disabled {
        cursor: default;
        opacity: 1;
      }

      &.primary {
        background-color: var(--cs-surface-primary);
        border-color: transparent;
        color: var(--cs-icon-selected);

        &:disabled {
          background-color: var(--cs-surface-base-gray-light);
          border-color: transparent;
          color: var(--cs-icon-tertiary-disabled);
        }

        &:not(:disabled):active {
          background-color: var(--cs-surface-selected);
          border-color: transparent;
          color: var(--cs-icon-selected);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(--cs-surface-hover);
          border-color: transparent;
          box-shadow: var(--cs-glow-sm);
          color: var(--cs-icon-primary);
        }
      }

      &.secondary {
        background-color: var(--cs-surface-page);
        border-color: var(--cs-border-primary);
        color: var(--cs-icon-primary);

        &:disabled {
          background-color: transparent;
          border-color: var(--cs-border-base-light);
          color: var(--cs-icon-tertiary-disabled);
        }

        &:not(:disabled):active {
          background-color: var(--cs-surface-selected);
          border-color: transparent;
          color: var(--cs-icon-selected);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(--cs-surface-hover);
          border-color: transparent;
          box-shadow: var(--cs-glow-sm);
          color: var(--cs-icon-primary);
        }
      }

      &.tertiary {
        background-color: transparent;
        border-color: transparent;
        color: var(--cs-icon-default);

        &:disabled {
          color: var(--cs-icon-tertiary-disabled);
        }

        &:not(:disabled):active {
          color: var(--cs-icon-active);
        }

        &:not(:active):hover:not(:disabled) {
          color: var(--cs-icon-primary-hover);
        }
      }
    }
  `,
];
