(function(t,e){typeof exports=="object"&&typeof module<"u"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t["js-nameless-events"]={}))})(this,function(t){"use strict";var a=Object.defineProperty;var f=(t,e,n)=>e in t?a(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var r=(t,e,n)=>(f(t,typeof e!="symbol"?e+"":e,n),n);class e{constructor(i,s){this.emitter=i,this.callback=s}fire(i){this.callback.apply(void 0,i)}cancel(){this.emitter.unregister(this)}}class n{constructor(){r(this,"registrations",[])}register(i){const s=new e(this,i);return this.registrations.push(s),s}unregister(i){const s=this.registrations.indexOf(i);s!==-1&&this.registrations.splice(s,1)}fire(...i){for(const s of this.registrations)s.fire(i)}async fireAsync(...i){for(const s of this.registrations)await s.fire(i)}}t.EventEmitter=n,t.EventRegistration=e,Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});