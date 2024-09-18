import { css } from 'lit';

export default [
  css`
    :host([popover]:popover-open) {
      background-color: transparent;
      border: none;
      inset: unset;
      inset-block-start: 1rem;
      inset-inline-end: 1rem;
      margin: 0;
      outline: none;
      padding: var(--glide-core-spacing-md);
      position: fixed;
      transform: translate(110%, 0);
    }

    .component {
      align-items: center;
      border-radius: var(--glide-core-spacing-sm);
      box-shadow: var(--glide-core-shadow-lg);
      box-sizing: border-box;
      color: var(--glide-core-text-body-2);
      column-gap: var(--glide-core-spacing-xs);
      display: grid;
      font-family: var(--glide-core-body-xs-font-family);
      font-size: var(--glide-core-body-sm-font-size);
      font-weight: var(--glide-core-body-xs-font-weight);
      grid-template-columns: auto minmax(0, 1fr);
      inline-size: 24.25rem;
      line-height: var(--glide-core-body-xs-line-height);
      padding: var(--glide-core-spacing-sm);
      transition: opacity 0.3s ease-out;

      &.informational {
        background-color: var(--glide-core-surface-informational);
      }

      &.success {
        background-color: var(--glide-core-surface-success);
      }

      &.closed {
        opacity: 0;
      }
    }

    .icon {
      grid-column: 1;
    }

    .label {
      font-size: var(--glide-core-heading-xs-font-size);
      font-weight: var(--glide-core-heading-xs-font-weight);
      grid-column: 2;
    }

    .close-button {
      --icon-color: var(--glide-core-icon-default2);

      grid-column: 3;
    }

    .description {
      grid-column: 2;
      white-space: normal;
    }

    @media (prefers-reduced-motion: reduce) {
      :host([popover]:popover-open) {
        transition: none;
      }

      .component {
        transition: none;
      }
    }
  `,
];
