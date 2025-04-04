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

      &::after {
        background: var(--glide-core-color-interactive-stroke-active);
        block-size: 0.125rem;
        content: '';
        inline-size: var(--private-selected-tab-indicator-width);
        inset-block-end: 0;
        inset-inline: 0;
        position: absolute;
        transform-origin: left;
        translate: var(--private-selected-tab-indicator-translate, 0) 0;
      }

      &.animated {
        @media (prefers-reduced-motion: no-preference) {
          &::after {
            transition:
              inline-size 250ms,
              translate 250ms;
          }
        }
      }
    }

    .overflow-button {
      --private-size: 1.125rem;

      align-items: center;
      display: flex;

      &.start {
        padding-inline-start: var(--glide-core-spacing-base-xs);

        & svg {
          transform: rotate(90deg);
        }
      }

      &.end {
        padding-inline-end: var(--glide-core-spacing-base-xs);

        svg {
          transform: rotate(-90deg);
        }
      }
    }

    ::slotted([slot='nav']:first-of-type) {
      padding-inline-start: var(--glide-core-spacing-base-sm);
    }

    ::slotted([slot='nav']:last-of-type) {
      padding-inline-end: var(--glide-core-spacing-base-sm);
    }
  `,
];
