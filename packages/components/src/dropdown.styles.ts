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
      background-color: var(--cs-surface-base-lighter);
      border: 1px solid var(--cs-border-base-lighter);
      border-radius: var(--cs-spacing-xs);
      box-shadow: var(--cs-shadow-lg);
      box-sizing: border-box;
      inset-block-start: 100%;
      inset-inline-start: 0;
      margin-block: var(--cs-spacing-xxs) 0;
      min-inline-size: var(--min-width);
      padding: var(--cs-spacing-xxxs);
      position: absolute;
      visibility: hidden;

      /*
        ".button-and-options" is relative and many Dropdowns may be stacked in a column.
        This ensures that the ".options" of Dropdowns earlier in the column aren't obscured
        by the ".button-and-options" that come after.
      */
      z-index: 1;

      &.large {
        --gap: var(--cs-spacing-sm);
        --padding-inline: var(--cs-spacing-sm);
        --padding-block: var(--cs-spacing-xxs);

        font-family: var(--cs-body-sm-font-family);
        font-size: var(--cs-body-sm-font-size);
        font-style: var(--cs-body-sm-font-style);
        font-weight: var(--cs-body-sm-font-weight);
        line-height: var(--cs-body-sm-line-height);
      }

      &.small {
        --gap: var(--cs-spacing-xs);
        --padding-inline: var(--cs-spacing-xs);
        --padding-block: var(--cs-spacing-xxxs);

        font-family: var(--cs-body-xs-font-family);
        font-size: var(--cs-body-xs-font-size);
        font-style: var(--cs-body-xs-font-style);
        font-weight: var(--cs-body-xs-font-weight);
        line-height: var(--cs-body-xs-line-height);
      }

      &.visible {
        visibility: visible;
      }
    }

    .button {
      align-items: center;
      background: none;
      border: 1px solid var(--cs-border-base-lighter);
      border-radius: var(--cs-spacing-xs);
      color: var(--cs-text-body-1);
      display: flex;
      font-family: var(--cs-body-sm-font-family);
      font-size: var(--cs-body-sm-font-size);
      font-style: var(--cs-body-sm-font-style);
      font-weight: var(--cs-body-sm-font-weight);
      justify-content: space-between;
      min-inline-size: var(--min-width);
      padding: var(--cs-spacing-xs);
      text-align: start;
      user-select: none;

      &.quiet {
        background-color: transparent;
        border: unset;
        font-family: var(--cs-heading-xxxs-font-family);
        font-size: var(--cs-heading-xxxs-font-size);
        font-style: var(--cs-heading-xxxs-font-style);
        font-weight: var(--cs-heading-xxxs-font-weight);
        gap: var(--cs-spacing-xxs);
        min-inline-size: 3.75rem;
        padding-block: 0;
        padding-inline: 0.375rem;
      }

      &.disabled {
        background: var(--cs-surface-base-gray-light);
        color: var(--cs-text-tertiary-disabled);
      }

      &.error {
        border-color: var(--cs-status-error);
        color: var(--cs-status-error);
      }

      &:hover:not(&.error, &.disabled) {
        border-color: var(--cs-border-focus);
      }

      &.quiet:hover:not(&.error, &.disabled) {
        background-color: var(--cs-surface-hover);
      }
    }
  `,
];
