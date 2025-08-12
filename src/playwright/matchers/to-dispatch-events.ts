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
    action: () => Promise<void>,
    expectedEvents: Omit<SerializableEvent, 'timeStamp'>[],
  ) {
    await locator.evaluate((element, expectedEvents) => {
      // Sadly, there doesn't appear to be another way. We need to be certain that the
      // event listeners are in place before the action call is awaited. And the only
      // way to ensure that is for the matcher to first await this evaluation.
      //
      // Before you scoff, as I did, at adding a property to the window, consider how
      // useful this matcher is for testers. And consider whether this window nonsense
      // will be flaky or unreliable in any way.
      const windowWithEvents = window as typeof window & {
        events: SerializableEvent[];
      };

      windowWithEvents.events = [];

      // A Set to deduplicate events. So only one listener is added per event type.
      const eventTypes = new Set<string>(
        expectedEvents.map(({ type }) => type),
      );

      for (const type of eventTypes) {
        element.addEventListener(type, (event: Event) => {
          const windowWithEvents = window as typeof window & {
            events: SerializableEvent[];
          };

          windowWithEvents.events.push({
            bubbles: event.bubbles,
            cancelable: event.cancelable,
            composed: event.composed,
            defaultPrevented: event.defaultPrevented,
            timeStamp: event.timeStamp,
            type: event.type,
          });
        });
      }
    }, expectedEvents);

    await action();

    await new Promise((resolve) => {
      // Timeouts are obviously a source of flakiness. But actions can take some time
      // to run, especially in CI.
      //
      // Try increasing this number slightly if you see a test passing locally but
      // failing in CI. Most likely not enough time has passed for the listener to be
      // called after the action.
      //
      // The magic number is the lowest one that results in no flakiness. Any test that
      // uses this matcher will take at least as long as the timeout. So any number
      // higher than the magical one will result in an unnecessarily slow test.
      setTimeout(resolve, 1000);
    });

    const receivedEvents = await locator
      .evaluate(() => {
        const windowWithEvents = window as typeof window & {
          events: SerializableEvent[];
        };

        return windowWithEvents.events;
      })
      .then((receivedEvents) => {
        return (
          receivedEvents
            // The order in which the events were received matters because it should match the
            // order that browsers dispatch them. "input" events, for example, are always
            // dispatched before "change" events. So we sort before we compare the received
            // events to the expected ones.
            //
            // `>=` instead of simply `>` for because events dispatched by the browser often
            // have the exact same timestamp.
            //
            // For instance, if the component under test doesn't manually dispatch "input"
            // and "change" events and instead relies on those events to come from a native
            // checkbox. Then, under ideal conditions, the timestamps of those events will be
            // the same. And, if we didn't account for timestamp equality, then the test would
            // falsly fail.
            //
            // In my testing, events that are manually and sequentially dispatched never have
            // the same timestamp. However, after writing more tests, if we learn that those
            // events sometimes do have the same timestamp, we have two options:
            //
            // 1. Remove this functionality and don't assert event order given how few cases
            //    we need to assert it.
            // 2. Accept that, with enough test runs, the timestamps will eventually be unequal
            //    and a test will correctly fail.
            //
            // The latter option may seem unacceptable at first. But consider how low stakes
            // event order often is. If, say, Checkbox happens to dispatch "change" before
            // "input", would any bugs arise from it? Or is the order of those two events just
            // a nice-to-have in the spirit of aligning with native form controls?
            .toSorted((a, b) => (a.timeStamp >= b.timeStamp ? 1 : -1))
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

              // This matcher won't fail if a received event includes keys not in the expected
              // event. But, when it does fail, the error diff should only include keys being
              // asserted against so the tester isn't confused about what went wrong.
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
            })
        );
      });

    const hasTheRightEvents = expectedEvents.every((expectedEvent, index) => {
      const receivedEvent = receivedEvents[index];

      if (!receivedEvent) {
        return false;
      }

      return (
        receivedEvent &&
        receivedEvent.bubbles === expectedEvent.bubbles &&
        receivedEvent.cancelable === expectedEvent.cancelable &&
        receivedEvent.composed === expectedEvent.composed &&
        receivedEvent.defaultPrevented === expectedEvent.defaultPrevented &&
        receivedEvent.type === expectedEvent.type
      );
    });

    const hasTooManyOrTooFewEvents =
      receivedEvents.length !== expectedEvents.length;

    const message =
      hasTheRightEvents && !hasTooManyOrTooFewEvents
        ? () => ''
        : () =>
            this.utils.matcherHint('toDispatchEvents', 'locator', 'events') +
            '\n\n' +
            // Locators have a `toString()` implementation that serializes nicely.
            //
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            `Locator: ${locator.toString()}\n` +
            `${this.utils.printDiffOrStringify(
              expectedEvents,
              receivedEvents,
              'Expected',
              'Received',
              true,
            )}`;

    return {
      message,
      pass: hasTheRightEvents && !hasTooManyOrTooFewEvents,
      name: 'toDispatchEvents',
      actual: receivedEvents,
      expected: expectedEvents,
    };
  },
});
