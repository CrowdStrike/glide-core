import { css } from 'lit';

export default [
  css`
    .component {
      all: unset;
      backdrop-filter: blur(50px);
      background-color: var(--glide-core-surface-base-lighter);
      block-size: 0;
      border-end-start-radius: 0.625rem;
      border-start-start-radius: 0.625rem;
      box-shadow: var(--glide-core-shadow-xl);
      font-family: var(--glide-core-body-xs-font-family);
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

      &.pinned {
        box-shadow: none;
      }
    }

    .open {
      block-size: auto;
      inline-size: var(--width, 27.375rem);
      inset: 0 0 0 auto;
      opacity: 1;
      transform: none;
      visibility: visible;
    }

    .closing {
      transform: translateX(100%);
    }
  `,
];
