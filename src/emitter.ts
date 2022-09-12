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
export class EventEmitter<C extends EventCallback = () => void> {
  private registrations: EventRegistration<C>[] = [];

  /**
   * Register a function to be called when the emitter fire event
   * @param callback Function to call
   * @returns Registration
   */
  public register(callback: C): EventRegistration<C> {
    const registration = new EventRegistration(this, callback);
    this.registrations.push(registration);
    return registration;
  }

  /**
   * Remove a registration from this emitter, it won't be call anymore when the emitter fire an event
   * @param registration Registration to remove
   */
  public unregister(registration: EventRegistration<C>) {
    const index = this.registrations.indexOf(registration);
    if (index !== -1) {
      this.registrations.splice(index, 1);
    }
  }

  /**
   * Fire an event, will call every registrations
   * @param data Data to use while firing the event
   */
  public fire(...data: Parameters<C>) {
    for (const registration of this.registrations) {
      registration.fire(data);
    }
  }

  /**
   * Fire an event asynchronously, will call every registrations.
   * Promise will be resolved after each registration resolved their.
   * Registration will be call in order, and one after one.
   * @param data Data to use while firing the event
   * @returns Promise resolved after every registration have being resolved
   */
  public async fireAsync(...data: Parameters<C>) {
    for (const registration of this.registrations) {
      await registration.fire(data);
    }
  }
}
