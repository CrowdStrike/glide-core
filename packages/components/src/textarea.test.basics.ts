import { expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsTextarea from './textarea.js';

CsTextarea.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-textarea')).to.equal(CsTextarea);
});

it('is accessible', async () => {
  const template = `<cs-textarea value="value" label="label"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);

  await expect(element).to.be.accessible();
});

it('renders a textarea with two rows and value when attribute `value` is set ', async () => {
  const template = `<cs-textarea value="value" label="label"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  const textarea = element.shadowRoot!.querySelector('textarea');

  expect(element);
  expect(element).to.have.attribute('rows', '2');

  expect(textarea).to.exist;
  expect(textarea?.textContent).to.equal('value');
  expect(textarea).to.have.attribute('rows', '2');
});

it('renders the `rows` attribute on the textarea when set', async () => {
  const template = `<cs-textarea value="value" label="label" rows="5"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  const textarea = element.shadowRoot!.querySelector('textarea');

  expect(textarea).to.have.attribute('rows', '5');
});

it('renders a label when attribute `label` is set', async () => {
  const template = `<cs-textarea value="value" label="label"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  const label = element.shadowRoot!.querySelector('label');

  expect(label).to.exist;
  expect(label?.textContent?.trim()).to.be.equal('label');
});

it('renders a visually hidden label when attribute `hide-label` is set', async () => {
  const template = `<cs-textarea value="value" label="label" hide-label></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);

  const labelContainer = element.shadowRoot!.querySelector(
    '[data-test-label-container][data-test-label-container--visually-hidden]',
  );

  expect(labelContainer).to.exist;
});

it('renders the label above the textarea when attribute `label-position` is set to "top"', async () => {
  const template = `<cs-textarea value="value" label="label" label-position="top"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);

  const labelContainer = element.shadowRoot!.querySelector(
    '[data-test-label-container][data-test-label-container--top]',
  );

  expect(labelContainer).to.exist;
});

it('renders the textarea as readonly when attribute `readonly` is set', async () => {
  const template = `<cs-textarea value="value" label="label" readonly></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  const textarea = element.shadowRoot!.querySelector('textarea');

  expect(textarea).to.have.attribute('readonly');
});

it('renders the textarea as disabled when attribute `disabled` is set', async () => {
  const template = `<cs-textarea value="value" label="label" disabled></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  const textarea = element.shadowRoot!.querySelector('textarea');

  expect(textarea).to.have.attribute('disabled');
});

it('renders the textarea with a placeholder when attribute `placeholder` is set', async () => {
  const template = `<cs-textarea value="" label="label" placeholder="placeholder"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  const textarea = element.shadowRoot!.querySelector('textarea');

  expect(textarea).to.have.attribute('placeholder', 'placeholder');
});

it('renders `required` on textarea when set and displays an asterisk next to the label', async () => {
  const template = `<cs-textarea value="value" label="label" required></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  const textarea = element.shadowRoot!.querySelector('textarea');

  expect(textarea).to.have.attribute('required');

  expect(element.shadowRoot!.querySelector('[data-test-label-required]')).to
    .exist;
});

it('renders a `name` attribute on the textarea when set', async () => {
  const template = `<cs-textarea value="value" label="label" name="test-name"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  const textarea = element.shadowRoot!.querySelector('textarea');

  expect(textarea).to.have.attribute('name', 'test-name');
});

it('supports a "tooltip" slot', async () => {
  const template = `
    <cs-textarea value="value" label="label" required>
      <div slot="tooltip">Tooltip</div>
    </cs-textarea>
  `;

  const element = await fixture<CsTextarea>(template);

  const assignedElements = element.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('places the tooltip on bottom when the label is on the left', async () => {
  const template = `
    <cs-textarea value="value" label="label" required>
      <div slot="tooltip">Tooltip</div>
    </cs-textarea>
  `;

  const element = await fixture<CsTextarea>(template);
  const tooltip = element.shadowRoot?.querySelector('cs-tooltip');

  expect(tooltip?.placement).to.equal('bottom');
});

it('places the tooltip on the left when the label is on top', async () => {
  const template = `
    <cs-textarea value="value" label="label" label-position="top" required>
      <div slot="tooltip">Tooltip</div>
    </cs-textarea>
  `;

  const element = await fixture<CsTextarea>(template);
  const tooltip = element.shadowRoot?.querySelector('cs-tooltip');

  expect(tooltip?.placement).to.equal('left');
});

it('renders a slot with description', async () => {
  const template = `<cs-textarea value="value" label="label"><span slot="description" data-test-content>Description</slot></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  expect(element).to.exist;

  const contentRendered = element.querySelector('[data-test-content]');
  expect(contentRendered).to.exist;
  expect(contentRendered?.textContent).to.be.equal('Description');
});

it('renders a character count when attribute `max-character-count` is set greater than zero', async () => {
  const template = `<cs-textarea value="value" label="label" max-character-count="10"><span slot="description">Description</span></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);

  const container = element.shadowRoot!.querySelector(
    '[data-test-max-character-count]',
  );

  expect(container?.textContent?.trim()).to.be.equal('5/10');
});

it('does not render a character count when attribute `max-character-count` is set less than than zero', async () => {
  const template = `<cs-textarea value="value" label="label" max-character-count="0"><span slot="description" data-test-content>Description</span></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);

  const container = element.shadowRoot!.querySelector(
    '[data-test-description-container]',
  );

  expect(container?.textContent?.trim()).to.be.equal('');
});

it('renders error styling when the character count is greater than the `max-character-count` attribute', async () => {
  const template = `<cs-textarea value="value" label="label" max-character-count="3"><span slot="description" data-test-content>Description</span></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);

  const charCountContainer = element.shadowRoot!.querySelector(
    '[data-test-description-container] > [data-test-max-character-count][data-test-max-character-count--invalid-color]',
  );

  expect(charCountContainer).to.exist;
});

it('does not render error styling when the character count is less than the `max-character-count` attribute', async () => {
  const template = `<cs-textarea value="val" label="label" max-character-count="5"><span slot="description" data-test-content>Description</span></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);

  const charCountContainer = element.shadowRoot!.querySelector(
    '[data-test-description-container] > [data-test-max-character-count][data-test-max-character-count--invalid-color]',
  );

  expect(charCountContainer).to.be.null;
});

it('does not render error styling when the character count is equal to the `max-character-count` attribute', async () => {
  const template = `<cs-textarea value="val" label="label" max-character-count="3"><span slot="description" data-test-content>Description</span></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);

  const charCountContainer = element.shadowRoot!.querySelector(
    '[data-test-description-container] > [data-test-max-character-count][data-test-max-character-count--invalid-color]',
  );

  expect(charCountContainer).to.be.null;
});

it('focuses the textarea when the label is clicked', async () => {
  const template = `<cs-textarea value="value" label="label"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  const label = element.shadowRoot!.querySelector('label');
  label?.click();

  expect(element).to.have.focus;

  await expect(
    element.shadowRoot?.activeElement?.tagName.toLocaleLowerCase(),
  ).to.be.equal('textarea');
});

it('has tabbable textarea', async () => {
  const template = `<cs-textarea value="value" label="label"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  await sendKeys({ press: 'Tab' });

  expect(element).to.have.focus;

  await expect(
    element.shadowRoot?.activeElement?.tagName.toLocaleLowerCase(),
  ).to.be.equal('textarea');
});

it('renders text when typed into text area', async () => {
  const template = `<cs-textarea value="" label="label"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  const textarea = element.shadowRoot!.querySelector('textarea');
  element.focus();
  await sendKeys({ type: 'test text' });

  expect(textarea?.textContent).to.equal('test text');
});

it('returns the content of the textarea when getting the `value` property', async () => {
  const template = `<cs-textarea value="" label="label"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  element.focus();
  await sendKeys({ type: 'test text' });

  expect(element.value).to.equal('test text');
});

it('focuses the textarea when `focus` is called', async () => {
  const template = `<cs-textarea value="" label="label"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  element.focus();

  await expect(
    element.shadowRoot?.activeElement?.tagName.toLocaleLowerCase(),
  ).to.be.equal('textarea');
});

it('blurs the textarea when `blur` is called', async () => {
  const template = `<cs-textarea value="" label="label"></cs-textarea>`;
  const element = await fixture<CsTextarea>(template);
  element.focus();

  await expect(
    element.shadowRoot?.activeElement?.tagName.toLocaleLowerCase(),
  ).to.be.equal('textarea');

  element.blur();

  await expect(
    element.shadowRoot?.activeElement?.tagName.toLocaleLowerCase(),
  ).to.not.equal('textarea');
});
