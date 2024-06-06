import { svg } from 'lit/static-html.js';

export default svg`
  <svg
    aria-label="More information"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="2"
    />

    <path
      d="M12 16L12 12"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />

    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
`;
