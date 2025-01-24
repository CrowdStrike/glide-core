import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreToggle from './toggle.js';

it('focuses the input when `focus()` is called', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  component.focus();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});
