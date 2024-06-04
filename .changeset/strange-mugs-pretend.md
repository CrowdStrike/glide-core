---
'@crowdstrike/glide-core-components': patch
---

Fixed a bug in Modal where a mousedown event would happen somewhere inside the modal, but the mouseup event would occur outside of the Modal. This would cause the Modal to close, which is not the expected behavior. By switching from a click event to a mousedown event, we get the expected behavior of remaining open.
