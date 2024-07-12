import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    .component {
      &.horizontal {
        column-gap: var(--glide-core-spacing-sm);
        display: grid;

        /*
         Since 1fr is actually minmax(auto, 1fr), this explicit minmax will make it so
         the first column is sized to its content, and the second column fills the rest
         of the space.
        */
        grid-template-columns: auto minmax(0, 1fr);
      }

      &.vertical {
        display: flex;
        flex-direction: column;
      }

      &.hidden-label {
        display: flex;
        flex-direction: column;
      }
    }

    .tooltip-and-label {
      align-items: center;
      column-gap: var(--glide-core-spacing-xs);
      display: flex;

      &.hidden {
        ${visuallyHidden};
      }
    }

    glide-core-tooltip {
      display: none;

      &.vertical {
        order: 1;
      }

      &.visible {
        /*
      The default is "display: content". But "order" does not work with
      "display: content" and "order" is needed above.
    */
        display: block;
      }
    }

    .tooltip-target {
      background-color: transparent;
      border: none;
      border-radius: 0.0625rem;
      color: var(--glide-core-text-body-1);

      /*
      Any "display" that's not inline-level will do. We don't want the button to
      acquire a line box, which will make it taller than its content and thus
      make it difficult to center vertically with the label.
      */

      display: flex;
      padding: 0;

      &:focus-visible {
        ${focusOutline};
      }
    }

    .label {
      color: var(--glide-core-text-body-1);
      display: block;
      font-family: var(--glide-core-heading-xxxs-font-family);
      font-size: var(--glide-core-heading-xxxs-font-size);
      font-style: var(--glide-core-heading-xxxs-font-style);
      font-variant: var(--glide-core-heading-xxxs-font-variant);
      font-weight: var(--glide-core-heading-xxxs-font-weight);
      line-height: 100%;
      user-select: none;

      &.disabled ::slotted(*) {
        cursor: not-allowed;
      }

      &.horizontal {
        line-height: 100%;
      }

      &.vertical {
        margin-block-end: var(--glide-core-spacing-xxs);
      }
    }

    .required-symbol {
      color: var(--glide-core-status-error);
    }

    .control-and-summary {
      align-items: center;
      display: flex;
      gap: var(--glide-core-spacing-sm);
    }

    .control {
      display: block;

      &.summaryless {
        flex-grow: 1;
      }

      &.disabled::slotted(*) {
        cursor: not-allowed;
      }

      &.vertical:not(.hidden-label) {
        margin-block-start: var(--glide-core-spacing-xxs);
      }
    }

    .summary {
      font-family: var(--glide-core-body-sm-font-family);
      font-size: var(--glide-core-body-sm-font-size);
      font-style: var(--glide-core-body-sm-font-style);
      font-weight: var(--glide-core-body-sm-font-weight);

      &.error {
        color: var(--glide-core-status-error);
      }
    }

    .description {
      color: var(--glide-core-text-body-1);
      display: none;
      font-family: var(--glide-core-body-xs-font-family);
      font-size: var(--glide-core-body-xs-font-size);
      font-style: var(--glide-core-body-xs-font-style);
      font-weight: var(--glide-core-body-xs-font-weight);
      grid-column: 2;
      line-height: var(--glide-core-body-xs-line-height);
      margin-block-start: var(--glide-core-spacing-xxs);

      &.error {
        color: var(--glide-core-status-error);
      }

      &.visible {
        display: block;
      }
    }
  `,
];
