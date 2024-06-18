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
      background-color: var(--glide-core-surface-base-lighter);
      border: none;
      border-radius: 0.5rem;
      box-shadow: var(--glide-core-shadow-lg);
      font-family: var(--glide-core-body-xs-font-family);
      inline-size: 35rem;
      max-block-size: 75vh;
      opacity: 0;
      padding: 1.25rem;

      &[open] {
        animation: modal-open 250ms;
        opacity: 1;
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
      }

      &::backdrop {
        animation: backdrop-fade-in 250ms;

        /* prefix required for Safari */
        /* stylelint-disable-next-line property-no-vendor-prefix */
        -webkit-backdrop-filter: blur(3px);
        backdrop-filter: blur(3px);
        background-color: rgba(0 0 0 / 40%);
      }

      ::slotted([slot='tertiary']) {
        --size: 1rem;

        size: 1rem;
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

    .small {
      inline-size: 22.5rem;
    }

    .medium {
      inline-size: 35rem;
    }

    .large {
      inline-size: 53.75rem;
    }

    .xlarge {
      inline-size: 69.375rem;
    }

    .header {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    .label {
      align-items: center;
      color: var(--glide-core-text-body);
      display: flex;
      font-size: 1.5rem;
      font-weight: 600;
      gap: var(--glide-core-spacing-xs);
      inline-size: 100%;
      line-height: 1.875rem;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .header-actions {
      align-items: center;
      display: flex;
      gap: 0.625rem;
      line-height: 1;
    }

    .body {
      line-height: 1;
      overflow: auto;
      padding-block: 1rem;
      padding-block-end: 0.625rem;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${focusOutline};
      }
    }

    .footer {
      align-items: center;
      display: flex;
    }

    .actions {
      display: flex;
      gap: var(--glide-core-spacing-xs);

      /* Reset the default menu styles */
      list-style-type: none;
      margin: 0;
      margin-inline-start: auto;
      padding: 0;
    }

    .menu {
      display: flex;
      inline-size: 100%;
      justify-content: space-between;
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    .flex {
      display: flex;
    }

    .align-center {
      align-items: center;
    }
  `,
];
