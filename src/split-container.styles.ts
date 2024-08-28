import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.menu-button:focus-visible')}
  `,
  css`
    .component {
      display: inline-flex;
      position: relative;

      & .divider {
        inline-size: 1px;

        &.primary {
          background-color: var(--glide-core-border-base-light);
        }

        &.secondary {
          background-color: var(--glide-core-border-primary);
        }
      }

      &:not(.disabled):hover {
        & .divider {
          background-color: transparent;
        }
      }

      &.disabled,
      &.disabled:hover {
        cursor: not-allowed;

        & .divider {
          background-color: var(--glide-core-border-base-light);
        }
      }

      & .menu-button {
        align-items: center;
        border-color: transparent;
        border-radius: 0 0.75rem 0.75rem 0;
        border-style: solid;
        border-width: 1px 1px 1px 0;
        cursor: pointer;
        display: inline-flex;
        font-family: var(--glide-core-heading-xxs-font-family);
        font-style: var(--glide-core-heading-xxs-font-style);
        font-weight: var(--glide-core-heading-xxs-font-weight);
        gap: 0.625rem;
        justify-content: center;
        padding-block: var(--glide-core-spacing-xs);
        padding-inline: var(--glide-core-spacing-xs);
        text-decoration: none;
        transition-duration: 150ms;
        transition-property: color, background-color, border-color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;

        &:focus {
          outline: none;
        }

        &:disabled {
          cursor: default;
          opacity: 1;
          pointer-events: none;
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

        &.small {
          block-size: 1.75rem;
          box-sizing: border-box;
          font-size: var(--glide-core-body-xs-font-size);
          line-height: 1rem;
          min-inline-size: fit-content;
        }

        &.large {
          block-size: 2.125rem;
          box-sizing: border-box;
          font-size: var(--glide-core-body-xxs-font-size);
          line-height: 1.5rem;
        }
      }
    }
  `,
];
