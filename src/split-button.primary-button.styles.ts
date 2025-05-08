import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

// These styles are shared between Split Button Primary Button and Split Button Primary Link.
export default [
  css`
    ${focusOutline('.component:focus-visible')}
  `,
  css`
    .component {
      align-items: center;
      block-size: 2.125rem;
      border-radius: var(--glide-core-rounding-base-radius-md) 0 0
        var(--glide-core-rounding-base-radius-md);
      border-style: solid;
      border-width: 1px 0 1px 1px;
      box-sizing: border-box;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-large);
      font-weight: var(--glide-core-typography-weight-bold);
      gap: 0.625rem;
      justify-content: center;
      line-height: 1.5rem;
      padding-block: var(--glide-core-spacing-base-xs);
      padding-inline: var(--glide-core-spacing-base-md);
      position: relative;
      text-decoration: none;
      transition-duration: 150ms;
      transition-property: color, background-color, border-color, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;

      /* So the box shadow and focus outline aren't covered up by the secondary button. */
      z-index: 1;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        /* Covers up the secondary button's border. */
        box-shadow: 0 0 0 2px
          var(--glide-core-color-interactive-surface-container) !important;
      }

      &.primary {
        background-color: var(
          --glide-core-color-interactive-surface-container-active
        );
        border-color: transparent;
        color: var(--glide-core-private-color-button-text-primary);
      }

      &.secondary {
        background-color: var(--glide-core-color-interactive-surface-container);
        border-color: var(--glide-core-private-color-button-stroke-default);
        color: var(--glide-core-color-interactive-text-link);

        &:not(.disabled) {
          /* So it has a right border when the secondary button is disabled. */
          box-shadow: 1px 0 0
            var(--glide-core-private-color-button-stroke-default);
        }

        &.disabled {
          border-color: var(
            --glide-core-color-interactive-stroke-primary--disabled
          );
        }
      }

      /*
        A "disabled" class is used instead of ":disabled" because these styles are
        shared between Split Button Primary Button and Split Button Primary Link.
      */
      &.disabled {
        background-color: var(
          --glide-core-color-interactive-surface-container--disabled
        );
        border-color: transparent;
        color: var(--glide-core-color-interactive-text-link--disabled);
        cursor: not-allowed;
      }

      &:not(:active, .disabled):is(:focus, :hover) {
        background-color: var(
          --glide-core-color-interactive-surface-container--hover
        );
        border-color: transparent;
        color: var(--glide-core-color-interactive-text-link);
      }

      &:not(:active, .disabled):is(:hover) {
        box-shadow: var(--glide-core-effect-hovered);
        z-index: 1;
      }

      &:not(.disabled):active {
        background-color: var(
          --glide-core-color-interactive-surface-container-active
        );
        color: var(--glide-core-private-color-button-text-primary);
      }
    }
  `,
];
