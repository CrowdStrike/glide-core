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

    .character-count {
      &.error {
        font-weight: var(--glide-core-typography-weight-bold);
      }
    }

    .search-icon {
      align-items: center;
      display: flex;
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
      transition: border-color 200ms ease-in-out;

      &.focused {
        border-color: var(--glide-core-color-interactive-stroke-focus);
      }

      &:not(.disabled, .error, .readonly) {
        &:hover,
        &:has(.input:hover) {
          border-color: var(
            --glide-core-color-interactive-stroke-primary--hover
          );
        }
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

      &.disabled {
        background-color: var(
          --glide-core-color-interactive-surface-container--disabled
        );
        border-color: var(
          --glide-core-color-interactive-surface-container--disabled
        );
        color: var(--glide-core-color-interactive-text-default--disabled);
      }
    }

    .input {
      background-color: transparent;
      block-size: 2rem;
      border: none;
      color: inherit;
      cursor: inherit;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      inline-size: 100%;
      min-inline-size: 0;
      outline: none;
      padding: 0;

      &::placeholder {
        color: var(--glide-core-color-interactive-text-placeholder);
      }

      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        appearance: none;
      }

      /* The input obscures an offset outline for -webkit-calendar-picker-indicator, so 'focus-outline' is not used */
      &[type='date'] {
        &::-webkit-calendar-picker-indicator {
          border-radius: 0.125rem;
          padding: var(--glide-core-spacing-base-xxs);
        }
        /* stylelint-disable-next-line csstools/use-nesting */
        &::-webkit-calendar-picker-indicator:focus-visible {
          outline: 2px solid var(--glide-core-color-interactive-stroke-focus);
        }
      }

      &[type='color']::-webkit-color-swatch {
        border: none;
        border-radius: var(--glide-core-rounding-base-radius-xxs);
      }

      /*
        Unfortunately Firefox requires a different selector. It also
        sets the element to 100% height of its container, so we set
        a fixed block-size to match the other browsers.
      */
      &[type='color']::-moz-color-swatch {
        block-size: 1.5rem;
        border: none;
        border-radius: var(--glide-core-rounding-base-radius-xxs);
      }
    }

    .suffix-icon {
      align-items: center;
      display: flex;
    }

    .clear-icon-button,
    .password-toggle,
    ::slotted([slot='suffix-icon']) {
      align-items: center;
      background: none;
      border: none;
      color: var(--glide-core-color-interactive-icon-default);
      display: inline-flex;
      justify-content: center;
      padding-inline-start: var(--glide-core-spacing-base-xxs);
    }

    .clear-icon-button,
    .password-toggle,
    .search-icon,
    ::slotted([slot='prefix-icon']),
    ::slotted([slot='suffix-icon']) {
      display: flex;
    }

    ::slotted([slot='prefix-icon']) {
      padding-inline-end: var(--glide-core-spacing-base-xs);
    }

    .empty .clear-icon-button {
      visibility: hidden;
    }
  `,
];
