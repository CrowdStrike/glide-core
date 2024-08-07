import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    :host {
      outline: none;
    }

    /* Using nesting creates an issue on Safari with :host */
    /* stylelint-disable-next-line csstools/use-nesting */
    :host(:focus-visible) .component .container {
      ${focusOutline};
    }

    .component {
      align-items: center;
      cursor: pointer;
      font-family: var(--glide-core-heading-xxs-font-family);
      font-size: var(--glide-core-heading-xxxs-font-size);
      font-style: var(--glide-core-heading-xxs-font-style);
      font-weight: var(--glide-core-body-sm-font-weight);
      gap: 0.4375rem;
      justify-content: center;
      line-height: 1.1875rem;
      padding-block: var(--glide-core-spacing-xs);
      padding-inline: var(--glide-core-spacing-md);

      &.active {
        border-block-end: 2px solid var(--glide-core-border-focus);
      }

      &:hover {
        color: var(--glide-core-text-primary);
      }

      &.disabled {
        border: none;
        color: var(--glide-core-text-tertiary-disabled);
        pointer-events: none;
      }

      & .container {
        border-radius: 0.0625rem;
        display: flex;
        flex-shrink: 0;
        gap: var(--glide-core-spacing-xs);
        white-space: nowrap;
      }
    }
  `,
];
