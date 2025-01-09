import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export default html`
  <svg
    style=${styleMap({
      height: '1rem',
      width: '1rem',
    })}
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
