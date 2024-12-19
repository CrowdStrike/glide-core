/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tab.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTab from './tab.js';

GlideCoreTab.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-tab')).to.equal(GlideCoreTab);
});

it('renders correct markup and sets correct attributes for the default case', async () => {
  const component = await fixture<GlideCoreTab>(html`
    <glide-core-tab>Tab</glide-core-tab>
  `);

  await expect(component).to.not.be.accessible();
  expect(component.selected).to.be.false;
  expect(component.disabled).to.be.false;

  expect(component.getAttribute('aria-disabled')).to.equal(null);

  expect([...component.shadowRoot!.firstElementChild!.classList]).to.deep.equal(
    ['component'],
  );
});

it('sets the panel attribute', async () => {
  const component = await fixture<GlideCoreTab>(html`
    <glide-core-tab panel="details">Tab</glide-core-tab>
  `);

  expect(component.panel).to.equal('details');
});

it('sets the `selected` attribute', async () => {
  const component = await fixture<GlideCoreTab>(html`
    <glide-core-tab selected>Tab</glide-core-tab>
  `);

  expect(component.selected).to.be.true;
});

it('sets the disabled attribute', async () => {
  const component = await fixture<GlideCoreTab>(html`
    <glide-core-tab disabled>Tab</glide-core-tab>
  `);

  expect(component.disabled).to.be.true;
  expect(component?.getAttribute('aria-disabled')).to.equal('true');
});

it('renders the icon slot', async () => {
  const component = await fixture<GlideCoreTab>(html`
    <glide-core-tab>
      <span slot="icon">Icon</span>
      <span>Tab</span>
    </glide-core-tab>
  `);

  const slotNodes = component
    .shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]')
    ?.assignedNodes();

  expect(slotNodes?.length).to.equal(1);
  expect(slotNodes?.at(0)?.textContent?.trim()).to.equal('Icon');
});
