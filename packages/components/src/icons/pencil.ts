import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export default html`
  <svg
    aria-hidden="true"
    viewBox="0 0 14 14"
    fill="none"
    style=${styleMap({
      height: 'var(--private-size, 0.875rem)',
      width: 'var(--private-size, 0.875rem)',
    })}
  >
    <path
      d="M10.0244 5.95031L8.0395 3.96536M2.06587 11.924L3.74532 11.7374C3.95051 11.7146 4.0531 11.7032 4.149 11.6721C4.23407 11.6446 4.31504 11.6057 4.38969 11.5564C4.47384 11.501 4.54683 11.428 4.69281 11.282L11.5132 4.4616C12.0613 3.91347 12.0613 3.02478 11.5132 2.47665C10.965 1.92852 10.0763 1.92852 9.52821 2.47665L2.70786 9.29703C2.56188 9.44302 2.48889 9.51601 2.4334 9.60015C2.38417 9.67481 2.34526 9.75577 2.31772 9.84085C2.28667 9.93674 2.27527 10.0393 2.25247 10.2445L2.06587 11.924Z"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
