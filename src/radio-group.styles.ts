import { css } from 'lit';

export default [
  css`
    .component {
      color: var(--glide-core-color-static-text-default);
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-bold);
    }

    .radio-container {
      display: inline-flex;
      flex-direction: column;
      gap: 0.375rem;

      &.invalid {
        border: 1px solid var(--glide-core-color-advisory-stroke-error-primary);
        border-radius: var(--glide-core-rounding-base-radius-xxs);
        color: var(--glide-core-color-advisory-stroke-error-primary);
        margin-block-end: -0.0625rem;
        margin-inline-start: -0.0625rem;
        padding: var(--glide-core-spacing-base-xxs) 0.375rem;
      }
    }

    glide-core-private-label::part(private-tooltips) {
      align-items: flex-start;
    }

    .description-slot {
      display: block;

      &.hidden {
        display: none;
      }
    }
  `,
];
