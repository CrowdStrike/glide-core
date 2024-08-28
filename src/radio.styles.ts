import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline(':host(:focus-visible) .component .radio-circle')}
  `,
  css`
    @keyframes animate-radio {
      from {
        opacity: 0;
        transform: scale(0.5);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      /**
        ':host' is targeted here to increase specificity so that
        we don't need to use '!important' to turn off the animation.
      */
      :host .component .radio-circle.checked.animate::after {
        animation: none;
      }
    }

    :host {
      display: flex;
      outline: none;
    }

    .component {
      align-items: center;
      color: var(--glide-core-text-body-1);
      display: inline-flex;
      font-weight: var(--glide-core-body-md-font-weight);
      line-height: 1;

      & .radio-circle {
        align-items: center;
        appearance: none;
        block-size: 1rem;
        border: 1px solid var(--glide-core-border-base-dark);
        border-radius: 50%;
        box-sizing: border-box;
        content: ' ';
        display: inline-flex;
        inline-size: 1rem;
        margin: 0;
        margin-inline-end: 0.625rem;
        min-inline-size: 1rem;
        padding: 0;
        position: relative;
        transition:
          border-color 200ms ease-in-out,
          box-shadow 200ms ease-in-out;

        &.checked {
          background-color: var(--glide-core-color-white);
          border-color: var(--glide-core-surface-primary);

          &::after {
            background-color: var(--glide-core-surface-primary);
            block-size: 0.5rem;
            border-radius: 50%;
            box-sizing: border-box;
            content: ' ';
            display: block;
            inline-size: 0.5rem;
            inset-block-start: calc(50% - 0.25rem);
            inset-inline-start: calc(50% - 0.25rem);
            position: absolute;
          }
        }

        &.animate {
          &.checked {
            &::after {
              animation: animate-radio 250ms cubic-bezier(0.25, 0, 0.3, 1);
            }
          }
        }
      }

      &:hover {
        & .radio-circle {
          border-color: var(--glide-core-border-focus);
          box-shadow: var(--glide-core-glow-sm);
        }
      }

      &.disabled,
      &.disabled:hover {
        & .radio-circle {
          border-color: var(--glide-core-surface-primary-disabled);
          box-shadow: none;
          cursor: not-allowed;

          &::after {
            background-color: var(--glide-core-surface-primary-disabled);
          }
        }
      }
    }
  `,
];
