import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreIconButton from './icon-button.js';

it('is accessible', async () => {
  const host = await fixture<GlideCoreIconButton>(
    html`<glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>`,
  );

  host.ariaDescription = 'Description';
  await host.updateComplete;

  const button = host.shadowRoot?.querySelector('[data-test="button"]');
  expect(button?.ariaDescription).to.equal('Description');
});
