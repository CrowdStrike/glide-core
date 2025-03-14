---
'@crowdstrike/glide-core': minor
---

Input's `pattern` validation now matches native behavior:

- Requires a full string `value` match instead of a partial match.
- Empty values are considered valid when `pattern` is present.
