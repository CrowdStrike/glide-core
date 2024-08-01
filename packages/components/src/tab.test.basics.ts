import './tab.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTab from './tab.js';

GlideCoreTab.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-tab')).to.equal(GlideCoreTab);
});

it('renders correct markup and sets correct attributes for the default case', async () => {
  const element = await fixture<GlideCoreTab>(html`
    <glide-core-tab>Tab</glide-core-tab>
  `);

  await expect(element).to.not.be.accessible();
  expect(element.active).to.equal(false, 'active defaults to false');
  expect(element.disabled).to.equal(false, 'disabled defaults to false');

  expect(element.getAttribute('aria-disabled')).to.equal(
    null,
    'does not set aria-disabled',
  );

  expect([...element.shadowRoot!.firstElementChild!.classList]).to.deep.equal([
    'component',
  ]);
});

it('sets the panel attribute', async () => {
  const element = await fixture<GlideCoreTab>(html`
    <glide-core-tab panel="details">Tab</glide-core-tab>
  `);

  expect(element.panel).to.equal('details');
});

it('sets the active attribute', async () => {
  const element = await fixture<GlideCoreTab>(html`
    <glide-core-tab active>Tab</glide-core-tab>
  `);

  expect(element.active).to.equal(true);
});

it('sets the disabled attribute', async () => {
  const element = await fixture<GlideCoreTab>(html`
    <glide-core-tab disabled>Tab</glide-core-tab>
  `);

  expect(element.disabled).to.equal(true);
  expect(element).to.have.attribute('aria-disabled', 'true');
});

it('renders the icon slot', async () => {
  const element = await fixture<GlideCoreTab>(html`
    <glide-core-tab>
      <span slot="icon">Icon</span>
      <span>Tab</span>
    </glide-core-tab>
  `);

  const slotNodes = element
    .shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]')
    ?.assignedNodes();

  expect(slotNodes?.length).to.equal(1);
  expect(slotNodes?.at(0)?.textContent?.trim()).to.equal('Icon');
});
