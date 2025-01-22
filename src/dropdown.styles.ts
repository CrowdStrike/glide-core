import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import opacityAndScaleAnimation from './styles/opacity-and-scale-animation.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${focusOutline('.add-button:focus-visible')}
    ${opacityAndScaleAnimation('.options-and-footer:popover-open')}
    ${visuallyHidden('.item-count')}
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

    glide-core-private-label {
      &::part(private-control-and-summary) {
        /*
          The Label component's grid column styling combined with the fact that
          ".dropdown-and-options" isn't a direct descendant of that grid means that
          Dropdown's label won't shrink when space constrained without a minimum
          width on Label's ".control-and-summary". It's not clear to me why Grid
          behaves this way.
        */
        min-inline-size: var(--min-inline-size);
      }
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

      &.quiet:not(.multiple) {
        background-color: transparent;
        block-size: 1.5rem;
        border-color: transparent;
        border-radius: var(--glide-core-border-radius-round);
        column-gap: var(--glide-core-spacing-xxs);
        min-inline-size: 3.75rem;
        padding-block: 0;
        padding-inline: var(--glide-core-spacing-sm);
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
        background-color: transparent;
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
          :has(.primary-button:hover),
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
    }

    .options {
      box-sizing: border-box;
      max-block-size: calc(
        var(--private-option-height) * 9 + var(--glide-core-spacing-xxxs) * 2 +
          var(--border-width) * 2
      );
      overflow: auto;
      scroll-behavior: smooth;

      &.large {
        --private-option-height: 1.75rem;
      }

      &.small {
        --private-option-height: 1.25rem;
      }

      &.hidden {
        display: none;
      }
    }

    .default-slot {
      display: block;
      padding: var(--glide-core-spacing-xxxs);
    }

    .footer {
      background-color: var(--glide-core-surface-base-gray-lighter);
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
      background-color: var(--glide-core-surface-base-gray-lighter);
      padding: var(--glide-core-spacing-xxxs);

      &:not([hidden]) {
        display: block;
      }
    }

    .no-results {
      font-family: var(--glide-core-body-sm-font-family);
      font-size: var(--glide-core-body-sm-font-size);
      font-weight: var(--glide-core-body-sm-font-weight);
      line-height: var(--glide-core-body-sm-line-height);
      padding: 0.625rem 0.875rem;
      text-transform: capitalize;
    }

    .placeholder {
      color: var(--glide-core-text-placeholder);

      &.quiet {
        &:not(.disabled) {
          color: var(--glide-core-text-body-1);
        }
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
      white-space: nowrap;
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

    .internal-label-tooltip {
      display: none;
      overflow: hidden;

      &.visible {
        display: block;
      }
    }

    .internal-label {
      overflow: hidden;

      /*
        0.125rem so the label is vertically aligned. "vertical-align: middle" has no
        effect on flex children.
      */
      padding-block-start: 0.125rem;
      text-overflow: ellipsis;
      white-space: nowrap;
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

    .input-tooltip {
      display: none;
      flex-grow: 1;

      &.visible {
        display: block;
      }
    }

    .input-container {
      display: flex;
      flex-grow: 1;
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
      padding-block-end: 0;
      padding-inline: 0;

      &:not(.quiet) {
        /*
          0.125rem so the value is vertically aligned. "vertical-align: middle" has no
          effect flex children.
        */
        padding-block-start: 0.125rem;
      }

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: var(--glide-core-text-placeholder);
        font-family: var(--glide-core-font-sans);
      }
    }

    .ellipsis {
      background-color: var(--glide-core-surface-page);
      inset-block-end: 0;
      inset-inline-end: 0;

      /*
        0.125rem so the value is vertically aligned with the value of ".input", which
        has the same padding so it's centered vertically.
      */
      padding-block-start: 0.125rem;
      position: absolute;
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
