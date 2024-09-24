/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button-group.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButtonGroup from './button-group.js';
import GlideCoreButtonGroupButton from './button-group.button.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreButtonGroup.shadowRootOptions.mode = 'open';
GlideCoreButtonGroupButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-button-group')).to.equal(
    GlideCoreButtonGroup,
  );
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreButtonGroup>(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  expect(component.orientation).to.equal('horizontal');
  expect(component.variant).to.equal(undefined);
  expect(component.getAttribute('orientation')).to.equal('horizontal');
  expect(component).to.not.have.attribute('variant');
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  // It's unfortunate to ignore this rule. But the label doesn't meet color
  // contrast requirements.
  // Axe has an `ignoreTags` but no `ignoreSelectors`.
  await expect(component).to.be.accessible({
    ignoredRules: ['color-contrast'],
  });
});

it('can have a label', async () => {
  const component = await fixture(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const label = component.shadowRoot?.querySelector('[data-test="label"]');
  const radioGroup = component.shadowRoot?.querySelector('[role="radiogroup"]');

  expect(label?.textContent).to.equal('Label');
  expect(radioGroup?.getAttribute('aria-labelledby')).to.equal(label?.id);
});

it('sets the orientation of each button when horizontal', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');

  expect(buttons[0]?.privateOrientation).to.equal('horizontal');
  expect(buttons[1]?.privateOrientation).to.equal('horizontal');
});

it('sets the orientation of each button when vertical', async () => {
  await fixture(
    html`<glide-core-button-group orientation="vertical">
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');

  expect(buttons[0]?.privateOrientation).to.equal('vertical');
  expect(buttons[1]?.privateOrientation).to.equal('vertical');
});

it('sets `privateVariant` on each button', async () => {
  await fixture(
    html`<glide-core-button-group label="Label" variant="icon-only">
      <glide-core-button-group-button label="One">
        <div slot="icon">Icon</div>
      </glide-core-button-group-button>

      <glide-core-button-group-button label="Two">
        <div slot="icon">Icon</div>
      </glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');

  expect(buttons[0].privateVariant).to.equal('icon-only');
  expect(buttons[1].privateVariant).to.equal('icon-only');
});

it('throws when its default slot is the wrong type', async () => {
  await expectArgumentError(() => {
    return fixture(html`
      <glide-core-button-group label="Label">
        <div></div>
      </glide-core-button-group>
    `);
  });

  await expectArgumentError(() => {
    return fixture(
      html`<glide-core-button-group label="Label"> </glide-core-button-group>`,
    );
  });
});

it('selects the first button not disabled', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        disabled
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Three"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');

  expect(buttons[0].selected).to.be.false;
  expect(buttons[1].selected).to.be.true;
  expect(buttons[2].selected).to.be.false;
});

it('selects no buttons when all are disabled', async () => {
  await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        disabled
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
        disabled
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');

  expect(buttons[0].selected).to.be.false;
  expect(buttons[1].selected).to.be.false;
});
