import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    @keyframes animate-tooltip {
      from {
        opacity: 0;
        transform: scale(0.95);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
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

      &:focus-visible {
        ${focusOutline};
      }

      ::slotted svg {
        display: block;
      }
    }

    .tooltip {
      background-color: var(--glide-core-surface-base-dark);
      border-radius: var(--glide-core-spacing-xs);
      color: var(--glide-core-text-selected);
      display: none;
      font-family: var(--glide-core-body-md-font-family);
      font-style: var(--glide-core-body-md-font-style);
      font-weight: var(--glide-core-body-md-font-weight);
      inline-size: max-content;
      inset-block-start: 50%;
      inset-block-start: 0;
      inset-inline-start: 0;
      max-inline-size: 11.25rem;
      overflow-wrap: break-word;
      padding: var(--glide-core-spacing-xs) var(--glide-core-spacing-sm);
      position: fixed;
      z-index: 1;

      ::slotted(kbd) {
        color: var(--glide-core-text-header-2);
        display: inline-block;
        font-family: inherit;
        margin-inline-start: var(--glide-core-spacing-sm);
        white-space: nowrap;
      }

      &.visible {
        animation: animate-tooltip 250ms cubic-bezier(0.25, 0, 0.3, 1);
        display: unset;
      }
    }

    .arrow {
      background: var(--glide-core-surface-base-dark);
      block-size: 0.375rem;
      inline-size: 0.375rem;
      position: absolute;
      transform: rotate(45deg);
    }
  `,
];
