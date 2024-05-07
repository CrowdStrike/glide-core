import './tab.js';
import { expect, fixture, html } from '@open-wc/testing';
import Tab from './tab.js';

Tab.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-tab')).to.equal(Tab);
});

it('renders correct markup and sets correct attributes for the default case', async () => {
  const element = await fixture<Tab>(html` <cs-tab>Tab</cs-tab> `);

  await expect(element).to.not.be.accessible();
  expect(element.active).to.equal(false, 'active defaults to false');
  expect(element.disabled).to.equal(false, 'disabled defaults to false');
  expect(element.variant).to.equal('primary');

  expect(element.getAttribute('aria-disabled')).to.equal(
    null,
    'does not set aria-disabled',
  );
  expect([...element.shadowRoot!.firstElementChild!.classList]).to.deep.equal([
    'component',
    'primary',
  ]);
  expect(element.shadowRoot!.querySelector('cs-icon-general-x-close-solid')).to
    .not.exist;
});

it('renders a secondary variant', async () => {
  const element = await fixture<Tab>(html`
    <cs-tab variant="secondary">Tab</cs-tab>
  `);

  expect([...element.shadowRoot!.firstElementChild!.classList]).to.deep.equal([
    'component',
    'secondary',
  ]);
});

it('renders a vertical variant', async () => {
  const element = await fixture<Tab>(html`
    <cs-tab variant="vertical">Tab</cs-tab>
  `);

  expect([...element.shadowRoot!.firstElementChild!.classList]).to.deep.equal([
    'component',
    'vertical',
  ]);
});

it('sets the panel attribute', async () => {
  const element = await fixture<Tab>(html`
    <cs-tab panel="details">Tab</cs-tab>
  `);

  expect(element.panel).to.equal('details');
});

it('sets the active attribute', async () => {
  const element = await fixture<Tab>(html` <cs-tab active>Tab</cs-tab> `);

  expect(element.active).to.equal(true);
});

it('sets the disabled attribute', async () => {
  const element = await fixture<Tab>(html` <cs-tab disabled>Tab</cs-tab> `);

  expect(element.disabled).to.equal(true);
  expect(element).to.have.attribute('aria-disabled', 'true');
});

it('renders the icon slot', async () => {
  const element = await fixture<Tab>(html`
    <cs-tab>
      <span slot="icon">Icon</span>
      <span>Tab</span>
    </cs-tab>
  `);

  const slotNodes = element
    .shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]')
    ?.assignedNodes();
  expect(slotNodes?.length).to.equal(1);
  expect(slotNodes?.at(0)?.textContent?.trim()).to.equal('Icon');
});
