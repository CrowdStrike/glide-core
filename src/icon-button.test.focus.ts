import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreIconButton from './icon-button.js';

it('focuses its button when `focus()` is called', async () => {
  const host = await fixture<GlideCoreIconButton>(
    html`<glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>`,
  );

  host.focus();

  const button = host.shadowRoot?.querySelector('[data-test="button"]');
  expect(host.shadowRoot?.activeElement).to.equal(button);
});
