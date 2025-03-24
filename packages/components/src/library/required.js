import { ReactiveElement, } from 'lit';
const isThrow = ['localhost', '127.0.0.1'].some((host) => {
    return window.location.host.includes(host);
});
class RequiredController {
    hostUpdate() {
        const isNullOrUndefined = 
        // @ts-expect-error `ReactiveControllerHost` doesn't have an index type.
        this.#host[this.#key] === undefined || this.#host[this.#key] === null;
        if (isNullOrUndefined && isThrow) {
            // We throw in `hostUpdate()` instead of `hostUpdated()`, which is called
            // after render, so it's obvious something has gone wrong. Sometimes a log
            // gets lost in the noise. A component that has failed to render has a better
            // chance of catching developers' attention.
            throw new TypeError(`Expected ${this.#name} to have a \`${this.#key}\` property.`);
        }
    }
    constructor(host, key, name) {
        host.addController(this);
        this.#host = host;
        this.#key = key;
        this.#name = name;
    }
    #host;
    #key;
    #name;
}
export default function (prototype, key) {
    if (Object.prototype.isPrototypeOf.call(ReactiveElement, prototype.constructor)) {
        const constructor = prototype.constructor;
        constructor.addInitializer((instance) => {
            new RequiredController(instance, key, prototype.constructor.name);
        });
    }
}
