import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import CsTag from './tag.js';
import sinon from 'sinon';

CsTag.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-tag')).to.equal(CsTag);
});

it('is accessible', async () => {
  const element = await fixture(html`<cs-tag>Tag</cs-tag>`);
  // Wait for the animation to complete
  await aTimeout(300);

  await expect(element).to.be.accessible();
});

it('renders with default slot content', async () => {
  const element = await fixture(
    html`<cs-tag><span data-content>Tag</span></cs-tag>`,
  );
  expect(element).to.be.not.null;

  const container = element.shadowRoot?.querySelector('div.tag');
  expect(container).to.be.not.null;

  const contentRendered = element.querySelector('[data-content]');
  expect(contentRendered).to.be.not.null;
  expect(contentRendered?.textContent).to.be.equal('Tag');
});

it('does not render an icon button when "removableLabel" attribute is not set', async () => {
  const element = await fixture(
    html`<cs-tag><span data-content>Tag</span></cs-tag>`,
  );
  expect(element).to.not.have.attribute('removableLabel');

  const iconButton = element.shadowRoot?.querySelector('button');
  expect(iconButton).to.be.null;
});

it('renders an icon button with aria-label when "removableLabel" attribute is set', async () => {
  const element = await fixture(
    html`<cs-tag removableLabel="test-aria-label"
      ><span slot="prefix">Prefix</span><span data-content>Tag</span></cs-tag
    >`,
  );
  expect(element).to.be.not.null;
  expect(element).to.have.attribute('removableLabel', 'test-aria-label');

  const iconButton = element.shadowRoot?.querySelector('button');
  expect(iconButton).to.be.not.null;
  expect(iconButton).to.have.attribute('aria-label', `Remove test-aria-label`);
  expect(iconButton).to.have.attribute('type', 'button');
});

it('renders the "prefix" slot and its content', async () => {
  const element = await fixture(
    html`<cs-tag
      ><span slot="prefix" data-prefix>test-prefix</span>Tag</cs-tag
    >`,
  );
  const slot = element.shadowRoot?.querySelector<HTMLSlotElement>(
    'slot[name="prefix"]',
  );
  const assignedNodes = slot?.assignedNodes();

  expect(assignedNodes?.length).to.be.equal(1);
  expect(document.querySelector('[data-prefix]')).to.be.not.null;
  expect(document.querySelector('[data-prefix]')?.textContent).to.be.equal(
    'test-prefix',
  );
});

it('renders correctly when the "size" attribute is set to "small"', async () => {
  const element = await fixture(
    html`<cs-tag removableLabel="test-aria-label" size="small"
      ><span slot="prefix">Prefix</span><span data-content>Tag</span></cs-tag
    >`,
  );
  const container = element.shadowRoot?.querySelector('div.tag');
  const iconButton = element.shadowRoot?.querySelector('button');

  expect(container).to.have.class('small');
  expect(iconButton).to.have.class('small');
});

it('renders correctly when the "size" attribute is set to "large"', async () => {
  const element = await fixture(
    html`<cs-tag removableLabel="test-aria-label" size="large"
      ><span slot="prefix">Prefix</span><span data-content>Tag</span></cs-tag
    >`,
  );
  const container = element.shadowRoot?.querySelector('div.tag');
  const iconButton = element.shadowRoot?.querySelector('button');

  expect(container).to.have.class('large');
  expect(iconButton).to.have.class('large');
});

it('throws an error when the default slot is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<cs-tag></cs-tag>`);
  } catch {
    spy();
  }

  expect(spy.called).to.be.true;
});

it('does not throw an error when the default slot is non-empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<cs-tag>Tag</cs-tag>`);
  } catch {
    spy();
  }

  expect(spy.notCalled).to.be.true;
});

it('throws an error when the prefix slot is empty and a removable label is given', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<cs-tag removableLabel="test-aria-label" size="large">Tag</cs-tag>`,
    );
  } catch {
    spy();
  }

  expect(spy.called).to.be.true;
});

it('does not throw an error when the prefix slot is non-empty and a removable label is given', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<cs-tag removableLabel="test-aria-label" size="large"
        ><span slot="prefix">Prefix</span>Tag</cs-tag
      >`,
    );
  } catch {
    spy();
  }

  expect(spy.notCalled).to.be.true;
});

it('toggles the "activate" and "deactivate" clases when the button is clicked', async () => {
  const element = await fixture(
    html`<cs-tag removableLabel="test-aria-label"
      ><span slot="prefix">Prefix</span>Tag</cs-tag
    >`,
  );
  const container = element.shadowRoot?.querySelector('div.tag');
  const iconButton = element.shadowRoot?.querySelector('button');

  expect(container).to.have.class('activate');

  iconButton?.click();

  expect(container).to.have.class('deactivate');
});
