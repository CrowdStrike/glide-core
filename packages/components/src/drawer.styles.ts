import { css } from 'lit';

export default [
  css`
    dialog {
      all: unset;
      background-color: var(--cs-surface-base-lighter);
      block-size: 0;
      border-end-start-radius: 0.625rem;
      border-start-start-radius: 0.625rem;
      box-shadow: var(--cs-shadow-xl);
      font-family: var(--cs-body-xs-font-family);
      inline-size: 0;
      inset: 0;
      max-inline-size: 100%;
      opacity: 0;
      position: absolute;
      transform: translateX(100%);
      transition:
        transform 0.2s ease-out,
        opacity 0.3s ease-out;
      visibility: hidden;
    }

    .dialog-open {
      block-size: auto;
      inline-size: var(--cs-drawer-width, 27.375rem);
      inset: 0 0 0 auto;
      opacity: 1;
      transform: none;
      visibility: visible;
    }

    .dialog-closing {
      transform: translateX(100%);
    }
  `,
];
