import { css } from 'lit';
import { focusOutline } from './styles.js';

export default [
  css`
    details {
      font-family: var(--cs-body-xs-font-family);

      border-radius: 0.625rem;
      box-shadow: var(--cs-shadow-sm);
    }

    .summary {
      color: var(--cs-text-body-1);
      font-size: var(--cs-body-sm-font-size);
      font-weight: 700;
      line-height: 1.5rem;

      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding-inline: var(--cs-spacing-sm);
      padding-block: var(--cs-spacing-xs);

      list-style: none;

      user-select: none;
      -webkit-user-select: none;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
      }

      &::marker,  /* Chrome, Edge, Firefox */
      &::-webkit-details-marker /* Safari */ {
        display: none;
      }

      .heading-box {
        display: flex;
        align-items: center;
        flex: 1;

        overflow: hidden;
        white-space: nowrap;

        &.heading-box--with-prefix {
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
        display: flex;
        align-items: center;
        gap: 0.625rem;

        color: #00000080;

        &.suffix-slot-box--with-content {
          margin-inline-start: var(--cs-spacing-xs);
        }
      }
    }

    details[open] .summary {
      padding-block-end: var(--cs-spacing-xxs);
    }

    .chevron {
      display: flex;
      align-items: center;
      margin-inline-end: var(--cs-spacing-xxs);

      rotate: -90deg;
      transition: 250ms rotate ease;
    }

    details[open] .chevron {
      rotate: 0deg;
    }

    .content {
      color: var(--cs-text-body-1);
      font-size: var(--cs-body-sm-font-size);
      font-weight: var(--cs-body-xs-font-weight);

      /* Spacing here is intentionally hardcoded so that it aligns with the accordion label */
      padding-inline-start: 2rem;
      padding-inline-end: var(--cs-spacing-sm);
      padding-block-end: var(--cs-spacing-sm);
    }

    .content--with-prefix {
      padding-inline-start: 3.5rem;
    }
  `,
];
