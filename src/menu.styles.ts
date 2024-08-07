import { css } from 'lit';

export default [
  css`
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
      display: flex;
      inline-size: max-content;
      inset-block-start: 0;
      inset-inline-start: 0;
      margin-block: 0;
      min-inline-size: 9.375rem;
      padding: var(--glide-core-spacing-xxxs);
      position: absolute;
      visibility: hidden;

      /*
      ".container" is relative and many Menus may be stacked in a column.
      This ensures the ".menu" of Menus earlier in the column aren't obscured
      by the ".target-container" that come later.
    */
      z-index: 1;

      &.visible {
        visibility: visible;
      }
    }
  `,
];
