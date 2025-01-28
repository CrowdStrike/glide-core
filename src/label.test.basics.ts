import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreLabel from './label.js';
import './tooltip.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreLabel {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-private-label')).to.equal(
    GlideCoreLabel,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
      <div slot="description">Description</div>
    </glide-core-private-label>`,
  );

  await expect(component).to.be.accessible();
});

it('can be required', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label required>
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  const label = component.shadowRoot?.querySelector('[data-test="label"]');
  expect(label?.textContent?.includes('*')).to.be.true;
});

it('places the tooltip on the bottom when horizontal', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  expect(
    component.shadowRoot
      ?.querySelector('glide-core-tooltip')
      ?.getAttribute('placement'),
  ).to.equal('bottom');
});

it('places the tooltip on the right when vertical', async () => {
  const component = await fixture<GlideCoreLabel>(
    html`<glide-core-private-label orientation="vertical" tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  expect(
    component.shadowRoot
      ?.querySelector('glide-core-tooltip')
      ?.getAttribute('placement'),
  ).to.equal('right');
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-private-label
        ><input slot="control"
      /></glide-core-private-label>`,
    );
  });
});

it('throws if it does not have a "control" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-private-label>
        <label>Label</label>
      </glide-core-private-label>`,
    );
  });
});
