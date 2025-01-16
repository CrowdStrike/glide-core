/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ArgumentError } from 'ow';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import GlideCoreLabel from './label.js';
import GlideCoreTooltip from './tooltip.js';

GlideCoreLabel.shadowRootOptions.mode = 'open';
GlideCoreTooltip.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-private-label')).to.equal(
    GlideCoreLabel,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
      <div slot="description">Description</div>
    </glide-core-private-label>`,
  );

  await expect(component).to.be.accessible();
});

it('can be required', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label required>
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  const label = component.shadowRoot?.querySelector('[data-test="label"]');
  expect(label?.textContent?.includes('*')).to.be.true;
});

it('places the tooltip on the bottom when horizontal', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  expect(
    component.shadowRoot
      ?.querySelector('glide-core-tooltip')
      ?.getAttribute('placement'),
  ).to.equal('bottom');
});

it('places the tooltip on the right when vertical', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label orientation="vertical" tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  expect(
    component.shadowRoot
      ?.querySelector('glide-core-tooltip')
      ?.getAttribute('placement'),
  ).to.equal('right');
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-private-label
        ><input slot="control"
      /></glide-core-private-label>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});

it('throws if it does not have a "control" slot', async () => {
  const spy = sinon.spy();
  const stub = sinon.stub(console, 'error');

  try {
    await fixture(
      html`<glide-core-private-label>
        <label>Label</label>
      </glide-core-private-label>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);

  // It's not clear to me why the error logged by Ow shows up in the console
  // here and not in the above test or elsewhere. A bug in Web Test Runner?
  // Something I don't understand about Lit's lifecycle?
  await waitUntil(() => stub.called);
  stub.restore();
});
