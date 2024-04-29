import { css } from 'lit';

export default [
  css`
    .component {
      --min-width: 9.375rem;

      &.horizontal {
        column-gap: var(--cs-spacing-sm);
        display: inline-grid;
        grid-template-columns: auto auto;
      }
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
        --size: 0.75rem;

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

    .validation-message {
      color: var(--cs-status-error);
      display: none;
      font-family: var(--cs-body-xs-font-family);
      font-size: var(--cs-body-xs-font-size);
      font-style: var(--cs-body-xs-font-style);
      font-weight: var(--cs-body-xs-font-weight);
      grid-column: 2;
      justify-content: space-between;
      line-height: var(--cs-body-xs-line-height);
      margin-block-start: var(--cs-spacing-xxs);

      &.visible {
        display: block;
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
    }

    .tooltip-and-label {
      align-items: center;
      display: flex;
      gap: var(--cs-spacing-xs);

      &.vertical {
        /* 0.375 is a one-off from Design. */
        margin-block-end: 0.375rem;
      }
    }

    .label {
      color: var(--cs-text-body-1);
      font-family: var(--cs-heading-xxxs-font-family);
      font-size: var(--cs-heading-xxxs-font-size);
      font-style: var(--cs-heading-xxxs-font-style);
      font-variant: var(--cs-heading-xxxs-font-variant);
      font-weight: var(--cs-heading-xxxs-font-weight);
      line-height: 100%;

      &.required {
        &::after {
          color: var(--cs-status-error);

          /* Lest the minifier have its way with the whitespace in the markup. */
          content: ' *';
        }
      }
    }

    .tooltip {
      display: none;

      &.vertical {
        order: 1;
      }

      &.visible {
        /*
          The default is "display: content". But property will do that causes the
          tooltip to particpate in layout and thus participate in the "order" change
          that we have to do for the tooltip and label when the component is vertically
          oriented.
        */
        display: block;
      }
    }

    .tooltip-trigger {
      background-color: transparent;
      border: none;

      /* TODO
        We want the focus outline to wrap neatly around the trigger. Tooltip should
        probably wrap its default slot in a SPAN with "tabindex=0" and include the
        below styles so every consumer doesn't have to.
      */
      border-radius: 50%;
      color: var(--cs-text-body-1);

      /*
        Any "display" that's not inline-level will do. We don't want the button to
        acquire a line box, which will make it taller than its content and thus
        make it difficult to center vertically with the label.
      */
      display: flex;
      outline-offset: 1px;
      padding: 0;
    }
  `,
];
