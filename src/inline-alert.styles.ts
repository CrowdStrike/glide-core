import { css } from 'lit';

export default [
  css`
    .component {
      align-items: flex-start;
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
        border: 1px solid var(--glide-core-data-viz-blue-lighter, #d7e7ff);
      }

      &.medium {
        background-color: var(--glide-core-surface-warning);
        border: 1px solid var(--glide-core-data-viz-yellow-lighter, #f8f0d1);
      }

      &.high {
        background-color: var(--glide-core-surface-warning);
        border: 1px solid var(--glide-core-data-viz-orange-lighter, #ffebce);
      }

      &.critical {
        background-color: var(--glide-core-surface-error);
        border: 1px solid var(--glide-core-data-viz-red-lighter, #ffdcda);
      }

      &.added {
        animation: fade-in var(--animation-duration) ease-in-out;
      }

      &.removed {
        animation-duration: var(--animation-duration);
        animation-fill-mode: forwards;
        animation-name: fade-out;
        animation-timing-function: ease-in-out;
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

    .icon {
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
    }

    .removal-button {
      align-self: flex-start;
      background-color: transparent;
      block-size: 1.125rem;
      border: none;
      border-radius: 0.0625rem;
      color: var(--glide-core-icon-display);
      cursor: pointer;
      display: flex;
      inline-size: 1.125rem;
      justify-content: center;
      padding: 0;
      transition: color 200ms ease-in-out;
    }
  `,
];
