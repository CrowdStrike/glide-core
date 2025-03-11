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
      border-radius: var(--glide-core-rounding-base-radius-md);
      border-style: solid;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--glide-core-typography-family-primary);
      font-weight: var(--glide-core-typography-weight-bold);
      gap: 0.625rem;
      justify-content: center;
      padding-block: var(--glide-core-spacing-base-xs);
      padding-inline: var(--glide-core-spacing-base-md);
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

      &.prefix-icon {
        padding-inline-start: 0.875rem;
      }

      &.suffix-icon {
        padding-inline-end: 0.875rem;
      }

      &.primary {
        background-color: var(
          --glide-core-color-interactive-surface-container-active
        );
        border-color: transparent;
        color: var(--glide-core-private-color-button-text-primary);

        &:disabled {
          background-color: var(
            --glide-core-color-interactive-surface-container--disabled
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-text-link--disabled);
        }

        &:not(:disabled):active {
          background-color: var(
            --glide-core-private-color-button-surface-active
          );
          border-color: transparent;
          color: var(--glide-core-private-color-button-text-primary);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          border-color: transparent;
          box-shadow: var(--glide-core-effect-hovered);
          color: var(--glide-core-color-interactive-text-link);
        }
      }

      &.secondary {
        background-color: var(--glide-core-color-interactive-surface-container);
        border-color: var(--glide-core-private-color-button-stroke-default);
        color: var(--glide-core-color-interactive-text-link);

        &:disabled {
          background-color: var(
            --glide-core-color-interactive-surface-container--disabled
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-text-link--disabled);
        }

        &:not(:disabled):active {
          background-color: var(
            --glide-core-private-color-button-surface-active
          );
          border-color: transparent;
          color: var(--glide-core-private-color-button-text-primary);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          border-color: transparent;
          box-shadow: var(--glide-core-effect-hovered);
          color: var(--glide-core-color-interactive-text-link);
        }
      }

      &.tertiary {
        background-color: transparent;
        border-color: transparent;
        color: var(--glide-core-color-interactive-text-link);

        &:disabled {
          color: var(--glide-core-color-interactive-text-link--disabled);
        }

        &:not(:disabled):active {
          background-color: var(
            --glide-core-private-color-button-surface-active
          );
          color: var(--glide-core-private-color-button-text-primary);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          box-shadow: var(--glide-core-effect-hovered);
          color: var(--glide-core-color-interactive-text-link);
        }
      }

      &.large {
        block-size: 2.125rem;
        font-size: var(--glide-core-typography-size-component-button-lg);
        line-height: 1.5rem;
        min-inline-size: 5.1875rem;
      }

      &.small {
        block-size: 1.75rem;
        font-size: var(--glide-core-typography-size-body-small);
        line-height: 1rem;
        min-inline-size: 4.375rem;
      }
    }
  `,
];
