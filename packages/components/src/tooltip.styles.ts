import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    .component {
      /* https://github.com/CrowdStrike/glide-core/pull/119#issuecomment-2113314591 */
      display: flex;
      position: relative;
    }

    .target {
      background-color: transparent;
      border-width: 0;

      /* Additional whitespace from line height and the tooltip won't be vertically centered. */
      display: flex;
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
