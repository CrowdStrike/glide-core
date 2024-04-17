import { css } from 'lit';
import { focusOutline } from './styles.js';

export default [
  css`
    .target {
      background-color: transparent;
      border-width: 0;

      /* Additional whitespace and the tooltip won't be vertically centered. */
      line-height: 0;
      padding: 0;

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
      background-color: var(--cs-surface-base-dark);
      border-radius: var(--cs-spacing-xs);
      color: var(--cs-text-selected);
      display: none;
      font-family: var(--cs-body-md-font-family);
      font-style: var(--cs-body-md-font-style);
      font-weight: var(--cs-body-md-font-weight);
      inset-block-start: 50%;
      padding: var(--cs-spacing-xs) var(--cs-spacing-sm);
      position: absolute;
      transform: translateY(-50%);

      ::slotted(kbd) {
        color: var(--cs-text-header-2);
        display: inline-block;
        font-family: inherit;
        margin-inline-start: var(--cs-spacing-sm);
      }

      &.visible {
        display: unset;
      }
    }

    .triangle {
      inset-block-start: 50%;
      position: absolute;

      &.left {
        inset-inline-end: 100%;
        transform: translateY(-50%);
      }

      &.right {
        inset-inline-start: 100%;
        transform: translateY(-50%) rotate(180deg);
      }
    }
  `,
];
