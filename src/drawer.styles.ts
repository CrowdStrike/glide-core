import { css } from 'lit';

export default [
  css`
    .component {
      background-color: var(--glide-core-surface-base-lightest);
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
        background-color: var(--glide-core-surface-base-xlightest);
        box-shadow: none;
      }

      &:focus {
        outline: none;
      }
    }

    .open {
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -webkit-backdrop-filter: blur(25px);
      backdrop-filter: blur(25px);
      block-size: auto;
      inline-size: var(--width, 27.375rem);
      inset: 0 0 0 auto;
      visibility: visible;
    }
  `,
];
