/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button-group.button.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButtonGroupButton from './button-group.button.js';
import sinon from 'sinon';

GlideCoreButtonGroupButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-button-group-button')).to.equal(
    GlideCoreButtonGroupButton,
  );
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(html`
    <glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>
  `);

  expect(component.disabled).to.be.false;
  expect(component.selected).to.be.false;
  expect(component.value).to.equal('');

  expect(component.getAttribute('value')).to.equal('');
  expect(component).to.not.have.attribute('disabled');
  expect(component).to.not.have.attribute('selected');
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  await expect(component).to.be.accessible();
});

it('can have a label', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
      selected
    ></glide-core-button-group-button>`,
  );

  expect(component.shadowRoot?.textContent?.trim()).to.equal('Button');
});

it('can have a "prefix" slot', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button label="Button">
      <span slot="prefix">Prefix</span>
    </glide-core-button-group-button>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="prefix"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Prefix');
});

it('sets `aria-checked` when selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
      selected
    ></glide-core-button-group-button>`,
  );

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.getAttribute('aria-checked')).to.equal('true');
});

it('sets `aria-checked` when not selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.getAttribute('aria-checked')).to.equal('false');
});

it('sets `aria-disabled` when disabled', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
      disabled
    ></glide-core-button-group-button>`,
  );

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.getAttribute('aria-disabled')).to.equal('true');
});

it('sets `aria-disabled` when not disabled', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.getAttribute('aria-disabled')).to.equal('false');
});

it('is tabbable when selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
      selected
    ></glide-core-button-group-button>`,
  );

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.getAttribute('tabindex')).to.equal('0');
});

it('is not tabbable when not selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(radio?.getAttribute('tabindex')).to.equal('-1');
});

it('throws when icon-only and no "prefix" slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-button-group-button
        value="value"
        selected
        privateVariant="icon-only"
      ></glide-core-button-group-button>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});
