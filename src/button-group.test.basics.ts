/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button-group.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreButtonGroup from './button-group.js';
import GlideCoreButtonGroupButton from './button-group.button.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreButtonGroup.shadowRootOptions.mode = 'open';
GlideCoreButtonGroupButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-button-group')).to.equal(
    GlideCoreButtonGroup,
  );
});

it('is accessible', async () => {
  const element = await fixture(
    html`<glide-core-button-group label="label"
      ><glide-core-button-group-button value="value"
        >Button</glide-core-button-group-button
      ></glide-core-button-group
    >`,
  );

  await expect(element).to.be.accessible();
});

it('renders a label and unordered list', async () => {
  const element = await fixture(
    html`<glide-core-button-group label="label"
      ><glide-core-button-group-button value="value"
        >Button</glide-core-button-group-button
      ></glide-core-button-group
    >`,
  );

  const ulElement = element.shadowRoot?.querySelector('ul');
  const labelElement = element.shadowRoot?.querySelector('div.label');

  expect(ulElement).to.not.be.null;
  expect(labelElement).to.not.be.null;
  expect(ulElement).to.have.attribute('aria-labelledby', labelElement?.id);
});

it('does not render a label when not given', async () => {
  const element = await fixture(
    html`<glide-core-button-group
      ><glide-core-button-group-button value="value"
        >Button</glide-core-button-group-button
      ></glide-core-button-group
    >`,
  );

  const ulElement = element.shadowRoot?.querySelector('ul');
  const labelElement = element.shadowRoot?.querySelector('label');

  expect(ulElement).to.not.be.null;
  expect(labelElement).to.be.null;
});

it('assigns buttons the correct positional presentation when in a group', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1"
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-4"
        >Button 4</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  expect(buttonElements.length).to.equal(4);

  const liElement1 = buttonElements[0].shadowRoot?.querySelector('li');

  expect(liElement1).to.have.class('first');

  const liElement2 = buttonElements[1].shadowRoot?.querySelector('li');

  expect(liElement2).to.have.class('inner');

  const liElement3 = buttonElements[2].shadowRoot?.querySelector('li');

  expect(liElement3).to.have.class('inner');

  const liElement4 = buttonElements[3].shadowRoot?.querySelector('li');

  expect(liElement4).to.have.class('last');
});

it('buttons have a vertical presention when attribute "orientation" is set to "vertical"', async () => {
  await fixture(
    html`<glide-core-button-group orientation="vertical"
      ><glide-core-button-group-button value="value"
        >Button</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  const liElement1 = buttonElements[0]?.shadowRoot?.querySelector('li');
  const liElement2 = buttonElements[1]?.shadowRoot?.querySelector('li');

  expect(buttonElements[0]).to.have.attribute('vertical');
  expect(liElement1).to.have.class('vertical');

  expect(buttonElements[1]).to.have.attribute('vertical');
  expect(liElement2).to.have.class('vertical');
});

it('does not have a vertical presention when the "orientation" is not set to "vertical"', async () => {
  await fixture(
    html`<glide-core-button-group label="label">
      <glide-core-button-group-button value="value"
        >Button</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  const liElement1 = buttonElements[0]?.shadowRoot?.querySelector('li');
  const liElement2 = buttonElements[1]?.shadowRoot?.querySelector('li');

  expect(buttonElements[0]).to.not.have.attribute('vertical');
  expect(liElement1).to.not.have.class('vertical');

  expect(buttonElements[1]).to.not.have.attribute('vertical');
  expect(liElement2).to.not.have.class('vertical');
});

it('reacts to "orientation" attribute when changed from "horizontal" to "vertical"', async () => {
  const element = await fixture(
    html`<glide-core-button-group label="label" orientation="horizontal"
      ><glide-core-button-group-button value="value"
        >Button</glide-core-button-group-button
      ></glide-core-button-group
    >`,
  );

  const buttonElement = document.querySelector(
    'glide-core-button-group-button',
  );

  const liElement = buttonElement?.shadowRoot?.querySelector('li');

  expect(liElement).to.not.have.class('vertical');

  element.setAttribute('orientation', 'vertical');

  // wait for attributes to be set on li
  await elementUpdated(element);

  expect(liElement).to.have.class('vertical');

  element.setAttribute('orientation', 'horizontal');

  // wait for attributes to be set on li
  await elementUpdated(element);

  await expect(liElement).to.not.have.class('vertical');
});

it('applies an "icon-only" variant to buttons when set on the group', async () => {
  await fixture(
    html`<glide-core-button-group label="label" variant="icon-only"
      ><glide-core-button-group-button value="value"
        ><span slot="prefix">Prefix 1</span>Button
        1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        ><span slot="prefix">Prefix 2</span>Button
        2</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  const liElement1 = buttonElements[0]?.shadowRoot?.querySelector('li');
  const liElement2 = buttonElements[1]?.shadowRoot?.querySelector('li');

  expect(buttonElements[0]).to.have.attribute('variant', 'icon-only');
  expect(liElement1).to.have.class('icon-only');

  expect(buttonElements[1]).to.have.attribute('variant', 'icon-only');
  expect(liElement2).to.have.class('icon-only');
});

it('does not apply an "icon-only" variant to buttons when not set on the group', async () => {
  await fixture(
    html`<glide-core-button-group label="label"
      ><glide-core-button-group-button value="value"
        >Button</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  const liElement1 = buttonElements[0]?.shadowRoot?.querySelector('li');
  const liElement2 = buttonElements[1]?.shadowRoot?.querySelector('li');

  expect(buttonElements[0]).to.not.have.attribute('variant');
  expect(liElement1).to.not.have.class('icon-only');

  expect(buttonElements[1]).to.not.have.attribute('variant');
  expect(liElement2).to.not.have.class('icon-only');
});

it('reacts to variant "icon-only" attribute when added and removed', async () => {
  await fixture(
    html`<glide-core-button-group label="label"
      ><glide-core-button-group-button value="value"
        ><span slot="prefix">Prefix</span>Button</glide-core-button-group-button
      ></glide-core-button-group
    >`,
  );

  const element = document.querySelector('glide-core-button-group');

  const buttonElement = document.querySelector(
    'glide-core-button-group-button',
  );

  expect(element).to.not.be.null;
  expect(buttonElement).to.not.be.null;
  expect(buttonElement).to.not.have.attribute('variant');

  element?.setAttribute('variant', 'icon-only');

  // wait for attributes to be set
  await elementUpdated(element!);

  expect(buttonElement).to.have.attribute('variant', 'icon-only');

  element?.removeAttribute('variant');

  // wait for attributes to be set
  await elementUpdated(element!);

  expect(buttonElement).to.not.have.attribute('variant');
});

it('throws an error when an element other than `glide-core-button-group-button` is a child of the default slot', async () => {
  await expectArgumentError(() => {
    return fixture(html`
      <glide-core-button-group label="label">
        <div>Content</div>
      </glide-core-button-group>
    `);
  });
});

it('throws an error when the group has no children', async () => {
  await expectArgumentError(() => {
    return fixture(
      html`<glide-core-button-group label="label"> </glide-core-button-group>`,
    );
  });
});

it("has a tabble button if it's the first element in a button group", async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1"
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  expect(buttonElements.length).to.equal(3);

  const liElement1 = buttonElements[0].shadowRoot?.querySelector('li');

  expect(liElement1).to.have.attribute('tabindex', '0');

  const liElement2 = buttonElements[1].shadowRoot?.querySelector('li');

  expect(liElement2).to.have.attribute('tabindex', '-1');

  const liElement3 = buttonElements[2].shadowRoot?.querySelector('li');

  expect(liElement3).to.have.attribute('tabindex', '-1');
});

it('has the first non-disabled button set as tabbable when in a group', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1" disabled
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2"
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  expect(buttonElements.length).to.equal(3);

  const liElement1 = buttonElements[0].shadowRoot?.querySelector('li');

  expect(liElement1).to.have.attribute('tabindex', '-1');

  const liElement2 = buttonElements[1].shadowRoot?.querySelector('li');

  expect(liElement2).to.have.attribute('tabindex', '0');

  const liElement3 = buttonElements[2].shadowRoot?.querySelector('li');

  expect(liElement3).to.have.attribute('tabindex', '-1');
});

it('has the "selected" button as tabbable and others are not when in a group', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1"
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2" selected
        >Button 2</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-3"
        >Button 3</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  expect(buttonElements.length).to.equal(3);

  const liElement1 = buttonElements[0].shadowRoot?.querySelector('li');

  expect(liElement1).to.have.attribute('tabindex', '-1');

  const liElement2 = buttonElements[1].shadowRoot?.querySelector('li');

  expect(liElement2).to.have.attribute('tabindex', '0');

  const liElement3 = buttonElements[2].shadowRoot?.querySelector('li');

  expect(liElement3).to.have.attribute('tabindex', '-1');
});

it('initially no button sets itself as tabbable if all are disabled in a group', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button value="value-1" disabled
        >Button 1</glide-core-button-group-button
      >
      <glide-core-button-group-button value="value-2" disabled
        >Button 2</glide-core-button-group-button
      >
    </glide-core-button-group>`,
  );

  const buttonElements = document.querySelectorAll(
    'glide-core-button-group-button',
  );

  expect(buttonElements.length).to.equal(2);

  const liElement1 = buttonElements[0].shadowRoot?.querySelector('li');

  expect(liElement1).to.have.attribute('tabindex', '-1');

  const liElement2 = buttonElements[1].shadowRoot?.querySelector('li');

  expect(liElement2).to.have.attribute('tabindex', '-1');
});
