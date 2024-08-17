import { css, unsafeCSS } from 'lit';

export default (selector: string) => {
  return css`
    /* stylelint-disable selector-type-case, selector-type-no-unknown */
    ${unsafeCSS(selector)} {
      block-size: 1px;
      border-width: 0;
      clip: rect(0, 0, 0, 0);
      inline-size: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap;
    }
  `;
};
