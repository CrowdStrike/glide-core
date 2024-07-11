import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreToggle from './toggle.js';

GlideCoreToggle.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-toggle')).to.equal(
    GlideCoreToggle,
  );
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.be.false;

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.getAttribute('aria-checked')).to.equal('false');

  expect(component.hasAttribute('disabled')).to.be.false;
  expect(component.disabled).to.be.false;

  expect(component.hasAttribute('hide-label')).to.be.false;
  expect(component.hideLabel).to.be.false;

  expect(component.getAttribute('orientation')).to.equal('horizontal');
  expect(component.orientation).to.equal('horizontal');

  expect(component.getAttribute('summary')).to.be.null;
  expect(component.summary).to.equal(undefined);
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label">
      <div slot="tooltip">Tooltip</div>
      <div slot="description">Description</div>
    </glide-core-toggle>`,
  );

  await expect(component).to.be.accessible();
});

it('can have a label', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle> `,
  );

  expect(component.getAttribute('label')).to.equal('Label');
  expect(component.label).to.equal('Label');
});

it('can have a description', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label">
      <div slot="description">Description</div>
    </glide-core-toggle>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('can have a summary', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle summary="Summary"></glide-core-toggle> `,
  );

  expect(component.getAttribute('summary')).to.equal('Summary');
  expect(component.summary).to.equal('Summary');
});

it('can have a tooltip', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label">
      <div slot="tooltip">Tooltip</div>
    </glide-core-toggle>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('can be checked', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle checked></glide-core-toggle> `,
  );

  expect(component.hasAttribute('checked')).to.be.true;
  expect(component.checked).to.equal(true);

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.getAttribute('aria-checked')).to.equal('true');
});

it('can be disabled', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle disabled></glide-core-toggle> `,
  );

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.equal(true);
});
