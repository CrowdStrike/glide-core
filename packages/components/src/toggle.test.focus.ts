import { expect, fixture, html } from '@open-wc/testing';
import CsToggle from './toggle.js';

CsToggle.shadowRootOptions.mode = 'open';

it('focuses the input when `focus` is called', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label"></cs-toggle>`,
  );

  component.focus();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});
