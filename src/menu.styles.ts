import { css } from 'lit';
import opacityAndScaleAnimation from './styles/opacity-and-scale-animation.js';

export default [
  css`
    ${opacityAndScaleAnimation('.default-slot:popover-open')}
  `,
  css`
    :host {
      /* Contains elements with "padding", "margin", and "width". Inline by default. */
      display: inline-block;
    }

    .component {
      color: var(--glide-core-color-static-text-default);
      display: flex;
    }

    .target-slot {
      display: flex;
      position: relative;
    }

    .default-slot {
      background-color: var(
        --glide-core-private-color-dialog-and-modal-surface-container
      );
      border: 1px solid
        var(--glide-core-color-static-surface-container-secondary);
      border-radius: var(--glide-core-spacing-base-xs);
      box-shadow: var(--glide-core-shadow-lg);
      box-sizing: border-box;
      inline-size: max-content;
      inset: unset;
      margin-block: 0;
      min-inline-size: 9.375rem;
      padding: var(--glide-core-spacing-base-xxxs);
      position: absolute;
    }
  `,
];
