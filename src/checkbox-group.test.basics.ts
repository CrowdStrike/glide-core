/* eslint-disable @typescript-eslint/no-unused-expressions */

import './checkbox.js';
import { ArgumentError } from 'ow';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

GlideCoreCheckboxGroup.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-checkbox-group')).to.equal(
    GlideCoreCheckboxGroup,
  );
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(component.disabled).to.be.false;
  expect(component.hideLabel).to.be.false;
  expect(component.name).to.be.empty.string;
  expect(component.required).to.be.false;

  // Not reflected, so no attribute assertion is necessary.
  expect(component.value).to.deep.equal([]);
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
      <div slot="tooltip">Tooltip</div>
      <div slot="description">Description</div>
    </glide-core-checkbox-group>`,
  );

  await expect(component).to.be.accessible();
});

it('can have a label', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(component.getAttribute('label')).to.equal('Checkbox Group');
  expect(component.label).to.equal('Checkbox Group');
});

it('can have a description', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
      <div slot="description">Description</div>
    </glide-core-checkbox-group>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('can have a name', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(component.getAttribute('name')).to.equal('name');
  expect(component.name).to.equal('name');
});

it('can have a tooltip', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
      <div slot="tooltip">Tooltip</div>
    </glide-core-checkbox-group>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('can be disabled initially', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" disabled>
      <glide-core-checkbox label="One"></glide-core-checkbox>
      <glide-core-checkbox label="Two"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  const checkboxes = component.querySelectorAll('glide-core-checkbox');

  expect(checkboxes[0].disabled).to.be.true;
  expect(checkboxes[1].disabled).to.be.true;

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.be.true;
});

it('can be disabled dynamically', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="One"></glide-core-checkbox>
      <glide-core-checkbox label="Two"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  component.disabled = true;
  await elementUpdated(component);

  const checkboxes = component.querySelectorAll('glide-core-checkbox');

  expect(checkboxes[0].disabled).to.be.true;
  expect(checkboxes[1].disabled).to.be.true;

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.be.true;
});

it('can be required', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(component.hasAttribute('required')).to.be.true;
  expect(component.required).to.be.true;
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreCheckboxGroup>(
      html`<glide-core-checkbox-group
        label="Checkbox Group"
      ></glide-core-checkbox-group>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<GlideCoreCheckboxGroup>(
      html`<glide-core-checkbox-group label="Checkbox Group">
        <button>Button</button>
      </glide-core-checkbox-group>`,
    );
  });
});
