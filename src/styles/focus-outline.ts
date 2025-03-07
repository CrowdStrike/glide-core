import { css, unsafeCSS } from 'lit';

// At the time of writing, outline border radii in Figma are offset by 3px
// since in Figma they appear to be relative to some outer container, whereas
// here they are influenced by the element's border radius they are surrounding.

export default (selector: string) => {
  return css`
    /* stylelint-disable selector-type-case, selector-type-no-unknown */
    ${unsafeCSS(selector)} {
      outline: 2px solid var(--glide-core-color-interactive-stroke-focus) !important;
      outline-offset: 1px;
    }
  `;
};
