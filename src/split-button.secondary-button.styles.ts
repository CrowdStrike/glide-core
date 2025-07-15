import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.component:focus-visible')}
  `,
  css`
    .component {
      align-items: center;
      background-color: var(
        --glide-core-color-interactive-surface-container-active
      );
      block-size: 2.125rem;
      border-color: var(
        --glide-core-color-interactive-surface-container-active
      );
      border-inline-start-color: var(
        --glide-core-private-color-button-stroke-default
      );
      border-radius: 0 var(--glide-core-rounding-base-radius-sm)
        var(--glide-core-rounding-base-radius-sm) 0;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-body-xxs-font-size);
      font-weight: var(--glide-core-typography-weight-bold);
      gap: 0.625rem;
      justify-content: center;
      line-height: 1.5rem;
      padding-block: var(--glide-core-spacing-base-xs);
      padding-inline: var(--glide-core-spacing-base-xs);
      position: relative;
      text-decoration: none;
      transition-duration: 150ms;
      transition-property: color, background-color, border-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;

      &:disabled {
        background-color: var(
          --glide-core-color-interactive-surface-container--disabled
        );
        border-block-color: transparent;
        border-inline-end-color: transparent;
        border-inline-start-color: var(
          --glide-core-color-static-stroke-secondary
        );
        cursor: not-allowed;

        svg {
          color: var(--glide-core-color-interactive-icon-link--disabled);
        }
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        box-shadow: 0 0 0 1px
          var(--glide-core-color-interactive-surface-container);

        /* So the box shadow isn't covered up by its primary button. */
        z-index: 1;

        svg {
          color: var(--glide-core-color-interactive-icon-link);
        }
      }

      &.primary {
        color: var(--glide-core-color-interactive-text-onsolid);
      }

      &.secondary {
        background-color: var(--glide-core-color-interactive-surface-container);
        border: 1px solid var(--glide-core-private-color-button-stroke-default);
        color: var(--glide-core-color-interactive-text-link);

        svg {
          color: var(--glide-core-color-interactive-icon-active);
        }

        &.disabled {
          background-color: var(
            --glide-core-color-interactive-surface-container--disabled
          );
          border: 1px solid
            var(--glide-core-color-interactive-stroke-primary--disabled);

          svg {
            color: var(--glide-core-color-interactive-icon-link--disabled);
          }
        }
      }

      &:not(:disabled):is(:active, .active) {
        background-color: var(--glide-core-private-color-button-surface-active);
        border-color: transparent;
        color: var(--glide-core-private-color-button-text-primary);

        svg {
          color: var(--glide-core-icon-selected);
        }
      }

      &:not(:active, .active, :disabled):is(:focus, :hover) {
        background-color: var(
          --glide-core-color-interactive-surface-container--hover
        );
        border-color: transparent;
        color: var(--glide-core-color-interactive-icon-link);
      }

      &:not(:active, .active, :disabled):is(:hover) {
        box-shadow: var(--glide-core-effect-hovered);

        /* So the box shadow isn't covered up by its primary button. */
        z-index: 1;

        svg {
          color: var(--glide-core-color-interactive-icon-link);
        }
      }

      svg {
        color: var(--glide-core-private-color-button-icon-primary);
      }
    }
  `,
];
