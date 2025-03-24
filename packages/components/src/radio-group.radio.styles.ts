import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline(':host(:focus-visible) .component .circle')}
  `,
  css`
    :host {
      outline: none;
    }

    @keyframes circle {
      from {
        opacity: 0;
        transform: scale(0.5);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .component {
      align-items: center;
      color: var(--glide-core-text-body-1);
      display: flex;
      font-weight: var(--glide-core-body-md-font-weight);

      &:hover {
        .circle {
          border-color: var(--glide-core-border-focus);
          box-shadow: var(--glide-core-glow-sm);
        }
      }

      .circle {
        block-size: 1rem;
        border: 1px solid var(--glide-core-border-base-dark);
        border-radius: 50%;
        box-sizing: border-box;
        inline-size: 1rem;
        margin-inline-end: 0.625rem;
        min-inline-size: 1rem;
        position: relative;
        transition:
          border-color 200ms ease-in-out,
          box-shadow 200ms ease-in-out;

        &.checked {
          background-color: var(--glide-core-color-white);
          border-color: var(--glide-core-surface-primary);

          &.animate {
            @media (prefers-reduced-motion: no-preference) {
              &::after {
                animation: circle 250ms cubic-bezier(0.25, 0, 0.3, 1);
              }
            }
          }

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

        &.disabled {
          border-color: var(--glide-core-surface-primary-disabled);
          box-shadow: none;
          cursor: not-allowed;

          &::after {
            background-color: var(--glide-core-surface-primary-disabled);
          }
        }
      }
    }

    .label {
      line-height: 1;
    }
  `,
];
