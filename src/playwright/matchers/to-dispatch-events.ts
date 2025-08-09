import { type Locator, expect } from '@playwright/test';

interface SerializableEvent {
  bubbles: boolean;
  cancelable: boolean;
  composed: boolean;
  defaultPrevented: boolean;
  timeStamp: number;
  type: string;
}

export default expect.extend({
  async toDispatchEvents(
    locator: Locator,
    action: () => Promise<unknown>,
    expectedEvents: {
      bubbles?: boolean;
      cancelable?: boolean;
      composed?: boolean;
      defaultPrevented?: boolean;
      type: string;
    }[],
  ) {
    const receivedEventsPromise = locator.evaluate(async (element, events) => {
      const promises = events.map(async (event) => {
        const events: SerializableEvent[] = [];

        await new Promise<void>((resolve, reject) => {
          element.addEventListener(event.type, (event: Event) => {
            events.push({
              bubbles: event.bubbles,
              cancelable: event.cancelable,
              composed: event.composed,
              defaultPrevented: event.defaultPrevented,
              timeStamp: event.timeStamp,
              type: event.type,
            });

            resolve();
          });

          setTimeout(() => {
            // No need to reject with an `Error` given the rejection value is unused.
            //
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            reject(null);

            // The promise is resolved above when an event is dispatched. It also needs to be
            // resolved after a timeout because some tests assert that no events were
            // dispatched after an action.
            //
            // `1000` because actions can take some time to execute, especially in CI.
          }, 1000);
        });

        // Wait a tick to catch duplicate events, which tests assert against.
        return new Promise<SerializableEvent[]>((resolve) => {
          setTimeout(() => {
            resolve(events);
          });
        });
      });

      const results = await Promise.allSettled(promises);

      return results
        .filter(
          (result): result is PromiseFulfilledResult<SerializableEvent[]> => {
            return result.status === 'fulfilled';
          },
        )
        .flatMap(({ value }) => value);
    }, expectedEvents);

    await action();

    const receivedEvents = await receivedEventsPromise;

    const sortedAndMappedReceivedEvents = receivedEvents
      .toSorted((a, b) => {
        return a.timeStamp >= b.timeStamp ? 1 : -1;
      })
      .map((receivedEvent, index) => {
        const expectedEvent = expectedEvents[index];

        if (!expectedEvent) {
          return {
            bubbles: receivedEvent.bubbles,
            cancelable: receivedEvent.cancelable,
            composed: receivedEvent.composed,
            defaultPrevented: receivedEvent.defaultPrevented,
            type: receivedEvent.type,
          };
        }

        return Object.fromEntries(
          Object.entries(receivedEvent).filter(([key]) => {
            switch (key) {
              case 'bubbles': {
                return expectedEvent.bubbles !== undefined;
              }
              case 'cancelable': {
                return expectedEvent.cancelable !== undefined;
              }
              case 'composed': {
                return expectedEvent.composed !== undefined;
              }
              case 'defaultPrevented': {
                return expectedEvent.defaultPrevented !== undefined;
              }
              case 'type': {
                return true;
              }
            }
          }),
        );
      });

    const hasTooManyOrTooFewEvents =
      receivedEvents.length !== expectedEvents.length;

    const hasTheRightEvents = expectedEvents.every((expectedEvent, index) => {
      const receivedEvent = sortedAndMappedReceivedEvents[index];

      return (
        receivedEvent &&
        receivedEvent.bubbles === expectedEvent.bubbles &&
        receivedEvent.cancelable === expectedEvent.cancelable &&
        receivedEvent.composed === expectedEvent.composed &&
        receivedEvent.defaultPrevented === expectedEvent.defaultPrevented &&
        receivedEvent.type === expectedEvent.type
      );
    });

    const message =
      hasTheRightEvents && !hasTooManyOrTooFewEvents
        ? () => ''
        : () =>
            this.utils.matcherHint(
              'toDispatchEvents',
              sortedAndMappedReceivedEvents,
              expectedEvents,
            ) +
            '\n\n' +
            // Locators have a `toString()` implementation that serializes nicely.
            //
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            `Locator: ${locator.toString()}\n` +
            `${this.utils.printDiffOrStringify(
              expectedEvents,
              sortedAndMappedReceivedEvents,
              'Expected',
              'Received',
              true,
            )}`;

    return {
      message,
      pass: hasTheRightEvents && !hasTooManyOrTooFewEvents,
      name: 'toDispatchEvents',
      actual: sortedAndMappedReceivedEvents,
      expected: expectedEvents,
    };
  },
});
