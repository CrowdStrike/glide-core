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
      background: var(--glide-core-color-static-surface-container-secondary);
      border-radius: var(--glide-core-rounding-base-radius-round);
      color: var(--glide-core-color-static-text-default);
      display: flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-small);
      font-weight: var(--glide-core-typography-weight-regular);
      justify-content: center;
      line-height: 1;
      max-inline-size: max-content;
      min-block-size: var(--glide-core-spacing-base-md);
      opacity: 1;
      padding: var(--glide-core-spacing-base-xxxs)
        var(--glide-core-spacing-base-xs);

      &.large {
        min-block-size: 0.875rem;
        padding: var(--glide-core-spacing-base-xxs)
          var(--glide-core-spacing-base-sm);
      }

      &.small {
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
      border: none;
      border-radius: 0.0625rem;
      color: var(--glide-core-color-interactive-icon-default);
      cursor: pointer;
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;
      transition: color 200ms ease-in-out;

      &.large {
        block-size: 0.875rem;
        inline-size: 0.875rem;
        margin-inline-start: var(--glide-core-spacing-base-xs);
      }

      &.medium {
        block-size: var(--glide-core-spacing-base-sm);
        inline-size: var(--glide-core-spacing-base-sm);
        margin-inline-start: 0.375rem;
      }

      &.small {
        block-size: 0.625rem;
        inline-size: 0.6215rem;
        margin-inline-start: var(--glide-core-spacing-base-xxs);
      }

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);
        cursor: not-allowed;
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
          block-size: 0.875rem;
          inline-size: 0.875rem;
          margin-inline-end: var(--glide-core-spacing-base-xs);
        }
      }

      &.medium {
        &::slotted(*) {
          block-size: 0.75rem;
          inline-size: 0.75rem;
          margin-inline-end: 0.375rem;
        }
      }

      &.small {
        &::slotted(*) {
          block-size: 0.625rem;
          inline-size: 0.625rem;
          margin-inline-end: var(--glide-core-spacing-base-xxs);
        }
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

      &.large {
        margin-inline-start: var(--glide-core-spacing-base-xs);
      }

      &.medium {
        --private-size: 0.75rem;

        margin-inline-start: 0.375rem;
      }

      &.small {
        --private-size: 0.625rem;

        margin-inline-start: var(--glide-core-spacing-base-xxs);
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
