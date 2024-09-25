/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButton from './button.js';

GlideCoreButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
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

  expect(component.ariaControls).to.be.null;
  expect(component.ariaExpanded).to.be.null;
  expect(component.ariaHasPopup).to.be.null;
  expect(component.autofocus).to.be.false;
  expect(component.disabled).to.be.false;
  expect(component.formAction).to.be.empty.string;
  expect(component.formEncType).to.be.empty.string;
  expect(component.formMethod).to.be.empty.string;
  expect(component.formNoValidate).to.be.false;
  expect(component.name).to.be.empty.string;
  expect(component.popoverTarget).to.be.undefined;
  expect(component.popoverTargetAction).to.be.empty.string;
  expect(component.value).to.be.empty.string;
  expect(component.type).to.equal('button');

  expect(component.hasAttribute('autofocus')).to.be.false;
  expect(component.getAttribute('aria-controls')).to.be.null;
  expect(component.getAttribute('aria-expanded')).to.be.null;
  expect(component.getAttribute('aria-haspopup')).to.be.null;
  expect(component.hasAttribute('disabled')).to.be.false;
  expect(component.getAttribute('formaction')).to.be.empty.string;
  expect(component.getAttribute('formenctype')).to.be.empty.string;
  expect(component.getAttribute('formmethod')).to.be.empty.string;
  expect(component.hasAttribute('formnovalidate')).to.be.false;
  expect(component.getAttribute('name')).to.be.empty.string;
  expect(component.getAttribute('popovertarget')).to.be.null;
  expect(component.getAttribute('popovertargetaction')).to.be.empty.string;
  expect(component.getAttribute('type')).to.equal('button');
  expect(component.getAttribute('value')).to.be.empty.string;

  const button = component.shadowRoot?.querySelector('button');

  expect(button?.getAttribute('aria-controls')).to.be.null;
  expect(button?.ariaExpanded).to.be.null;
  expect(button?.ariaHasPopup).to.be.null;
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
