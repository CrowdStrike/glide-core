import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export default html`
  <svg
    style=${styleMap({
      height: 'var(--size, 1rem)',
      width: 'var(--size, 1rem)',
    })}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M15 5L5 15M5 5L15 15"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
