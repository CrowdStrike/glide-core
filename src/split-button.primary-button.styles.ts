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
      border-radius: 0.75rem 0 0 0.75rem;
      border-style: solid;
      border-width: 1px 0 1px 1px;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--glide-core-typography-family-primary);
      font-style: var(--glide-core-heading-xxs-font-style);
      font-weight: var(--glide-core-typography-weight-bold);
      gap: 0.625rem;
      justify-content: center;
      padding-block: var(--glide-core-spacing-base-xs);
      padding-inline: var(--glide-core-spacing-base-md);
      padding-inline-end: var(--glide-core-spacing-base-xs);
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
          var(--glide-core-color-interactive-surface-container-active) !important;
      }

      &.primary {
        background-color: var(
          --glide-core-color-interactive-surface-container-active
        );
        border-color: transparent;
        color: var(--glide-core-color-interactive-text-onsolid);
      }

      &.secondary {
        background-color: var(
          --glide-core-color-interactive-surface-container-active
        );
        border-color: var(--glide-core-private-color-button-stroke-default);
        color: var(--glide-core-color-interactive-text-link);

        &:not(.disabled) {
          /* So it has a right border when the secondary button is disabled. */
          box-shadow: 1px 0 0
            var(--glide-core-private-color-button-stroke-default);
        }
      }

      &.small {
        block-size: 1.75rem;
        box-sizing: border-box;
        font-size: var(--glide-core-typography-size-body-small);
        line-height: 1rem;
      }

      &.large {
        block-size: 2.125rem;
        box-sizing: border-box;
        font-size: var(--glide-core-body-xxs-font-size);
        line-height: 1.5rem;
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
        color: var(--glide-core-color-interactive-text-default--disabled);
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
        box-shadow: var(--glide-core-glow-sm);
        z-index: 1;
      }

      &:not(.disabled):active {
        background-color: var(
          --glide-core-color-interactive-surface-container-active--hover
        );
        color: var(--glide-core-color-interactive-text-onsolid);
      }
    }
  `,
];
