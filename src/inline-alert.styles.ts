import { css } from 'lit';

export default [
  css`
    .component {
      align-items: flex-start;
      border: 1px solid;
      border-radius: var(--glide-core-spacing-sm);
      color: var(--glide-core-text-body-2);
      display: flex;
      font-family: var(--glide-core-body-sm-font-family);
      font-size: var(--glide-core-body-sm-font-size);
      font-weight: var(--glide-core-body-sm-font-weight);
      gap: var(--glide-core-spacing-xs);
      line-height: var(--glide-core-body-sm-line-height);
      padding: var(--glide-core-spacing-sm);

      &.informational {
        background-color: var(--glide-core-surface-informational);
        border-color: var(--glide-core-border-informational);
      }

      &.medium {
        background-color: var(--glide-core-surface-warning);
        border-color: var(--glide-core-border-attention);
      }

      &.high {
        background-color: var(--glide-core-surface-warning);
        border-color: var(--glide-core-border-warning);
      }

      &.critical {
        background-color: var(--glide-core-surface-error);
        border-color: var(--glide-core-border-error);
      }

      &.added {
        @media (prefers-reduced-motion: no-preference) {
          animation: fade-in var(--animation-duration) ease-in-out;
        }
      }

      &.removed {
        @media (prefers-reduced-motion: no-preference) {
          animation-duration: var(--animation-duration);
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
        color: var(--glide-core-status-warning-informational);
      }

      &.medium {
        color: var(--glide-core-status-warning-medium);
      }

      &.high {
        color: var(--glide-core-status-warning-high);
      }

      &.critical {
        color: var(--glide-core-status-warning-critical);
      }
    }

    .content {
      display: flex;
      flex-grow: 1;
      overflow-wrap: anywhere;
    }

    .removal-button {
      --icon-color: var(--glide-core-icon-default2);

      align-self: flex-start;
      transition: color 200ms ease-in-out;
    }
  `,
];
