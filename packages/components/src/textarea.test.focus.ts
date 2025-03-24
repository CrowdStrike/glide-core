import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTextarea from './textarea.js';

it('focuses itself when `focus()` is called', async () => {
  const host = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  host.focus();

  const textarea = host.shadowRoot?.querySelector('[data-test="textarea"]');
  expect(host.shadowRoot?.activeElement).to.equal(textarea);
});
