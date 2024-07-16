import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    .component {
      align-items: center;
      background: var(--glide-core-surface-base);
      border-radius: var(--glide-core-border-radius-round);
      color: var(--glide-core-text-body-1);
      display: inline-flex;
      font-family: var(--glide-core-body-xs-font-family);
      font-size: var(--glide-core-body-xs-font-size);
      font-style: var(--glide-core-body-xs-font-variant);
      font-weight: var(--glide-core-body-xs-font-weight);
      justify-content: center;
      line-height: 1;
      margin: 0;
      min-block-size: var(--glide-core-spacing-md);
      opacity: 1;
      overflow: hidden;
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

      &.activate {
        animation: fade-in 100ms ease-in-out;
      }

      &.deactivate {
        animation: fade-out 200ms ease-in-out;
        animation-fill-mode: forwards;
      }

      & ::slotted([slot='prefix']) {
        --size: var(--glide-core-spacing-sm);

        align-items: center;
        block-size: var(--glide-core-spacing-sm);
        display: flex;
        inline-size: var(--glide-core-spacing-sm);
        justify-content: center;
        margin-inline-end: 0.375rem;
      }

      &.small ::slotted([slot='prefix']) {
        --size: 0.625rem;

        align-items: center;
        block-size: 0.625rem;
        display: flex;
        inline-size: 0.625rem;
        justify-content: center;
        margin-inline-end: var(--glide-core-spacing-xxs);
      }

      &.large ::slotted([slot='prefix']) {
        --size: 0.875rem;

        align-items: center;
        block-size: 0.875rem;
        display: flex;
        inline-size: 0.875rem;
        justify-content: center;
        margin-inline-end: var(--glide-core-spacing-xs);
      }
    }

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

    button {
      align-items: center;
      background-color: transparent;
      block-size: var(--glide-core-spacing-sm);
      border: none;
      border-radius: 0.0625rem;
      color: var(--glide-core-icon-display);
      cursor: pointer;
      display: flex;
      inline-size: var(--glide-core-spacing-sm);
      justify-content: center;
      margin: 0;
      margin-inline-start: 0.375rem;
      padding: 0;
      transition: color 200ms ease-in-out;

      &.large {
        block-size: 0.875rem;
        inline-size: 0.875rem;
        margin-inline-start: var(--glide-core-spacing-xs);
      }

      &.small {
        block-size: 0.625rem;
        inline-size: 0.6215rem;
        margin-inline-start: var(--glide-core-spacing-xxs);
      }

      &:hover {
        color: var(--glide-core-icon-primary-hover);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
      }
    }
  `,
];
