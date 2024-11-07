import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import opacityAndScaleAnimation from './styles/opacity-and-scale-animation.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${focusOutline('.add-button:focus-visible')}
    ${opacityAndScaleAnimation('.options-and-footer:popover-open')}
    ${visuallyHidden('.selected-option-labels')}
  `,
  css`
    .component {
      --min-inline-size: 9.375rem;

      font-family: var(--glide-core-font-sans);
    }

    .dropdown-and-options {
      display: flex;
      position: relative;
    }

    .dropdown {
      --button-and-input-height: 1.25rem;

      align-items: center;
      background-color: var(--glide-core-surface-base-lighter);
      block-size: 2.125rem;
      border: 1px solid var(--glide-core-border-base);
      border-radius: var(--glide-core-spacing-xs);
      box-sizing: border-box;
      color: var(--glide-core-text-body-1);
      cursor: inherit;
      display: inline-flex;
      flex-grow: 1;
      font-size: var(--glide-core-body-sm-font-size);
      font-style: var(--glide-core-body-sm-font-style);
      font-weight: var(--glide-core-body-sm-font-weight);
      gap: var(--glide-core-spacing-xs);
      min-inline-size: var(--min-inline-size);
      padding-inline: var(--glide-core-spacing-sm);
      text-align: start;
      transition:
        background-color 200ms ease-in-out,
        border-color 200ms ease-in-out;
      user-select: none;
      white-space: nowrap;

      &.quiet:not(.multiple) {
        background-color: transparent;
        block-size: 1.5rem;
        border-color: transparent;
        border-radius: var(--glide-core-border-radius-round);
        column-gap: var(--glide-core-spacing-xxs);
        min-inline-size: 3.75rem;
        padding-block: 0;
        padding-inline: 0.375rem;
      }

      &.disabled {
        background: var(--glide-core-surface-disabled);
        border-color: var(--glide-core-border-base-light);
        color: var(--glide-core-text-tertiary-disabled);
      }

      &.error {
        border-color: var(--glide-core-status-error);
        color: var(--glide-core-status-error);
      }

      &.readonly {
        border-color: transparent;
        padding-inline-start: 0;
      }

      &.quiet {
        &:is(
            :hover,
            :has(.primary-button:focus-visible, .input:focus-visible)
          ):not(&.error, &.disabled, &.multiple, &.readonly) {
          background-color: var(--glide-core-surface-hover);
          color: var(--glide-core-text-body-1);
        }
      }

      &:is(
          :hover,
          :has(.primary-button:focus-visible, .input:focus-visible)
        ):not(&.disabled, &.error, &.quiet, &.readonly) {
        border-color: var(--glide-core-border-focus);
      }

      &:has(.primary-button:focus-visible, .input:focus-visible) {
        &.quiet {
          border-color: var(--glide-core-border-focus);
        }
      }
    }

    .options-and-footer {
      --border-width: 1px;

      background-color: var(--glide-core-surface-modal);
      border: var(--border-width) solid var(--glide-core-border-base-lighter);
      border-radius: var(--glide-core-spacing-xs);
      box-shadow: var(--glide-core-shadow-lg);
      inset: unset;
      min-inline-size: var(--min-inline-size);
      padding: 0;
      position: absolute;

      &.hidden {
        display: none;
      }
    }

    .options {
      --padding: var(--glide-core-spacing-xxxs);

      box-sizing: border-box;
      max-block-size: calc(
        var(--private-option-height) * 9 + var(--padding) * 2 +
          var(--border-width) * 2
      );
      overflow: auto;
      padding: var(--padding);
      scroll-behavior: smooth;

      &.large {
        --private-option-height: 1.75rem;
      }

      &.small {
        --private-option-height: 1.25rem;
      }
    }

    .footer {
      background-color: var(--glide-core-surface-page);
      border-block-start: 1px solid var(--glide-core-border-base);
      box-shadow: 0 -8px 8px -8px
        var(--glide-core-surface-base-gray, rgb(0 0 0 / 40%));
      display: none;
      inline-size: calc(100% - var(--glide-core-spacing-xxxs) * 2);
      inset-block-end: 0;
      padding: var(--glide-core-spacing-xxxs);

      /* 
        "sticky" is a little hack so that footer is absolutely positioned but 
        its space in layout is preserved, so it doesn't overlap the last option.
      */
      position: sticky;

      &.visible {
        display: block;
      }
    }

    .add-button {
      align-items: center;
      background-color: transparent;
      border: none;
      border-radius: 0.75rem;
      display: flex;
      font-family: var(--glide-core-body-sm-font-family);
      font-weight: var(--glide-core-body-sm-font-weight);
      inline-size: 100%;
      line-height: 100%;
      text-align: start;

      &.large {
        --size: 1rem;

        column-gap: 0.625rem;
        font-size: var(--glide-core-body-sm-font-size);
        padding-block: 0.375rem;
        padding-inline: var(--glide-core-spacing-sm);
      }

      &.small {
        --size: 0.875rem;

        column-gap: var(--glide-core-spacing-xs);
        font-size: var(--glide-core-body-xs-font-size);
        padding-block: var(--glide-core-spacing-xxxs);
        padding-inline: var(--glide-core-spacing-xs);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline-offset: -2px;
      }

      &:focus,
      &:hover {
        background-color: var(--glide-core-surface-hover);
      }
    }

    .select-all {
      border-block-end: 1px solid var(--glide-core-border-base-light);
      margin-block-end: var(--glide-core-spacing-xxxs);
      padding-block-end: var(--glide-core-spacing-xxxs);

      &:not([hidden]) {
        display: block;
      }
    }

    .placeholder {
      /*
        Using the browser's default placeholder color for now, as
        '--glide-core-text-placeholder' has dark mode issues. Aligns
        with Input and Textarea as suggested by design.
      */
      color: rgb(117 117 117);

      &.quiet {
        &:not(.disabled) {
          color: var(--glide-core-text-body-1);
        }
      }

      &.disabled {
        color: var(--glide-core-text-tertiary-disabled);
      }
    }

    .tags {
      display: flex;
      gap: var(--glide-core-spacing-xs);
      list-style-type: none;
      margin-block: 0;
      padding-inline-start: 0;
    }

    .tag-container {
      display: block;

      &.hidden {
        display: none;
      }
    }

    .tag-overflow-and-buttons {
      align-items: center;
      display: flex;
      margin-inline-start: auto;
    }

    .tag-overflow-text {
      align-content: center;
      color: var(--glide-core-text-link);
      margin-inline-end: var(--glide-core-spacing-md);
    }

    .single-select-icon-slot {
      &.quiet {
        &::slotted(*) {
          margin-inline-end: var(--glide-core-spacing-xxs);
        }
      }

      &::slotted(*) {
        block-size: 1rem;
        display: block;
        inline-size: 1rem;
      }
    }

    .internal-label {
      /*
        2px so the label is vertically aligned. "vertical-align: middle" has no
        effect on flex children.
      */
      padding-block-start: 0.125rem;
    }

    .primary-button {
      align-items: center;
      background: none;
      block-size: var(--button-and-input-height);
      border: none;
      cursor: inherit;
      display: flex;
      padding: 0;

      &:focus {
        outline: none;
      }
    }

    .edit-button {
      display: flex;
      margin-inline-end: var(--glide-core-spacing-xxs);
    }

    .input {
      background-color: transparent;
      block-size: var(--button-and-input-height);
      border: none;
      cursor: inherit;
      flex-grow: 1;
      font-family: var(--glide-core-font-sans);
      font-size: inherit;
      min-inline-size: var(--min-inline-size);

      /*
        2px so the value is vertically aligned. "vertical-align: middle" has no
        effect flex children.
      */
      padding-block: 0.125rem 0;
      padding-inline: 0;

      &:focus {
        outline: none;
      }

      &::placeholder {
        font-family: var(--glide-core-font-sans);
      }
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
