import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.summary:focus-visible')}
  `,
  css`
    .component {
      border: 1px solid
        var(--glide-core-color-static-surface-container-secondary);
      border-radius: var(--glide-core-rounding-base-radius-sm);
      box-shadow: var(--glide-core-effect-raised);
      font-family: var(--glide-core-typography-family-primary);
    }

    .summary {
      align-items: center;
      border-radius: var(--glide-core-rounding-base-radius-sm);
      color: var(--glide-core-color-static-text-default);
      cursor: pointer;
      display: flex;
      font-size: var(--glide-core-typography-size-heading-h4);
      font-weight: var(--glide-core-typography-weight-bold);
      justify-content: space-between;
      line-height: var(--glide-core-typography-height-heading-h4);
      list-style: none;
      padding-block: var(--glide-core-spacing-base-xs);
      padding-inline: var(--glide-core-spacing-base-sm);
      user-select: none;

      &:focus {
        outline: none;
      }

      &::marker,
      &::-webkit-details-marker {
        display: none;
      }

      &.active {
        padding-block-end: var(--glide-core-spacing-base-xxs);
      }

      &.open {
        svg {
          rotate: 0deg;
        }
      }

      svg {
        align-items: center;
        display: flex;
        margin-inline-end: var(--glide-core-spacing-base-xxs);
        rotate: -90deg;

        @media (prefers-reduced-motion: no-preference) {
          transition: 250ms rotate ease;
        }
      }
    }

    .label-container {
      align-items: center;
      display: flex;
      flex: 1;
      gap: var(--glide-core-spacing-base-xs);
      overflow: hidden;
      white-space: nowrap;
    }

    .label {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .default-slot {
      color: var(--glide-core-color-static-text-default);
      display: block;
      font-size: var(--glide-core-typography-size-body-label);
      font-weight: var(--glide-core-typography-weight-regular);
      overflow: hidden;
      padding-block-end: var(--glide-core-spacing-base-sm);

      /* Hardcoded spacing here is intentional so that it better aligns with the Accordion label */
      padding-inline: 2rem var(--glide-core-spacing-base-sm);

      &.indented {
        padding-inline-start: 3.5rem;
      }
    }

    .suffix-icons-slot {
      align-items: center;
      color: var(--glide-core-color-interactive-icon-link);
      gap: 0.625rem;
      margin-inline-start: var(--glide-core-spacing-base-xs);

      &.icons {
        display: flex;
      }
    }
  `,
];
