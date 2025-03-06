import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import opacityAndScaleAnimation from './styles/opacity-and-scale-animation.js';

export default [
  css`
    ${opacityAndScaleAnimation('.popover:popover-open')}
    ${focusOutline('.target:focus-visible')}
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

    .target-slot {
      /*
        Collapses additional whitespace from the slot's line height so the popover is vertically
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

    .popover {
      background-color: transparent;
      border: none;
      inset: unset;
      padding: var(--glide-core-spacing-base-xs);
      position: absolute;

      &:popover-open {
        display: flex;

        /*
          Elements with a "popover" attribute don't allow overflow. So the arrow can't
          be positioned with "position: absolute". Relative positioning is used instead.
          Flex is used to get the arrow on the correct side of the popover. Floating UI
          handles the rest.

          A simple "transform" could replace Floating UI for the arrow if not for a Chrome
          bug with "popover" when "scale()" is animated on the popover or a container within
          it. With "transform" on the arrow, the arrow is initially offset by a couple pixels
          before landing in the correct position when the animation finishes. It only happens
          when the popover is left or right of its target.
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
      --private-arrow-height: 0.5625rem;
      --private-arrow-width: 1rem;

      color: var(--glide-core-surface-modal);
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

    .default-slot {
      background-color: var(--glide-core-surface-modal);
      border-radius: var(--glide-core-spacing-base-xs);

      /* 
        ".popover" can't overflow because the Popover API won't allow it. And 
        a shadow counts as overflow. So make sure to adjust the padding on 
        ".popover" when changing this shadow so ".popover" has enough room for it.
      */
      box-shadow:
        0 3px 8px 0 rgba(0 0 0 / 15%),
        0 3px 1px 0 rgba(0 0 0 / 6%);
      box-sizing: border-box;
      color: var(--glide-core-color-static-text-default);
      display: flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-label);
      font-style: var(--glide-core-body-sm-font-style);
      font-weight: var(--glide-core-typography-weight-regular);
      inset-block-start: 50%;
      line-height: var(--glide-core-body-sm-line-height);
      max-inline-size: 23.75rem;
      min-block-size: 2rem;
      min-inline-size: 5rem;
      padding: var(--glide-core-spacing-base-sm);
    }
  `,
];
