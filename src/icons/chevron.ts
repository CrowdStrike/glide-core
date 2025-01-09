import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export default html`
  <svg
    aria-hidden="true"
    style=${styleMap({
      height: 'var(--size, 1rem)',
      width: 'var(--size, 1rem)',
    })}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
