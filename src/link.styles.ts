import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.component:focus-visible')}
  `,
  css`
    .component {
      border-radius: var(--glide-core-rounding-base-radius-xs);
      color: var(--glide-core-color-interactive-text-link);
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-small);
      font-weight: var(--glide-core-typography-weight-regular);
      text-decoration: none;

      &.disabled {
        color: var(--glide-core-color-interactive-text-link--disabled);
      }

      &:hover {
        &.disabled {
          cursor: not-allowed;
        }

        &:not(.disabled) {
          color: var(--glide-core-color-interactive-text-link--hover);
          text-decoration: underline;
        }
      }
    }
  `,
];
