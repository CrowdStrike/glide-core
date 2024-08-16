import {
  animation,
  disableAnimation,
  keyframes,
} from './styles/opacity-scale-keyframes.js';
import { css } from 'lit';

export default [
  css`
    ${keyframes};

    :host {
      /* Contains elements with "padding", "margin", and "width". Inline by default. */
      display: inline-block;
    }

    .component {
      color: var(--glide-core-text-body-1);
      display: flex;
    }

    .target-slot {
      display: flex;
      position: relative;
    }

    .default-slot {
      background-color: var(--glide-core-surface-modal);
      border: 1px solid var(--glide-core-surface-modal);
      border-radius: var(--glide-core-spacing-xs);
      box-shadow: var(--glide-core-shadow-lg);
      box-sizing: border-box;
      inline-size: max-content;
      inset: unset;
      margin-block: 0;
      min-inline-size: 9.375rem;
      padding: var(--glide-core-spacing-xxxs);
      position: absolute;

      &:popover-open {
        ${animation};
      }
    }

    /* TODO When using a mixin, if this isn't at the bottom it doesn't work */
    @media (prefers-reduced-motion: reduce) {
      .default-slot:popover-open {
        ${disableAnimation};
      }
    }
  `,
];
