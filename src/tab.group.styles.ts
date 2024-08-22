import { css } from 'lit';

export default [
  css`
    .component {
      background-color: transparent;
      display: flex;
      flex-direction: column;

      & .tab-container {
        block-size: 2.125rem;
        border-block-end: 1px solid var(--glide-core-border-base-lighter);
        box-sizing: border-box;
        display: flex;

        & .overflow-button-container {
          flex-shrink: 0;
          inline-size: 1.875rem;
        }
      }

      & .tab-group {
        display: flex;
        gap: var(--glide-core-spacing-xl);
        overflow: auto hidden;
        position: relative;
        scroll-behavior: smooth;
        scrollbar-width: none;
        white-space: nowrap;

        /* "-webkit-scrollbar" is needed for Safari */

        &::-webkit-scrollbar {
          block-size: 0;
          inline-size: 0;
        }

        &::after {
          background: var(--glide-core-border-focus);
          block-size: 2px;
          content: '';
          inline-size: var(--active-tab-indicator-width);
          inset-block-end: 0;
          inset-inline: 0;
          position: absolute;
          transform-origin: left;
          translate: var(--active-tab-indicator-left, 0) 0;
        }

        &.animated-active-tab-indicator::after {
          transition:
            inline-size 250ms,
            translate 250ms;
        }
      }

      & .overflow {
        background-color: transparent;
        border: none;
        cursor: pointer;
        inline-size: 1.875rem;
        margin: 0;
        outline: none;
        padding: 0;
      }
    }

    ::slotted([slot='nav']:first-of-type) {
      padding-inline-start: var(--glide-core-spacing-md);
    }

    ::slotted([slot='nav']:last-of-type) {
      padding-inline-end: var(--glide-core-spacing-md);
    }

    @media (prefers-reduced-motion) {
      .component .tab-group {
        scroll-behavior: auto;

        &.animated-active-tab-indicator::after {
          transition: none;
        }
      }
    }
  `,
];
