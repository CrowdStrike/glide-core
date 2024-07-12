import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    .component {
      border-radius: 0.625rem;
      box-shadow: var(--glide-core-shadow-sm);
      font-family: var(--glide-core-body-xs-font-family);
    }

    .summary {
      align-items: center;
      border-radius: 0.625rem;
      color: var(--glide-core-text-body-1);
      cursor: pointer;
      display: flex;
      font-size: var(--glide-core-body-sm-font-size);
      font-weight: 700;
      justify-content: space-between;
      line-height: 1.5rem;
      list-style: none;
      padding-block: var(--glide-core-spacing-xs);
      padding-inline: var(--glide-core-spacing-sm);
      user-select: none;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
      }

      &::marker,
      &::-webkit-details-marker {
        display: none;
      }

      .heading-box {
        align-items: center;
        display: flex;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;

        &.heading-box-with-prefix {
          gap: var(--glide-core-spacing-xs);
        }

        .prefix-slot-box {
          display: flex;
        }

        .label {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .suffix-slot-box {
        align-items: center;
        color: var(--glide-core-icon-primary);
        display: flex;
        gap: 0.625rem;

        &.suffix-slot-box-with-content {
          margin-inline-start: var(--glide-core-spacing-xs);
        }
      }

      .component[open] & {
        padding-block-end: var(--glide-core-spacing-xxs);
      }
    }

    .chevron {
      align-items: center;
      display: flex;
      margin-inline-end: var(--glide-core-spacing-xxs);
      rotate: -90deg;
      transition: 250ms rotate ease;

      .component[open] & {
        rotate: 0deg;
      }
    }

    .content {
      color: var(--glide-core-text-body-1);
      font-size: var(--glide-core-body-sm-font-size);
      font-weight: var(--glide-core-body-xs-font-weight);
      padding-block-end: var(--glide-core-spacing-sm);

      /* Hardcoded spacing here is intentional so that it better aligns with the Accordion label */
      padding-inline: 2rem var(--glide-core-spacing-sm);
    }

    .content-with-prefix {
      padding-inline-start: 3.5rem;
    }
  `,
];
