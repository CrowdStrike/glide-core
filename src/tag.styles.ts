import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.edit-button:focus-visible')}
    ${focusOutline('.removal-button:focus-visible')}
  `,
  css`
    @keyframes fade-in {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    @keyframes fade-out {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }

    .component {
      align-items: center;
      background-color: var(
        --glide-core-color-static-surface-container-secondary
      );
      border: 1px solid var(--glide-core-color-interactive-stroke-primary);
      border-radius: var(--glide-core-rounding-base-radius-round);
      color: var(--glide-core-color-interactive-text-default);
      display: flex;
      font-family: var(--glide-core-typography-family-primary);
      font-weight: var(--glide-core-typography-weight-regular);
      justify-content: center;
      line-height: 1;
      max-inline-size: max-content;
      opacity: 1;

      &.large {
        column-gap: var(--glide-core-spacing-base-xs);
        font-size: var(--glide-core-typography-size-body-small);
        min-block-size: 0.875rem;
        padding: var(--glide-core-spacing-base-xxs)
          var(--glide-core-spacing-base-sm);
      }

      &.medium {
        column-gap: var(--glide-core-spacing-base-xs);
        font-size: var(--glide-core-typography-size-body-small);
        min-block-size: var(--glide-core-spacing-base-md);
        padding: var(--glide-core-spacing-base-xxxs)
          var(--glide-core-spacing-base-xs);
      }

      &.small {
        column-gap: var(--glide-core-spacing-base-xxs);
        font-size: 0.625rem;
        min-block-size: var(--glide-core-spacing-base-md);
        padding: 0 var(--glide-core-spacing-base-xs);
      }

      &.added {
        @media (prefers-reduced-motion: no-preference) {
          animation: fade-in var(--private-animation-duration) ease-in-out;
        }
      }

      &.disabled {
        background: var(--glide-core-color-static-surface-container-secondary);
        border-color: var(--glide-core-color-interactive-stroke-primary);
        color: var(--glide-core-color-interactive-icon-default--disabled);
      }

      &.removed {
        @media (prefers-reduced-motion: no-preference) {
          animation-duration: var(--private-animation-duration);
          animation-fill-mode: forwards;
          animation-name: fade-out;
          animation-timing-function: ease-in-out;
        }
      }
    }

    .label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .removal-button {
      align-items: center;
      background-color: transparent;
      block-size: 1rem;
      border: none;
      border-radius: 0.0625rem;
      color: var(--glide-core-color-interactive-icon-default);
      cursor: pointer;
      display: flex;
      inline-size: 1rem;
      justify-content: center;
      margin: 0;
      padding: 0;
      transition: color 200ms ease-in-out;

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);
        cursor: not-allowed;
      }

      &.hidden {
        display: none;
      }

      &:hover:not(.disabled) {
        color: var(--glide-core-color-interactive-icon-active--hover);
      }

      &:focus {
        outline: none;
      }
    }

    .icon-slot {
      &.large {
        &::slotted(*) {
          block-size: 1rem;
          inline-size: 1rem;
        }
      }

      &.medium {
        &::slotted(*) {
          block-size: 0.75rem;
          inline-size: 0.75rem;
        }
      }

      &.small {
        &::slotted(*) {
          block-size: 0.625rem;
          inline-size: 0.625rem;
        }
      }

      &.hidden {
        display: none;
      }

      &::slotted(*) {
        align-items: center;
        display: flex;
        justify-content: center;
      }
    }

    .edit-button {
      background-color: transparent;
      border: none;
      border-radius: 0.0625rem;
      display: flex;
      padding: 0;

      &.medium {
        --private-size: 0.75rem;
      }

      &.small {
        --private-size: 0.625rem;
      }

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);
        cursor: not-allowed;
      }

      &:focus {
        outline: none;
      }

      &:hover:not(.disabled) {
        color: var(--glide-core-color-interactive-icon-active--hover);
      }
    }
  `,
];
