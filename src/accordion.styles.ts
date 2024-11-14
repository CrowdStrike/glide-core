import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.summary:focus-visible')}
  `,
  css`
    .component {
      border-radius: 0.625rem;
      box-shadow: var(--glide-core-shadow-md);
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

      &::marker,
      &::-webkit-details-marker {
        display: none;
      }

      &.active {
        padding-block-end: var(--glide-core-spacing-xxs);
      }
    }

    .label-container {
      align-items: center;
      display: flex;
      flex: 1;
      gap: var(--glide-core-spacing-xs);
      overflow: hidden;
      white-space: nowrap;
    }

    .label {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chevron {
      align-items: center;
      display: flex;
      margin-inline-end: var(--glide-core-spacing-xxs);
      rotate: -90deg;

      &.unrotated {
        rotate: 0deg;
      }

      @media (prefers-reduced-motion: no-preference) {
        transition: 250ms rotate ease;
      }
    }

    .default-slot {
      color: var(--glide-core-text-body-1);
      display: block;
      font-size: var(--glide-core-body-sm-font-size);
      font-weight: var(--glide-core-body-xs-font-weight);
      overflow: hidden;
      padding-block-end: var(--glide-core-spacing-sm);

      /* Hardcoded spacing here is intentional so that it better aligns with the Accordion label */
      padding-inline: 2rem var(--glide-core-spacing-sm);

      &.indented {
        padding-inline-start: 3.5rem;
      }
    }

    .suffix-icons-slot {
      align-items: center;
      color: var(--glide-core-icon-primary);
      gap: 0.625rem;
      margin-inline-start: var(--glide-core-spacing-xs);

      &.icons {
        display: flex;
      }
    }
  `,
];
