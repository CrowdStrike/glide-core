---
'@crowdstrike/glide-core': patch
---

### Dropdown

- The tag overflow button is now updated when a selected Dropdown Option is enabled or disabled.
- Dropdown now reverts its `value` and Dropdown Options revert back to their initial `selected` state when `reset()` is called on the form.
- Selected Dropdown Options whose `value` is an empty string now appear as selected.
- Only the last selected option is presented to screenreaders as selected when single-select and multiple options are initially selected.
- Tags now appear in the order that Dropdown Options are selected by the user.
- Removing a tag via Enter no longer submits the form.
- Disabled Dropdown Options are now enabled when selected programmatically.

- The first option is now activated option when `multiple` is set to `false` programmatically and Dropdown is reopened after Select All was previously active. Previously, no option was activated.

- When a Dropdown Option is disabled programmatically and more than one selected Dropdown Option has the same `value`, Dropdown now only removes the value corresponding to the disabled Dropdown Option from `value`.

- When `value` is set programmatically, only the first Dropdown Option with a matching value is now selected instead of every Dropdown Option with a matching value.

- Dropdown's input field is now populated with the `label` of the last selected Dropdown Option when filterable and `multiple` is set to `false` programmatically.

### Tab Group

- The trailing overflow button is no longer incorrectly enabled in a rare case.
