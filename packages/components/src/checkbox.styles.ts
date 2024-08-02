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

    .label-and-input-and-checkbox {
      align-items: center;
      display: flex;
      font-family: var(--glide-core-heading-xxxs-font-family);
      font-size: var(--glide-core-heading-xxxs-font-size);
      font-style: var(--glide-core-heading-xxxs-font-style);
      font-variant: var(--glide-core-heading-xxxs-font-variant);
      font-weight: var(--glide-core-body-xs-font-weight);
      gap: var(--glide-core-spacing-sm);
      line-height: 100%;
    }

    .input-and-checkbox-and-summary {
      display: flex;
      gap: var(--glide-core-spacing-sm);
    }

    .input-and-checkbox {
      block-size: 0.875rem;

      /* Prevent shrinkage when the summary wraps. */
      flex-shrink: 0;
      inline-size: 0.875rem;
      position: relative;
    }

    .checkbox {
      align-items: center;
      block-size: 100%;
      border: 1px solid var(--glide-core-border-base-dark);
      border-radius: 0.25rem;
      box-sizing: border-box;
      color: var(--glide-core-icon-selected);
      display: flex;
      flex-shrink: 0; /* Don't shrink when the summary wraps. */
      inline-size: 100%;
      justify-content: center;

      &.error:not(.disabled) {
        border-color: var(--glide-core-status-error);
      }

      &:not(.disabled):hover {
        box-shadow: var(--glide-core-glow-sm);
      }
    }

    input {
      block-size: 100%;
      cursor: inherit;
      inline-size: 100%;
      inset-block-start: 0;
      inset-inline-start: 0;
      margin: 0;
      opacity: 0;
      position: absolute;

      &:not(:disabled):hover ~ .checkbox {
        box-shadow: var(--glide-core-glow-sm);
      }

      &:checked:not(:indeterminate) ~ .checkbox .checked-icon {
        display: flex;
      }

      &:indeterminate ~ .checkbox .indeterminate-icon {
        display: inline-block;
      }

      &:disabled:not(:is(:checked, :indeterminate)) ~ .checkbox {
        border-color: var(--glide-core-surface-primary-disabled);
      }

      &:focus-visible ~ .checkbox,
      &:focus ~ .checkbox.error {
        ${focusOutline};
      }

      &:is(:checked, :indeterminate):not(:disabled) ~ .checkbox {
        background-color: var(--glide-core-surface-primary);
        border-color: transparent;
      }

      &:is(:checked, :indeterminate):disabled ~ .checkbox {
        background-color: var(--glide-core-surface-primary-disabled);
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

      /* Hard-coded colors since the value of --glide-core-icon-active presently doesn't work in dark mode */
      fill: #0073e6;
      stroke: #0073e6;
    }
  `,
];
