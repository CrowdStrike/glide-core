import { expect, fixture, html } from '@open-wc/testing';
import Toggle from './toggle.js';

it('focuses the input when `focus()` is called', async () => {
  const host = await fixture<Toggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  host.focus();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});
