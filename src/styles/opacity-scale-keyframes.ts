import { unsafeCSS } from 'lit';

// TODO: Write docs for these.

export const keyframes = unsafeCSS(`
    @keyframes opacity-and-scale {
      from {
        opacity: 0;
        transform: scale(0.95);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }
`);

export const animation = unsafeCSS(`
  animation: opacity-and-scale 250ms cubic-bezier(0.25, 0, 0.3, 1);
`);

export const disableAnimation = unsafeCSS(`animation: none !important;`);
