import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.component:focus-visible')}
  `,
  css`
    :host {
      /* Contains elements with "padding" and "width". Inline by default. */
      display: inline-flex;
    }

    .component {
      align-items: center;
      block-size: var(--private-size, 1.625rem);
      border-color: transparent;
      border-radius: var(--glide-core-rounding-base-radius-sm);
      border-style: solid;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      inline-size: var(--private-size, 1.625rem);
      justify-content: center;
      padding-inline: 0;
      transition-duration: 150ms;
      transition-property: color, background-color, border-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

      &:focus {
        outline: none;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 1;
      }

      &.primary {
        background-color: var(
          --glide-core-color-interactive-surface-container-active
        );
        border-color: transparent;
        color: var(
          --private-icon-color,
          var(--glide-core-color-interactive-icon-onsolid)
        );

        &:disabled {
          background-color: var(
            --glide-core-color-static-surface-container-secondary
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-icon-default--disabled);
        }

        &:not(:disabled):active {
          background-color: var(
            --glide-core-private-color-button-surface-active
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-icon-default--active);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          border-color: transparent;
          box-shadow: var(--glide-core-glow-sm);
          color: var(--glide-core-color-interactive-icon-link);
        }
      }

      &.secondary {
        background-color: transparent;
        border-color: var(--glide-core-private-color-button-stroke-default);
        color: var(
          --private-icon-color,
          var(--glide-core-color-interactive-icon-default)
        );

        &:disabled {
          background-color: var(--glide-core-color-static-surface-container);
          border-color: transparent;
          color: var(--glide-core-color-interactive-icon-default--disabled);
        }

        &:not(:disabled):active {
          background-color: var(
            --glide-core-private-color-button-surface-active
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-icon-default--active);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-icon-link);
        }
      }

      &.tertiary {
        background-color: transparent;
        block-size: var(--private-size, 1rem);
        border-color: transparent;
        color: var(
          --private-icon-color,
          var(--glide-core-color-interactive-icon-default)
        );
        inline-size: var(--private-size, 1rem);
        padding: 0;

        &:focus-visible {
          border-radius: 0.0625rem;
        }

        &:disabled {
          color: var(--glide-core-color-interactive-icon-default--disabled);
        }

        &:not(:disabled):active {
          color: var(--glide-core-color-interactive-icon-active);
        }

        &:not(:active):hover:not(:disabled) {
          color: var(
            --private-hovered-icon-color,
            var(--glide-core-color-interactive-icon-active--hover)
          );
        }
      }
    }
  `,
];
