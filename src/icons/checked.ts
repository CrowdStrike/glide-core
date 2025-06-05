import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * The class="check" on the path below is used as a CSS selector
 * in checkbox.styles.ts.  Please be cautious when making changes
 * here as to not break the Checkbox selectors.
 */
export default html`
  <svg
    aria-hidden="true"
    fill="none"
    viewBox="0 0 24 24"
    style=${styleMap({
      height: 'var(--private-size, 0.875rem)',
      width: 'var(--private-size, 0.875rem)',
    })}
  >
    <path
      class="check"
      data-test="check"
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
