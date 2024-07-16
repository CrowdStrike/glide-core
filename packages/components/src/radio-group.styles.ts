import { css } from 'lit';

export default [
  css`
    .component {
      color: var(--glide-core-text-body-1);
      display: inline-flex;
      font-family: var(--glide-core-heading-xxxs-font-family);
      font-size: var(--glide-core-heading-xxxs-font-size);
      font-style: var(--glide-core-heading-xxxs-font-style);
      font-variant: var(--glide-core-heading-xxxs-font-variant);
      font-weight: var(--glide-core-heading-xxxs-font-weight);
      line-height: 1;
    }

    .radio-container {
      display: flex;
      gap: 0.375rem;
      inline-size: min-content;

      &.invalid {
        border: 1px solid var(--glide-core-status-error);
        border-radius: 0.5rem;
        color: var(--glide-core-status-error);
        margin-block-end: -0.0625rem;
        margin-inline-start: -0.0625rem;
        padding: var(--glide-core-spacing-xxs) 0.375rem;
      }

      &.vertical {
        display: flex;
        flex-direction: column;
      }
    }

    glide-core-label::part(tooltip-and-label-container) {
      align-items: flex-start;
    }
  `,
];
