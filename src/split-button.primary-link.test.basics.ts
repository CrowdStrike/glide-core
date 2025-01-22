import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButtonPrimaryLink from './split-button.primary-link.js';

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-split-button-primary-link'),
  ).to.equal(GlideCoreSplitButtonPrimaryLink);
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreSplitButtonPrimaryLink>(html`
    <glide-core-split-button-primary-link
      label="Label"
      url="/"
    ></glide-core-split-button-primary-link>
  `);

  await expect(component).to.be.accessible();

  component.disabled = true;
  await component.updateComplete;

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreSplitButtonPrimaryLink>(html`
    <glide-core-split-button-primary-link
      label="Label"
      url="/"
    ></glide-core-split-button-primary-link>
  `);

  expect(component.disabled).to.be.false;
  expect(component.privateSize).to.equal('large');
  expect(component.privateVariant).to.equal('primary');
});
