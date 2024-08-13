import { css } from 'lit';

export default [
  css`
    :host(:not(:disabled)) .component {
      &.error {
        .checkbox {
          border-color: var(--glide-core-status-error);
        }
      }
    }

    glide-core-private-label::part(tooltips-and-label) {
      align-items: flex-start;
    }

    .checkboxes {
      display: flex;
      flex-direction: column;
      grid-column: 2;
      row-gap: var(--glide-core-spacing-xxs);
    }
  `,
];
