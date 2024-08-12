/* eslint-disable @typescript-eslint/no-unused-expressions */

import './dropdown.option.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import { repeat } from 'lit/directives/repeat.js';
import GlideCoreDropdown from './dropdown.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

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

it('registers', async () => {
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
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.hasAttribute('disabled')).to.be.false;
  expect(component.disabled).to.equal(false);

  expect(component.getAttribute('name')).to.be.null;
  expect(component.name).to.equal(undefined);

  expect(component.hasAttribute('required')).to.be.false;
  expect(component.required).to.equal(false);

  expect(component.getAttribute('size')).to.equal('large');
  expect(component.size).to.equal('large');

  // Not reflected, so no attribute assertion is necessary.
  expect(component.value).to.deep.equal([]);
});

it('can be open', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.true;
  expect(component.hasAttribute('open')).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('can have a label', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.getAttribute('label')).to.equal('Label');
  expect(component.label).to.equal('Label');
});

it('can have a placeholder', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.getAttribute('placeholder')).to.equal('Placeholder');
  expect(component.placeholder).to.equal('Placeholder');
});

it('can have a description', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <div slot="description">Description</div>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('can have a tooltip', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
      <div slot="tooltip">Tooltip</div>
    </glide-core-dropdown>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('can have a `name`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      name="name"
    >
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.getAttribute('name')).to.equal('name');
  expect(component.name).to.equal('name');
});

it('can have a `size`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      size="small"
    >
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.getAttribute('size')).to.equal('small');
  expect(component.size).to.equal('small');

  const option = component.querySelector('glide-core-dropdown-option');
  expect(option?.privateSize).to.equal('small');
});

it('can be `disabled`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" disabled>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.equal(true);
});

it('can be `required`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.hasAttribute('required')).to.be.true;
  expect(component.required).to.equal(true);
});

it('can be `multiple`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
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

  expect(component.hasAttribute('multiple')).to.be.true;
  expect(component.multiple).to.equal(true);
});

it('can be `select-all`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.hasAttribute('select-all')).to.be.true;
  expect(component.selectAll).to.equal(true);
});

it('activates the first option when no options are initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
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

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the last selected option when options are initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.true;
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
              value="option"
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
