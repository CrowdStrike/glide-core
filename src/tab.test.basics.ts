import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTab from './tab.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tab')).to.equal(GlideCoreTab);
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
  expect(component?.ariaDisabled).to.equal('true');
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
