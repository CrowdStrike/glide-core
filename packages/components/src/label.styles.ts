import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .component {
      --max-inline-size: 22rem;

      &.horizontal {
        align-items: center;
        column-gap: var(--cs-spacing-sm);
        display: inline-grid;
        grid-template-columns: auto auto;
      }

      &.vertical {
        display: inline-flex;
        flex-direction: column;
      }
    }

    .tooltip-and-label {
      align-items: center;
      column-gap: var(--cs-spacing-xs);
      display: flex;

      &.hidden {
        ${visuallyHidden};
      }
    }

    cs-tooltip {
      display: none;

      &.vertical {
        order: 1;
      }

      &.visible {
        /*
        The default is "display: content". But "order" does not work with
        "display: content" and "order" is needed above.
      */
        display: block;
      }
    }

    .tooltip-target {
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

    .label {
      color: var(--cs-text-body-1);
      display: block;
      font-family: var(--cs-heading-xxxs-font-family);
      font-size: var(--cs-heading-xxxs-font-size);
      font-style: var(--cs-heading-xxxs-font-style);
      font-variant: var(--cs-heading-xxxs-font-variant);
      font-weight: var(--cs-heading-xxxs-font-weight);
      line-height: 100%;
      user-select: none;

      &.horizontal {
        line-height: 100%;
      }

      &.vertical {
        margin-block-end: var(--cs-spacing-xxs);
      }
    }

    .required-symbol {
      color: var(--cs-status-error);
    }

    .control {
      display: block;
      max-inline-size: var(--max-inline-size);

      &.vertical:not(.hidden-label) {
        margin-block-start: var(--cs-spacing-xxs);
      }
    }

    .description {
      color: var(--cs-text-body-1);
      display: none;
      font-family: var(--cs-body-xs-font-family);
      font-size: var(--cs-body-xs-font-size);
      font-style: var(--cs-body-xs-font-style);
      font-weight: var(--cs-body-xs-font-weight);
      grid-column: 2;
      line-height: var(--cs-body-xs-line-height);
      margin-block-start: var(--cs-spacing-xxs);
      max-inline-size: var(--max-inline-size);

      &.error {
        color: var(--cs-status-error);
      }

      &.visible {
        display: block;
      }
    }
  `,
];
