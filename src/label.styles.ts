import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${focusOutline('.optional-tooltip-target:focus-visible ')}
    ${visuallyHidden('.tooltips.hidden')}
  `,
  css`
    .component {
      &.horizontal {
        --private-column-gap: var(--glide-core-spacing-base-sm);

        column-gap: var(--glide-core-spacing-base-sm);
        display: grid;
        grid-template-columns: auto minmax(auto, 1fr);
      }

      &.vertical {
        display: flex;
        flex-direction: column;
      }

      &.left {
        grid-template-columns: calc(100% / 3) 1fr;
      }

      &.middle {
        grid-template-columns: calc(50% - var(--private-column-gap) / 2) calc(
            50% - var(--private-column-gap) / 2
          );
      }

      &.hidden-label {
        display: flex;
        flex-direction: column;
      }
    }

    .tooltips {
      align-items: center;
      column-gap: var(--glide-core-spacing-base-xs);
      display: flex;

      /*
        Allows for an ellipsis on the label. See the linked comment for why it's "3ch"
        instead of "0".

        - https://github.com/CrowdStrike/glide-core/pull/317#issuecomment-2297025365
        - https://css-tricks.com/flexbox-truncated-text/#aa-the-solution-is-min-width-0-on-the-flex-child
      */
      min-inline-size: 3ch;

      &.middle,
      &.left {
        justify-content: flex-end;
      }
    }

    .optional-tooltip {
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

    .optional-tooltip-target {
      background-color: transparent;
      border: none;
      border-radius: 50%;
      color: var(--glide-core-color-static-text-default);

      /*
        Any "display" that's not inline-level will do. We don't want the button to
        acquire a line box, which will make it taller than its content and thus
        make it difficult to center vertically with the label.
      */
      display: flex;
      padding: 0;

      &:focus-visible {
        outline-offset: 0;
      }
    }

    .label {
      color: var(--glide-core-color-static-text-default);
      display: block;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-label);
      font-weight: var(--glide-core-typography-weight-bold);
      line-height: 100%;
      margin-inline-start: auto;
      overflow: hidden;
      text-align: end;
      text-overflow: ellipsis;
      user-select: none;
      white-space: nowrap;

      &.disabled ::slotted(*) {
        cursor: not-allowed;
      }

      &.horizontal {
        line-height: 100%;
      }

      &.vertical {
        margin-block-end: var(--glide-core-spacing-base-xxs);
      }
    }

    .label-tooltip {
      display: flex;
      max-inline-size: 100%;

      /* https://css-tricks.com/flexbox-truncated-text/#aa-the-solution-is-min-width-0-on-the-flex-child */
      min-inline-size: 0;
    }

    .required-symbol {
      color: var(--glide-core-color-error-stroke-primary);
    }

    .control-and-summary {
      align-items: center;
      display: flex;
      gap: var(--glide-core-spacing-base-sm);
    }

    .control {
      display: block;
      max-inline-size: 100%;

      &.summaryless {
        flex-grow: 1;
      }

      &.disabled::slotted(*) {
        cursor: not-allowed;
      }

      &.vertical:not(.hidden-label) {
        margin-block-start: var(--glide-core-spacing-base-xxs);
      }
    }

    .summary {
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-label);
      font-weight: var(--glide-core-typography-weight-regular);

      &.error {
        color: var(--glide-core-color-error-text-status);
      }
    }

    .description {
      color: var(--glide-core-color-static-text-default);
      display: block;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-small);
      font-weight: var(--glide-core-typography-weight-regular);
      grid-column: 2;

      &.content {
        margin-block-start: var(--glide-core-spacing-base-xxs);
      }

      &.error {
        color: var(--glide-core-color-error-text-status);
      }
    }
  `,
];
