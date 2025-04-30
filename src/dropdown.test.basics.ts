import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreDropdown from './dropdown.js';
import './dropdown.option.js';
import expectWindowError from './library/expect-window-error.js';
import type GlideCoreTooltip from './tooltip.js';

// You'll notice quite a few duplicated tests among the "*.single.ts", "*.multiple.ts",
// and "*.filterable.ts" test suites. The thinking is that a test warrants
// duplication whenever Dropdown's internal logic isn't shared among all three
// of those states or if one state goes down a significantly different code path.
//
// There are still gaps. And there are exceptions to avoid excessive duplication
// for the sake of organization. Many of the tests in `dropdown.test.interactions.ts`,
// for example, don't apply to the filterable case and so aren't common among all
// three states. They nonetheless reside there because moving them out and
// duplicating them in both `dropdown.test.interactions.single.ts` and
// `dropdown.test.interactions.multiple.ts` would add a ton of test weight.

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreDropdown {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-dropdown')).to.equal(
    GlideCoreDropdown,
  );
});

it('can be open', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.shadowRoot?.querySelector('[data-test="options"]');
  expect(options?.checkVisibility()).to.be.true;
});

it('can be loading', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" loading open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const loading = host.shadowRoot?.querySelector('[data-test="loading"]');
  expect(loading?.checkVisibility()).to.be.true;
});

it('selects options when `value` is set initially', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" .value=${['two']}>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;

  // https://github.com/CrowdStrike/glide-core/pull/764#discussion_r1995792862
  expect(host.value).to.deep.equal(['two']);
});

it('gives selected options precedence over an initial `value`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" .value=${['two']}>
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(host.value).to.deep.equal(['one']);
});

it('cannot be open when disabled', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open disabled>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host?.shadowRoot?.querySelector('[data-test="options"]');
  expect(options?.checkVisibility()).to.be.false;
});

it('enables options when `value` is set initially', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" .value=${['one']}>
      <glide-core-dropdown-option
        label="one"
        value="one"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  expect(option?.disabled).to.be.false;
});

it('activates the first option when no options are initially selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the last selected option when options are initially selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.true;
});

it('is scrollable', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Four"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Five"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Six"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Seven"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Eight"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Nine"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Ten"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.shadowRoot?.querySelector('[data-test="options"]');
  assert(options);

  expect(options.scrollHeight).to.be.greaterThan(options.clientHeight);
});

it('is not scrollable', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Four"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Five"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Six"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Seven"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Eight"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Nine"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.shadowRoot?.querySelector('[data-test="options"]');
  assert(options);

  expect(options.scrollHeight).to.equal(options.clientHeight);
});

it('hides the tooltip of the active option when open', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const tooltip = host
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector<GlideCoreTooltip>('[data-test="tooltip"]');

  expect(tooltip?.open).to.be.false;
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-dropdown>
        <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      </glide-core-dropdown>`,
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

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-dropdown label="Label">
        <button>Button</button>
      </glide-core-dropdown>`,
    );
  });
});
