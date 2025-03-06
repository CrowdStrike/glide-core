import { css } from 'lit';

export default [
  css`
    :host(:not(:disabled)) .component {
      &.error {
        .checkbox {
          border-color: var(--glide-core-color-error-stroke-primary);
        }
      }
    }

    glide-core-private-label::part(private-tooltips) {
      align-items: flex-start;
    }

    .checkbox-container {
      display: flex;
      gap: 0.375rem;
      inline-size: min-content;

      &.invalid {
        border: 1px solid var(--glide-core-color-error-stroke-primary);
        border-radius: 0.5rem;
        padding: var(--glide-core-spacing-base-xxs) 0.375rem;
      }
    }

    .default-slot {
      display: flex;
      flex-direction: column;
      grid-column: 2;
      row-gap: var(--glide-core-spacing-base-xs);
    }

    .description {
      display: block;

      &.hidden {
        display: none;
      }
    }

    .validity-message {
      display: block;
    }
  `,
];
