import { css } from 'lit';

export default [
  css`
    :host {
      --tabs-padding-block-end: 0rem;
      --tabs-padding-block-start: 0rem;
      --tabs-padding-inline-end: 0rem;
      --tabs-padding-inline-start: 0rem;

      background-color: transparent;
      block-size: 100%;
      display: flex;
      flex-direction: column;
    }

    .component {
      --private-transition-duration: 250ms;

      /* https://github.com/CrowdStrike/glide-core/pull/476#issue-2659854067 */
      display: contents;
    }

    .tab-container {
      border-block-end: 1px solid
        var(--glide-core-private-color-tabs-stroke-underline);
      box-sizing: border-box;
      display: flex;
      padding-block-end: var(--tabs-padding-block-end);
      padding-block-start: var(--tabs-padding-block-start);
      padding-inline-end: var(--tabs-padding-inline-end);
      padding-inline-start: var(--tabs-padding-inline-start);
    }

    .tab-group {
      display: flex;
      gap: var(--glide-core-spacing-base-xl);
      overflow: auto hidden;
      position: relative;
      scrollbar-width: none;
      white-space: nowrap;

      @media (prefers-reduced-motion: no-preference) {
        scroll-behavior: smooth;
      }
    }

    .selected-tab-indicator {
      background: var(--glide-core-color-interactive-stroke-active);
      block-size: 0.125rem;
      content: '';
      inline-size: var(--private-selected-tab-indicator-width);
      inset-block-end: 0;
      inset-inline: 0;
      position: absolute;
      transform-origin: left;
      translate: var(--private-selected-tab-indicator-translate, 0) 0;

      &.animated {
        @media (prefers-reduced-motion: no-preference) {
          transition:
            inline-size var(--private-transition-duration),
            translate var(--private-transition-duration);
        }
      }
    }

    .overflow-button {
      --private-size: 1.125rem;

      align-items: center;
      background-color: transparent;
      border: none;
      color: var(--glide-core-color-interactive-icon-default);
      cursor: pointer;
      display: flex;
      flex-shrink: 0;
      inline-size: 1.875rem;
      justify-content: center;
      margin: 0;
      outline: none;
      padding: 0;

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);
      }

      &.start {
        transform: rotate(90deg);
      }

      &.end {
        transform: rotate(-90deg);
      }

      &:hover:not(.disabled) {
        color: var(--glide-core-color-interactive-icon-active--hover);
      }
    }

    ::slotted([slot='nav']:first-of-type) {
      padding-inline-start: 0.1875rem;
    }

    ::slotted([slot='nav']:last-of-type) {
      padding-inline-end: 0.1875rem;
    }
  `,
];
