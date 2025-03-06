import { css } from 'lit';

export default [
  css`
    .component {
      align-items: flex-start;
      border: 1px solid;
      border-radius: var(--glide-core-spacing-base-sm);
      color: var(--glide-core-color-static-text-default);
      display: flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-label);
      font-weight: var(--glide-core-typography-weight-regular);
      gap: var(--glide-core-spacing-base-xs);
      line-height: var(--glide-core-body-sm-line-height);
      padding: var(--glide-core-spacing-base-sm);

      &.informational {
        background-color: var(--glide-core-color-info-surface-container-light);
        border-color: var(--glide-core-color-info-stroke-secondary);
      }

      &.medium {
        background-color: var(--glide-core-color-warning-surface-container);
        border-color: var(--glide-core-color-attention-stroke-secondary);
      }

      &.high {
        background-color: var(--glide-core-color-warning-surface-container);
        border-color: var(--glide-core-color-warning-stroke-secondary);
      }

      &.critical {
        background-color: var(--glide-core-color-error-surface-container);
        border-color: var(--glide-core-color-error-stroke-secondary);
      }

      &.added {
        @media (prefers-reduced-motion: no-preference) {
          animation: fade-in var(--private-animation-duration) ease-in-out;
        }
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

    .icon-container {
      block-size: 1rem;
      inline-size: 1rem;

      &.informational {
        color: var(--glide-core-color-info-surface-solid);
      }

      &.medium {
        color: var(--glide-core-color-attention-stroke-primary);
      }

      &.high {
        color: var(--glide-core-color-warning-stroke-primary);
      }

      &.critical {
        color: var(--glide-core-color-error-stroke-primary);
      }
    }

    .content {
      display: flex;
      flex-grow: 1;
      overflow-wrap: anywhere;
    }

    .removal-button {
      --private-icon-color: var(--glide-core-color-interactive-icon-default);

      align-self: flex-start;
      transition: color 200ms ease-in-out;
    }
  `,
];
