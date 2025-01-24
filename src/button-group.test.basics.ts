import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButtonGroup from './button-group.js';
import './button-group.button.js';
import expectWindowError from './library/expect-window-error.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-button-group')).to.equal(
    GlideCoreButtonGroup,
  );
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

it('sets the orientation of buttons when horizontal', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = component.querySelectorAll('glide-core-button-group-button');

  expect(buttons[0]?.privateOrientation).to.equal('horizontal');
  expect(buttons[1]?.privateOrientation).to.equal('horizontal');
});

it('sets the orientation of buttons when vertical', async () => {
  const component = await fixture(
    html`<glide-core-button-group orientation="vertical">
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = component.querySelectorAll('glide-core-button-group-button');

  expect(buttons[0]?.privateOrientation).to.equal('vertical');
  expect(buttons[1]?.privateOrientation).to.equal('vertical');
});

it('sets `privateVariant` on buttons', async () => {
  const component = await fixture(
    html`<glide-core-button-group label="Label" variant="icon-only">
      <glide-core-button-group-button label="One">
        <div slot="icon">Icon</div>
      </glide-core-button-group-button>

      <glide-core-button-group-button label="Two">
        <div slot="icon">Icon</div>
      </glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = component.querySelectorAll('glide-core-button-group-button');

  expect(buttons[0].privateVariant).to.equal('icon-only');
  expect(buttons[1].privateVariant).to.equal('icon-only');
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-button-group label="Label">
        <div></div>
      </glide-core-button-group>
    `);
  });

  await expectWindowError(() => {
    return fixture(
      html`<glide-core-button-group label="Label"> </glide-core-button-group>`,
    );
  });
});

it('selects the first button not disabled', async () => {
  const component = await fixture(
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

  const buttons = component.querySelectorAll('glide-core-button-group-button');

  expect(buttons[0].selected).to.be.false;
  expect(buttons[1].selected).to.be.true;
  expect(buttons[2].selected).to.be.false;
});

it('selects no buttons when all are disabled', async () => {
  const component = await fixture(
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

  const buttons = component.querySelectorAll('glide-core-button-group-button');

  expect(buttons[0].selected).to.be.false;
  expect(buttons[1].selected).to.be.false;
});
