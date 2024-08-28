import { css, unsafeCSS } from 'lit';

export default (selector: string) => {
  return css`
    /* stylelint-disable selector-type-case, selector-type-no-unknown */
    @keyframes menu-opening {
      from {
        opacity: 0;
        transform: scaleY(0);
        transform-origin: 0% 0%;
      }

      to {
        opacity: 1;
        transform: scaleY(1);
        transform-origin: 0% 0%;
      }
    }

    ${unsafeCSS(selector)} {
      animation: menu-opening 150ms cubic-bezier(0.25, 0, 0.3, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      ${unsafeCSS(selector)} {
        animation: none !important;
      }
    }
  `;
};
