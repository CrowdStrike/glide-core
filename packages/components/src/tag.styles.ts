import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    .component {
      align-items: center;
      background: var(--cs-surface-base);
      border-radius: var(--cs-border-radius-round);
      color: var(--cs-text-body-1);
      display: inline-flex;
      font-family: var(--cs-body-xs-font-family);
      font-size: var(--cs-body-xs-font-size);
      font-style: var(--cs-body-xs-font-variant);
      font-weight: var(--cs-body-xs-font-weight);
      justify-content: center;
      line-height: 1;
      margin: 0;
      min-block-size: var(--cs-spacing-md);
      opacity: 1;
      overflow: hidden;
      padding: var(--cs-spacing-xxxs) var(--cs-spacing-xs);

      &.large {
        min-block-size: 0.875rem;
        padding: var(--cs-spacing-xxs) var(--cs-spacing-sm);
      }

      &.small {
        font-size: 0.625rem;
        min-block-size: var(--cs-spacing-md);
        padding: 0 var(--cs-spacing-xs);
      }

      &.activate {
        animation: fade-in 100ms ease-in-out;
      }

      &.deactivate {
        animation: fade-out 200ms ease-in-out;
        animation-fill-mode: forwards;
      }

      & ::slotted([slot='prefix']) {
        --size: var(--cs-spacing-sm);

        align-items: center;
        block-size: var(--cs-spacing-sm);
        display: flex;
        inline-size: var(--cs-spacing-sm);
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
        margin-inline-end: var(--cs-spacing-xxs);
      }

      &.large ::slotted([slot='prefix']) {
        --size: 0.875rem;

        align-items: center;
        block-size: 0.875rem;
        display: flex;
        inline-size: 0.875rem;
        justify-content: center;
        margin-inline-end: var(--cs-spacing-xs);
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
      block-size: var(--cs-spacing-sm);
      border: none;
      color: var(--cs-icon-display);
      cursor: pointer;
      display: flex;
      inline-size: var(--cs-spacing-sm);
      justify-content: center;
      margin: 0;
      margin-inline-start: 0.375rem;
      padding: 0;
      transition: color 200ms ease-in-out;

      &.large {
        block-size: 0.875rem;
        inline-size: 0.875rem;
        margin-inline-start: var(--cs-spacing-xs);
      }

      &.small {
        block-size: 0.625rem;
        inline-size: 0.6215rem;
        margin-inline-start: var(--cs-spacing-xxs);
      }

      &:hover {
        color: var(--cs-icon-primary-hover);
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
