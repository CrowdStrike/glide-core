import { css } from 'lit';

export default [
  css`
    .component {
      color: var(--cs-text-body-1);
      display: inline-flex;
      font-family: var(--cs-heading-xxxs-font-family);
      font-size: var(--cs-heading-xxxs-font-size);
      font-style: var(--cs-heading-xxxs-font-style);
      font-variant: var(--cs-heading-xxxs-font-variant);
      font-weight: var(--cs-heading-xxxs-font-weight);
      line-height: 1;

      & .vertical {
        appearance: none;
        border: none;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
      }

      & .radio-container {
        display: flex;
        gap: var(--cs-spacing-xs);
        inline-size: min-content;

        &.invalid {
          border: 1px solid var(--cs-status-error);
          border-radius: 0.5rem;
          color: var(--cs-status-error);
          margin-block-end: -0.0625rem;
          margin-inline-start: -0.0625rem;
          padding: var(--cs-spacing-xxs) 0.375rem;
        }
      }

      cs-label::part(tooltip-and-label-container) {
        align-items: flex-start;
      }
    }
  `,
];
