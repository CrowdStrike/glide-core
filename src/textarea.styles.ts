import { css, unsafeCSS } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

/*
  `field-sizing` is only supported in Chrome and Edge
  at the moment (https://caniuse.com/mdn-css_properties_field-sizing),
  making this a progressive enhancement. This functionality is additive,
  rather than required for use with our components.

  `field-sizing` is also not recognized by lit-plugin, so we are seeing
  https://github.com/runem/lit-analyzer/issues/157 when
  attempting to use it directly in our CSS below. This use of unsafeCSS
  is a workaround for that bug for the time being.
 */
const fieldSizingContent = unsafeCSS(`
  field-sizing: content;
`);

export default [
  css`
    ${visuallyHidden('.character-count .hidden')}
  `,
  css`
    glide-core-label[orientation='horizontal']::part(private-tooltips) {
      align-items: flex-start;
      margin-block-start: var(--glide-core-spacing-base-sm);
    }

    .textarea-container {
      display: flex;
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

    textarea {
      appearance: none;
      background-color: var(--glide-core-color-interactive-surface-container);
      border: 1px solid var(--glide-core-color-interactive-stroke-primary);
      border-radius: var(--glide-core-rounding-base-radius-sm);
      color: var(--glide-core-color-interactive-text-default);
      cursor: inherit;
      display: block;
      flex-grow: 1;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      max-block-size: 5lh;
      min-block-size: 3lh;
      min-inline-size: 3.75rem;
      padding: var(--glide-core-spacing-base-xs)
        var(--glide-core-spacing-base-sm);
      resize: vertical;
      transition:
        border-color var(--glide-core-duration-moderate-02)
          var(--glide-core-animation-swoop),
        box-shadow var(--glide-core-duration-moderate-02)
          var(--glide-core-animation-swoop);

      /*
        Because 'field-sizing: content' is used, it allows the
        element to grow to fill the content. This is problematic in
        our case because it means our textarea could force its
        container to scroll when a user enters long, unbroken text.
        This issue was discussed at https://issues.chromium.org/issues/340291325,
        but for the select element. Using 'max-width: 100%' won't
        solve the issue, and we can't use a fixed max-width, as we
        won't know the layouts our consumers will use our components
        in. So setting this CSS property allows for the textarea to
        naturally break the value up by words and prevent horizontal
        scrolling.
      */
      word-break: break-word;

      ${fieldSizingContent};

      &:focus {
        outline: none;
      }

      &:focus-visible:not([readonly]) {
        &:not(.error) {
          border-color: var(--glide-core-color-interactive-stroke-focus);
          box-shadow: inset 0 0 0 1px
            var(--glide-core-color-interactive-stroke-focus);
        }

        &.error {
          box-shadow: inset 0 0 0 1px
            var(--glide-core-color-advisory-stroke-error-primary);
        }
      }

      &:hover {
        border-color: var(--glide-core-color-interactive-stroke-primary--hover);
      }

      &::placeholder {
        color: var(--glide-core-color-interactive-text-placeholder);
      }

      &.error {
        border-color: var(--glide-core-color-advisory-stroke-error-primary);
      }

      &[readonly] {
        background-color: var(
          --glide-core-color-interactive-surface-container--disabled
        );
        border-color: transparent;
        outline: none;
        resize: none;
        transition: none;
      }

      &[disabled] {
        background-color: var(
          --glide-core-color-interactive-surface-container--disabled
        );
        border: 0.0625rem solid
          var(--glide-core-color-interactive-surface-container--disabled);
        color: var(--glide-core-color-interactive-text-default--disabled);
      }
    }

    .meta {
      column-gap: var(--glide-core-spacing-base-xs);
      display: flex;
      font-size: var(--glide-core-typography-size-body-small);
      justify-content: space-between;
    }

    .character-count {
      &.error {
        font-weight: var(--glide-core-typography-weight-bold);
      }
    }
  `,
];
