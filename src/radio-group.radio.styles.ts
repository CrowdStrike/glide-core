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
      color: var(--glide-core-color-static-text-default);
      display: flex;
      font-weight: var(--glide-core-typography-weight-regular);

      &:hover {
        .circle {
          border-color: var(--glide-core-color-interactive-stroke-focus);
          box-shadow: var(--glide-core-glow-sm);
        }
      }

      .circle {
        block-size: 1rem;
        border: 1px solid var(--glide-core-color-interactive-stroke-contrast);
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
          background-color: var(--glide-core-color-static-text-onsolid);
          border-color: var(--glide-core-color-interactive-surface-container-active);

          &.animate {
            @media (prefers-reduced-motion: no-preference) {
              &::after {
                animation: circle 250ms cubic-bezier(0.25, 0, 0.3, 1);
              }
            }
          }

          &::after {
            background-color: var(--glide-core-color-interactive-surface-container-active);
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
          border-color: var(--glide-core-color-interactive-surface-container-active--disabled);
          box-shadow: none;
          cursor: not-allowed;

          &::after {
            background-color: var(--glide-core-color-interactive-surface-container-active--disabled);
          }
        }
      }
    }

    .label {
      line-height: 1;
    }
  `,
];
