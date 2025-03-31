import { css } from 'lit';

export default [
  css`
    :host {
      /* The width the drawer */
      --width: 27.375rem;
    }

    .component {
      background-color: var(
        --glide-core-private-color-template-surface-container-detail
      );
      block-size: 0;
      border-end-start-radius: 0.625rem;
      border-start-start-radius: 0.625rem;
      box-shadow: 0 4px 60px 0
        var(--glide-core-color-effect-color-elevation-detail-panel);
      font-family: var(--glide-core-typography-family-primary);
      inline-size: 0;
      inset: 0;
      max-inline-size: 100%;
      opacity: 0;
      position: absolute;
      transform: translateX(100%);
      visibility: hidden;

      &.pinned {
        background-color: var(
          --glide-core-private-color-template-surface-container-detail
        );
        box-shadow: none;
      }

      &:focus {
        outline: none;
      }
    }

    .open {
      backdrop-filter: blur(50px);
      block-size: auto;
      inline-size: var(--width);
      inset: 0 0 0 auto;
      visibility: visible;
    }
  `,
];
