import { css } from 'lit';

export default [
  css`
    .component {
      background-color: transparent;
      display: flex;
      flex-direction: column;

      & .tab-container {
        border-block-end: 1px solid var(--glide-core-border-base-lighter);
        box-sizing: border-box;
        display: flex;
      }

      & .sticky {
        background-color: var(--glide-core-surface-page);
        inset-block-start: 0;
        position: sticky;
      }

      & .tab-group {
        display: flex;
        gap: var(--glide-core-spacing-xl);
        overflow: auto hidden;
        position: relative;
        scrollbar-width: none;
        white-space: nowrap;

        @media (prefers-reduced-motion: no-preference) {
          scroll-behavior: smooth;
        }

        /* "-webkit-scrollbar" is needed for Safari */

        &::-webkit-scrollbar {
          block-size: 0;
          inline-size: 0;
        }

        &::after {
          background: var(--glide-core-border-focus);
          block-size: 0.125rem;
          content: '';
          inline-size: var(--active-tab-indicator-width);
          inset-block-end: 0;
          inset-inline: 0;
          position: absolute;
          transform-origin: left;
          translate: var(--active-tab-indicator-translate, 0) 0;
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

      & .overflow {
        background-color: transparent;
        border: none;
        color: var(--glide-core-icon-default);
        cursor: pointer;
        flex-shrink: 0;
        inline-size: 1.875rem;
        margin: 0;
        outline: none;
        padding: 0;

        &.disabled {
          color: var(--glide-core-icon-tertiary-disabled);
        }
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
