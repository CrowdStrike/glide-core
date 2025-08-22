import { css } from 'lit';
import focusOutline from '@/src/styles/focus-outline.js';
import visuallyHidden from '@/src/styles/visually-hidden.js';

export default [
  css`
    ${focusOutline('.component:focus-visible')}
    ${visuallyHidden('.label.visually-hidden')}
  `,
  css`
    /*
    Nesting within :host does not work as expected in Safari
    https://bugs.webkit.org/show_bug.cgi?id=275341#c1
    */
    :host(:first-of-type) .component.horizontal {
      /*
        Button Group Button's border radius needs to be slightly
        smaller than the parent's border radius, otherwise the
        Button won't appear to fill the Group when selected or
        hovered.
      */
      border-end-start-radius: calc(
        var(--glide-core-rounding-base-radius-sm) - 1px
      );
      border-start-start-radius: calc(
        var(--glide-core-rounding-base-radius-sm) - 1px
      );
    }

    :host(:first-of-type) .component.vertical {
      border-start-end-radius: calc(
        var(--glide-core-rounding-base-radius-sm) - 1px
      );
      border-start-start-radius: calc(
        var(--glide-core-rounding-base-radius-sm) - 1px
      );
    }

    :host(:last-of-type) .component.horizontal {
      border-end-end-radius: calc(
        var(--glide-core-rounding-base-radius-sm) - 1px
      );
      border-inline-end: none;
      border-start-end-radius: calc(
        var(--glide-core-rounding-base-radius-sm) - 1px
      );
    }

    :host(:last-of-type) .component.vertical {
      border-block-end: none;
      border-end-end-radius: calc(
        var(--glide-core-rounding-base-radius-sm) - 1px
      );
      border-end-start-radius: calc(
        var(--glide-core-rounding-base-radius-sm) - 1px
      );
    }

    .component {
      align-items: center;
      appearance: none;
      background-color: var(--glide-core-color-static-surface-container);
      color: var(--glide-core-color-static-text-default);
      cursor: pointer;
      display: flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-large);
      font-weight: var(--glide-core-typography-weight-bold);
      gap: var(--glide-core-spacing-base-xs);
      justify-content: center;
      line-height: 1;
      min-block-size: 1.125rem;
      min-inline-size: 2.75rem;
      padding-block: var(--glide-core-spacing-base-xs);
      padding-inline: var(--glide-core-spacing-base-md);
      transition-duration: var(--glide-core-duration-moderate-02);
      transition-property: color, background-color, fill, stroke;
      transition-timing-function: var(--glide-core-animation-swoop-in);
      user-select: none;
      white-space: nowrap;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        background-color: var(
          --glide-core-color-interactive-surface-container-active
        );
        border-color: var(--glide-core-color-interactive-stroke-focus);
        color: var(--glide-core-color-static-text-onsolid);
        outline-offset: 2px;

        /* Create a stacking context so the outline isn't obscured by other elements. */
        transform: translateX(0);
      }

      &.horizontal {
        border-inline-end: 1px solid
          var(--glide-core-color-static-stroke-primary);
      }

      &.vertical {
        border-block-end: 1px solid
          var(--glide-core-color-static-stroke-primary);

        &.icon {
          &:not(.icon-only) {
            justify-content: flex-start;
          }
        }
      }

      &.icon-only {
        min-inline-size: 0;
        padding: var(--glide-core-spacing-base-xs);
      }

      &.disabled {
        background-color: var(
          --glide-core-color-interactive-surface-container--disabled
        );
        border-color: var(--glide-core-color-static-stroke-primary);
        color: var(--glide-core-color-interactive-text-link--disabled);
        cursor: not-allowed;
      }

      &:not(.disabled) {
        &.selected {
          background-color: var(
            --glide-core-color-interactive-surface-container-active
          );
          color: var(--glide-core-private-color-button-text-primary);

          &:hover {
            background-color: var(
              --glide-core-color-interactive-surface-container--hover
            );
            color: var(--glide-core-color-interactive-text-link);
          }
        }
      }

      &:not(.disabled, .selected):hover {
        background-color: var(
          --glide-core-color-interactive-surface-container--hover
        );
        box-shadow: var(--glide-core-effect-hovered);
        color: var(--glide-core-color-interactive-text-link);
      }
    }
  `,
];
