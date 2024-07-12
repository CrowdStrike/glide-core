import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .component {
      align-items: center;
      appearance: none;
      border: none;
      border-inline-end: 1px solid var(--glide-core-border-base-lighter);
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
      outline: none;
      padding-block: var(--glide-core-spacing-xs);
      padding-inline: var(--glide-core-spacing-md);
      transition-duration: 150ms;
      transition-property: color, background-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      white-space: nowrap;

      &.icon-only {
        min-inline-size: 0;
        padding: var(--glide-core-spacing-xs);
      }

      &.single {
        border: none;
        border-radius: 0.6875rem;
      }

      &.first {
        border-radius: 0.6875rem 0 0 0.6875rem;
      }

      &.last {
        border-radius: 0 0.6875rem 0.6875rem 0;
      }

      &.vertical {
        border: none;
        border-block-end: 1px solid var(--glide-core-border-base-lighter);

        &.first {
          border-radius: 0.6875rem 0.6875rem 0 0;
        }

        &.last {
          border-radius: 0 0 0.6875rem 0.6875rem;
        }
      }

      &:not(.disabled).selected {
        background-color: var(--glide-core-surface-selected);
        border-color: var(--glide-core-surface-selected);
        color: var(--glide-core-color-white);
      }

      &:not(.disabled):active {
        background-color: var(--glide-core-surface-selected);
        border-color: var(--glide-core-border-focus);
        color: var(--glide-core-color-white);
      }

      &:not(.disabled):focus-visible {
        background-color: var(--glide-core-surface-selected);
        border-color: var(--glide-core-border-focus);
        color: var(--glide-core-color-white);

        ${focusOutline};
        outline-offset: 2px;

        /* create a stacking context so the outline doesn't become obscured behind other elements */
        transform: translateX(0);
      }

      &:not(.disabled, :active):hover {
        background-color: var(--glide-core-surface-hover);
        border-color: transparent;
        box-shadow: var(--glide-core-glow-sm);
        color: var(--glide-core-text-primary);
      }

      &.disabled {
        background-color: var(--glide-core-border-base-lighter);
        border-color: var(--glide-core-border-base-lighter);
        color: var(--glide-core-text-tertiary-disabled);
        cursor: not-allowed;
      }
    }

    .visually-hidden {
      ${visuallyHidden};
    }
  `,
];
