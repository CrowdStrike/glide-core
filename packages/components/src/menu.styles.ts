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

    .container {
      display: flex;
      position: relative;
    }

    .menu {
      background-color: var(--glide-core-surface-modal);
      border: 1px solid var(--glide-core-surface-modal);
      border-radius: var(--glide-core-spacing-xs);
      box-shadow: var(--glide-core-shadow-lg);
      box-sizing: border-box;
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

      &.large {
        --gap: var(--glide-core-spacing-sm);
        --padding-inline: var(--glide-core-spacing-sm);
        --padding-block: var(--glide-core-spacing-xxs);

        font-family: var(--glide-core-body-sm-font-family);
        font-size: var(--glide-core-body-sm-font-size);
        font-style: var(--glide-core-body-sm-font-style);
        font-weight: var(--glide-core-body-sm-font-weight);
        line-height: var(--glide-core-body-sm-line-height);
      }

      &.small {
        --gap: var(--glide-core-spacing-xs);
        --padding-inline: var(--glide-core-spacing-xs);
        --padding-block: var(--glide-core-spacing-xxxs);
        --size: 0.75rem;

        font-family: var(--glide-core-body-xs-font-family);
        font-size: var(--glide-core-body-xs-font-size);
        font-style: var(--glide-core-body-xs-font-style);
        font-weight: var(--glide-core-body-xs-font-weight);
        line-height: var(--glide-core-body-xs-line-height);
      }
    }
  `,
];
