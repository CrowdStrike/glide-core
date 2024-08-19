import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${focusOutline('.component:focus-visible')}
    ${visuallyHidden('.label.visually-hidden')}
  `,
  css`
    :host(:first-of-type) {
      .component {
        &.horizontal {
          border-end-start-radius: 0.6875rem;
          border-start-start-radius: 0.6875rem;
        }

        &.vertical {
          border-start-end-radius: 0.6875rem;
          border-start-start-radius: 0.6875rem;
        }
      }
    }

    :host(:last-of-type) {
      .component {
        &.horizontal {
          border-end-end-radius: 0.6875rem;
          border-start-end-radius: 0.6875rem;
        }

        &.vertical {
          border-end-end-radius: 0.6875rem;
          border-end-start-radius: 0.6875rem;
        }
      }
    }

    .component {
      align-items: center;
      appearance: none;
      background-color: var(--glide-core-surface-page);
      cursor: pointer;
      display: flex;
      font-family: var(--glide-core-font-sans);
      font-size: var(--glide-core-body-md-font-size);
      font-style: var(--glide-core-heading-xxs-font-style);
      font-weight: var(--glide-core-heading-xxs-font-weight);
      gap: 0.625rem;
      justify-content: center;
      line-height: 1;
      min-block-size: 1.125rem;
      min-inline-size: 5.1875rem;
      padding-block: var(--glide-core-spacing-xs);
      padding-inline: var(--glide-core-spacing-md);
      transition-duration: 150ms;
      transition-property: color, background-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      white-space: nowrap;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        background-color: var(--glide-core-surface-selected);
        border-color: var(--glide-core-border-focus);
        color: var(--glide-core-color-white);
        outline-offset: 2px;

        /* Create a stacking context so the outline isn't obscured by other elements. */
        transform: translateX(0);
      }

      &.horizontal {
        border-inline-end: 1px solid var(--glide-core-border-base-lighter);
      }

      &.vertical {
        border-block-end: 1px solid var(--glide-core-border-base-lighter);

        &.prefix {
          &:not(.icon-only) {
            justify-content: flex-start;
          }
        }
      }

      &.icon-only {
        min-inline-size: 0;
        padding: var(--glide-core-spacing-xs);
      }

      &.disabled {
        background-color: var(--glide-core-border-base-lighter);
        border-color: var(--glide-core-border-base-lighter);
        color: var(--glide-core-text-tertiary-disabled);
        cursor: not-allowed;
      }

      &:not(.disabled) {
        &:active {
          background-color: var(--glide-core-surface-selected);
          border-color: var(--glide-core-border-focus);
          color: var(--glide-core-color-white);
        }

        &.selected {
          background-color: var(--glide-core-surface-selected);
          border-color: var(--glide-core-surface-selected);
          color: var(--glide-core-color-white);
        }
      }

      &:not(.disabled, :active) {
        &:hover {
          background-color: var(--glide-core-surface-hover);
          border-color: transparent;
          box-shadow: var(--glide-core-glow-sm);
          color: var(--glide-core-text-primary);
        }
      }
    }
  `,
];
