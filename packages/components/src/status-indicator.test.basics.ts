import './status-indicator.js';
import { expect, fixture, html } from '@open-wc/testing';
import CsStatusIndicator from './status-indicator.js';

CsStatusIndicator.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-status-indicator')).to.equal(
    CsStatusIndicator,
  );
});

it('is accessible', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator></cs-status-indicator>`,
  );

  await expect(component).to.be.accessible();
});

it('renders a failed variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator variant="failed"></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('failed');
  expect(component.variant).to.equal('failed');
});

it('renders an idle variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator variant="idle"></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('idle');
  expect(component.variant).to.equal('idle');
});

it('renders an in-progress variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator variant="in-progress"></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('in-progress');
  expect(component.variant).to.equal('in-progress');
});

it('renders an queued variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator variant="queued"></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('queued');
  expect(component.variant).to.equal('queued');
});

it('renders an scheduled variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator variant="scheduled"></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('scheduled');
  expect(component.variant).to.equal('scheduled');
});

it('renders an success variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator variant="success"></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('success');
  expect(component.variant).to.equal('success');
});

it('renders an warning-critical variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator
      variant="warning-critical"
    ></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('warning-critical');
  expect(component.variant).to.equal('warning-critical');
});

it('renders an warning-high variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator variant="warning-high"></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('warning-high');
  expect(component.variant).to.equal('warning-high');
});

it('renders an warning-informational variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator
      variant="warning-informational"
    ></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('warning-informational');
  expect(component.variant).to.equal('warning-informational');
});

it('renders an warning-low variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator variant="warning-low"></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('warning-low');
  expect(component.variant).to.equal('warning-low');
});

it('renders an warning-medium variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator variant="warning-medium"></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('warning-medium');
  expect(component.variant).to.equal('warning-medium');
});

it('renders an warning-zero variant', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator variant="warning-zero"></cs-status-indicator>`,
  );

  expect(component.getAttribute('variant')).to.equal('warning-zero');
  expect(component.variant).to.equal('warning-zero');
});

it('sets the size of the element based on the "--size" CSS variable', async () => {
  const component = await fixture<CsStatusIndicator>(
    html`<cs-status-indicator style="--size: 750px"></cs-status-indicator>`,
  );

  expect(component.shadowRoot?.querySelector('svg')?.clientHeight).to.equal(
    750,
  );

  expect(component.shadowRoot?.querySelector('svg')?.clientWidth).to.equal(750);
});
