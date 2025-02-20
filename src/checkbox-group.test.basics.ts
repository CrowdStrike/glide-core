import './checkbox.js';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import expectWindowError from './library/expect-window-error.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreCheckboxGroup {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-checkbox-group')).to.equal(
    GlideCoreCheckboxGroup,
  );
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" tooltip="Tooltip">
      <glide-core-checkbox label="Label"></glide-core-checkbox>
      <div slot="description">Description</div>
    </glide-core-checkbox-group>`,
  );

  await expect(host).to.be.accessible();
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-checkbox-group>
        <glide-core-checkbox label="Label"></glide-core-checkbox>
      </glide-core-checkbox-group>`,
    );
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
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

it('throws when it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-checkbox-group
        label="Label"
      ></glide-core-checkbox-group>`,
    );
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-checkbox-group label="Label">
        <button>Button</button>
      </glide-core-checkbox-group>`,
    );
  });
});
