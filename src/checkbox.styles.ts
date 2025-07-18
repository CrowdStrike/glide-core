import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.input:focus-visible ~ .checkbox')}
    ${focusOutline('.input:focus ~ .checkbox.error')}
  `,
  css`
    .label-and-input-and-checkbox {
      align-items: center;
      column-gap: var(--glide-core-spacing-base-xs);
      display: flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      line-height: 100%;
    }

    .input-and-checkbox-and-summary {
      display: flex;
      gap: var(--glide-core-spacing-base-sm);
    }

    .input-and-checkbox {
      block-size: 0.875rem;

      /* Don't shrink when the summary wraps. */
      flex-shrink: 0;
      inline-size: 0.875rem;
      position: relative;

      &.disabled {
        cursor: not-allowed;
      }
    }

    .checkbox {
      align-items: center;
      background-color: var(
        --glide-core-private-color-checkbox-surface-background-idle
      );
      block-size: 100%;
      border: 1px solid var(--glide-core-color-interactive-stroke-contrast);
      border-radius: var(--glide-core-rounding-base-radius-xxs);
      box-sizing: border-box;
      color: var(
        --glide-core-private-color-checkbox-surface-background-selected--default
      );
      display: flex;
      flex-shrink: 0; /* Don't shrink when the summary wraps. */
      inline-size: 100%;
      justify-content: center;

      @media (prefers-reduced-motion: no-preference) {
        transition:
          border-color 200ms ease-in-out,
          box-shadow 200ms ease-in-out;
      }

      &.error:not(.disabled) {
        border-color: var(--glide-core-color-advisory-stroke-error-primary);
      }

      &:not(.disabled):hover {
        box-shadow: var(--glide-core-effect-hovered);
      }
    }

    .input {
      block-size: 100%;
      cursor: inherit;
      inline-size: 100%;
      inset-block-start: 0;
      inset-inline-start: 0;
      margin: 0;
      opacity: 0;
      position: absolute;

      &:not(:disabled):hover ~ .checkbox {
        border-color: var(--glide-core-color-interactive-stroke-focus);
        box-shadow: var(--glide-core-effect-hovered);
      }

      &:checked:not(:indeterminate) ~ .checkbox .checked-icon {
        display: flex;
      }

      &:indeterminate ~ .checkbox .indeterminate-icon {
        display: inline-block;
      }

      &:disabled:not(:is(:checked, :indeterminate)) ~ .checkbox {
        background-color: var(
          --glide-core-private-color-checkbox-surface-background-idle
        );
        border-color: var(
          --glide-core-private-color-checkbox-icon-default--disabled
        );
      }

      &:is(:checked, :indeterminate):not(:disabled) ~ .checkbox {
        background-color: var(--glide-core-color-interactive-icon-active);
        border-color: transparent;
      }

      &:is(:checked, :indeterminate):disabled ~ .checkbox {
        background-color: var(
          --glide-core-private-color-checkbox-icon-default--disabled
        );
        border-color: transparent;

        .indeterminate-icon {
          fill: var(--glide-core-private-color-checkbox-icon-default--disabled);
          stroke: var(
            --glide-core-private-color-checkbox-icon-default--disabled
          );
        }
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

          @media (prefers-reduced-motion: no-preference) {
            transition: stroke-dashoffset 300ms cubic-bezier(0.32, 0, 0.67, 0);
          }
        }
      }
    }

    .checked-icon {
      --private-size: 0.75rem;

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
      fill: var(--glide-core-color-interactive-icon-active);
      stroke: var(--glide-core-color-interactive-icon-active);
    }

    .icon-and-label {
      align-items: center;
      column-gap: var(--glide-core-spacing-base-xs);
      display: flex;
      overflow: hidden;
    }

    .label-tooltip {
      overflow: hidden;
    }

    .label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);
      }
    }

    .description {
      display: block;

      &.hidden {
        display: none;
      }
    }

    .summary {
      &.disabled {
        color: var(--glide-core-color-interactive-text-default--disabled);
      }
    }

    .validity-message {
      display: block;
    }
  `,
];
