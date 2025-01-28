import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreToggle from './toggle.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreToggle {}

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

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
