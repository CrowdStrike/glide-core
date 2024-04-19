import './button-group.button.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import CsButtonGroup from './button-group.js';
import CsButtonGroupButton from './button-group.button.js';

CsButtonGroup.shadowRootOptions.mode = 'open';
CsButtonGroupButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-button-group-button')).to.equal(
    CsButtonGroupButton,
  );
});

it('is accessible', async () => {
  const element = await fixture<CsButtonGroupButton>(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );

  await expect(element).to.be.accessible();
});

it('renders an li with role "radio"', async () => {
  const element = await fixture<CsButtonGroupButton>(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );
  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.have.attribute('role', 'radio');
});

it('renders "aria-checked" equal to "false" and "tabindex" equal to "-1" by default', async () => {
  const element = await fixture<CsButtonGroupButton>(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );
  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.not.be.null;
  expect(liElement).to.have.attribute('aria-checked', 'false');
  expect(liElement).to.have.attribute('tabindex', '-1');
});

it('renders "aria-checked" equal to "true" and "tabindex" equal to "0" when attribute "selected" exists', async () => {
  const element = await fixture<CsButtonGroupButton>(
    html`<cs-button-group-button value="value" selected
      >Button</cs-button-group-button
    >`,
  );
  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.have.attribute('aria-checked', 'true');
  expect(liElement).to.have.attribute('tabindex', '0');
});

it('renders two slots, where one has name "prefix", and the other is default with given text', async () => {
  const element = await fixture<CsButtonGroupButton>(
    html`<cs-button-group-button value="value" selected
      ><span slot="prefix" data-prefix>Prefix</span
      ><span data-default>Button</span></cs-button-group-button
    >`,
  );
  const liPrefixOnlyElement = element.shadowRoot?.querySelector(
    '[data-test-prefix-only]',
  );
  const prefixSlot = element.shadowRoot?.querySelector('slot[name="prefix"]');
  const defaultSlot = element.shadowRoot?.querySelector(
    'slot:not([name="prefix"])',
  );

  // verify the slots exist
  expect(liPrefixOnlyElement).to.be.null;
  expect(prefixSlot).to.not.be.null;
  expect(defaultSlot).to.not.be.null;

  const prefixElement = document.querySelector('[data-prefix]');
  const defaultElement = document.querySelector('[data-default]');

  // verify the content of the slots exist
  expect(prefixElement).to.not.be.null;
  expect(defaultElement).to.not.be.null;
  expect(prefixElement?.textContent).to.equal('Prefix');
  expect(defaultElement?.textContent).to.equal('Button');
});

it('is has a disabled presentation when the "disabled" attribute is true', async () => {
  const element = await fixture<CsButtonGroupButton>(
    html`<cs-button-group-button value="value" disabled
      >Button</cs-button-group-button
    >`,
  );
  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.have.attribute('aria-disabled', 'true');
});

it('does not have a disabled presentation when "disabled" attribute is false', async () => {
  const element = await fixture<CsButtonGroupButton>(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );
  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.have.attribute('aria-disabled', 'false');
});

it('reacts to "vertical" attribute when button group orientation changes from "horizontal" to "vertical"', async () => {
  const element = await fixture<CsButtonGroup>(
    html`<cs-button-group orientation="horizontal"
      ><cs-button-group-button value="value"
        >Button</cs-button-group-button
      ></cs-button-group
    >`,
  );
  const buttonElement = document.querySelector<CsButtonGroupButton>(
    'cs-button-group-button',
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

it('assigns the correct positional presentation when in a button group', async () => {
  await fixture(
    html`<cs-button-group>
      <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
      <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
      <cs-button-group-button value="value-3">Button 3</cs-button-group-button>
      <cs-button-group-button value="value-4">Button 4</cs-button-group-button>
    </cs-button-group>`,
  );
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  expect(buttonElements.length).to.equal(4);
  let liElement =
    buttonElements[0].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.class('first');

  liElement =
    buttonElements[1].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.class('inner');

  liElement =
    buttonElements[2].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.class('inner');

  liElement =
    buttonElements[3].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.class('last');
});

it('sets buttons as not tabbable by default', async () => {
  const element = await fixture<CsButtonGroupButton>(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );
  const liElement = element.shadowRoot?.querySelector('li');

  await expect(liElement).to.have.attribute('tabindex', '-1');
});

it('sets a "selected" button as tabbable', async () => {
  const element = await fixture<CsButtonGroupButton>(
    html`<cs-button-group-button value="value" selected
      >Button</cs-button-group-button
    >`,
  );
  const liElement = element.shadowRoot?.querySelector('li');

  await expect(liElement).to.have.attribute('tabindex', '0');
});

it('initially sets itself as tabble if its the first element in a button group', async () => {
  await fixture(
    html`<cs-button-group>
      <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
      <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
      <cs-button-group-button value="value-3">Button 3</cs-button-group-button>
    </cs-button-group>`,
  );
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  expect(buttonElements.length).to.equal(3);

  let liElement =
    buttonElements[0].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '0');

  liElement =
    buttonElements[1].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '-1');

  liElement =
    buttonElements[2].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '-1');
});

it('initially sets itself as tabbable when first non-disabled button in a group', async () => {
  await fixture(
    html`<cs-button-group>
      <cs-button-group-button value="value-1" disabled
        >Button 1</cs-button-group-button
      >
      <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
      <cs-button-group-button value="value-3">Button 3</cs-button-group-button>
    </cs-button-group>`,
  );
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  expect(buttonElements.length).to.equal(3);

  let liElement =
    buttonElements[0].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '-1');

  liElement =
    buttonElements[1].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '0');

  liElement =
    buttonElements[2].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '-1');
});

it('initially sets itself as tabbable when "selected" when others are not when in a button group', async () => {
  await fixture(
    html`<cs-button-group>
      <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
      <cs-button-group-button value="value-2" selected
        >Button 2</cs-button-group-button
      >
      <cs-button-group-button value="value-3">Button 3</cs-button-group-button>
    </cs-button-group>`,
  );
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  expect(buttonElements.length).to.equal(3);

  let liElement =
    buttonElements[0].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '-1');

  liElement =
    buttonElements[1].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '0');

  liElement =
    buttonElements[2].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '-1');
});

it('initially no buton sets itself as tabbable if all are disabled in a group', async () => {
  await fixture(
    html`<cs-button-group>
      <cs-button-group-button value="value-1" disabled
        >Button 1</cs-button-group-button
      >
      <cs-button-group-button value="value-2" disabled
        >Button 2</cs-button-group-button
      >
    </cs-button-group>`,
  );
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  expect(buttonElements.length).to.equal(2);

  let liElement =
    buttonElements[0].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '-1');

  liElement =
    buttonElements[1].shadowRoot?.querySelector<CsButtonGroupButton>('li');

  expect(liElement).to.have.attribute('tabindex', '-1');
});

it('has a presentation for variant "icon-only"', async () => {
  const element = await fixture<CsButtonGroupButton>(
    html`<cs-button-group-button value="value" selected variant="icon-only"
      ><span slot="prefix" data-prefix>Prefix</span></cs-button-group-button
    >`,
  );
  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.have.class('icon-only');
});
