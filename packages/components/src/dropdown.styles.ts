import { css } from 'lit';

export default [
  css`
    .component {
      --min-width: 9.375rem;
    }

    .button-and-options {
      position: relative;
    }

    .options {
      background-color: var(--glide-core-surface-base-lighter);
      border: 1px solid var(--glide-core-border-base-lighter);
      border-radius: var(--glide-core-spacing-xs);
      box-shadow: var(--glide-core-shadow-lg);
      box-sizing: border-box;
      inset-block-start: 100%;
      inset-inline-start: 0;
      margin-block: var(--glide-core-spacing-xxs) 0;
      min-inline-size: var(--min-width);
      padding: var(--glide-core-spacing-xxxs);
      position: absolute;
      visibility: hidden;

      /*
        ".button-and-options" is relative and many Dropdowns may be stacked in a column.
        This ensures that the ".options" of Dropdowns earlier in the column aren't obscured
        by the ".button-and-options" that come after.
      */
      z-index: 1;

      &.large {
        --gap: var(--glide-core-spacing-sm);
        --padding-inline: var(--glide-core-spacing-sm);
        --padding-block: var(--glide-core-spacing-xxs);

        font-family: var(--glide-core-body-sm-font-family);
        font-size: var(--glide-core-body-sm-font-size);
        font-style: var(--glide-core-body-sm-font-style);
        font-weight: var(--glide-core-body-sm-font-weight);
        line-height: var(--glide-core-body-sm-line-height);
      }

      &.small {
        --gap: var(--glide-core-spacing-xs);
        --padding-inline: var(--glide-core-spacing-xs);
        --padding-block: var(--glide-core-spacing-xxxs);

        font-family: var(--glide-core-body-xs-font-family);
        font-size: var(--glide-core-body-xs-font-size);
        font-style: var(--glide-core-body-xs-font-style);
        font-weight: var(--glide-core-body-xs-font-weight);
        line-height: var(--glide-core-body-xs-line-height);
      }

      &.visible {
        visibility: visible;
      }
    }

    .button {
      align-items: center;
      background: none;
      border: 1px solid var(--glide-core-border-base-lighter);
      border-radius: var(--glide-core-spacing-xs);
      color: var(--glide-core-text-body-1);
      cursor: inherit;
      display: flex;
      font-family: var(--glide-core-body-sm-font-family);
      font-size: var(--glide-core-body-sm-font-size);
      font-style: var(--glide-core-body-sm-font-style);
      font-weight: var(--glide-core-body-sm-font-weight);
      justify-content: space-between;
      min-inline-size: var(--min-width);
      padding: var(--glide-core-spacing-xs);
      text-align: start;
      user-select: none;

      &.quiet {
        background-color: transparent;
        border: unset;
        font-family: var(--glide-core-heading-xxxs-font-family);
        font-size: var(--glide-core-heading-xxxs-font-size);
        font-style: var(--glide-core-heading-xxxs-font-style);
        font-weight: var(--glide-core-heading-xxxs-font-weight);
        gap: var(--glide-core-spacing-xxs);
        min-inline-size: 3.75rem;
        padding-block: 0;
        padding-inline: 0.375rem;
      }

      &.disabled {
        background: var(--glide-core-surface-base-gray-light);
        color: var(--glide-core-text-tertiary-disabled);
      }

      &.error {
        border-color: var(--glide-core-status-error);
        color: var(--glide-core-status-error);
      }

      &:hover:not(&.error, &.disabled) {
        border-color: var(--glide-core-border-focus);
      }

      &.quiet:hover:not(&.error, &.disabled) {
        background-color: var(--glide-core-surface-hover);
      }
    }
  `,
];
