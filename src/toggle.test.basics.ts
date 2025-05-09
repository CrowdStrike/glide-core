import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import Toggle from './toggle.js';

@customElement('glide-core-subclassed')
class Subclassed extends Toggle {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-toggle')).to.equal(Toggle);
});

it('is accessible', async () => {
  const host = await fixture<Toggle>(
    html`<glide-core-toggle label="Label" summary="Summary" tooltip="Tooltip">
      <div slot="description">Description</div>
    </glide-core-toggle>`,
  );

  await expect(host).to.be.accessible();
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-toggle></glide-core-toggle>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
