import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .component {
      --min-inline-size: 9.375rem;

      font-family: var(--glide-core-font-sans);
    }

    .selected-option-labels {
      ${visuallyHidden};
    }

    .dropdown-and-options {
      display: flex;
      position: relative;
    }

    .dropdown {
      --button-and-input-height: 1.25rem;

      align-items: center;
      block-size: 2.125rem;
      border: 1px solid var(--glide-core-border-base-lighter);
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
      justify-content: space-between;
      min-inline-size: var(--min-inline-size);
      padding-inline: var(--glide-core-spacing-xs);
      text-align: start;
      user-select: none;
      white-space: nowrap;

      &.quiet:not(.multiple) {
        background-color: transparent;
        border: unset;
        font-size: var(--glide-core-heading-xxxs-font-size);
        font-style: var(--glide-core-heading-xxxs-font-style);
        font-weight: var(--glide-core-heading-xxxs-font-weight);
        gap: var(--glide-core-spacing-xxs);
        min-inline-size: 3.75rem;
        padding-block: 0;
        padding-inline: 0.375rem;
      }

      &.disabled {
        background: var(--glide-core-surface-base-gray-light);
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

      &:has(.button:focus-visible, .input:focus-visible) {
        ${focusOutline};
      }

      &:hover:not(&.error, &.disabled, &.readonly) {
        border-color: var(--glide-core-border-base);
      }

      &.quiet:hover:not(&.error, &.disabled, &.multiple, &.readonly) {
        background-color: var(--glide-core-surface-hover);
      }
    }

    .options {
      background-color: var(--glide-core-surface-modal);
      border: 1px solid var(--glide-core-surface-modal);
      border-radius: var(--glide-core-spacing-xs);
      box-shadow: var(--glide-core-shadow-lg);
      box-sizing: border-box;
      inset-block-start: 100%;
      inset-inline-start: 0;
      margin-block: var(--glide-core-spacing-xxs) 0;
      min-inline-size: var(--min-inline-size);
      padding: var(--glide-core-spacing-xxxs);
      position: absolute;
      visibility: hidden;

      /*
        ".dropdown-and-options" is relative and many Dropdowns may be stacked in a column.
        This ensures the ".options" of Dropdowns earlier in the column aren't obscured by
        the ".dropdown-and-options" that come later.
      */
      z-index: 1;

      &.visible {
        visibility: visible;
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

    .tag-overflow-text {
      color: var(--glide-core-text-link);
      margin-inline-end: var(--glide-core-spacing-md);
    }

    .button {
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

    .input {
      background-color: transparent;
      block-size: var(--button-and-input-height);
      border: none;
      cursor: inherit;
      font-size: inherit;
      min-inline-size: var(--min-inline-size);
      padding: 0;

      &:focus {
        outline: none;
      }

      &.single.selection:not(:focus) {
        &::placeholder {
          color: inherit;
        }
      }

      &::placeholder {
        font-family: var(--glide-core-font-sans);
      }
    }

    .caret-icon {
      &.disabled,
      &.readonly {
        color: var(--glide-core-surface-selected-disabled);
      }
    }
  `,
];
