import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.component:focus-visible')}
  `,
  css`
    .component {
      align-items: center;
      background-color: var(--glide-core-surface-page);
      border-color: var(--glide-core-border-primary);
      border-radius: 0 0.75rem 0.75rem 0;
      border-style: solid;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--glide-core-heading-xxs-font-family);
      font-style: var(--glide-core-heading-xxs-font-style);
      font-weight: var(--glide-core-heading-xxs-font-weight);
      gap: 0.625rem;
      justify-content: center;
      padding-block: var(--glide-core-spacing-xs);
      padding-inline: var(--glide-core-spacing-xs);
      position: relative;
      text-decoration: none;
      transition-duration: 150ms;
      transition-property: color, background-color, border-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;

      &:disabled {
        background-color: var(--glide-core-surface-disabled);
        border-block-color: transparent;
        border-inline-end-color: transparent;
        border-inline-start-color: var(--glide-core-border-base-light);
        color: var(--glide-core-text-tertiary-disabled);
        cursor: not-allowed;
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        box-shadow: 0 0 0 1px var(--glide-core-surface-page);

        /* So the box shadow isn't covered up by the primary button. */
        z-index: 1;
      }

      &.primary {
        color: var(--glide-core-text-selected);
      }

      &.secondary {
        color: var(--glide-core-text-primary);
      }

      &.small {
        block-size: 1.75rem;
        box-sizing: border-box;
        font-size: var(--glide-core-body-xs-font-size);
        line-height: 1rem;
        min-inline-size: fit-content;
      }

      &.large {
        block-size: 2.125rem;
        box-sizing: border-box;
        font-size: var(--glide-core-body-xxs-font-size);
        line-height: 1.5rem;
      }

      &:not(:disabled):is(:active, .active) {
        background-color: var(--glide-core-surface-selected-hover);
        border-color: transparent;
        color: var(--glide-core-text-selected);

        .chevron {
          color: var(--glide-core-icon-selected);
        }
      }

      &:not(:active, .active, :disabled):is(:focus, :hover) {
        background-color: var(--glide-core-surface-hover);
        border-color: transparent;
        color: var(--glide-core-text-primary);
      }

      &:not(:active, .active, :disabled):is(:hover) {
        box-shadow: var(--glide-core-glow-sm);

        /* So the box shadow isn't covered up by the primary button. */
        z-index: 1;
      }
    }

    .chevron {
      &.disabled {
        color: var(--glide-core-icon-tertiary-disabled);
      }

      &:not(.disabled) {
        color: var(--glide-core-icon-primary);
      }
    }
  `,
];
