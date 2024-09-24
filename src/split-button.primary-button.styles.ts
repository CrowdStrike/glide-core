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
      font-family: var(--glide-core-heading-xxs-font-family);
      font-style: var(--glide-core-heading-xxs-font-style);
      font-weight: var(--glide-core-heading-xxs-font-weight);
      gap: 0.625rem;
      justify-content: center;
      padding-block: var(--glide-core-spacing-xs);
      padding-inline: var(--glide-core-spacing-md);
      padding-inline-end: var(--glide-core-spacing-xs);
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
        box-shadow: 0 0 0 2px var(--glide-core-surface-page) !important;
      }

      &.primary {
        background-color: var(--glide-core-surface-primary);
        border-color: transparent;
        color: var(--glide-core-text-selected);
      }

      &.secondary {
        background-color: var(--glide-core-surface-page);
        border-color: var(--glide-core-border-primary);
        color: var(--glide-core-text-primary);

        &:not(.disabled) {
          /* So it has a right border when the secondary button is disabled. */
          box-shadow: 1px 0 0 var(--glide-core-border-primary);
        }
      }

      &.small {
        block-size: 1.75rem;
        box-sizing: border-box;
        font-size: var(--glide-core-body-xs-font-size);
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
        background-color: var(--glide-core-surface-disabled);
        border-color: transparent;
        color: var(--glide-core-text-tertiary-disabled);
        cursor: not-allowed;
      }

      &:not(:active, .disabled):is(:focus, :hover) {
        background-color: var(--glide-core-surface-hover);
        border-color: transparent;
        color: var(--glide-core-text-primary);
      }

      &:not(:active, .disabled):is(:hover) {
        box-shadow: var(--glide-core-glow-sm);
        z-index: 1;
      }

      &:not(.disabled):active {
        background-color: var(--glide-core-surface-selected-hover);
        color: var(--glide-core-text-selected);
      }
    }
  `,
];
