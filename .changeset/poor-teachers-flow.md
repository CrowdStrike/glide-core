---
'@crowdstrike/glide-core': minor
---

- Tab's `active` attribute has been renamed to `selected` to align with Tree Item.

- Tab Group no longer dispatches a "tab-show" event.
  It instead dispatches a bubbling "selected" event from the activated Tab.
  The event's `target` property is set to that Tab.

  ```diff
  - tabGroup.addEventListener('tab-show', (event) => {
  -   console.log(event.detail.panel)
  - })

  + tabGroup.addEventListener('selected', (event) => {
  +   console.log(event.target)
  + })
  ```

- Tree no longer dispatches an "item-selected" event.
  It instead dispatches a bubbling "selected" event from the selected Tree Item.
  The event's `target` property is set to that Tree Item.

  ```diff
  - tree.addEventListener('item-selected', (event) => {
  -   console.log(event.detail.item)
  - })

  + tree.addEventListener('active', (event) => {
  +   console.log(event.target)
  + })
  ```
