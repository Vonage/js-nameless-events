import { EventEmitter } from "./emitter";
import { EventCallback } from "./types";
/**
 * Registration to an EventEmitter
 */
export declare class EventRegistration<C extends EventCallback> {
    private readonly emitter;
    readonly callback: C;
    /**
     * @param emitter EventEmitter on which the registration is registered
     * @param callback Function to call when an event is fired
     */
    constructor(emitter: EventEmitter<C>, callback: C);
    /**
     * Call the registration callback
     * @param data Data to call with
     */
    fire(data: Parameters<C>): void;
    /**
     * Cancel the registration, it won't be call anymore by the emitter after that
     */
    cancel(): void;
}
