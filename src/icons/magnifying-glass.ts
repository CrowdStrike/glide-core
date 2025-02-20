import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export default html`
  <svg
    class="search-icon"
    data-test="search-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    style=${styleMap({
      display: 'block',
      height: 'var(--private-size, 1rem)',
      width: 'var(--private-size, 1rem)',
    })}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
`;
