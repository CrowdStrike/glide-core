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
      background: var(--glide-core-surface-base-gray-lighter);
      border-radius: var(--glide-core-border-radius-round);
      color: var(--glide-core-text-body-1);
      display: flex;
      font-family: var(--glide-core-body-xs-font-family);
      font-size: var(--glide-core-body-xs-font-size);
      font-style: var(--glide-core-body-xs-font-variant);
      font-weight: var(--glide-core-body-xs-font-weight);
      justify-content: center;
      line-height: 1;
      max-inline-size: max-content;
      min-block-size: var(--glide-core-spacing-md);
      opacity: 1;
      padding: var(--glide-core-spacing-xxxs) var(--glide-core-spacing-xs);

      &.large {
        min-block-size: 0.875rem;
        padding: var(--glide-core-spacing-xxs) var(--glide-core-spacing-sm);
      }

      &.small {
        font-size: 0.625rem;
        min-block-size: var(--glide-core-spacing-md);
        padding: 0 var(--glide-core-spacing-xs);
      }

      &.added {
        @media (prefers-reduced-motion: no-preference) {
          animation: fade-in var(--private-animation-duration) ease-in-out;
        }
      }

      &.disabled {
        color: var(--glide-core-icon-tertiary-disabled);
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
      color: var(--glide-core-icon-display);
      cursor: pointer;
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;
      transition: color 200ms ease-in-out;

      &.large {
        block-size: 0.875rem;
        inline-size: 0.875rem;
        margin-inline-start: var(--glide-core-spacing-xs);
      }

      &.medium {
        block-size: var(--glide-core-spacing-sm);
        inline-size: var(--glide-core-spacing-sm);
        margin-inline-start: 0.375rem;
      }

      &.small {
        block-size: 0.625rem;
        inline-size: 0.6215rem;
        margin-inline-start: var(--glide-core-spacing-xxs);
      }

      &.disabled {
        color: var(--glide-core-icon-tertiary-disabled);
        cursor: not-allowed;
      }

      &:hover:not(.disabled) {
        color: var(--glide-core-icon-primary-hover);
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
          margin-inline-end: var(--glide-core-spacing-xs);
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
          margin-inline-end: var(--glide-core-spacing-xxs);
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
        margin-inline-start: var(--glide-core-spacing-xs);
      }

      &.medium {
        --private-size: 0.75rem;

        margin-inline-start: 0.375rem;
      }

      &.small {
        --private-size: 0.625rem;

        margin-inline-start: var(--glide-core-spacing-xxs);
      }

      &.disabled {
        color: var(--glide-core-icon-tertiary-disabled);
        cursor: not-allowed;
      }

      &:focus {
        outline: none;
      }

      &:hover:not(.disabled) {
        color: var(--glide-core-icon-primary-hover);
      }
    }
  `,
];
