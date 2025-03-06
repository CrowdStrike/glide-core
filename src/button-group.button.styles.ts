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
      border-start-end-radius: 0.6875rem;
    }

    :host(:last-of-type) .component.vertical {
      border-end-end-radius: 0.6875rem;
      border-end-start-radius: 0.6875rem;
    }

    .component {
      align-items: center;
      appearance: none;
      background-color: var(--glide-core-color-static-surface-container);
      cursor: pointer;
      display: flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-large);
      font-style: var(--glide-core-heading-xxs-font-style);
      font-weight: var(--glide-core-typography-weight-bold);
      gap: 0.625rem;
      justify-content: center;
      line-height: 1;
      min-block-size: 1.125rem;
      min-inline-size: 5.1875rem;
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
          var(--glide-core-color-static-surface-container-secondary);
      }

      &.vertical {
        border-block-end: 1px solid
          var(--glide-core-color-static-surface-container-secondary);

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
          --glide-core-color-static-surface-container-secondary
        );
        border-color: var(
          --glide-core-color-static-surface-container-secondary
        );
        color: var(--glide-core-color-interactive-text-default--disabled);
        cursor: not-allowed;
      }

      &:not(.disabled) {
        &.selected {
          background-color: var(
            --glide-core-color-interactive-surface-container-active
          );
          border-color: var(
            --glide-core-color-interactive-surface-container-active
          );
          color: var(--glide-core-color-static-text-onsolid);
        }
      }

      &:not(.disabled, .selected):hover {
        background-color: var(
          --glide-core-color-interactive-surface-container--hover
        );
        border-color: transparent;
        box-shadow: var(--glide-core-glow-sm);
        color: var(--glide-core-color-interactive-text-link);
      }
    }
  `,
];
