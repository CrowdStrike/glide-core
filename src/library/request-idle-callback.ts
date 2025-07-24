export default function () {
  return new Promise((resolve) => {
    requestIdleCallback(resolve);
  });
}
