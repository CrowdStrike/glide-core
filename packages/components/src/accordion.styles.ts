import { css } from 'lit';
import { focusOutline } from './styles.js';

export default [
  css`
    details {
      border-radius: 0.625rem;
      box-shadow: var(--cs-shadow-sm);
      font-family: var(--cs-body-xs-font-family);
    }

    .summary {
      align-items: center;
      color: var(--cs-text-body-1);
      cursor: pointer;
      display: flex;
      font-size: var(--cs-body-sm-font-size);
      font-weight: 700;
      justify-content: space-between;
      line-height: 1.5rem;
      list-style: none;
      padding-block: var(--cs-spacing-xs);
      padding-inline: var(--cs-spacing-sm);
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
          gap: var(--cs-spacing-xs);
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
        color: #00000080;
        display: flex;
        gap: 0.625rem;

        &.suffix-slot-box-with-content {
          margin-inline-start: var(--cs-spacing-xs);
        }
      }

      details[open] & {
        padding-block-end: var(--cs-spacing-xxs);
      }
    }

    .chevron {
      align-items: center;
      display: flex;
      margin-inline-end: var(--cs-spacing-xxs);
      rotate: -90deg;
      transition: 250ms rotate ease;

      details[open] & {
        rotate: 0deg;
      }
    }

    .content {
      color: var(--cs-text-body-1);
      font-size: var(--cs-body-sm-font-size);
      font-weight: var(--cs-body-xs-font-weight);
      padding-block-end: var(--cs-spacing-sm);

      /* Hardcoded spacing here is intentional so that it better aligns with the Accordion label */
      padding-inline: 2rem var(--cs-spacing-sm);
      will-change: height, opacity;
    }

    .content-with-prefix {
      padding-inline-start: 3.5rem;
    }
  `,
];
