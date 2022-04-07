const { of, range, filter, map, reduce, scan } = require('rxjs');

test("of", () => {
  const data = ["red", "green", "blue"];
  let count = 0;
  of(...data)
  .subscribe({
    next(color) {
      expect(color).toBe(data[count++]);
    }
  });

  expect(count).toBe(data.length);
});

test("range", () => {
  let sum = 0;
  
  range(1, 10)
  .subscribe(v => sum += v); // subscribe() will be invoked 10 times.
  expect(sum).toBe(55);

  // reduce operator
  range(1, 10)
  .pipe(
    reduce((acc, v) => (acc + v), 0)
  )
  .subscribe(v => sum = v);
  expect(sum).toBe(55);

  // scan operator
  let observable = range(1, 10)
  .pipe(
    scan((acc, v) => (acc + v), 0)
  );
  observable.subscribe(v => sum = v);
  expect(sum).toBe(55);
  //observable.subscribe(v => );

  // filter operator
  let oddCount = 0;
  range(1, 10)
  .pipe(
    filter((v) => v % 2 === 1),
    reduce((acc) => (++acc), 0)
  )
  .subscribe(v => oddCount = v);
  expect(oddCount).toBe(5);

  // map operator
  let doubleSum = 0;
  range(1, 10)
  .pipe(
    map((v) => v * 2),
    reduce((acc, v) => (acc + v), 0)
  )
  .subscribe(v => doubleSum = v);
  expect(doubleSum).toBe(55 * 2);
});
