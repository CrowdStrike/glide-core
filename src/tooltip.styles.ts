import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.target:focus-visible')}
  `,
  css`
    @keyframes opacity-and-scale {
      from {
        opacity: 0;
        transform: scale(0.95);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .tooltip:popover-open {
        animation: none !important;
      }
    }

    :host {
      display: inline-block;
    }

    .component {
      /* https://github.com/CrowdStrike/glide-core/pull/119#issuecomment-2113314591 */
      display: flex;

      /* https://css-tricks.com/flexbox-truncated-text/#aa-the-solution-is-min-width-0-on-the-flex-child */
      min-inline-size: 0;
      position: relative;
    }

    .target {
      background-color: transparent;
      border-width: 0;

      /*
        Additional whitespace from line height and the tooltip won't be vertically
        centered against its target.
      */
      display: flex;

      /* Allows the consumer to style the target with an ellipsis when its text is truncated. */
      inline-size: 100%;
      padding: 0;
      position: relative;

      &:focus {
        outline: none;
      }

      ::slotted svg {
        display: block;
      }
    }

    .tooltip {
      background-color: transparent;
      border: none;
      inset: unset;
      padding: 0;
      position: absolute;

      ::slotted(kbd) {
        color: var(--glide-core-text-header-2);
        display: inline-block;
        font-family: inherit;
        font-size: inherit;
        white-space: nowrap;
      }

      &:popover-open {
        animation: opacity-and-scale 250ms cubic-bezier(0.25, 0, 0.3, 1);
        display: flex;

        /*
          Elements with a "popover" attribute don't allow overflow. So the arrow can't
          be positioned with "position: absolute". Relative positioning is used instead.
          Flex is used to get the arrow on the correct side of the tooltip. Floating UI
          handles the rest.

          A simple "transform" could replace Floating UI for the arrow if not for a Chrome
          bug with "popover" when "scale()" is animated on the popover or a container within
          it. With "transform" on the arrow, the arrow is initially offset by a couple pixels
          before landing in the correct position when the animation finishes. It only happens
          when the tooltip is left or right of its target.
        */

        &.top {
          flex-direction: column-reverse;
        }

        &.right {
          flex-direction: row-reverse;
        }

        &.bottom {
          flex-direction: column;
        }
      }
    }

    .arrow {
      --arrow-height: 0.375rem;
      --arrow-width: 0.625rem;

      display: flex;
      position: relative;

      &.top,
      &.bottom {
        block-size: var(--arrow-height);
        inline-size: var(--arrow-width);
      }

      &.right,
      &.left {
        block-size: var(--arrow-width);
        inline-size: var(--arrow-height);
        order: 2;
      }
    }

    .default-slot {
      align-items: center;
      background-color: var(--glide-core-surface-base-dark);
      border-radius: var(--glide-core-spacing-xs);
      color: var(--glide-core-text-selected);
      column-gap: var(--glide-core-spacing-xs);
      display: flex;
      font-family: var(--glide-core-body-md-font-family);
      font-size: var(--glide-core-body-sm-font-size);
      font-style: var(--glide-core-body-sm-font-style);
      font-weight: var(--glide-core-body-md-font-weight);
      hyphens: auto;
      inline-size: max-content;
      inset-block-start: 50%;
      max-inline-size: 11.25rem;
      overflow-wrap: break-word;
      padding: var(--glide-core-spacing-xs) var(--glide-core-spacing-sm);
    }
  `,
];
