import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButton from './button.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-button')).to.equal(
    GlideCoreButton,
  );
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-button label="Label"></glide-core-button>`,
  );

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label"></glide-core-button>
  `);

  expect(component.disabled).to.be.false;
  expect(component.name).to.be.empty.string;
  expect(component.value).to.be.empty.string;
  expect(component.type).to.equal('button');

  expect(component.hasAttribute('disabled')).to.be.false;
  expect(component.getAttribute('name')).to.be.empty.string;
  expect(component.getAttribute('type')).to.equal('button');
  expect(component.getAttribute('value')).to.be.empty.string;

  const button = component.shadowRoot?.querySelector('button');
  expect(button?.disabled).to.be.false;
});

it('delegates focus', async () => {
  const component = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label"></glide-core-button>`,
  );

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('button'),
  );
});

it('has `#onPrefixSlotChange` coverage', async () => {
  await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label">
      <span slot="prefix-icon">Prefix</span>
    </glide-core-button>
  `);
});

it('has `#onSuffixIconSlotChange` coverage', async () => {
  await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label">
      <span slot="suffix-icon">Suffix</span>
    </glide-core-button>
  `);
});
