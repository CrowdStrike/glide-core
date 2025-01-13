/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ArgumentError } from 'ow';
import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { repeat } from 'lit/directives/repeat.js';
import sinon from 'sinon';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';
import expectArgumentError from './library/expect-argument-error.js';

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

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-dropdown')).to.equal(
    GlideCoreDropdown,
  );
});

it('has defaults', async () => {
  // Required attributes are supplied here and thus left unasserted below. The
  // idea is that this test shouldn't fail to typecheck if these templates are
  // eventually typechecked, which means supplying all required attributes and slots.
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.disabled).to.be.false;
  expect(component.filterable).to.be.false;
  expect(component.name).to.be.empty.string;
  expect(component.required).to.be.false;
  expect(component.size).to.equal('large');

  // Not reflected, so no attribute assertion is necessary.
  expect(component.value).to.deep.equal([]);
});

it('can be open', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.true;
  expect(component.hasAttribute('open')).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('cannot be open when disabled', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      disabled
    >
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component?.shadowRoot?.querySelector('[data-test="options"]');
  expect(options?.checkVisibility()).to.be.false;
});

it('can be filterable', async () => {
  const component = await fixture(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
    >
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.checkVisibility()).to.be.true;
});

it('activates the first option when no options are initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the last selected option when options are initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
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

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.true;
});

it('is scrollable', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
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

  const options = component.shadowRoot?.querySelector('[data-test="options"]');
  assert(options);

  expect(options.scrollHeight).to.be.greaterThan(options.clientHeight);
});

it('is not scrollable', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
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

  const options = component.shadowRoot?.querySelector('[data-test="options"]');
  assert(options);

  expect(options.scrollHeight).to.equal(options.clientHeight);
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<GlideCoreDropdown>(
      html`<glide-core-dropdown label="Label" placeholder="Placeholder">
        <button>Button</button>
      </glide-core-dropdown>`,
    );
  });
});

it('does not throw if the default slot only contains whitespace', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-dropdown label="Label" placeholder="Placeholder">
        ${repeat(
          [],
          () =>
            html`<glide-core-dropdown-option
              label="Option"
            ></glide-core-dropdown-option>`,
        )}
      </glide-core-dropdown>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(0);
});

it('hides the tooltip of the active option when open', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const component = await fixture(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const tooltip = component
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[data-test="tooltip"]');

  expect(tooltip?.checkVisibility()).to.be.false;
});
