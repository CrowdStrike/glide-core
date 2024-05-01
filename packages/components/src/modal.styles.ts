import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    /* When browser support improves, we can have nicer animations with https://caniuse.com/mdn-css_at-rules_starting-style */
    @keyframes backdrop-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes modal-open {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .component {
      border-radius: 0.5rem;
      background-color: var(--cs-surface-base-lighter);
      box-shadow: var(--cs-shadow-lg);
      border: none;

      font-family: var(--cs-body-xs-font-family);

      padding: 1.25rem;
      max-height: 75vh;

      opacity: 0;

      &[open] {
        opacity: 1;
        animation: modal-open 250ms;
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
      }

      &::backdrop {
        -webkit-backdrop-filter: blur(3px);
        backdrop-filter: blur(3px);
        background-color: rgba(0, 0, 0, 0.4);

        animation: backdrop-fade-in 250ms;
      }
    }

    @media (prefers-reduced-motion) {
      dialog {
        &[open] {
          animation: none;
        }

        &::backdrop {
          animation: none;
        }
      }
    }

    .width--sm {
      width: 22.5rem;
    }

    .width--md {
      width: 35rem;
    }

    .width--lg {
      width: 53.75rem;
    }

    .width--xl {
      width: 69.375rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      --size: 1.25rem;

      color: var(--cs-text-body);

      line-height: 2rem;
      font-weight: 600;
      font-size: 1.5rem;

      display: flex;
      align-items: center;
      gap: var(--cs-spacing-xs);

      margin: 0;

      text-overflow: ellipsis;
      overflow: hidden;

      white-space: nowrap;
      width: 100%;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }

    .body {
      display: flex;

      padding-bottom: 1.25rem;
      padding-top: 1.25rem;

      overflow: auto;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
      }
    }

    .footer {
      display: flex;
      align-items: center;
    }

    .actions {
      /* Reset the default menu styles */
      padding: 0;
      margin: 0;
      list-style-type: none;

      display: flex;
      gap: var(--cs-spacing-xs);
      margin-left: auto;
    }

    .menu {
      display: flex;
      padding: 0;
      margin: 0;
      list-style-type: none;
      justify-content: space-between;
      width: 100%;
    }

    .flex {
      display: flex;
    }

    .align-center {
      align-items: center;
    }
  `,
];
