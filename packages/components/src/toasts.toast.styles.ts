import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      border-radius: var(--cs-spacing-sm);
      box-shadow: var(--cs-shadow-lg);
      column-gap: var(--cs-spacing-xs);
      display: grid;
      font-family: var(--cs-body-xs-font-family);
      font-size: var(--cs-body-sm-font-size);
      font-weight: var(--cs-body-xs-font-weight);
      grid-template-columns: auto minmax(0, 1fr);
      line-height: var(--cs-body-xs-line-height);
      padding: var(--cs-spacing-sm);
      transform: translateX(110%);
      transition:
        transform 0.2s ease-out,
        opacity 0.3s ease-out;

      &.informational {
        background-color: var(--cs-surface-informational);
      }

      &.success {
        background-color: var(--cs-surface-success);
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
      grid-column: 1;
    }

    .label {
      font-size: var(--cs-heading-xs-font-size);
      font-weight: var(--cs-heading-xs-font-weight);
      grid-column: 2;
    }

    .close-button {
      grid-column: 3;
    }

    .description {
      grid-column: 2;
    }
  `,
];
