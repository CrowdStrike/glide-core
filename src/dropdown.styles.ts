import {
  animation,
  disableAnimation,
  keyframes,
} from './styles/opacity-scale-keyframes.js';
import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    /* TODO Having this at the top breaks stuff... for some reason?  */
    ${keyframes};

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
      background-color: var(--glide-core-surface-base-lighter);
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
      min-inline-size: var(--min-inline-size);
      padding-inline: var(--glide-core-spacing-sm);
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
        background: var(--glide-core-surface-disabled);
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
      --border-width: 1px;
      --padding: var(--glide-core-spacing-xxxs);
      --private-option-height: 1.75rem;

      background-color: var(--glide-core-surface-modal);
      border: var(--border-width) solid var(--glide-core-surface-modal);
      border-radius: var(--glide-core-spacing-xs);
      box-shadow: var(--glide-core-shadow-lg);
      box-sizing: border-box;
      inset: unset;
      max-block-size: calc(
        var(--private-option-height) * 9 + var(--padding) * 2 +
          var(--border-width) * 2
      );
      min-inline-size: var(--min-inline-size);
      overflow: auto;
      padding: var(--padding);
      position: absolute;
      scroll-behavior: smooth;
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
      color: var(--glide-core-text-placeholder);
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

    .tag-overflow-text-and-button {
      column-gap: var(--glide-core-spacing-md);
      display: flex;
      margin-inline-start: auto;
    }

    .tag-overflow-text {
      color: var(--glide-core-text-link);
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
      flex-grow: 1;
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

    @media (prefers-reduced-motion: reduce) {
      .options:popover-open {
        ${disableAnimation};
      }
    }
  `,
];
