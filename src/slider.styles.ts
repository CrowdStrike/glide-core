import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.handle:focus-visible')}
  `,
  css`
    /* The designs call for a bit more spacing than the default when vertical. */
    glide-core-private-label[orientation='vertical']::part(private-tooltips) {
      margin-block-end: var(--glide-core-spacing-base-xxs);
    }

    .slider-container {
      --private-track-size: 0.375rem;

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
      block-size: 2.125rem;
      border: 1px solid var(--glide-core-color-interactive-stroke-primary);
      border-radius: var(--glide-core-rounding-base-radius-sm);
      box-sizing: border-box;
      inline-size: 2.125rem;
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
        We had to resort to a class selector because there may be a
        bug in Chrome and Safari with ":read-only":
        https://bugs.chromium.org/p/chromium/issues/detail?id=1519649
      */
      &.readonly {
        background-color: transparent;
        border: 1px solid transparent;
        padding-inline-start: 0;
      }
    }

    .track-container {
      flex-grow: 1;
      min-inline-size: 0;

      &.single {
        /*
            Without this suggestion from design, when the handle is
            at the min, it would overflow the container and not
            align with label. This isn't needed in multiple mode
            because we have an input to help prevent this from
            happening.
         */
        padding-inline-start: var(--glide-core-spacing-base-sm);
      }
    }

    .filled-track {
      background-color: var(
        --glide-core-color-interactive-surface-container-active
      );
      block-size: var(--private-track-size);
      border-radius: var(--glide-core-rounding-base-radius-round);

      /*
        Absolute positioning is required here, as JavaScript is
        used to fill it as the user interacts with the component.
      */
      position: absolute;

      &.disabled {
        background-color: var(
          --glide-core-color-interactive-surface-container-inactive
        );
      }
    }

    .unfilled-track {
      background-color: var(--glide-core-color-static-stroke-primary);
      block-size: var(--private-track-size);
      border-radius: var(--glide-core-rounding-base-radius-round);
      inline-size: 100%;
      position: relative;

      &.disabled {
        background-color: var(--glide-core-color-static-stroke-secondary);
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

      &:not(.disabled, .readonly):is(:active, :hover) {
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
