import './split-link.js';

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitLink from './split-link.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreSplitLink.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-split-link')).to.equal(
    GlideCoreSplitLink,
  );
});

it('is accessible', async () => {
  const component = await fixture(html`
    <glide-core-split-link url="/">Link</glide-core-split-link>
  `);

  await expect(component).to.be.accessible();
});

it('renders a tabbable link with href with a label by default', async () => {
  const component = await fixture(html`
    <glide-core-split-link url="/">Link</glide-core-split-link>
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link).to.not.be.null;

  expect(link).to.have.attribute('tabindex', '0');
  expect(link).to.have.attribute('href', '/');

  expect(component?.textContent).to.equal('Link');
});

it('renders with size "large" and variant "primary" by default', async () => {
  const component = await fixture(html`
    <glide-core-split-link url="/">Link</glide-core-split-link>
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link?.classList.contains('large')).to.be.true;
  expect(link?.classList.contains('primary')).to.be.true;
});

it('adds "small" styling when the "size" attribute is "small" ', async () => {
  const component = await fixture(html`
    <glide-core-split-link size="small" url="/">Link</glide-core-split-link>
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link?.classList.contains('small')).to.be.true;
});

it('adds "secondary" styling when "variant" attribute is "secondary"', async () => {
  const component = await fixture(html`
    <glide-core-split-link variant="secondary" url="/"
      >Link</glide-core-split-link
    >
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link?.classList.contains('secondary')).to.be.true;
});

it('sets the link as untabbable when the "disabled" attribute exists', async () => {
  const component = await fixture(html`
    <glide-core-split-link disabled url="/">Link</glide-core-split-link>
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link).to.have.attribute('tabindex', '-1');
});

it('renders a prefix slot when given', async () => {
  const component = await fixture(html`
    <glide-core-split-link url="/"
      ><div slot="prefix">Prefix</div>
      Link</glide-core-split-link
    >
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link).to.not.be.null;

  expect(component.querySelector('[slot="prefix"]')?.textContent).to.equal(
    'Prefix',
  );
});

it('renders with prefix class when dynamically added and removed', async () => {
  const component = await fixture(html`
    <glide-core-split-link url="/"
      ><span slot="prefix">prefix</span>Link</glide-core-split-link
    >
  `);

  expect(document.querySelector('[slot="prefix"]')).to.be.not.null;

  expect([
    ...component.shadowRoot!.querySelector('[data-test="split-link"]')!
      .classList,
  ]).to.include('has-prefix');

  component.querySelector('[slot="prefix"]')?.remove();

  await elementUpdated(component);

  expect([
    ...component.shadowRoot!.querySelector('[data-test="split-link"]')!
      .classList,
  ]).to.not.include('has-prefix');
});

it('throws an error when there is no link label', async () => {
  await expectArgumentError(() =>
    fixture(html`<glide-core-split-link url="/"></glide-core-split-link>`),
  );
});

it('throws an error when there is something other than text is in the default slot', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-link url="#"
        ><div>test</div></glide-core-split-link
      >`,
    ),
  );
});
