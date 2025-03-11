import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${visuallyHidden('.prefix')}
  `,
  css`
    .component {
      align-items: center;
      border-radius: var(--glide-core-rounding-base-radius-md);
      box-shadow: var(--glide-core-shadow-lg);
      color: var(--glide-core-color-static-text-default);
      column-gap: var(--glide-core-spacing-base-xs);
      display: grid;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-component-inputvalue);
      font-weight: var(--glide-core-typography-weight-regular);
      grid-template-columns: auto minmax(0, 1fr);
      padding: var(--glide-core-spacing-base-sm);
      transform: translateX(110%);

      @media (prefers-reduced-motion: no-preference) {
        transition:
          transform 0.2s ease-out,
          opacity 0.3s ease-out;
      }

      &.error {
        background-color: var(--glide-core-color-error-surface-container);
      }

      &.informational {
        background-color: var(--glide-core-color-info-surface-container);
      }

      &.success {
        background-color: var(--glide-core-color-success-surface-container);
      }

      &.open {
        opacity: 1;
        transform: none;
        visibility: visible;
      }

      &.closing {
        opacity: 0;
        transform: none;
      }

      &.closed {
        display: none;
      }
    }

    .icon {
      block-size: 1.25rem;
      grid-column: 1;
      inline-size: 1.25rem;
    }

    .label {
      color: var(--glide-core-color-static-text-default);
      font-size: var(--glide-core-typography-size-heading-h3);
      font-weight: var(--glide-core-typography-weight-semibold);
      grid-column: 2;
      line-height: var(--glide-core-typography-height-heading-h3);
    }

    .close-button {
      --private-icon-color: var(--glide-core-color-interactive-icon-default);

      grid-column: 3;
    }

    .description {
      color: var(--glide-core-color-static-text-default);
      grid-column: 2;
    }

    .error {
      color: var(--glide-core-color-error-icon-default);
    }

    .success {
      color: var(--glide-core-color-success-icon-default);
    }

    .warning-informational {
      color: var(--glide-core-color-info-icon-default);
    }
  `,
];
