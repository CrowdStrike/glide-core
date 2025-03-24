import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import opacityAndScaleAnimation from './styles/opacity-and-scale-animation.js';

export default [
  css`
    ${opacityAndScaleAnimation('.tooltip:popover-open')}
    ${focusOutline('.target-slot:focus-visible')}
  `,
  css`
    :host {
      /* https://github.com/CrowdStrike/glide-core/pull/307/files#r1718545771 */
      display: inline-block;
    }

    .component {
      /* https://github.com/CrowdStrike/glide-core/pull/119#issuecomment-2113314591 */
      display: flex;

      /* https://css-tricks.com/flexbox-truncated-text/#aa-the-solution-is-min-width-0-on-the-flex-child */
      min-inline-size: 0;
      position: relative;
    }

    .target-slot-container {
      /* Allows the consumer to style the target with an ellipsis when its text is truncated. */
      inline-size: 100%;
    }

    .target-slot {
      /*
        Collapses additional whitespace from the slot's line height so the tooltip is vertically
        centered against its target.
      */
      display: flex;

      /* Allows the consumer to style the target with an ellipsis when its text is truncated. */
      inline-size: 100%;
      position: relative;

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

      &:popover-open {
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
      --private-arrow-height: 0.375rem;
      --private-arrow-width: 0.625rem;

      color: var(--glide-core-surface-base-dark);
      display: flex;
      position: relative;

      &.top,
      &.bottom {
        block-size: var(--private-arrow-height);
        inline-size: var(--private-arrow-width);
      }

      &.right,
      &.left {
        block-size: var(--private-arrow-width);
        inline-size: var(--private-arrow-height);
        order: 2;
      }
    }
  `,
];
