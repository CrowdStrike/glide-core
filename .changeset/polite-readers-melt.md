---
'@crowdstrike/glide-core': minor
---

Dropdown no longer dispatches a `"filter"` event when filtering.

The `"filter"` event wasn't fully thought through and had a few shortcomings:

- There was no way for consumers to override Dropdown's default and synchronous filtering predicate.
- It required consumers to add and remove options from the DOM on `"filter"`.
  And the removal of a selected option when filtering a multiselect Dropdown meant the option's corresponding tag was also removed.

Replacing the event is `filter()` and its default implementation:

```ts
async filter(filter: string): Promise<GlideCoreDropdownOption[]> {
  const options = [...this.querySelectorAll('glide-core-dropdown-option')];

  return options.filter(({ label }) =>
    label.toLowerCase().includes(filter.toLowerCase().trim()),
  );
}
```

- You can override `filter()` with whatever filtering logic you need.
- The options you return in `filter()` will be shown. All others will be hidden.
- `filter()` must return a promise.
  Dropdown will wait for it to resolve before showing and hiding options in case you're fetching them or your filtering logic lives on the server.
