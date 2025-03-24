import { css } from 'lit';

export default [
  css`
    .component {
      color: var(--glide-core-text-body-1);
      font-family: var(--glide-core-heading-xxxs-font-family);
      font-size: var(--glide-core-heading-xxxs-font-size);
      font-style: var(--glide-core-heading-xxxs-font-style);
      font-variant: var(--glide-core-heading-xxxs-font-variant);
      font-weight: var(--glide-core-heading-xxxs-font-weight);
    }

    .radio-container {
      display: inline-flex;
      flex-direction: column;
      gap: 0.375rem;

      &.invalid {
        border: 1px solid var(--glide-core-status-error);
        border-radius: 0.5rem;
        color: var(--glide-core-status-error);
        margin-block-end: -0.0625rem;
        margin-inline-start: -0.0625rem;
        padding: var(--glide-core-spacing-xxs) 0.375rem;
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
