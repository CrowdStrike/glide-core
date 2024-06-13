import { css } from 'lit';

export default [
  css`
    :host(:not(:disabled)) .component {
      &.error {
        .checkbox {
          border-color: var(--cs-status-error);
        }
      }
    }

    glide-core-label::part(tooltip-and-label-container) {
      align-items: flex-start;
    }

    .checkboxes {
      display: flex;
      flex-direction: column;
      grid-column: 2;
      row-gap: var(--cs-spacing-xxs);
    }
  `,
];
