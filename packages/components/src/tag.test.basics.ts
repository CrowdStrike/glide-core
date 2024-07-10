import { ArgumentError } from 'ow';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import GlideCoreTag from './tag.js';
import sinon from 'sinon';

GlideCoreTag.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-tag')).to.equal(GlideCoreTag);
});

it('is accessible', async () => {
  const element = await fixture(html`<glide-core-tag>Tag</glide-core-tag>`);
  // Wait for the animation to complete
  await aTimeout(200);

  await expect(element).to.be.accessible();
});

it('renders with default slot content', async () => {
  const element = await fixture(
    html`<glide-core-tag><span data-content>Tag</span></glide-core-tag>`,
  );

  expect(element).to.be.not.null;

  const container = element.shadowRoot?.querySelector('.component');
  expect(container).to.be.not.null;

  const contentRendered = element.querySelector('[data-content]');
  expect(contentRendered).to.be.not.null;
  expect(contentRendered?.textContent).to.be.equal('Tag');
});

it('does not render an icon button when "removable-label" attribute is not set', async () => {
  const element = await fixture(
    html`<glide-core-tag><span data-content>Tag</span></glide-core-tag>`,
  );

  expect(element).to.not.have.attribute('removable-label');

  const iconButton = element.shadowRoot?.querySelector('button');
  expect(iconButton).to.be.null;
});

it('renders an icon button with aria-label when "removable-label" attribute is set', async () => {
  const element = await fixture(
    html`<glide-core-tag removable-label="test-aria-label"
      ><span slot="prefix">Prefix</span
      ><span data-content>Tag</span></glide-core-tag
    >`,
  );

  expect(element).to.be.not.null;
  expect(element).to.have.attribute('removable-label', 'test-aria-label');

  const iconButton = element.shadowRoot?.querySelector('button');
  expect(iconButton).to.be.not.null;

  expect(iconButton).to.have.attribute(
    'aria-label',
    `Remove tag: test-aria-label`,
  );

  expect(iconButton).to.have.attribute('type', 'button');
});

it('renders the "prefix" slot and its content', async () => {
  const element = await fixture(
    html`<glide-core-tag
      ><span slot="prefix" data-prefix>test-prefix</span>Tag</glide-core-tag
    >`,
  );

  const prefixSlot = element.shadowRoot?.querySelector<HTMLSlotElement>(
    'slot[name="prefix"]',
  );

  expect(prefixSlot?.assignedNodes()?.length).to.be.equal(1);
  expect(document.querySelector('[data-prefix]')).to.be.not.null;

  expect(document.querySelector('[data-prefix]')?.textContent).to.be.equal(
    'test-prefix',
  );
});

it('renders correctly when the "size" attribute is set to "small"', async () => {
  const element = await fixture(
    html`<glide-core-tag removable-label="test-aria-label" size="small"
      ><span slot="prefix">Prefix</span
      ><span data-content>Tag</span></glide-core-tag
    >`,
  );

  const container = element.shadowRoot?.querySelector('.component');
  const iconButton = element.shadowRoot?.querySelector('button');

  expect(container).to.have.class('small');
  expect(iconButton).to.have.class('small');
});

it('renders correctly when the "size" attribute is set to "large"', async () => {
  const element = await fixture(
    html`<glide-core-tag removable-label="test-aria-label" size="large"
      ><span slot="prefix">Prefix</span
      ><span data-content>Tag</span></glide-core-tag
    >`,
  );

  const container = element.shadowRoot?.querySelector('.component');
  const iconButton = element.shadowRoot?.querySelector('button');

  expect(container).to.have.class('large');
  expect(iconButton).to.have.class('large');
});

it('throws an error when the default slot is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-tag></glide-core-tag>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('does not throw an error when the default slot is non-empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-tag>Tag</glide-core-tag>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.notCalled).to.be.true;
});

it('toggles the "activate" and "deactivate" clases when the button is clicked', async () => {
  const element = await fixture(
    html`<glide-core-tag removable-label="test-aria-label"
      ><span slot="prefix">Prefix</span>Tag</glide-core-tag
    >`,
  );

  const container = element.shadowRoot?.querySelector('.component');
  const iconButton = element.shadowRoot?.querySelector('button');

  expect(container).to.have.class('activate');

  iconButton?.click();

  expect(container).to.have.class('deactivate');
});

it('removes the tag from the DOM when the button is clicked', async () => {
  const element = await fixture<GlideCoreTag>(
    html`<glide-core-tag removable-label="test-aria-label"
      ><span slot="prefix">Prefix</span
      ><span data-content>Tag</span></glide-core-tag
    >`,
  );

  expect(element.shadowRoot?.querySelector('.component')).to.be.not.null;
  expect(document.querySelector('[data-content]')).to.be.not.null;

  element?.click();

  // Wait for the animation to complete
  await aTimeout(300);

  // the tag and its contents should be removed
  expect(document.querySelector('glide-core-tag')).to.be.null;
  expect(document.querySelector('[data-content]')).to.be.null;
});
