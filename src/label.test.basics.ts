/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ArgumentError } from 'ow';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import GlideCoreLabel from './label.js';

GlideCoreLabel.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-private-label')).to.equal(
    GlideCoreLabel,
  );
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label>
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  expect(component.getAttribute('error')).to.equal(null);
  expect(component.error).to.be.false;

  expect(component.getAttribute('hide')).to.equal(null);
  expect(component.hide).to.be.false;

  expect(component.getAttribute('orientation')).to.equal('horizontal');
  expect(component.orientation).to.equal('horizontal');

  expect(component.hasAttribute('required')).to.be.false;
  expect(component.required).to.be.false;
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label>
      <label for="input">Label</label>
      <input id="input" slot="control" />
      <div slot="tooltip">Tooltip</div>
      <div slot="description">Description</div>
    </glide-core-private-label>`,
  );

  await expect(component).to.be.accessible();
});

it('can have a label', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label>
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot:not([name])')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Label');
});

it('can have a description', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label>
      <label for="input">Label</label>
      <input id="input" slot="control" />
      <div slot="description">Description</div>
    </glide-core-private-label>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('can have a tooltip', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label>
      <label for="input">Label</label>
      <input id="input" slot="control" />
      <div slot="tooltip">Tooltip</div>
    </glide-core-private-label>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('can be required', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label required>
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  expect(component.hasAttribute('required')).to.be.true;
  expect(component.required).to.be.true;

  const label = component.shadowRoot?.querySelector('[data-test="label"]');
  expect(label?.textContent?.includes('*')).to.be.true;
});

it('can have an `error`', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label ?error=${true}>
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  expect(component.hasAttribute('error')).to.be.true;
  expect(component.error).to.be.true;
});

it('places the tooltip on the bottom when horizontal', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label>
      <label for="input">Label</label>
      <input id="input" slot="control" />
      <div slot="tooltip">Tooltip</div>
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
    html`<glide-core-private-label orientation="vertical">
      <label for="input">Label</label>
      <input id="input" slot="control" />
      <div slot="tooltip">Tooltip</div>
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
