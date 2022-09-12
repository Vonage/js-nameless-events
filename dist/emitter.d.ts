import { EventRegistration } from "./registration";
import { EventCallback } from "./types";
/**
 * Provide feature to register callbacks and call them when fired.
 * @example
 * Simple example :
 * ```ts
 * const onSomethingHappen = new EventEmitter();
 * onSomethingHappen.register(()=>console.log('Fire'));
 * onSomethingHappen.fire();
 * ```
 *
 * Event with data:
 * ```ts
 * const onSomethingHappen = new EventEmitter<(a:number, b:number)=>void>();
 * onSomethingHappen.register((a:number, b:number)=>console.log(a, b));
 * onSomethingHappen.fire(1, 2); // 1, 2
 * ```
 *
 * Asynchronous event:
 * ```ts
 * const onSomethingHappen = new EventEmitter<()=>Promise<void>>();
 * onSomethingHappen.register(async ()=> await somethingAsynchronous());
 * onSomethingHappen.fireAsync(); // Promise<void>
 * ```
 *
 * Cancelling registration:
 * ```ts
 * const onSomethingHappen = new EventEmitter();
 * const registration = onSomethingHappen.register(async ()=> console.log("will never being called"));
 * registration.cancel();
 * onSomethingHappen.fire(); // do nothing
 * ```
 *
 */
export declare class EventEmitter<C extends EventCallback = () => void> {
    private registrations;
    /**
     * Register a function to be called when the emitter fire event
     * @param callback Function to call
     * @returns Registration
     */
    register(callback: C): EventRegistration<C>;
    /**
     * Remove a registration from this emitter, it won't be call anymore when the emitter fire an event
     * @param registration Registration to remove
     */
    unregister(registration: EventRegistration<C>): void;
    /**
     * Fire an event, will call every registrations
     * @param data Data to use while firing the event
     */
    fire(...data: Parameters<C>): void;
    /**
     * Fire an event asynchronously, will call every registrations.
     * Promise will be resolved after each registration resolved their.
     * Registration will be call in order, and one after one.
     * @param data Data to use while firing the event
     * @returns Promise resolved after every registration have being resolved
     */
    fireAsync(...data: Parameters<C>): Promise<void>;
}
