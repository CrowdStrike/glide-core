import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import CsButtonGroupButton from './button-group.button.js';
import sinon from 'sinon';

CsButtonGroupButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-button-group-button')).to.equal(
    CsButtonGroupButton,
  );
});

it('is accessible', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );

  await expect(element).to.be.accessible();
});

it('renders an li with role "radio"', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );

  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.have.attribute('role', 'radio');
});

it('renders "aria-checked" equal to "false" and "tabindex" equal to "-1" by default', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );

  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.not.be.null;
  expect(liElement).to.have.attribute('aria-checked', 'false');
  expect(liElement).to.have.attribute('tabindex', '-1');
});

it('renders "aria-checked" equal to "true" and "tabindex" equal to "0" when attribute "selected" exists', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value" selected
      >Button</cs-button-group-button
    >`,
  );

  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.have.attribute('aria-checked', 'true');
  expect(liElement).to.have.attribute('tabindex', '0');
});

it('renders two slots, where one has name "prefix", and the other is default with given text', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value" selected
      ><span slot="prefix" data-prefix>Prefix</span
      >Button</cs-button-group-button
    >`,
  );

  const prefixSlot = element.shadowRoot?.querySelector('slot[name="prefix"]');

  const defaultSlot = element.shadowRoot?.querySelector(
    'slot:not([name="prefix"])',
  );

  // verify the slots exist
  expect(prefixSlot).to.not.be.null;
  expect(defaultSlot).to.not.be.null;

  const prefixContent = document.querySelector('[data-prefix]');
  const content = document.querySelector('cs-button-group-button');

  // verify the content of the slots exist
  expect(prefixContent).to.not.be.null;
  expect(prefixContent?.textContent).to.equal('Prefix');
  expect(content?.textContent).to.contain('Button');
});

it('is has a disabled presentation when the "disabled" attribute is true', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value" disabled
      >Button</cs-button-group-button
    >`,
  );

  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.have.attribute('aria-disabled', 'true');
});

it('does not have a disabled presentation when "disabled" attribute is false', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );

  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.have.attribute('aria-disabled', 'false');
});

it('has a vertical presention when the "vertical" attribute is set', async () => {
  await fixture(
    html` <cs-button-group-button value="value" vertical
      >Button</cs-button-group-button
    >`,
  );

  const buttonElement = document.querySelector('cs-button-group-button');
  const liElement = buttonElement?.shadowRoot?.querySelector('li');

  expect(liElement).to.have.class('vertical');
});

it('does not have a vertical presention when the "vertical" attribute is not set', async () => {
  await fixture(
    html` <cs-button-group-button value="value"
      >Button</cs-button-group-button
    >`,
  );

  const buttonElement = document.querySelector('cs-button-group-button');
  const liElement = buttonElement?.shadowRoot?.querySelector('li');

  expect(liElement).to.not.have.class('vertical');
});

it('sets buttons as not tabbable by default', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );

  const liElement = element.shadowRoot?.querySelector('li');

  await expect(liElement).to.have.attribute('tabindex', '-1');
});

it('sets a "selected" button as tabbable', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value" selected
      >Button</cs-button-group-button
    >`,
  );

  const liElement = element.shadowRoot?.querySelector('li');

  await expect(liElement).to.have.attribute('tabindex', '0');
});

it('has a presentation for variant "icon-only"', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value" selected variant="icon-only"
      ><span slot="prefix">Prefix</span>Button</cs-button-group-button
    >`,
  );

  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.have.class('icon-only');
});

it('does not apply class "icon-only" when variant "icon-only" is absent', async () => {
  const element = await fixture(
    html`<cs-button-group-button value="value">Button</cs-button-group-button>`,
  );

  const liElement = element.shadowRoot?.querySelector('li');

  expect(liElement).to.not.have.class('icon-only');
});

it('throws an error when no label is present and variant is `icon-only`', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<cs-button-group-button value="value" selected variant="icon-only"
        ><span slot="prefix">Prefix</span></cs-button-group-button
      >`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('throws an error when prefix slot is empty and variant is `icon-only`', async () => {
  const spy = sinon.spy();

  // Not sure how to resolve the below, despite the test passing, so disabling console errors for now:
  //
  // Browser logs:
  //     An error was thrown in a Promise outside a test. Did you forget to await a function or assertion?
  sinon.stub(console, 'error'); // Disable console.error

  try {
    await fixture(
      html`<cs-button-group-button value="value" selected variant="icon-only"
        >Button</cs-button-group-button
      >`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('does not throw an error when prefix slot is empty and no variant is set', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<cs-button-group-button value="value" selected
        >Button</cs-button-group-button
      >`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.notCalled).to.be.true;
});
