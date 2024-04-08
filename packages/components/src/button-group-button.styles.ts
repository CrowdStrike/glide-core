import { css } from 'lit';
import { focusOutline } from './styles.js';

export default [
  css`
    li {
      --li--gap: 0.625rem;
      --li--border-radius: 12px;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      appearance: none;

      align-items: center;
      border: 1px solid var(--cs-border-base, #c9c9c9);
      border-radius: var(--li--border-radius);
      cursor: pointer;
      display: flex;
      font-family: var(--cs-heading-xxs-font-family);
      font-style: var(--cs-heading-xxs-font-style);
      font-weight: var(--cs-heading-xxs-font-weight);
      gap: var(--li--gap);
      justify-content: center;
      padding-block: var(--cs-spacing-xs);
      padding-inline: var(--cs-spacing-md);
      user-select: none;

      outline: none;

      &:not(.disabled).checked {
        background-color: var(--cs-surface-selected);
        color: var(--cs-color-white);
      }

      &:not(.disabled):not(:active):hover {
        background-color: var(--cs-surface-hover);
        border-color: transparent;
        box-shadow: var(--cs-glow-sm);
        color: var(--cs-text-primary);
      }

      &:not(.disabled):focus-visible,
      &:not(.disabled):focus,
      &:not(.disabled):active {
        ${focusOutline};
        background-color: var(--cs-surface-selected);
        color: var(--cs-color-white);
      }

      &.disabled {
        background-color: var(--cs-border-base-light);
        border-color: var(--cs-border-base-light);
        color: var(--cs-text-tertiary-disabled);
      }
    }
  `,
];
