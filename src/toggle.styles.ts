import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.toggle-and-input:has(input:focus-visible)')}
  `,
  css`
    .toggle-and-input-and-summary {
      align-items: center;
      display: flex;
      gap: var(--glide-core-spacing-sm);
    }

    .toggle-and-input {
      --inline-size: 1.5rem;

      align-items: center;
      background-color: var(--glide-core-surface-selected-disabled);
      block-size: 0.875rem;
      border: 1px solid transparent;
      border-radius: var(--glide-core-spacing-sm);
      display: flex;
      flex-shrink: 0; /* Don't shrink when the summary wraps. */
      inline-size: var(--inline-size);
      justify-content: center;
      position: relative;

      &:has(input:checked:not(:disabled)) {
        background-color: var(--glide-core-surface-primary);
        border-color: transparent;

        &::before {
          transform: translateX(0);
        }
      }

      &:has(input:disabled) {
        background-color: var(--glide-core-surface-unselected-disabled);

        &::before {
          box-shadow: none;
        }
      }

      &:has(input:checked:disabled) {
        background-color: var(--glide-core-surface-primary-disabled);

        &::before {
          transform: translateX(0);
        }
      }

      &::before {
        background: var(--glide-core-surface-page);
        block-size: 0.875rem;
        border-radius: 50%;
        box-shadow:
          0 3px 1px 0 rgb(0 0 0 / 6%),
          0 3px 8px 0 rgb(0 0 0 / 15%);
        content: '';
        display: block;
        inline-size: 0.875rem;
        inset-inline-end: 0;
        position: absolute;
        transform: translateX(calc(var(--inline-size) * -1 + 100%));
        transition: 150ms transform;
      }
    }

    input {
      block-size: 100%;
      cursor: inherit;
      inline-size: 100%;
      inset-block-start: 0;
      inset-inline-start: 0;
      margin: 0;
      opacity: 0;
      position: absolute;
    }
  `,
];
