import { EventEmitter } from "./emitter";
import { EventCallback } from "./types";

/**
 * Registration to an EventEmitter
 */
export class EventRegistration<C extends EventCallback> {
  /**
   * @param emitter EventEmitter on which the registration is registered
   * @param callback Function to call when an event is fired
   */
  constructor(
    private readonly emitter: EventEmitter<C>,
    public readonly callback: C
  ) {}

  /**
   * Call the registration callback
   * @param data Data to call with
   */
  public fire(data: Parameters<C>) {
    this.callback.apply(undefined, data);
  }

  /**
   * Cancel the registration, it won't be call anymore by the emitter after that
   */
  public cancel() {
    this.emitter.unregister(this);
  }
}
