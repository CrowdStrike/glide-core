import { css } from 'lit';
import visuallyHidden from '@/src/styles/visually-hidden.js';

export default [
  css`
    ${visuallyHidden('.prefix')}
  `,
  css`
    .component {
      background-color: transparent;
      border: none;
      inset-block-end: unset;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-inline-start: unset;
      max-block-size: 100%;
      max-inline-size: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 0;
      position: fixed;

      &:popover-open .toasts {
        display: flex;
      }
    }

    .toasts {
      --private-toasts-padding: var(--glide-core-spacing-base-sm);

      display: none;
      flex-direction: column;
      gap: var(--glide-core-spacing-base-md);
      padding: var(--private-toasts-padding);
    }

    .toast {
      align-items: center;
      border-radius: var(--glide-core-rounding-base-radius-md);
      box-shadow: var(--glide-core-effect-floating);
      box-sizing: border-box;
      color: var(--glide-core-color-static-text-default);
      column-gap: var(--glide-core-spacing-base-xs);
      display: grid;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      grid-template-columns: auto minmax(0, 1fr);
      inline-size: 24.25rem;
      padding: var(--glide-core-spacing-base-sm);
      transform: translateX(calc(100% + var(--private-toasts-padding)));

      &.error {
        background-color: var(
          --glide-core-color-advisory-surface-error-container
        );
      }

      &.informational {
        background-color: var(
          --glide-core-color-advisory-surface-info-container
        );
      }

      &.success {
        background-color: var(
          --glide-core-color-advisory-surface-success-container
        );
      }

      &.show {
        @media (prefers-reduced-motion: no-preference) {
          transition: transform var(--private-test-transition-duration, 700ms)
            ease-out;
        }

        transform: translateX(0);
      }

      &.dismissing {
        @media (prefers-reduced-motion: no-preference) {
          transition: transform var(--private-test-transition-duration, 700ms)
            ease-in;
        }

        transform: translateX(calc(100% + var(--private-toasts-padding)));

        &.dismissing-via-button {
          @media (prefers-reduced-motion: no-preference) {
            transition: transform var(--private-test-transition-duration, 500ms)
              ease-in;
          }
        }
      }
    }

    .icon {
      block-size: 1.25rem;
      grid-column: 1;
      inline-size: 1.25rem;

      &.informational {
        color: var(--glide-core-color-advisory-icon-info);
      }

      &.success {
        color: var(--glide-core-color-advisory-icon-success);
      }

      &.error {
        color: var(--glide-core-color-advisory-icon-error);
      }
    }

    .label {
      color: var(--glide-core-color-static-text-default);
      font-size: var(--glide-core-typography-size-body-large);
      font-weight: var(--glide-core-typography-weight-bold);
      grid-column: 2;
    }

    .dismiss-button {
      --private-icon-color: var(--glide-core-color-interactive-icon-default);

      grid-column: 3;
    }

    .description {
      color: var(--glide-core-color-static-text-default);
      grid-column: 2;
    }
  `,
];
