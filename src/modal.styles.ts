import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.component:focus-visible')}
  `,
  css`
    /* When browser support improves, we can have nicer animations with https://caniuse.com/mdn-css_at-rules_starting-style */
    @keyframes backdrop-fade-in {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes modal-open {
      from {
        opacity: 0;
        transform: scale(0.9);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .component {
      backdrop-filter: blur(100px);
      background-color: var(
        --glide-core-private-color-dialog-and-modal-surface-container
      );
      border: none;
      border-radius: var(--glide-core-rounding-base-radius-sm);
      box-shadow: var(--glide-core-effect-floating);
      font-family: var(--glide-core-typography-family-primary);
      opacity: 0;
      padding: 0;

      &[open] {
        opacity: 1;

        @media (prefers-reduced-motion: no-preference) {
          animation: modal-open 250ms;
        }
      }

      &.small {
        inline-size: 25rem;
      }

      &.medium {
        inline-size: 37.5rem;
      }

      &.large {
        inline-size: 56.25rem;
      }

      &.xlarge {
        inline-size: 71.875rem;
      }

      &:focus {
        outline: none;
      }

      &::backdrop {
        backdrop-filter: blur(3px);
        background-color: rgba(0 0 0 / 40%);

        @media (prefers-reduced-motion: no-preference) {
          animation: backdrop-fade-in 250ms;
        }
      }

      ::slotted([slot='tertiary']) {
        --private-size: 1rem;

        display: contents;
        size: 1rem;
      }
    }

    .container {
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      max-block-size: 75vh;
    }

    .header {
      background-color: var(
        --glide-core-private-color-dialog-and-modal-surface-container
      );
      padding-block: var(--glide-core-spacing-base-md)
        var(--glide-core-spacing-base-xs);
      padding-inline: var(--glide-core-spacing-base-md);
      transition: box-shadow var(--glide-core-duration-slow-01)
        var(--glide-core-animation-linear);

      /* So the box shadow isn't covered up by the body content. */
      z-index: 1;

      &.shadow {
        box-shadow: 0 10px 8px -8px
          var(--glide-core-color-effect-color-scroll-shadow);
      }
    }

    .label-and-actions {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    .description {
      color: var(--glide-core-color-static-text-default);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      margin-block: 0;
    }

    .label {
      align-items: center;
      color: var(--glide-core-color-static-text-default);
      display: flex;
      font-size: var(--glide-core-typography-size-heading-h2);
      font-weight: var(--glide-core-typography-weight-semibold);
      gap: var(--glide-core-spacing-base-xs);
      inline-size: 100%;
      line-height: var(--glide-core-typography-height-heading-h2);
      margin-block-end: 0;
      margin-block-start: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .header-actions {
      align-items: center;
      display: flex;
      gap: var(--glide-core-spacing-base-xs);

      ::slotted(*) {
        /*
          Flex so the actions don't sit on the baseline of ".header" and can be
          vertically centered.
        */
        display: flex;
      }
    }

    .severity {
      --private-size: 1.5rem;

      display: flex;

      &.informational {
        color: var(--glide-core-color-advisory-icon-info);
      }

      &.medium {
        color: var(--glide-core-color-advisory-icon-attention);
      }

      &.critical {
        color: var(--glide-core-color-advisory-icon-error);
      }
    }

    .back-button {
      /*
        Flex so the icon doesn't sit on the baseline and extend the height of
        ".back-button", making the icon not vertically centered relative to ".label".
      */
      display: flex;
    }

    .close-button {
      --private-size: 1.25rem;

      /*
        Flex so the icon doesn't sit on the baseline and extend the height of
        ".close-button", making the icon not vertically centered relative to ".label".
      */
      display: flex;
    }

    .body {
      overflow-y: auto;
      padding-inline: var(--glide-core-spacing-base-md);

      &:focus {
        outline: none;
      }
    }

    .footer {
      background-color: var(
        --glide-core-private-color-dialog-and-modal-surface-container
      );
      padding-block: var(--glide-core-spacing-base-xs)
        var(--glide-core-spacing-base-md);
      padding-inline: var(--glide-core-spacing-base-md);
      transition: box-shadow var(--glide-core-duration-slow-01)
        var(--glide-core-animation-linear);

      /* So the box shadow isn't covered up by the body content. */
      z-index: 1;

      &.shadow {
        box-shadow: 0 -10px 8px -8px
          var(--glide-core-color-effect-color-scroll-shadow);
      }
    }

    .actions {
      align-items: center;
      display: flex;
      gap: var(--glide-core-spacing-base-xs);
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    .action {
      &:first-of-type {
        margin-inline-end: auto;
      }
    }

    .tertiary-slot {
      align-items: center;
      display: flex;
      gap: var(--glide-core-spacing-base-xxs);
    }
  `,
];
