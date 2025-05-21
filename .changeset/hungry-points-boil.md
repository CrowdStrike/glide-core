---
'@crowdstrike/glide-core': patch
---

## Dropdown

- The user's system preference for reduced motion is now respected when Dropdown is scrolled using the arrow keys.

- The first enabled Dropdown Option is now activated when the currently active Dropdown Option is disabled programmatically.

### Single-select

- When a Dropdown Option is selected and a new Dropdown Option with a `selected` attribute is added to Dropdown's default slot, only the last selected Dropdown Option now appears as selected.

- Dropdown's `value` and input field (if Dropdown is filterable) are now set to the `value` and `label` of the next last selected and enabled Dropdown Option when the previously last selected Dropdown Option is disabled programmatically. If no Dropdown Option is selected and enabled, Dropdown will clear its `value` and input field.

### Filterable

- `aria-activedescendant` is now set internally to an empty string when every Dropdown Option has been filtered out.

- There's no longer a stray ellipsis at the end of Dropdown's input field when Dropdown's input field is visually truncated then subsequently cleared by the user.

- A tooltip is no longer shown on Dropdown's input field when a Dropdown Option with a long label is selected then Dropdown is closed.

- The value of Dropdown's input field no longer changes to the `label` of a selected Dropdown Option when its `label` is changed programmatically and it isn't the last selected Dropdown Option.

- Single-select Dropdown's input field no longer retains the `label` of the previously selected Dropdown Option when the `label` of the now-selected Dropdown Option is an empty string.

- When the currently and previously active Dropdown Options are filtered out, the first Dropdown Option was activated even if it was disabled. Now the first enabled Dropdown Option is activated instead.
