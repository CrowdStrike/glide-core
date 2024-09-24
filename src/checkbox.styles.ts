import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline(
      'input:focus-visible ~ .checkbox, input:focus ~ .checkbox.error',
    )}
  `,
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
      transition: box-shadow 200ms ease-in-out;

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
        background-color: var(--glide-core-surface-disabled);
        border-color: var(--glide-core-border-base);
      }

      &:is(:checked, :indeterminate):not(:disabled) ~ .checkbox {
        background-color: var(--glide-core-surface-primary);
        border-color: transparent;
      }

      &:is(:checked, :indeterminate):disabled ~ .checkbox {
        background-color: var(--glide-core-surface-primary-disabled);
        border-color: transparent;
      }

      &:checked ~ .checkbox > .checked-icon {
        visibility: visible;

        .check {
          /*
            Setting the animated offset to 48 is by design and aligns with the offset and array
            properties below. 48 was chosen to ensure the animation goes from left-to-right
            rather than right-to-left. Since our starting location is at 24 below we begin
            at the left-most corner and need to span the entire viewbox of the SVG.

            To do this, we'll multiply 24 by 2, which is the entire length of the viewbox
            going in the opposite direction so that it'll animate from left-to-right.
          */
          stroke-dashoffset: 48;
          transition: stroke-dashoffset 300ms cubic-bezier(0.32, 0, 0.67, 0);
        }
      }
    }

    .checked-icon {
      --size: 0.75rem;

      align-items: center;
      block-size: 100%;
      inline-size: 100%;
      inset-block-start: 0;
      inset-inline-start: 0;
      justify-content: center;
      pointer-events: none;
      position: absolute;

      /* We must rely on 'visibility: hidden' over 'display: none' for the animation transition to play properly. */
      visibility: hidden;

      .check {
        /*
          Safari doesn't support rem values for these CSS properties, otherwise we'd use calc() here.

          With the path in our SVG, increasing the offset or array from 0 to 24 actually animates
          it from right-to-left, which isn't the direction we want. To get it to go the correct
          direction, from left-to-right, we have to begin at 24, which is the end of the SVG
          viewbox.
        */
        stroke-dasharray: 24;
        stroke-dashoffset: 24;
      }
    }

    .indeterminate-icon {
      display: none;
      fill: var(--glide-core-icon-active);
      stroke: var(--glide-core-icon-active);
    }

    .label-tooltip {
      overflow: hidden;
    }

    .label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @media (prefers-reduced-motion: reduce) {
      .checked-icon .check {
        transition: none !important;
      }
    }
  `,
];
