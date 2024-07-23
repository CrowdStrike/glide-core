import { css } from 'lit';

export default [
  css`
    .component {
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
      visibility: hidden;

      &.pinned {
        box-shadow: none;
      }

      &:focus {
        outline: none;
      }
    }

    .open {
      /* prefix required for Safari */
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -webkit-backdrop-filter: blur(50px);
      backdrop-filter: blur(50px);
      block-size: auto;
      inline-size: var(--width, 27.375rem);
      inset: 0 0 0 auto;
      opacity: 1;
      transform: none;
      transition:
        transform 0.3s ease-out,
        opacity 0.3s ease-in;
      visibility: visible;
    }

    .closing {
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
    }
  `,
];
