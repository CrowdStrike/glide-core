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
      color: var(--glide-core-color-interactive-text-default);
      cursor: pointer;
      display: flex;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      gap: 0.4375rem;
      justify-content: center;
      padding-block: 0.4375rem;

      &:hover {
        color: var(--glide-core-color-interactive-text-link);
      }

      &.disabled {
        border: none;
        color: var(--glide-core-color-interactive-text-default--disabled);
        pointer-events: none;
      }
    }

    .container {
      align-items: center;
      border-radius: 0.0625rem;
      display: flex;
      flex-shrink: 0;
      gap: var(--glide-core-spacing-base-xs);
      white-space: nowrap;
    }
  `,
];
