import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline(':host(:focus-visible) .container')}
  `,
  css`
    :host {
      outline: none;
    }

    .component {
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      font-family: var(--glide-core-heading-xxs-font-family);
      font-size: var(--glide-core-heading-xxxs-font-size);
      font-style: var(--glide-core-heading-xxs-font-style);
      font-weight: var(--glide-core-body-sm-font-weight);
      gap: 0.4375rem;
      justify-content: center;
      padding-block: 0.4375rem;

      &:hover {
        color: var(--glide-core-text-primary);
      }

      &.disabled {
        border: none;
        color: var(--glide-core-text-tertiary-disabled);
        pointer-events: none;
      }
    }

    .container {
      align-items: center;
      border-radius: 0.0625rem;
      display: flex;
      flex-shrink: 0;
      gap: var(--glide-core-spacing-xs);
      white-space: nowrap;
    }
  `,
];
