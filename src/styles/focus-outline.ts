import { unsafeCSS } from 'lit';

// At the time of writing, outline border radii in Figma are offset by 3px
// since in Figma they appear to be relative to some outer container, whereas
// here they are influenced by the element's border radius they are surrounding.

export default unsafeCSS(`
  outline: 2px solid var(--glide-core-border-focus);
  outline-offset: 1px;
`);
