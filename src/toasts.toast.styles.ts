import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      border-radius: var(--glide-core-spacing-sm);
      box-shadow: var(--glide-core-shadow-lg);
      color: var(--glide-core-text-body-2);
      column-gap: var(--glide-core-spacing-xs);
      display: grid;
      font-family: var(--glide-core-body-xs-font-family);
      font-size: var(--glide-core-body-sm-font-size);
      font-weight: var(--glide-core-body-xs-font-weight);
      grid-template-columns: auto minmax(0, 1fr);
      line-height: var(--glide-core-body-xs-line-height);
      padding: var(--glide-core-spacing-sm);
      transform: translateX(110%);
      transition:
        transform 0.2s ease-out,
        opacity 0.3s ease-out;

      &.error {
        background-color: var(--glide-core-surface-error);
      }

      &.informational {
        background-color: var(--glide-core-surface-informational);
      }

      &.success {
        background-color: var(--glide-core-surface-success);
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
      color: var(--glide-core-text-body-2);
      font-size: var(--glide-core-heading-xs-font-size);
      font-weight: var(--glide-core-heading-xs-font-weight);
      grid-column: 2;
    }

    .close-button {
      --icon-color: var(--glide-core-icon-default2);

      grid-column: 3;
    }

    .description {
      color: var(--glide-core-text-body-2);
      grid-column: 2;
    }

    .error {
      color: var(--glide-core-status-failed);
    }

    .success {
      color: var(--glide-core-status-success);
    }

    .warning-informational {
      color: var(--glide-core-status-warning-informational);
    }
  `,
];
