/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreTextarea from './textarea.js';

GlideCoreTextarea.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-textarea')).to.equal(
    GlideCoreTextarea,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
    ></glide-core-textarea>`,
  );

  await expect(component).to.be.accessible();
});

it('renders a textarea with two rows and value when attribute `value` is set ', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
    ></glide-core-textarea>`,
  );

  const textarea = component.shadowRoot!.querySelector('textarea');

  expect(component);
  expect(component?.getAttribute('rows')).to.equal('2');

  expect(textarea).to.exist;
  expect(textarea?.getAttribute('rows')).to.equal('2');
});

it('renders the `rows` attribute on the textarea when set', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
      rows="5"
    ></glide-core-textarea>`,
  );

  const textarea = component.shadowRoot!.querySelector('textarea');

  expect(textarea?.getAttribute('rows')).to.equal('5');
});

it('renders a label when attribute `label` is set', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
    ></glide-core-textarea>`,
  );

  const label = component.shadowRoot!.querySelector('label');

  expect(label).to.exist;
  expect(label?.textContent?.trim()).to.be.equal('label');
});

it('renders the textarea as readonly when attribute `readonly` is set', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
      readonly
    ></glide-core-textarea>`,
  );

  const textarea = component.shadowRoot!.querySelector('textarea');

  expect(textarea?.hasAttribute('readonly')).to.be.true;
});

it('renders the textarea as disabled when attribute `disabled` is set', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
      disabled
    ></glide-core-textarea>`,
  );

  const textarea = component.shadowRoot!.querySelector('textarea');

  expect(textarea?.hasAttribute('disabled')).to.be.true;
});

it('renders the textarea with a placeholder when attribute `placeholder` is set', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value=""
      label="label"
      placeholder="placeholder"
    ></glide-core-textarea>`,
  );

  const textarea = component.shadowRoot!.querySelector('textarea');

  expect(textarea?.getAttribute('placeholder')).to.equal('placeholder');
});

it('renders `required` on textarea when set', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
      required
    ></glide-core-textarea>`,
  );

  const textarea = component.shadowRoot!.querySelector('textarea');

  expect(textarea?.hasAttribute('required')).to.be.true;
});

it('renders a `name` attribute on the textarea when set', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
      name="test-name"
    ></glide-core-textarea>`,
  );

  const textarea = component.shadowRoot!.querySelector('textarea');

  expect(textarea?.getAttribute('name')).to.equal('test-name');
});

it('supports a "tooltip" slot', async () => {
  const component = await fixture<GlideCoreTextarea>(html`
    <glide-core-textarea value="value" label="label" required>
      <div slot="tooltip">Tooltip</div>
    </glide-core-textarea>
  `);

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('renders a slot with description', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea value="value" label="label"
      ><span slot="description" data-test-content
        >Description</span
      ></glide-core-textarea
    >`,
  );

  expect(component).to.exist;

  const contentRendered = component.querySelector('[data-test-content]');
  expect(contentRendered).to.exist;
  expect(contentRendered?.textContent).to.be.equal('Description');
});

it('displays visually hidden character count text for screenreaders', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      label="label"
      maxlength="10"
    ></glide-core-textarea>`,
  );

  const maxCharacterCountAnnouncement = component.shadowRoot?.querySelector(
    '[data-test="character-count-announcement"]',
  );

  expect(maxCharacterCountAnnouncement?.textContent?.trim()).to.equal(
    'Character count 0 of 10',
  );
});

it('renders a character count when attribute `maxlength` is set greater than zero', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea value="value" label="label" maxlength="10"
      ><span slot="description">Description</span></glide-core-textarea
    >`,
  );

  const container = component.shadowRoot!.querySelector(
    '[data-test="character-count-text"]',
  );

  expect(container?.textContent?.trim()).to.be.equal('5/10');
});

it('does not render a character count when attribute `maxlength` is set less than than zero', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea value="value" label="label" maxlength="0"
      ><span slot="description">Description</span></glide-core-textarea
    >`,
  );

  const container = component.shadowRoot?.querySelector(
    '[data-test="character-count-container"]',
  );

  expect(container).to.be.null;
});

it('focuses the textarea when the label is clicked', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
    ></glide-core-textarea>`,
  );

  await click(component.shadowRoot?.querySelector('label'));

  expect(component).to.have.focus;

  expect(
    component.shadowRoot?.activeElement?.tagName.toLocaleLowerCase(),
  ).to.be.equal('textarea');
});

it('has tabbable textarea', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
    ></glide-core-textarea>`,
  );

  await sendKeys({ press: 'Tab' });

  expect(component).to.have.focus;

  expect(
    component.shadowRoot?.activeElement?.tagName.toLocaleLowerCase(),
  ).to.be.equal('textarea');
});

it('renders text when typed into text area', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea value="" label="label"></glide-core-textarea>`,
  );

  const textarea = component.shadowRoot!.querySelector('textarea');
  component.focus();
  await sendKeys({ type: 'test text' });

  expect(textarea?.value).to.equal('test text');
});

it('returns the content of the textarea when getting the `value` property', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea value="" label="label"></glide-core-textarea>`,
  );

  component.focus();
  await sendKeys({ type: 'test text' });

  expect(component.value).to.equal('test text');
});

it('focuses the textarea when `focus()` is called', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea value="" label="label"></glide-core-textarea>`,
  );

  component.focus();

  expect(
    component.shadowRoot?.activeElement?.tagName.toLocaleLowerCase(),
  ).to.be.equal('textarea');
});

it('blurs the textarea when `blur` is called', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea value="" label="label"></glide-core-textarea>`,
  );

  component.focus();

  expect(
    component.shadowRoot?.activeElement?.tagName.toLocaleLowerCase(),
  ).to.be.equal('textarea');

  component.blur();

  expect(
    component.shadowRoot?.activeElement?.tagName.toLocaleLowerCase(),
  ).to.not.equal('textarea');
});
