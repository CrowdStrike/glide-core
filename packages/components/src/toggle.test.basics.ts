import { expect, fixture, html } from '@open-wc/testing';
import CsToggle from './toggle.js';

CsToggle.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-toggle')).to.equal(CsToggle);
});

it('has defaults', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label"></cs-toggle>`,
  );

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.be.false;

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
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label">
      <div slot="tooltip">Tooltip</div>
      <div slot="description">Description</div>
    </cs-toggle>`,
  );

  await expect(component).to.be.accessible();
});

it('can have a label', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label"></cs-toggle> `,
  );

  expect(component.getAttribute('label')).to.equal('Label');
  expect(component.label).to.equal('Label');
});

it('can have a description', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label">
      <div slot="description">Description</div>
    </cs-toggle>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('can have a summary', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle summary="Summary"></cs-toggle> `,
  );

  expect(component.getAttribute('summary')).to.equal('Summary');
  expect(component.summary).to.equal('Summary');
});

it('can have a tooltip', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label">
      <div slot="tooltip">Tooltip</div>
    </cs-toggle>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('can be checked', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle checked></cs-toggle> `,
  );

  expect(component.hasAttribute('checked')).to.be.true;
  expect(component.checked).to.equal(true);
});

it('can be disabled', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle disabled></cs-toggle> `,
  );

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.equal(true);
});
