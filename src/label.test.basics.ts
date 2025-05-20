import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Label from './label.js';
import Tooltip from './tooltip.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class Subclassed extends Label {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-private-label')).to.equal(Label);
});

it('is accessible', async () => {
  const host = await fixture<Label>(
    html`<glide-core-private-label tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
      <div slot="description">Description</div>
    </glide-core-private-label>`,
  );

  await expect(host).to.be.accessible();
});

it('can be required', async () => {
  const host = await fixture<Label>(
    html`<glide-core-private-label required>
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  const label = host.shadowRoot?.querySelector('[data-test="required-symbol"]');
  expect(label?.textContent?.includes('*')).to.be.true;
});

it('places the tooltip on the bottom when horizontal', async () => {
  const host = await fixture<Label>(
    html`<glide-core-private-label tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  expect(
    host.shadowRoot?.querySelector<Tooltip>('[data-test="optional-tooltip"]')
      ?.placement,
  ).to.equal('bottom');
});

it('places the tooltip on the right when vertical', async () => {
  const host = await fixture<Label>(
    html`<glide-core-private-label orientation="vertical" tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  expect(
    host.shadowRoot?.querySelector<Tooltip>('[data-test="optional-tooltip"]')
      ?.placement,
  ).to.equal('right');
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-private-label
        ><input slot="control"
      /></glide-core-private-label>`,
    );
  });
});

it('throws when it does not have a "control" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-private-label>
        <label>Label</label>
      </glide-core-private-label>`,
    );
  });
});
