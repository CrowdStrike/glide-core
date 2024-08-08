import { css } from 'lit';

export default [
  css`
    .component {
      background-color: transparent;
      display: flex;
      flex-direction: column;

      & .tab-container {
        border-block-end: 1px solid var(--glide-core-border-base-lighter);
        display: flex;

        & .overflow-button-container {
          flex-shrink: 0;
          inline-size: 1.875rem;
        }
      }

      & .tab-group {
        display: flex;
        overflow: auto hidden;
        scrollbar-width: none;
        white-space: nowrap;

        /* "-webkit-scrollbar" is needed for Safari */

        &::-webkit-scrollbar {
          block-size: 0;
          inline-size: 0;
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
  `,
];
