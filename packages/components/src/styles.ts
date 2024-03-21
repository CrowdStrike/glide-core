import { unsafeCSS } from 'lit';

// `unsafeCSS` is used throughout. It's only unsafe when the passed
// styles aren't trusted. These are trusted. We've written them ourselves.

export const focusOutline = unsafeCSS(`
  outline: 3px auto Highlight; /* Firefox */
  outline: 3px auto -webkit-focus-ring-color; /* Chrome and Safari */
`);

export const visuallyHidden = unsafeCSS(`
    border-width: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`);
