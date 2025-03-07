import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

// TODO: Border separating both buttons
//       Top, right, bottom should remain
//       --glide-core-color-interactive-surface-container-active
//       border on the left should use:
//       button / stroke / default

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
      border-color: var(
        --glide-core-color-interactive-surface-container-active
      );
      border-radius: 0 0.75rem 0.75rem 0;
      border-style: solid;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--glide-core-typography-family-primary);
      font-style: var(--glide-core-heading-xxs-font-style);
      font-weight: var(--glide-core-typography-weight-bold);
      gap: 0.625rem;
      justify-content: center;
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
          color: var(--glide-core-color-interactive-text-default--disabled);
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
      }

      &.primary {
        color: var(--glide-core-color-interactive-text-onsolid);
      }

      &.secondary {
        color: var(--glide-core-color-interactive-text-link);
      }

      &.small {
        block-size: 1.75rem;
        box-sizing: border-box;
        font-size: var(--glide-core-typography-size-body-small);
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
        background-color: var(
          --glide-core-color-interactive-surface-container-active--hover
        );
        border-color: transparent;
        color: var(--glide-core-color-interactive-text-onsolid);

        svg {
          color: var(--glide-core-icon-selected);
        }
      }

      &:not(:active, .active, :disabled):is(:focus, :hover) {
        background-color: var(
          --glide-core-color-interactive-surface-container--hover
        );
        border-color: transparent;
        color: var(--glide-core-color-interactive-text-link);
      }

      &:not(:active, .active, :disabled):is(:hover) {
        box-shadow: var(--glide-core-glow-sm);

        /* So the box shadow isn't covered up by its primary button. */
        z-index: 1;
      }

      svg {
        color: var(--glide-core-private-color-button-icon-primary);
      }
    }
  `,
];
