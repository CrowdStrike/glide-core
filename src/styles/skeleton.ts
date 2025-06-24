import { css, unsafeCSS } from 'lit';

export default (selector: string) => {
  return css`
    @keyframes shimmer {
      0% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0 50%;
      }
    }

    /* stylelint-disable selector-type-case, selector-type-no-unknown */
    ${unsafeCSS(selector)} {
      display: flex;
      flex-direction: column;
      padding: 0.375rem var(--glide-core-spacing-base-sm);
      row-gap: var(--glide-core-spacing-base-xs);

      & > * {
        animation-duration: 1.4s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: shimmer;
        animation-timing-function: ease;
        background-image: linear-gradient(
          90deg,
          var(
              --glide-core-private-color-skeleton-loader-surface-linear-gradient-sides
            )
            25%,
          var(
              --glide-core-private-color-skeleton-loader-surface-linear-gradient-middle
            )
            37%,
          var(
              --glide-core-private-color-skeleton-loader-surface-linear-gradient-sides
            )
            63%
        );
        background-size: 400% 100%;
        block-size: 1rem;
        border-radius: var(--glide-core-rounding-base-radius-xxs);
      }
    }
  `;
};
