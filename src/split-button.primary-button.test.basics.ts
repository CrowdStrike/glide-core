import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreSplitButtonPrimaryButton from './split-button.primary-button.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreSplitButtonPrimaryButton {}

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-split-button-primary-button'),
  ).to.equal(GlideCoreSplitButtonPrimaryButton);
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreSplitButtonPrimaryButton>(html`
    <glide-core-split-button-primary-button
      label="Label"
    ></glide-core-split-button-primary-button>
  `);

  await expect(component).to.be.accessible();

  component.disabled = true;
  await component.updateComplete;

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreSplitButtonPrimaryButton>(html`
    <glide-core-split-button-primary-button
      label="Label"
    ></glide-core-split-button-primary-button>
  `);

  expect(component.ariaControls).to.be.null;
  expect(component.ariaExpanded).to.be.null;
  expect(component.ariaHasPopup).to.be.null;
  expect(component.disabled).to.be.false;
  expect(component.privateSize).to.equal('large');
  expect(component.privateVariant).to.equal('primary');
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
