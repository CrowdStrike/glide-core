import { css, unsafeCSS } from 'lit';

// TODO: Can put this inline with Tooltip now if we want since it
// isn't getting used in multiple places.

export default (selector: string) => {
  return css`
    /* stylelint-disable selector-type-case, selector-type-no-unknown */
    @keyframes opacity-and-scale {
      from {
        opacity: 0;
        transform: scale(0.95);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    ${unsafeCSS(selector)} {
      animation: opacity-and-scale 250ms cubic-bezier(0.25, 0, 0.3, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      ${unsafeCSS(selector)} {
        animation: none !important;
      }
    }
  `;
};
