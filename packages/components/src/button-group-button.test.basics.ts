import './button-group-button.js';
import { aTimeout, expect, fixture } from '@open-wc/testing';
import CsButtonGroup from './button-group.js';
import CsButtonGroupButton from './button-group-button.js';

CsButtonGroup.shadowRootOptions.mode = 'open';
CsButtonGroupButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-button-group-button')).to.equal(
    CsButtonGroupButton,
  );
});

it('is accessible', async () => {
  const template = `<cs-button-group-button value="value">Button</cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);

  await expect(element).to.be.accessible();
});

it('renders an li with role "radio"', async () => {
  const template = `<cs-button-group-button value="value">Button</cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liElement = element.shadowRoot!.querySelector('li');

  expect(liElement).to.have.attribute('role', 'radio');
});

it('renders "aria-checked" as "false" and "tabindex" as "-1" by default', async () => {
  const template = `<cs-button-group-button value="value">Button</cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liElement = element.shadowRoot!.querySelector(
    'li[aria-checked="false"][tabindex="-1"]',
  );

  expect(liElement).to.exist;
});

it('renders "aria-checked" as "true" and "tabindex" as "0" when attribute "selected" exists', async () => {
  const template = `<cs-button-group-button value="value" selected>Button</cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liElement = element.shadowRoot!.querySelector(
    'li[aria-checked="true"][tabindex="0"]',
  );

  expect(liElement).to.exist;
});

it('renders two slots, where one has name "prefix", and the other is default with text "Button"', async () => {
  const template = `<cs-button-group-button value="value" selected><span slot="prefix" data-prefix>Prefix</span><span data-default>Button</span></cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liPrefixOnlyElement = element.shadowRoot!.querySelector(
    'li[data-test-prefix-only]',
  );
  const prefixSlot = element.shadowRoot!.querySelector(
    'li slot[name="prefix"]',
  );
  const defaultSlot = element.shadowRoot!.querySelector(
    'li slot:not([name="prefix"])',
  );

  expect(liPrefixOnlyElement).to.be.null;
  expect(prefixSlot).to.exist;
  expect(defaultSlot).to.exist;

  const prefixElement = document.querySelector('[data-prefix]');
  const defaultElement = document.querySelector('[data-default]');

  expect(prefixElement).to.exist;
  expect(defaultElement).to.exist;
  expect(prefixElement?.textContent).to.equal('Prefix');
  expect(defaultElement?.textContent).to.equal('Button');
});

it('is has a disabled presentation when the "disabled" attribute exists', async () => {
  const template = `<cs-button-group-button value="value" disabled>Button</cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liElement = element.shadowRoot!.querySelector('li');

  expect(liElement).to.have.attribute('data-test-disabled');
});

it('does not have a disabled presentation when "disabled" attribute does not exist', async () => {
  const template = `<cs-button-group-button value="value">Button</cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liElement = element.shadowRoot!.querySelector('li');

  expect(liElement).to.have.not.attribute('data-test-disabled');
});

it('has a "vertical" presentation when the parent button group element has attribute "vertical"', async () => {
  const template = `<cs-button-group vertical><cs-button-group-button value="value">Button</cs-button-group-button></cs-button-group>`;
  await fixture(template);
  const buttonElement = document.querySelector<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  const liElement = buttonElement?.shadowRoot!.querySelector('li');

  expect(liElement).to.have.attribute('data-test-vertical');
});

it('has no "vertical" presentation when the parent button group element does not have attribute "vertical"', async () => {
  const template = `<cs-button-group><cs-button-group-button value="value">Button</cs-button-group-button></cs-button-group>`;
  await fixture(template);
  const buttonElement = document.querySelector<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  const liElement = buttonElement?.shadowRoot!.querySelector('li');

  expect(liElement).to.not.have.attribute('data-test-vertical');
});

it('reacts to "vertical" attribute when toggled on button group', async () => {
  const template = `<cs-button-group><cs-button-group-button value="value">Button</cs-button-group-button></cs-button-group>`;
  const element = await fixture<CsButtonGroup>(template);
  const buttonElement = document.querySelector<CsButtonGroupButton>(
    'cs-button-group-button',
  );
  const liElement = buttonElement?.shadowRoot!.querySelector('li');

  expect(liElement).to.not.have.attribute('data-test-vertical');

  element.toggleAttribute('vertical');
  await aTimeout(0);

  await expect(liElement).to.have.attribute('data-test-vertical');
});

it('assigns the correct positional presentation when in a button group', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>
    <cs-button-group-button value="value-4">Button 4</cs-button-group-button>
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  expect(buttonElements.length).to.equal(4);

  for (let index = 0; index < 4; index++) {
    const liElement =
      buttonElements[index].shadowRoot!.querySelector<CsButtonGroupButton>(
        'li',
      );

    index === 0 &&
      expect(liElement).to.have.attribute('data-test-position', 'first');
    [1, 2].includes(index) &&
      expect(liElement).to.have.attribute('data-test-position', 'inner');
    index === 3 &&
      expect(liElement).to.have.attribute('data-test-position', 'last');
  }
});

it('sets buttons as not tabbable by default', async () => {
  const template = `<cs-button-group-button value="value">Button</cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liElement = element.shadowRoot!.querySelector('li');

  await expect(liElement).to.have.attribute('tabindex', '-1');
});

it('sets a "selected" button as tabbable', async () => {
  const template = `<cs-button-group-button value="value" selected>Button</cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liElement = element.shadowRoot!.querySelector('li');

  await expect(liElement).to.have.attribute('tabindex', '0');
});

it('initially sets itself as tabble if its the first element in a button group', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  expect(buttonElements.length).to.equal(3);

  for (let index = 0; index < 3; index++) {
    const liElement =
      buttonElements[index].shadowRoot!.querySelector<CsButtonGroupButton>(
        'li',
      );

    if (index === 0) {
      expect(liElement).to.have.attribute('tabindex', '0');
    } else {
      expect(liElement).to.have.attribute('tabindex', '-1');
    }
  }
});

it('initially sets itself as tabbable when first non-disabled button in a group', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1" disabled>Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2">Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  expect(buttonElements.length).to.equal(3);

  for (let index = 0; index < 3; index++) {
    const liElement =
      buttonElements[index].shadowRoot!.querySelector<CsButtonGroupButton>(
        'li',
      );

    if (index === 1) {
      expect(liElement).to.have.attribute('tabindex', '0');
    } else {
      expect(liElement).to.have.attribute('tabindex', '-1');
    }
  }
});

it('initially sets itself as tabbable when "selected" while others do not when in a button group', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1">Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2" selected>Button 2</cs-button-group-button>
    <cs-button-group-button value="value-3">Button 3</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  expect(buttonElements.length).to.equal(3);

  for (let index = 0; index < 3; index++) {
    const liElement =
      buttonElements[index].shadowRoot!.querySelector<CsButtonGroupButton>(
        'li',
      );

    if (index === 1) {
      expect(liElement).to.have.attribute('tabindex', '0');
    } else {
      expect(liElement).to.have.attribute('tabindex', '-1');
    }
  }
});

it('initially no buton sets itself as tabbable if all are disabled in a group', async () => {
  const template = `<cs-button-group>
    <cs-button-group-button value="value-1" disabled>Button 1</cs-button-group-button>
    <cs-button-group-button value="value-2" disabled>Button 2</cs-button-group-button>    
  </cs-button-group>`;
  await fixture(template);
  const buttonElements = document.querySelectorAll<CsButtonGroupButton>(
    'cs-button-group-button',
  );

  expect(buttonElements.length).to.equal(2);

  for (let index = 0; index < 2; index++) {
    const liElement =
      buttonElements[index].shadowRoot!.querySelector<CsButtonGroupButton>(
        'li',
      );

    expect(liElement).to.have.attribute('tabindex', '-1');
  }
});

it('has a presentation when the default slot is empty and the prefix slot is not', async () => {
  const template = `<cs-button-group-button value="value" selected><span slot="prefix" data-prefix>Prefix</span></cs-button-group-button>`;
  const element = await fixture<CsButtonGroupButton>(template);
  const liElement = element.shadowRoot!.querySelector('li');

  expect(liElement).to.have.attribute('data-test-prefix-only');
});
