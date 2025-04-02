import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${visuallyHidden('.character-count .hidden')}
  `,
  css`
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

    .input-container {
      align-items: center;
      background-color: var(--glide-core-color-interactive-surface-container);
      border: 1px solid var(--glide-core-color-interactive-stroke-primary);
      border-radius: var(--glide-core-rounding-base-radius-sm);
      box-sizing: border-box;
      color: var(--glide-core-color-interactive-text-default);
      display: flex;
      min-inline-size: 3.75rem;
      padding-inline: var(--glide-core-spacing-base-sm);

      &.focused,
      &:has(.input:hover) {
        border-color: var(--glide-core-color-interactive-stroke-focus);
        transition: border-color 200ms ease-in-out;
      }

      &:hover,
      &:has(.input:hover) {
        border-color: var(--glide-core-color-interactive-stroke-primary--hover);
        transition: border-color 200ms ease-in-out;
      }

      &.error {
        border-color: var(--glide-core-color-error-stroke-primary);
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

      &.disabled {
        background-color: var(
          --glide-core-color-interactive-surface-container--disabled
        );
        border-color: var(
          --glide-core-color-interactive-stroke-primary--disabled
        );
        color: var(--glide-core-color-interactive-text-default--disabled);
      }
    }

    .slider-container {
      /* TONY TODO: Should use --private-thumb-size instead */
      --private-thumb-width: 0.75rem;

      box-sizing: border-box;
      display: inline-flex;
      inline-size: 100%;
      max-inline-size: 100%;
      padding-inline-end: calc(var(--private-thumb-width) * 2);

      /* TONY TODO: I like this... but does design? */
      &:has(.input:focus-visible) {
        outline: 2px solid var(--glide-core-color-interactive-stroke-focus) !important;
        outline-offset: 8px;
      }
    }

    .input {
      --private-track-height: 0.25rem;
      --private-thumb-size: 1.125rem;

      appearance: none;
      flex-shrink: 0;
      inline-size: 100%;
      margin: 0;
      min-inline-size: 0;
      outline: none;

      /* TODO: Need to add all of the -moz- prefix styles too */
      &::-webkit-slider-runnable-track {
        block-size: var(--private-track-height);
      }

      &::-webkit-slider-thumb {
        appearance: none;
        background-color: white;
        block-size: var(--private-thumb-size);
        border: 2px solid var(--glide-core-color-interactive-stroke-active);
        border-radius: var(--glide-core-rounding-base-radius-round);
        box-shadow: none;
        inline-size: var(--private-thumb-size);

        /* Have to knock the thumb into place unfortunately */
        margin-block-start: calc(var(--private-track-height) / 2);
        transform: translateY(-50%);
      }

      &:focus::-webkit-slider-thumb,
      &::-webkit-slider-thumb:hover {
        border: 4px solid
          var(--glide-core-color-interactive-stroke-active--hover);
        box-shadow: var(--glide-core-effect-hovered);
      }
    }

    .minimum-input {
      background-image: linear-gradient(
        to right,
        var(--glide-core-color-static-stroke-primary)
          var(--private-filled-position),
        var(--glide-core-color-interactive-surface-container-active)
          var(--private-filled-position)
      );
      border-end-start-radius: var(--glide-core-rounding-base-radius-md);
      border-start-start-radius: var(--glide-core-rounding-base-radius-md);
    }

    .maximum-input {
      background-image: linear-gradient(
        to right,
        var(--glide-core-color-interactive-surface-container-active)
          var(--private-filled-position),
        var(--glide-core-color-static-stroke-primary)
          var(--private-filled-position)
      );
      border-end-end-radius: var(--glide-core-rounding-base-radius-md);
      border-start-end-radius: var(--glide-core-rounding-base-radius-md);
    }

    .range-slider-container {
      align-items: center;
      display: flex;
      gap: 16px;
      inline-size: 100%;
      justify-content: space-between;
    }

    .range-values {
      display: flex;
      justify-content: space-between;
      margin-block-start: 10px;
    }

    .value-container {
      align-items: center;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      gap: 8px;
      inline-size: auto;
    }

    .value-input {
      background-color: var(--glide-core-color-interactive-surface-container);
      border: 1px solid var(--glide-core-color-interactive-stroke-primary);
      border-radius: var(--glide-core-rounding-base-radius-sm);
      inline-size: 70px;
      padding: 8px;
      text-align: center;
    }

    .slider {
      background: #e0e0e0;
      block-size: 6px;
      border-radius: 3px;
      inline-size: 100%;
      position: relative;
    }

    .slider-fill {
      background: #4287f5;
      block-size: 6px;
      border-radius: 3px;
      position: absolute;
    }

    .thumb {
      background: white;
      block-size: 24px;
      border: 2px solid #4287f5;
      border-radius: 50%;
      box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
      cursor: pointer;
      inline-size: 24px;
      inset-block-start: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      transition: box-shadow 0.2s;
    }

    .thumb:hover,
    .thumb:active {
      box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
    }

    .thumb:focus {
      box-shadow: 0 0 0 3px rgb(66 135 245 / 30%);
      outline: none;
    }

    /* TONY TODO: Use visuallyHidden mixin instead */
    .sr-only {
      block-size: 1px;
      border: 0;
      clip: rect(0, 0, 0, 0);
      inline-size: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap;
    }

    .slider-layout {
      align-items: center;
      display: flex;
      gap: 16px;
      justify-content: space-between;
      inline-size: 100%;
    }

    .slider-wrapper {
      flex: 1;
      min-inline-size: 0; /* Prevents flex items from overflowing */
    }

    .value-container.left-input {
      margin-inline-end: 8px;
    }

    .value-container.right-input {
      margin-inline-start: 8px;
    }
  `,
];
