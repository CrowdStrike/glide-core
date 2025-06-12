import { css } from 'lit';
import opacityAndScaleAnimation from './styles/opacity-and-scale-animation.js';

export default [
  css`
    ${opacityAndScaleAnimation('.default-slot:popover-open')}
  `,
  css`
    .target-slot {
      position: relative;

      &.open {
        color: var(--glide-core-color-interactive-text-link--hover);
      }

      &::slotted(:is([disabled], [aria-disabled='true'])) {
        color: var(--glide-core-color-interactive-icon-default--disabled);
        cursor: auto;
      }
    }

    .default-slot {
      background-color: var(
        --glide-core-private-color-dialog-and-modal-surface-container
      );
      border: 1px solid
        var(--glide-core-color-static-surface-container-secondary);
      border-radius: var(--glide-core-rounding-base-radius-sm);
      box-shadow: var(--glide-core-effect-floating);
      box-sizing: border-box;
      color: var(--glide-core-color-static-text-default);
      inline-size: max-content;
      inset: unset;
      margin-block: 0;
      min-inline-size: 9.375rem;
      padding: var(--glide-core-spacing-base-xxxs);
      position: absolute;
    }
  `,
];
