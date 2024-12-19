/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreCheckbox from './checkbox.js';

GlideCoreCheckbox.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(globalThis.customElements.get('glide-core-checkbox')).to.equal(
    GlideCoreCheckbox,
  );
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  expect(component.checked).to.be.false;
  expect(component.disabled).to.be.false;
  expect(component.hideLabel).to.be.false;
  expect(component.indeterminate).to.be.false;
  expect(component.name).to.be.empty.string;
  expect(component.orientation).to.equal('horizontal');
  expect(component.required).to.be.false;
  expect(component.summary).to.equal(undefined);
  expect(component.value).to.be.empty.string;
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label">
      <div slot="tooltip">Tooltip</div>
      <div slot="description">Description</div>
    </glide-core-checkbox>`,
  );

  await expect(component).to.be.accessible();
});

it('can have a label', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label">
      <div slot="description">Description</div>
    </glide-core-checkbox>`,
  );

  const label = component.shadowRoot?.querySelector('label');

  expect(label?.textContent?.trim()).to.equal('Label');
});

it('can have a description', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label">
      <div slot="description">Description</div>
    </glide-core-checkbox>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('can have a name', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
    ></glide-core-checkbox> `,
  );

  expect(component.getAttribute('name')).to.equal('name');
  expect(component.name).to.equal('name');
});

it('can have a summary', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      summary="Summary"
    ></glide-core-checkbox> `,
  );

  expect(component.getAttribute('summary')).to.equal('Summary');
  expect(component.summary).to.equal('Summary');
});

it('can have a tooltip', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label">
      <div slot="tooltip">Tooltip</div>
    </glide-core-checkbox>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('can be checked', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" checked></glide-core-checkbox> `,
  );

  expect(component.hasAttribute('checked')).to.be.true;
  expect(component.checked).to.be.true;
});

it('can be disabled', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" disabled></glide-core-checkbox> `,
  );

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.be.true;
});

it('can be indeterminate', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      indeterminate
    ></glide-core-checkbox> `,
  );

  expect(component.hasAttribute('indeterminate')).to.be.true;
  expect(component.indeterminate).to.be.true;
});

it('can be required', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox> `,
  );

  expect(component.hasAttribute('required')).to.be.true;
  expect(component.required).to.be.true;
});
