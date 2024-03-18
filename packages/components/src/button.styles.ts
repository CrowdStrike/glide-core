import { css } from 'lit';
import { focusOutline } from './styles.js';

export default [
  css`
    button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 0.625rem;

      border-color: transparent;
      border-radius: var(--cs-spacing-sm);
      border-style: solid;
      border-width: 1px;

      cursor: pointer;

      font-family: var(--cs-heading-xxs-font-family);
      font-style: var(--cs-heading-xxs-font-style);
      font-weight: var(--cs-heading-xxs-font-weight);

      padding-inline: var(--cs-spacing-md);
      padding-block: var(--cs-spacing-xs);

      user-select: none;
      -webkit-user-select: none;
    }

    button:focus {
      outline: none;
    }

    button:focus-visible {
      ${focusOutline};
    }

    button:disabled {
      opacity: 1;
      cursor: default;
    }

    /* We make the spacing slightly smaller when an icon is present to help with empty space balancing */
    .button--has-prefix {
      padding-inline-start: var(--cs-spacing-sm);
    }

    .button--has-suffix {
      padding-inline-end: var(--cs-spacing-sm);
    }

    .button--primary {
      background-color: var(--cs-surface-primary);
      border-color: transparent;
      color: var(--cs-text-selected);
    }

    .button--primary:disabled {
      background-color: var(--cs-surface-base-gray-light);
      border-color: transparent;
      color: var(--cs-text-tertiary-disabled);
    }

    .button--primary:not(:disabled):active {
      background-color: var(--cs-surface-primary);
      border-color: transparent;
      color: var(--cs-text-selected);
    }

    .button--primary:not(:active):hover:not(:disabled) {
      background-color: var(--cs-surface-hover);
      border-color: transparent;
      box-shadow: var(--cs-glow-sm);
      color: var(--cs-text-primary);
    }

    .button--secondary {
      background-color: transparent;
      border-color: var(--cs-border-primary);
      color: var(--cs-text-primary);
    }

    .button--secondary:disabled {
      background-color: transparent;
      border-color: var(--cs-border-base-light);
      color: var(--cs-text-tertiary-disabled);
    }

    .button--secondary:not(:disabled):active {
      background-color: var(--cs-surface-primary);
      border-color: transparent;
      color: var(--cs-text-selected);
    }

    .button--secondary:not(:active):hover:not(:disabled) {
      background-color: var(--cs-surface-hover);
      border-color: transparent;
      box-shadow: var(--cs-glow-sm);
      color: var(--cs-text-primary);
    }

    .button--tertiary {
      background-color: transparent;
      border-color: transparent;
      color: var(--cs-text-primary);
    }

    .button--tertiary:disabled {
      color: var(--cs-text-tertiary-disabled);
    }

    .button--tertiary:not(:disabled):active {
      color: var(--cs-text-secondary);
    }

    .button--tertiary:not(:active):hover:not(:disabled) {
      color: var(--cs-text-primary-hover);
    }

    .button--large {
      height: 2.5rem;
      min-width: 5.1875rem;
      line-height: 1.5rem;
      font-size: var(--cs-heading-xxs-font-size);
    }

    .button--small {
      height: 2.125rem;
      min-width: 4.375rem;
      line-height: 1rem;
      font-size: var(--cs-heading-xxxs-font-size);
    }
  `,
];
