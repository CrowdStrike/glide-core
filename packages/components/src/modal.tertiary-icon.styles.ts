import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    span {
      --size: 1rem;

      border-radius: 0.25rem;
      color: var(--cs-icon-default);

      display: flex;

      transition: color 200ms ease-in-out;

      &:hover {
        color: var(--cs-text-primary-hover);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
      }
    }
  `,
];
