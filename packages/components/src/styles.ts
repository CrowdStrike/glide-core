import { unsafeCSS } from 'lit';

// `unsafeCSS` is used throughout. It's only unsafe when the passed
// styles aren't trusted. These are trusted. We've written them ourselves.

export const focusOutline = unsafeCSS(`
  outline: 3px auto Highlight; /* Firefox */
  outline: 3px auto -webkit-focus-ring-color; /* Chrome and Safari */
`);

export const visuallyHidden = unsafeCSS(`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
`);
