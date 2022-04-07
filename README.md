# HowTo RxJS(Reactive Extensions For JavaScript)

## ECMA Observable

The `Observable` type can be used to model push-based data sources such as DOM envents, timer intervals, and sockets.

## Example: Observing Keyboard Events

Using the `Observable` constructor, we can create a function which returns an observable stream of events for an arbitrary DOM element and event type.

```js
function listen(element, eventName) {
  return new Observable(observer => {
    // Create an event hadler which sends data to the sink
    let handler = (event) => observer.next(event);

    // Attach the event handler
    element.addEventListener(eventName, hanler, true);

    // Return a cleanup function which will cancel the event stream
    return () => {
      // Detach the event handler from the element
      element.removeEventListener(eventName, handler, true);
    };
  });
}
```

We can then use standard combinators to filter and map the events in the stream, just like we would with an array.

```js
// Return an observable of special key down commands
function commandKeys(element) {
  let keyCommands = { "38": "up", "40": "down" };

  return listen(element, "keydown")
    .filter(event => event.keyCode in keyCommands)
    .map(event => keyCommands[event.keyCode]);
}
```

When we want to consume the event strem, we subscribe with an `observer`.

```js
let subscription = commandKeys(inputElement).subscribe({
  next(val) {
    console.log("Received key command: " + val);
  },
  error(err) {
    console.log("Received an error: " + err);
  },
  complete() {
    console.log("Strema complete");
  },
});
```

The object returned by `subscribe` will allow us to cancel the subscription at any time. Upon cancelation, the Observable's cleanup function will be executed.

```js
// After calling this function, no more events will be sent
subscription.unsubscribe();
```

## CDN

```html
<script src="https://unpkg.com/rxjs@^7/dist/bundles/rxjs.umd.min.js"></script>
```

```js
const { range } = rxjs;
const { filter, map } = rxjs.operators;

range(1, 200)
  .pipe(
    filter(x => x % 2 === 1),
    map(x => x + x)
  )
  .subscribe(x => console.log(x));
```

## References

- [RxJS API Documentation](https://rxjs.dev/api)
