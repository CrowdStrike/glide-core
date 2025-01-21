import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreToggle from './toggle.js';

GlideCoreToggle.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-toggle')).to.equal(
    GlideCoreToggle,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label" tooltip="Tooltip">
      <div slot="description">Description</div>
    </glide-core-toggle>`,
  );

  await expect(component).to.be.accessible();
});
