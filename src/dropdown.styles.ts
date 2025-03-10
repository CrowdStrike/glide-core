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
      --private-min-inline-size: 9.375rem;

      font-family: var(--glide-core-typography-family-primary);
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
        min-inline-size: var(--private-min-inline-size);
      }
    }

    .dropdown {
      --private-button-and-input-height: 1.25rem;

      align-items: center;
      background-color: var(--glide-core-color-interactive-surface-container);
      block-size: 2.125rem;
      border: 1px solid var(--glide-core-color-static-stroke-primary);
      border-radius: var(--glide-core-spacing-base-xs);
      box-sizing: border-box;
      color: var(--glide-core-color-static-text-default);
      cursor: inherit;
      display: inline-flex;
      flex-grow: 1;
      font-size: var(--glide-core-typography-size-body-label);
      font-style: var(--glide-core-body-sm-font-style);
      font-weight: var(--glide-core-typography-weight-regular);
      gap: var(--glide-core-spacing-base-xs);
      min-inline-size: var(--private-min-inline-size);
      padding-inline: var(--glide-core-spacing-base-sm);
      text-align: start;
      transition:
        background-color 200ms ease-in-out,
        border-color 200ms ease-in-out;
      user-select: none;

      &.quiet:not(.multiple) {
        background-color: transparent;
        block-size: 1.5rem;
        border-color: transparent;
        border-radius: var(--glide-core-rounding-base-radius-round);
        column-gap: var(--glide-core-spacing-base-xxs);
        min-inline-size: 3.75rem;
        padding-block: 0;
        padding-inline: var(--glide-core-spacing-base-sm);
      }

      &.disabled {
        background: var(
          --glide-core-color-interactive-surface-container--disabled
        );
        border-color: var(--glide-core-color-static-stroke-secondary);
        color: var(--glide-core-color-interactive-text-default--disabled);
      }

      &.error {
        border-color: var(--glide-core-color-error-stroke-primary);
        color: var(--glide-core-color-error-stroke-primary);
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
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          color: var(--glide-core-color-static-text-default);
        }
      }

      &:is(
          :hover,
          :has(.primary-button:hover),
          :has(.primary-button:focus-visible, .input:focus-visible)
        ):not(&.disabled, &.error, &.quiet, &.readonly) {
        border-color: var(--glide-core-color-interactive-stroke-focus);
      }

      &:has(.primary-button:focus-visible, .input:focus-visible) {
        &.quiet {
          border-color: var(--glide-core-color-interactive-stroke-focus);
        }
      }
    }

    .options-and-footer {
      --private-border-width: 1px;

      background-color: var(
        --glide-core-private-color-dialog-and-modal-surface-container
      );
      border: var(--private-border-width) solid
        var(--glide-core-color-static-surface-container-secondary);
      border-radius: var(--glide-core-rounding-base-radius-sm);
      box-shadow: var(--glide-core-shadow-lg);
      inset: unset;
      min-inline-size: var(--private-min-inline-size);
      padding: 0;
      position: absolute;
    }

    .options {
      box-sizing: border-box;
      max-block-size: calc(
        var(--private-option-height) * 9 + var(--glide-core-spacing-base-xxxs) *
          2 + var(--private-border-width) * 2
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
      padding: var(--glide-core-spacing-base-xxxs);
    }

    .footer {
      background-color: var(--glide-core-color-static-surface-header);
      display: none;
      inline-size: calc(100% - var(--glide-core-spacing-base-xxxs) * 2);
      inset-block-end: 0;
      padding: var(--glide-core-spacing-base-xxxs);

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
      font-family: var(--glide-core-typography-family-primary);
      font-weight: var(--glide-core-typography-weight-regular);
      inline-size: 100%;
      line-height: 100%;
      text-align: start;

      &.large {
        --private-size: 1rem;

        column-gap: 0.625rem;
        font-size: var(--glide-core-typography-size-body-label);
        padding-block: 0.375rem;
        padding-inline: var(--glide-core-spacing-base-sm);
      }

      &.small {
        --private-size: 0.875rem;

        column-gap: var(--glide-core-spacing-base-xs);
        font-size: var(--glide-core-typography-size-body-small);
        padding-block: var(--glide-core-spacing-base-xxxs);
        padding-inline: var(--glide-core-spacing-base-xs);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline-offset: -2px;
      }

      &:focus,
      &:hover {
        background-color: var(
          --glide-core-color-interactive-surface-container--hover
        );
      }
    }

    .select-all {
      background-color: var(--glide-core-color-static-surface-header);
      padding: var(--glide-core-spacing-base-xxxs);

      &:not([hidden]) {
        display: block;
      }
    }

    .no-results {
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-label);
      font-weight: var(--glide-core-typography-weight-regular);
      line-height: var(--glide-core-body-sm-line-height);
      padding: 0.625rem 0.875rem;
      text-transform: capitalize;
    }

    .placeholder {
      color: var(--glide-core-color-interactive-text-placeholder);

      &.quiet {
        &:not(.disabled) {
          color: var(--glide-core-color-static-text-default);
        }
      }
    }

    .tags {
      display: grid;
      gap: var(--glide-core-spacing-base-xs);

      /*
        Tags will shrink down to zero and never overflow if they don't have a minimum
        width. If they don't overflow, they'll remain visible and additionally won't be
        included in the overflow count text. Thus a minimum width.

        "3.5rem" is the size of a tag with only a single character. Ideally, its
        minimum would be wider so a few characters are always visible. But a single-
        character tag is possible and even likely. Setting a higher minimum width
        would mean single or double-character tags would have whitespace between them.
        It's equally unfortunate that Dropdown has to know anything about Tag's width.
      */
      grid-auto-columns: minmax(3.5rem, auto);
      grid-auto-flow: column;
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
      color: var(--glide-core-color-interactive-text-link);
      margin-inline-end: var(--glide-core-spacing-base-md);
      white-space: nowrap;
    }

    .single-select-icon-slot {
      &.quiet {
        &::slotted(*) {
          margin-inline-end: var(--glide-core-spacing-base-xxs);
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
      block-size: var(--private-button-and-input-height);
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
      margin-inline-end: var(--glide-core-spacing-base-xxs);
    }

    .input-tooltip {
      display: none;
      flex-grow: 1;

      &.visible {
        display: block;
      }
    }

    .input-container {
      align-items: baseline;
      display: flex;
      flex-grow: 1;
    }

    .input {
      background-color: transparent;
      block-size: var(--private-button-and-input-height);
      border: none;
      cursor: inherit;
      flex-grow: 1;
      font-family: var(--glide-core-typography-family-primary);
      font-size: inherit;
      inline-size: 100%;
      min-inline-size: 3.75rem;
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
        color: var(--glide-core-color-interactive-text-placeholder);
        font-family: var(--glide-core-typography-family-primary);
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
