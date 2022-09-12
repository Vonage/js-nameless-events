var e = Object.defineProperty;
var n = (s, t, i) => t in s ? e(s, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[t] = i;
var r = (s, t, i) => (n(s, typeof t != "symbol" ? t + "" : t, i), i);
class o {
  constructor(t, i) {
    this.emitter = t, this.callback = i;
  }
  fire(t) {
    this.callback.apply(void 0, t);
  }
  cancel() {
    this.emitter.unregister(this);
  }
}
class c {
  constructor() {
    r(this, "registrations", []);
  }
  register(t) {
    const i = new o(this, t);
    return this.registrations.push(i), i;
  }
  unregister(t) {
    const i = this.registrations.indexOf(t);
    i !== -1 && this.registrations.splice(i, 1);
  }
  fire(...t) {
    for (const i of this.registrations)
      i.fire(t);
  }
  async fireAsync(...t) {
    for (const i of this.registrations)
      await i.fire(t);
  }
}
export {
  c as EventEmitter,
  o as EventRegistration
};
