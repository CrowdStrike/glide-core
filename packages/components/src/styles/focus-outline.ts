import { unsafeCSS } from 'lit';

export default unsafeCSS(`
  outline: 3px auto Highlight; /* Firefox */
  outline: 3px auto -webkit-focus-ring-color; /* Chrome and Safari */
`);
