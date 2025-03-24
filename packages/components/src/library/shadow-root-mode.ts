// This one-liner exists for code coverage purposes. Components
// can't inline the ternary because the alternate branch is
// untestable.
export default window.navigator.webdriver ? 'open' : 'closed';
