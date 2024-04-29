import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    li {
      align-items: center;
      appearance: none;
      border: none;
      border-inline-end: 1px solid var(--cs-border-base-lighter);
      cursor: pointer;
      display: flex;
      font-family: var(--cs-font-sans);
      font-size: var(--cs-body-md-font-size);
      font-style: var(--cs-heading-xxs-font-style);
      font-weight: var(--cs-heading-xxs-font-weight);
      gap: 0.625rem;
      justify-content: center;
      line-height: 1;
      min-block-size: 1.125rem;
      min-inline-size: 5.1875rem;
      outline: none;
      padding-block: var(--cs-spacing-xs);
      padding-inline: var(--cs-spacing-md);
      transition-duration: 150ms;
      transition-property: color, background-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      white-space: nowrap;

      &.icon-only {
        min-inline-size: 0;
        padding: var(--cs-spacing-xs);
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
        border-block-end: 1px solid var(--cs-border-base-lighter);

        &.first {
          border-radius: 0.6875rem 0.6875rem 0 0;
        }

        &.last {
          border-radius: 0 0 0.6875rem 0.6875rem;
        }
      }

      &:not(.disabled).selected {
        background-color: var(--cs-surface-selected);
        border-color: var(--cs-surface-selected);
        color: var(--cs-color-white);
      }

      &:not(.disabled):active {
        background-color: var(--cs-surface-selected);
        border-color: var(--cs-border-focus);
        color: var(--cs-color-white);
      }

      &:not(.disabled):focus-visible {
        background-color: var(--cs-surface-selected);
        border-color: var(--cs-border-focus);
        color: var(--cs-color-white);

        ${focusOutline};

        /* create a stacking context so the outline doesn't become obscured behind other elements */
        transform: translateX(0);
      }

      &:not(.disabled, :active):hover {
        background-color: var(--cs-surface-hover);
        border-color: transparent;
        box-shadow: var(--cs-glow-sm);
        color: var(--cs-text-primary);
      }

      &.disabled {
        background-color: var(--cs-border-base-lighter);
        border-color: var(--cs-border-base-lighter);
        color: var(--cs-text-tertiary-disabled);
        cursor: default;
      }
    }

    .visually-hidden {
      ${visuallyHidden};
    }
  `,
];
