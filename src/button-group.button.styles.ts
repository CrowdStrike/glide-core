import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

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
      border-end-start-radius: 0.6875rem;
      border-start-start-radius: 0.6875rem;
    }

    :host(:first-of-type) .component.vertical {
      border-start-end-radius: 0.6875rem;
      border-start-start-radius: 0.6875rem;
    }

    :host(:last-of-type) .component.horizontal {
      border-end-end-radius: 0.6875rem;
      border-inline-end: none;
      border-start-end-radius: 0.6875rem;
    }

    :host(:last-of-type) .component.vertical {
      border-block-end: none;
      border-end-end-radius: 0.6875rem;
      border-end-start-radius: 0.6875rem;
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
      transition-duration: 150ms;
      transition-property: color, background-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
