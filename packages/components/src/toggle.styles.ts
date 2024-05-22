import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    /*
Most states are handled on the host. But ":checked" is handled on the input
because browsers don't support that class on the host. And using attribute
selectors won't work because those attributes, same as native, don't change
when their properties do.

TODO
Use the ":checked" pseudo class on the host and throughout when browsers support it.
*/

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

    :host([orientation='vertical']) .toggle-and-summary {
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

    .toggle-and-summary {
      align-items: center;
      display: flex;
      gap: var(--cs-spacing-sm);
      max-inline-size: var(--max-width);
    }

    .toggle {
      --inline-size: 1.5rem;

      align-items: center;
      background-color: var(--cs-surface-selected-disabled);
      block-size: 0.875rem;
      border: 1px solid transparent;
      border-radius: var(--cs-spacing-sm);
      display: flex;
      flex-shrink: 0; /* Don't shrink when the summary wraps. */
      inline-size: var(--inline-size);
      justify-content: center;
      position: relative;

      &::before {
        background: var(--cs-surface-base-lighter);
        block-size: 0.875rem;
        border-radius: 50%;
        box-shadow:
          0 3px 1px 0 rgb(0 0 0 / 6%),
          0 3px 8px 0 rgb(0 0 0 / 15%);
        content: '';
        display: block;
        inline-size: 0.875rem;
        inset-inline-end: 0;
        position: absolute;
        transform: translateX(calc(var(--inline-size) * -1 + 100%));
        transition: 150ms transform;
      }
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

    .label-and-toggle-and-summary {
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

    .tooltip-target {
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
      ${visuallyHidden};

      &:focus-visible ~ .toggle-and-summary .toggle {
        ${focusOutline};
        outline-offset: 4px;
      }

      &:checked {
        &:not(:disabled) ~ .toggle-and-summary .toggle {
          background-color: var(--cs-surface-primary);
          border-color: transparent;
        }

        & ~ .toggle-and-summary .toggle::before {
          transform: translateX(0);
        }
      }

      &:disabled ~ .toggle-and-summary .toggle {
        background-color: var(--cs-surface-disabled);

        &::before {
          box-shadow: none;
        }
      }
    }
  `,
];
