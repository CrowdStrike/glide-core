import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    .component {
      position: relative;
    }

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
      inline-size: max-content;
      inset-block-start: 50%;
      inset-block-start: 0;
      inset-inline-start: 0;
      padding: var(--cs-spacing-xs) var(--cs-spacing-sm);
      position: absolute;

      ::slotted(kbd) {
        color: var(--cs-text-header-2);
        display: inline-block;
        font-family: inherit;
        margin-inline-start: var(--cs-spacing-sm);
        white-space: nowrap;
      }

      &.visible {
        display: unset;
      }
    }

    .triangle {
      position: absolute;

      &.bottom {
        inset-block-start: calc(100% - var(--triangle-width) / 2);
        inset-inline-start: 50%;
        transform: translateX(-50%) rotate(-90deg);
      }

      &.left {
        inset-block-start: 50%;
        inset-inline-end: 100%;
        transform: translateY(-50%);
      }

      &.right {
        inset-block-start: 50%;
        inset-inline-start: 100%;
        transform: translateY(-50%) rotate(180deg);
      }

      &.top {
        inset-block-end: calc(100% - var(--triangle-width) / 2);
        inset-inline-start: 50%;
        transform: translateX(-50%) rotate(90deg);
      }
    }
  `,
];
