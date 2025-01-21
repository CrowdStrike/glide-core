import './checkbox.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreCheckboxGroup.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-checkbox-group')).to.equal(
    GlideCoreCheckboxGroup,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" tooltip="Tooltip">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
      <div slot="description">Description</div>
    </glide-core-checkbox-group>`,
  );

  await expect(component).to.be.accessible();
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreCheckboxGroup>(
      html`<glide-core-checkbox-group
        label="Checkbox Group"
      ></glide-core-checkbox-group>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<GlideCoreCheckboxGroup>(
      html`<glide-core-checkbox-group label="Checkbox Group">
        <button>Button</button>
      </glide-core-checkbox-group>`,
    );
  });
});
