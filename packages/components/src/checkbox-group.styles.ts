import { css } from 'lit';

export default [
  css`
    :host(:not(:disabled)) .component {
      &.error {
        .checkbox {
          border-color: var(--cs-status-error);
        }

        .description {
          color: var(--cs-status-error);
        }
      }
    }

    .component {
      --max-inline-size: 22rem;

      display: inline-grid;
      grid-template-columns: auto auto;

      &.tooltip {
        grid-template-columns: auto auto auto;
      }
    }

    .fieldset {
      display: contents;
    }

    .legend {
      color: var(--cs-text-body-1);
      font-family: var(--cs-heading-xxxs-font-family);
      font-size: var(--cs-heading-xxxs-font-size);
      font-style: var(--cs-heading-xxxs-font-style);
      font-variant: var(--cs-heading-xxxs-font-variant);
      font-weight: var(--cs-heading-xxxs-font-weight);
      line-height: 100%;
      padding-inline: 0 var(--cs-spacing-sm);
    }

    .required-symbol {
      color: var(--cs-status-error);
    }

    .checkboxes {
      display: flex;
      flex-direction: column;
      grid-column: 2;
      max-inline-size: var(--max-inline-size);

      &.tooltip {
        grid-column: 3;
      }
    }

    .description {
      color: var(--cs-text-body-1);
      display: block;
      font-family: var(--cs-body-xs-font-family);
      font-size: var(--cs-body-xs-font-size);
      font-style: var(--cs-body-xs-font-style);
      font-weight: var(--cs-body-xs-font-weight);
      grid-column: 2;
      grid-row: 3;
      line-height: var(--cs-body-xs-line-height);
      margin-block-start: var(--cs-spacing-xxxs);
      max-inline-size: var(--max-inline-size);

      &.tooltip {
        grid-column: 3;
      }
    }

    cs-tooltip {
      display: none;
      margin-inline-end: var(--cs-spacing-xs);

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
  `,
];
