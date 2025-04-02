import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.handle:focus-visible')}
  `,
  css`
    .slider-container {
      align-items: center;
      display: flex;
      gap: var(--glide-core-spacing-base-md);
      inline-size: 100%;
      justify-content: space-between;
    }

    .input {
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -moz-appearance: textfield;
      background-color: var(--glide-core-color-interactive-surface-container);
      border: 1px solid var(--glide-core-color-interactive-stroke-primary);
      border-radius: var(--glide-core-rounding-base-radius-sm);
      inline-size: 1.5rem;
      padding-block: 0.4688rem;
      padding-inline: var(--glide-core-spacing-base-sm);
      text-align: center;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
      }

      &:focus,
      &:hover {
        border-color: var(--glide-core-color-interactive-stroke-primary--hover);
        outline: none;
        transition: border-color 200ms ease-in-out;
      }

      &.disabled {
        background-color: var(
          --glide-core-color-interactive-surface-container--disabled
        );
        border-color: var(
          --glide-core-color-interactive-stroke-primary--disabled
        );
        color: var(--glide-core-color-interactive-text-default--disabled);
      }

      &.error {
        border-color: var(--glide-core-color-advisory-stroke-error-primary);
      }

      /*
        We had to resort to a class selector because there may be a bug in Chrome and Safari
        with ":read-only": https://bugs.chromium.org/p/chromium/issues/detail?id=1519649
      */
      &.readonly {
        background-color: transparent;
        border: 1px solid transparent;
        padding-inline-start: 0;
      }
    }

    .slider-wrapper {
      flex: 1;
      min-inline-size: 0;

      &.single {
        padding-inline-start: var(--glide-core-spacing-base-sm);
      }
    }

    .open-track {
      background-color: var(--glide-core-color-static-stroke-primary);
      block-size: 0.375rem;
      border-radius: var(--glide-core-rounding-base-radius-round);
      inline-size: 100%;
      position: relative;

      &.disabled {
        background-color: var(--glide-core-color-static-stroke-secondary);
      }
    }

    .filled-track {
      background-color: var(
        --glide-core-color-interactive-surface-container-active
      );
      block-size: 0.375rem;
      border-radius: var(--glide-core-rounding-base-radius-round);

      /*
        Absolute positioning is required here, as we use JavaScript
        to fill the track based on how the user interacts with the
        component.
      */
      position: absolute;

      &.disabled {
        background-color: var(
          --glide-core-color-interactive-surface-container-inactive
        );
      }
    }

    .handle {
      background-color: var(
        --glide-core-private-color-slider-and-scrollbar-surface-handle
      );
      block-size: 1.5rem;
      border: 2px solid var(--glide-core-color-interactive-stroke-active);
      border-radius: var(--glide-core-rounding-base-radius-round);
      box-sizing: border-box;
      cursor: pointer;
      inline-size: 1.5rem;
      inset-block-start: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      transition:
        border 150ms ease-in-out,
        box-shadow 150ms ease-in-out;

      &:not(.disabled, .readonly):active,
      &:not(.disabled, .readonly):hover {
        border: 4px solid var(--glide-core-color-interactive-stroke-active);
        box-shadow: var(--glide-core-effect-hovered);
      }

      &.disabled {
        border-color: var(--glide-core-color-interactive-stroke-primary);
        cursor: not-allowed;
        transition: none;
      }

      &.readonly {
        transition: none;
      }
    }

    .meta {
      column-gap: var(--glide-core-spacing-base-xs);
      display: flex;
      font-size: var(--glide-core-typography-size-body-small);
      grid-column: 2;
      justify-content: space-between;
    }

    .description {
      display: block;

      &.hidden {
        display: none;
      }
    }

    .validity-message {
      display: block;
    }
  `,
];
