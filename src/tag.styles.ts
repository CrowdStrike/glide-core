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

    :host {
      --max-inline-size: max-content;
    }

    .component {
      align-items: center;
      background-color: var(
        --glide-core-color-static-surface-container-secondary
      );
      block-size: 1.5rem;
      border: 1px solid var(--glide-core-color-interactive-stroke-primary);
      border-radius: var(--glide-core-rounding-base-radius-round);
      box-sizing: border-box;
      color: var(--glide-core-color-interactive-text-default);
      column-gap: var(--glide-core-spacing-base-xs);
      display: flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-small);
      font-weight: var(--glide-core-typography-weight-regular);
      justify-content: center;
      line-height: 1;
      max-inline-size: var(--max-inline-size);
      opacity: 1;
      padding-inline: var(--glide-core-spacing-base-sm);

      &.added {
        @media (prefers-reduced-motion: no-preference) {
          animation: fade-in var(--private-animation-duration) ease-in-out;
        }
      }

      &.disabled {
        background-color: var(
          --glide-core-color-static-surface-container-secondary
        );
        border-color: var(--glide-core-color-interactive-stroke-primary);
        color: var(--glide-core-color-interactive-icon-default--disabled);
      }

      &.readonly {
        background-color: var(--glide-core-color-static-surface-container);
        border-color: var(--glide-core-color-interactive-stroke-primary);
        color: var(--glide-core-color-interactive-text-default);
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
      text-align: center;
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
      &.hidden {
        display: none;
      }

      &::slotted(*) {
        align-items: center;
        block-size: 1rem;
        display: flex;
        inline-size: 1rem;
        justify-content: center;
      }
    }

    .edit-button {
      background-color: transparent;
      border: none;
      border-radius: 0.0625rem;
      display: flex;
      padding: 0;

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
