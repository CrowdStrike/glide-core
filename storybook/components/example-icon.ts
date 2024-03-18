import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/*
  Example icons for us to leverage for documentation purposes where we don't
  have a proper Glide icon, but want to showcase a component that exposes a slot for icons.
*/
@customElement('cs-example-icon')
export class ExampleIcon extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    :host svg {
      height: var(--size, 1rem);
      width: var(--size, 1rem);
    }
  `;

  @property()
  name: 'calendar' | 'check-circle' | 'chevron-down' | 'grid' | undefined;

  render() {
    if (this.name === 'calendar') {
      return html`<svg
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm11-2v4M8 3v4m-5 3h18M7.858 13.954h.1m4.342 0h.1m4.3 0h.1M7.827 17.4h.1m4.373 0h.1m4.269 0h.1"
        ></path>
      </svg>`;
    }

    if (this.name === 'check-circle') {
      return html`
        <svg
          width="24"
          height="24"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M8.5 13.1l1.05.95 1.05.95 2.45-3 2.45-3M12 3a9 9 0 11-6.364 2.636A8.972 8.972 0 0112 3z"
          ></path>
        </svg>
      `;
    }
    if (this.name === 'chevron-down') {
      return html`<svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>`;
    }

    if (this.name === 'grid') {
      return html`<svg
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zM3 14h7v7H3z"></path>
      </svg>`;
    }

    return;
  }
}
