---
'@crowdstrike/glide-core': patch
---

Dropdown now supports creation of a new option while filtering.

When the user's filter query includes a space, a Create button will appear at the bottom of Dropdown's menu. Dropdown will remain open when the button is clicked and a "create" event will be dispatched. The event's `detail` property will be set to the user's filter query.

TODO
