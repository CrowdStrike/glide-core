import type Ow from 'ow';

// Ow's `ow/dev-only` uses the same shim. However, it imports Ow conditionally
// and asynchronously, which makes it hard to typecheck. Ow also assumes the
// existence of `NODE_ENV` and that a bundler that inlines it, which we can't assume.
// Thus our own shim so that errors aren't thrown in production and Ow isn't bundled.
//
// https://github.com/sindresorhus/ow/blob/b48757a77047c26290332321290b714b7dc8c842/dev-only.js
const shim = new Proxy(() => {}, {
  get: () => shim,
  apply: () => shim,
}) as unknown as typeof Ow;

export const owSlot = shim;

export default shim;
