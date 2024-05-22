import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

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
      }
    }

    :host(:not(:disabled)) .checkbox:hover {
      box-shadow: var(--cs-glow-sm);
    }

    .label-and-checkbox {
      align-items: center;
      display: flex;
      font-family: var(--cs-heading-xxxs-font-family);
      font-size: var(--cs-heading-xxxs-font-size);
      font-style: var(--cs-heading-xxxs-font-style);
      font-variant: var(--cs-heading-xxxs-font-variant);
      font-weight: var(--cs-body-xs-font-weight);
      gap: var(--cs-spacing-sm);
      line-height: 100%;
    }

    .input-and-checkbox-and-summary {
      display: flex;
      gap: var(--cs-spacing-sm);
    }

    .input-and-checkbox {
      block-size: 0.875rem;
      inline-size: 0.875rem;
      position: relative;
    }

    .checkbox {
      align-items: center;
      block-size: 100%;
      border: 1px solid var(--cs-border-base-dark);
      border-radius: 0.25rem;
      box-sizing: border-box;
      color: var(--cs-icon-selected);
      display: flex;
      flex-shrink: 0; /* Don't shrink when the summary wraps. */
      inline-size: 100%;
      justify-content: center;
    }

    input {
      block-size: 100%;
      inline-size: 100%;
      inset-block-start: 0;
      inset-inline-start: 0;
      margin: 0;
      opacity: 0;
      position: absolute;

      &:not(:disabled):hover ~ .checkbox {
        box-shadow: var(--cs-glow-sm);
      }

      &:checked:not(:indeterminate) ~ .checkbox .checked-icon {
        display: flex;
      }

      &:indeterminate ~ .checkbox .indeterminate-icon {
        display: inline-block;
      }

      &:disabled:not(:is(:checked, :indeterminate)) ~ .checkbox {
        border-color: var(--cs-surface-primary-disabled);
      }

      &:focus-visible ~ .checkbox {
        ${focusOutline};
        outline-offset: 4px;
      }

      &:is(:checked, :indeterminate):not(:disabled) ~ .checkbox {
        background-color: var(--cs-surface-primary);
        border-color: transparent;
      }

      &:is(:checked, :indeterminate):disabled ~ .checkbox {
        background-color: var(--cs-surface-primary-disabled);
        border-color: transparent;
      }
    }

    .checked-icon {
      --size: 0.75rem;

      align-items: center;
      block-size: 100%;
      display: none;
      inline-size: 100%;
      inset-block-start: 0;
      inset-inline-start: 0;
      justify-content: center;
      pointer-events: none;
      position: absolute;
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
  `,
];
