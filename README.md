
<a href="https://www.vonage.com/">
    <img src="public/logo.png" alt="Vonage logo" title="Vonage" align="right" height="60" />
</a>

# js-nameless-events
Pick badges here: https://poser.pugx.org/

Library providing nameless events features.

## Table of content

- [Installation](#installation)
- [Usage](#Usage)
- [License](#license)
- [Links](#links)

## Installation

### Installation

``` bash
# Install dependencies
npm install @vonage/js-nameless-events
```

### Running tests

``` bash
# Running the tests
npm run test

# Running the test coverage
npm run coverage
```

# Usage

Event without data :

```ts
const onSomethingHappen = new EventEmitter();
onSomethingHappen.register(()=>console.log('Fire'));
onSomethingHappen.fire();
```

Event with data:

```ts
const onSomethingHappen = new EventEmitter<(a:number, b:number)=>void>();
onSomethingHappen.register((a:number, b:number)=>console.log(a, b));
onSomethingHappen.fire(1, 2); // 1, 2
```

Asynchronous event:

```ts
const onSomethingHappen = new EventEmitter<()=>Promise<void>>();
onSomethingHappen.register(async ()=> await somethingAsynchronous());
onSomethingHappen.fireAsync(); // Promise<void>
```

Cancelling registration:

```ts
const onSomethingHappen = new EventEmitter();
const registration = onSomethingHappen.register(async ()=> console.log("will never being called"));
registration.cancel();
onSomethingHappen.fire(); // do nothing
```

## License

This project is licensed under the terms of the [MIT license](https://opensource.org/licenses/MIT) and is available for free.

## Links

* [Documentation](https://github.com/Vonage/js-nameless-events/wiki)
* [Source code](https://github.com/Vonage/js-nameless-events)