import { css } from 'lit';

export default [
  css`
    @keyframes spin {
      100% {
        align-items: center;
        transform: rotate(1turn);
      }
    }

    .component {
      background:
        radial-gradient(
            farthest-side,
            var(--glide-core-color-interactive-icon-active) 94%,
            #0000
          )
          top / var(--private-gradient-size) var(--private-gradient-size)
          no-repeat,
        conic-gradient(
          #0000 30%,
          var(--glide-core-color-interactive-icon-active)
        );
      block-size: var(--private-spinner-size);
      border-radius: 50%;
      inline-size: var(--private-spinner-size);

      /* stylelint-disable-next-line property-no-vendor-prefix */
      -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(100% - var(--private-gradient-size)),
        #000 0
      );

      @media (prefers-reduced-motion: no-preference) {
        animation: spin 1s infinite linear;
      }

      &.large {
        --private-spinner-size: 3rem;
        --private-gradient-size: 0.5rem;
      }

      &.medium {
        --private-spinner-size: 2rem;
        --private-gradient-size: 0.375rem;
      }

      &.small {
        --private-spinner-size: 1rem;
        --private-gradient-size: 0.25rem;
      }
    }
  `,
];
