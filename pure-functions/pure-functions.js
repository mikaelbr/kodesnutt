// Helpers for better logging in Node.js
let util = require('util');
let log = obj =>
  console.log(util.inspect(obj, { colors: true }));
function assertEqual(a, b) {
  let isEqual = a === b;
  let color = isEqual ? '\x1b[32m' : '\x1b[31m';
  let operator = isEqual ? '===' : '!==';
  console.log(`${color}%s\x1b[0m`, `${a} ${operator} ${b}`);
}
// Helpers end

// === Not-reproducable functions

function doSomething(a) {
  return Math.random() + a;
}

log(doSomething(1)); //=> 1.5202367769844796
log(doSomething(1)); //=> 1.600921003313403

// Hard to test.
assertEqual(doSomething(1), 1.5202367769844796);
assertEqual(doSomething(1), 1.5202367769844796);

// === More reproducable

function doSomething(a, modifier) {
  return modifier + a;
}

let random = Math.random();

log(doSomething(1, random)); //=> 1.5202367769844796
log(doSomething(1, random)); //=> 1.5202367769844796

// Hard to test.
assertEqual(doSomething(1, random), 1 + random);
assertEqual(doSomething(1, random), 1 + random);

// === Also with objects.

let obj = { foo: 'Hello' };
function doSomething(data) {
  obj.foo += ', World';
  return obj;
}

assertEqual(doSomething(obj).foo, 'Hello, World');
assertEqual(doSomething(obj).foo, 'Hello, World');

// === Introducing pure functions: No mutation, only input and output

function add(a, b) {
  return a + b;
}
assertEqual(add(3, 4), 7);
assertEqual(add(3, 4), 7);
assertEqual(add(3, 4), 7);

// Pure functions are always testable and stable.
// Given input it always return the same output.
// This is testable and self-documenting.

// === Impure functions

let c = 2;
function add(a, b) {
  return a + b + c;
}
assertEqual(add(3, 4), 7);
c = 3;
assertEqual(add(3, 4), 7);
assertEqual(add(3, 4), 7);

// === Referentially transparency

function add(a, b) {
  return a + b;
}
assertEqual(add(3, 4), 7);
assertEqual(add(3, 4), 7);
assertEqual(add(3, 4), 7);

// Same as

assertEqual(7, 7);
assertEqual(7, 7);
assertEqual(7, 7);
