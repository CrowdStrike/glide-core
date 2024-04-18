import { css } from 'lit';
import { focusOutline, visuallyHidden } from './styles.js';

export default [
  css`
    /*
  Most states are handled on the host. But ":checked" and ":indeterminate" are
  handled on the input because browsers don't support those classes on the host.
  And using attribute selectors won't work because those attributes, same as
  native, don't change when their properties do.

  TODO
  Use the ":checked" and ":indeterminate" pseudo classes on the host and throughout
  when browsers support them.
*/

    :host(:not(:disabled)) .component {
      &.error {
        .checkbox {
          border-color: var(--cs-status-error);
        }

        .summary {
          color: var(--cs-status-error);
        }

        .description {
          color: var(--cs-status-error);
        }
      }
    }

    :host(:not(:disabled)) .checkbox:hover {
      box-shadow: var(--cs-glow-sm);
    }

    :host([required]) .label-text::after {
      color: var(--cs-status-error);

      /* Lest the minifier have its way with the whitespace in the markup. */
      content: ' *';
    }

    :host([orientation='horizontal']) .component {
      align-items: center;
      display: inline-grid;
      grid-template-columns: auto auto;

      &.tooltip {
        grid-template-columns: auto auto auto;
      }
    }

    :host([orientation='horizontal']) .description {
      grid-column: 2;

      &.tooltip {
        grid-column: 3;
      }
    }

    :host([orientation='horizontal']) .label-text {
      padding-inline-end: var(--cs-spacing-sm);
    }

    :host([orientation='horizontal']) cs-tooltip {
      margin-inline-end: var(--cs-spacing-xs);
    }

    :host([orientation='vertical']) .component {
      align-items: center;
      display: inline-grid;
      grid-template-columns: auto auto;
    }

    :host([orientation='vertical']) cs-tooltip {
      margin-inline-start: var(--cs-spacing-xs);
      order: 2;
    }

    :host([orientation='vertical']) .label-text {
      grid-column: span 3;

      &.tooltip {
        grid-column: auto;
        order: 1;
      }
    }

    :host([orientation='vertical']) .checkbox-and-summary {
      margin-block-start: var(--cs-spacing-xxs);

      &.tooltip {
        grid-column: span 3;
        order: 2;
      }
    }

    :host([orientation='vertical']) .description {
      grid-column: span 3;

      &.tooltip {
        order: 4;
      }
    }

    .component {
      --max-width: 22rem;
    }

    .checkbox-and-summary {
      align-items: center;
      display: flex;
      gap: var(--cs-spacing-sm);
      max-inline-size: var(--max-width);
    }

    .checkbox {
      align-items: center;
      block-size: 0.875rem;
      border: 1px solid var(--cs-border-base-dark);
      border-radius: 0.25rem;
      box-sizing: border-box;
      color: var(--cs-icon-selected);
      display: flex;
      flex-shrink: 0; /* Don't shrink when the summary wraps. */
      inline-size: 0.875rem;
      justify-content: center;
    }

    .checked-icon {
      display: none;
    }

    .description {
      color: var(--cs-text-body-1);
      display: block;
      font-family: var(--cs-body-xs-font-family);
      font-size: var(--cs-body-xs-font-size);
      font-style: var(--cs-body-xs-font-style);
      font-weight: var(--cs-body-xs-font-weight);
      line-height: var(--cs-body-xs-line-height);
      margin-block-start: var(--cs-spacing-xxxs);
      max-inline-size: var(--max-width);
    }

    .label-and-checkbox-and-summary {
      display: contents;

      /*
      We don't want a succession of clicks to select the label's text. That's
      probably not what the user expects.
    */
      user-select: none;
    }

    cs-tooltip {
      display: none;

      &.visible {
        display: block;
      }
    }

    .tooltip-button {
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

    .label-text {
      color: var(--cs-text-body-1);
      font-family: var(--cs-heading-xxxs-font-family);
      font-size: var(--cs-heading-xxxs-font-size);
      font-style: var(--cs-heading-xxxs-font-style);
      font-variant: var(--cs-heading-xxxs-font-variant);
      font-weight: var(--cs-heading-xxxs-font-weight);
      line-height: 100%;
    }

    .indeterminate-icon {
      display: none;
    }

    .summary {
      font-family: var(--cs-body-sm-font-family);
      font-size: var(--cs-body-sm-font-size);
      font-style: var(--cs-body-sm-font-style);
      font-weight: var(--cs-body-sm-font-weight);
      line-height: 100%;
    }

    .summary-for-screenreaders {
      ${visuallyHidden};
    }

    input {
      ${visuallyHidden}

      &:checked:not(:indeterminate) ~ .checkbox-and-summary .checked-icon {
        display: inline-block;
      }

      &:disabled:not(:is(:checked, :indeterminate))
        ~ .checkbox-and-summary
        .checkbox {
        border-color: var(--cs-surface-primary-disabled);
      }

      &:focus-visible ~ .checkbox-and-summary .checkbox {
        ${focusOutline};
        outline-offset: 4px;
      }

      &:indeterminate ~ .checkbox-and-summary .indeterminate-icon {
        display: inline-block;
      }

      &:is(:checked, :indeterminate):not(:disabled)
        ~ .checkbox-and-summary
        .checkbox {
        background-color: var(--cs-surface-primary);
        border-color: transparent;
      }

      &:is(:checked, :indeterminate):disabled
        ~ .checkbox-and-summary
        .checkbox {
        background-color: var(--cs-surface-primary-disabled);
        border-color: transparent;
      }
    }
  `,
];
