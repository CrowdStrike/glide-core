import { css } from 'lit';

export default [
  css`
    .component {
      color: var(--cs-text-body-1, #212121);
      display: inline-flex;
      font-family: var(--cs-heading-xxxs-font-family);
      font-size: var(--cs-heading-xxxs-font-size);
      font-style: var(--cs-heading-xxxs-font-style);
      font-variant: var(--cs-heading-xxxs-font-variant);
      font-weight: var(--cs-heading-xxxs-font-weight);
      line-height: 1;

      &.invalid {
        color: var(--cs-status-error);
      }

      & fieldset {
        margin-inline: 0;
        padding-block: 0;
        padding-inline: 0;
      }

      & .vertical {
        appearance: none;
        border: none;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
      }

      & .label-container {
        color: var(--cs-text-body-1, #212121);
        display: inline-flex;
        flex-direction: row;
        margin-inline-end: var(--cs-spacing-sm, 0.75rem);

        cs-tooltip {
          display: none;
          margin-inline-end: var(--cs-spacing-xs);

          &.visible {
            display: block;
          }
        }

        & .tooltip-target {
          --size: 1rem;

          background-color: transparent;
          border: none;

          /* So the focus outline wraps neatly around the icon. */
          border-radius: 50%;

          /*
            Any "display" that's not inline-level will do. We don't want the button to
            acquire a line box, which will make it taller than its content and thus
            make it difficult to center vertically with the label.
          */
          display: flex;
          outline-offset: 1px;
          padding: 0;
        }

        & .required-symbol {
          color: var(--cs-status-error);
        }
      }

      & .radio-container {
        display: flex;
        gap: var(--cs-spacing-xs, 0.5rem);
      }

      & ::slotted([slot='description']) {
        color: inherit;
        display: block;
        font-family: var(--cs-body-xs-font-family);
        font-size: var(--cs-body-xs-font-size);
        font-style: var(--cs-body-xs-font-style);
        font-weight: var(--cs-body-xs-font-weight);
        line-height: var(--cs-body-xs-line-height);
        margin-block-start: var(--cs-spacing-xxs, 0.25rem);
        max-inline-size: var(--max-inline-size);
      }
    }
  `,
];
