import { css, unsafeCSS } from 'lit';

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
      @media (prefers-reduced-motion: no-preference) {
        animation: opacity-and-scale 250ms cubic-bezier(0.25, 0, 0.3, 1);
      }
    }
  `;
};
