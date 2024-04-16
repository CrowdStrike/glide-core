import './button-group.js';
import { expect, fixture } from '@open-wc/testing';
import CsButtonGroup from './button-group.js';
import CsButtonGroupButton from './button-group-button.js';

CsButtonGroup.shadowRootOptions.mode = 'open';
CsButtonGroupButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-button-group')).to.equal(CsButtonGroup);
});

it('is accessible', async () => {
  const template = `<cs-button-group label="label"><cs-button-group-button value="value">Button</cs-button-group-button></cs-button-group>`;
  const element = await fixture<CsButtonGroup>(template);

  await expect(element).to.be.accessible();
});

it('renders a label and unordered list', async () => {
  const template = `<cs-button-group label="label"><cs-button-group-button value="value">Button</cs-button-group-button></cs-button-group>`;
  const element = await fixture<CsButtonGroup>(template);
  const ulElement = element.shadowRoot!.querySelector('ul');
  const labelElement = element.shadowRoot!.querySelector('label');

  expect(ulElement).to.exist;
  expect(labelElement).to.exist;
  expect(labelElement).to.have.attribute('for', ulElement?.id);
});

it('does not render a label when not given', async () => {
  const template = `<cs-button-group><cs-button-group-button value="value">Button</cs-button-group-button></cs-button-group>`;
  const element = await fixture<CsButtonGroup>(template);
  const ulElement = element.shadowRoot!.querySelector('ul');
  const labelElement = element.shadowRoot!.querySelector('label');

  expect(ulElement).to.exist;
  expect(labelElement).to.be.null;
});

it('returns nothing if it has no button group button children', async () => {
  const template = `<cs-button-group></cs-button-group>`;
  const element = await fixture<CsButtonGroup>(template);
  const ulElement = element.shadowRoot!.querySelector('ul');

  expect(ulElement).to.be.null;
});

it('has a vertical presention when the "vertical" attribute is present', async () => {
  const template = `<cs-button-group vertical><cs-button-group-button value="value">Button</cs-button-group-button></cs-button-group>`;
  const element = await fixture<CsButtonGroup>(template);
  const ulElement = element.shadowRoot!.querySelector('ul');

  expect(ulElement).to.have.attribute('data-test-vertical');
});

it('does not have a vertical presention when the "vertical" attribute is not present', async () => {
  const template = `<cs-button-group><cs-button-group-button value="value">Button</cs-button-group-button></cs-button-group>`;
  const element = await fixture<CsButtonGroup>(template);
  const ulElement = element.shadowRoot!.querySelector('ul');

  expect(ulElement).to.have.not.attribute('data-test-vertical');
});
