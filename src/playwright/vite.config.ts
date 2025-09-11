export default {
  optimizeDeps: {
    // We've been seeing cache misses in CI, causing tests to fail intermittently.
    //
    // The cause isn't clear and would take time to figure out. But it's also not worth
    // spending the time on given that determining the root cause likely wouldn't
    // change the solution.
    //
    // Still, if the issue crops up again despite having configured this option, we'll
    // just have to roll up our sleeves.
    noDiscovery: true,
  },
  server: {
    // Of no benefit in tests and likely to cause problems. We've already run into one:
    //
    // When you change a component while working on a test, Vite will rewrite the
    // component's import specifiers upon serving it, adding a cache busting query
    // parameter to each specifier.
    //
    // The parameter will cause your test to fail when you're testing a component that
    // imports itself, indirectly or otherwise.
    //
    // Option, for example, imports Menu, which imports Option:
    //
    // 1. `mount()` will programmatically import Option.
    // 2. The browser fill fetch and execute Menu, whose import specifier for Option
    //    will include the cache busting query parameter.
    // 3. Upon executing Menu, the browser will re-execute Option.
    // 4. Option will attempt to add itself to the custom elements registry again but
    //    will already be in it, causing the browser to throw.
    hmr: false,
  },
};
