import { describe, vi, expect, it } from "vitest";
import { EventEmitter } from "../src/emitter";

describe("Emitter", () => {
  it("should call registration", async () => {
    const spyable = {
      callback: () => {},
    };
    const spy = vi.spyOn(spyable, "callback");
    const emitter = new EventEmitter();
    emitter.register(spyable.callback);

    expect(spy).not.toHaveBeenCalled();
    emitter.fire();
    expect(spy).toHaveBeenCalled();
  });

  it("should call multiple registrations", async () => {
    const spyable = {
      callback: () => {},
      callback2: () => {},
    };
    const spy = vi.spyOn(spyable, "callback");
    const spy2 = vi.spyOn(spyable, "callback2");
    const emitter = new EventEmitter();
    emitter.register(spyable.callback);
    emitter.register(spyable.callback2);

    expect(spy).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    emitter.fire();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it("should call with arguments", async () => {
    const emitter = new EventEmitter<(a: number, b: number) => void>();
    emitter.register((a: number, b: number) => {
      expect(a).toBe(1);
      expect(b).toBe(2);
    });
    emitter.fire(1, 2);
  });

  it("should cancel registration", async () => {
    const spyable = {
      callback: () => {},
      callback2: () => {},
      callback3: () => {},
    };
    const spy = vi.spyOn(spyable, "callback");
    const spy2 = vi.spyOn(spyable, "callback2");
    const spy3 = vi.spyOn(spyable, "callback3");
    const emitter = new EventEmitter();
    const registration1 = emitter.register(spyable.callback);
    const registration2 = emitter.register(spyable.callback2);
    emitter.register(spyable.callback3);

    expect(spy).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();

    registration1.cancel();
    emitter.unregister(registration2);
    emitter.fire();

    expect(spy).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it("should call asynchronously arguments", async () => {
    const spyable = {
      callback: async () => {},
      callback2: async () => {}, // we need at least 2 registration to test because first one is instantly call
    };
    const spy = vi.spyOn(spyable, "callback2");
    const emitter = new EventEmitter();
    emitter.register(spyable.callback);
    emitter.register(spyable.callback2);

    expect(spy).not.toHaveBeenCalled();
    const promise = emitter.fireAsync();
    expect(spy).not.toHaveBeenCalled();
    await promise;
    expect(spy).toHaveBeenCalled();
  });
});
