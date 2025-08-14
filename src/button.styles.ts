import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.component:focus-visible')}
  `,
  css`
    :host {
      /* Contains elements with "padding" and "width". Inline by default. */
      display: inline-block;
    }

    .component {
      align-items: center;
      border-color: transparent;
      border-radius: var(--glide-core-rounding-base-radius-sm);
      border-style: solid;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      font-family: var(--glide-core-typography-family-primary);
      font-weight: var(--glide-core-typography-weight-bold);
      gap: var(--glide-core-spacing-base-xs);
      justify-content: center;
      padding-block: var(--glide-core-spacing-base-xs);
      padding-inline: var(--glide-core-spacing-base-md);
      transition-duration: var(--glide-core-duration-moderate-02);
      transition-property: color, background-color, border-color, fill, stroke;
      transition-timing-function: var(--glide-core-animation-swoop-in);
      user-select: none;

      &:focus {
        outline: none;
      }

      &.disabled {
        cursor: not-allowed;
        opacity: 1;
      }

      &.prefix-icon {
        padding-inline-start: var(--glide-core-spacing-base-md);
      }

      &.suffix-icon {
        padding-inline-end: var(--glide-core-spacing-base-md);
      }

      &.primary {
        background-color: var(
          --glide-core-color-interactive-surface-container-active
        );
        border-color: transparent;
        color: var(--glide-core-private-color-button-text-primary);

        &.disabled {
          background-color: var(
            --glide-core-color-interactive-surface-container--disabled
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-text-link--disabled);
        }

        &:not(.disabled):active {
          background-color: var(
            --glide-core-private-color-button-surface-active
          );
          border-color: transparent;
          color: var(--glide-core-private-color-button-text-primary);
        }

        &:not(:active):hover:not(.disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          border-color: transparent;
          box-shadow: var(--glide-core-effect-hovered);
          color: var(--glide-core-color-interactive-text-link);
        }
      }

      &.secondary {
        background-color: var(--glide-core-color-interactive-surface-container);
        border-color: var(--glide-core-private-color-button-stroke-default);
        color: var(--glide-core-color-interactive-text-link);

        &.disabled {
          background-color: var(
            --glide-core-color-interactive-surface-container--disabled
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-text-link--disabled);
        }

        &:not(.disabled):active {
          background-color: var(
            --glide-core-private-color-button-surface-active
          );
          border-color: transparent;
          color: var(--glide-core-private-color-button-text-primary);
        }

        &:not(:active):hover:not(.disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          border-color: transparent;
          box-shadow: var(--glide-core-effect-hovered);
          color: var(--glide-core-color-interactive-text-link);
        }
      }

      &.tertiary {
        background-color: transparent;
        border-color: transparent;
        color: var(--glide-core-color-interactive-text-link);

        &.disabled {
          color: var(--glide-core-color-interactive-text-link--disabled);
        }

        &:not(.disabled):active {
          background-color: var(
            --glide-core-private-color-button-surface-active
          );
          color: var(--glide-core-private-color-button-text-primary);
        }

        &:not(:active):hover:not(.disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          box-shadow: var(--glide-core-effect-hovered);
          color: var(--glide-core-color-interactive-text-link);
        }
      }

      &.link {
        background-color: initial;
        border: none;
        border-radius: var(--glide-core-rounding-base-radius-xxs);
        color: var(--glide-core-color-interactive-text-link);
        font-size: var(--glide-core-typography-size-body-default);
        font-weight: var(--glide-core-typography-weight-regular);
        padding: 0;

        &.disabled {
          color: var(--glide-core-color-interactive-text-link--disabled);
        }

        &:not(:active):hover:not(.disabled) {
          color: var(--glide-core-color-interactive-text-link--hover);
          text-decoration: underline;
        }
      }

      &.large:not(.link) {
        block-size: 2.125rem;
        font-size: var(--glide-core-typography-size-body-large);
        min-inline-size: 2.75rem;
      }

      &.small:not(.link) {
        block-size: 1.75rem;
        font-size: var(--glide-core-typography-size-body-small);
        min-inline-size: 2.5625rem;
      }
    }

    .prefix-icon-slot {
      &.hidden {
        display: none;
      }
    }

    .suffix-icon-slot {
      &.hidden {
        display: none;
      }
    }

    .label {
      /* min-inline-size: 3ch;
      overflow: hidden; */
      text-overflow: ellipsis;
      white-space: inherit;
    }
  `,
];
