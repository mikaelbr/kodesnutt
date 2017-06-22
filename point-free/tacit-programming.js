const R = require('ramda');

// Tacit. Often called point-free. Implicit or non-redundant code paradigm.
// Points are parameters/arguments, or non-free variables passed to functions.

function foo(point1, point2) {
  // Here point1 and point2 are actually redundant, just passed along
  console.log(point1, point2);
}

// We could write foo like this:

const foo2 = console.log;
foo2('First', 'Second');

// (And given that console.log can operate without context, this is the same)

// Now we have removed the points and they are no longer there.

// === If we had switched the argument order, we might think it's hard to do point free

function foo3(point2, point1) {
  console.log(point1, point2);
}

// But we could flip it:

const foo4 = R.flip(foo3);
foo4('First', 'Second');

// Alternative would have been

function foo5(point2, point1) {
  return foo3(point1, point2);
}

// Which is very verbose and doesn't add to the readability of the program.

// === Can look a bit contrived, but it happens alot. For instance with map:

// Without tacit

function sum(l) {
  return l.reduce((a, b) => a + b, 0);
}
console.log(sum([1, 2, 3]));

// Several layers of point-fullness. Starting with +

let add = (a, b) => a + b; // let add = (+)
function sum2(l) {
  return l.reduce(add, 0);
}
console.log(sum2([1, 2, 3]));

// === Still point full with `l`.
// We can create reduce function instead of bound to context to be more flexible

let add2 = (a, b) => a + b; // let add = (+)
let reduce = (l, fn, init) => [].reduce.call(l, fn, init);
function sum3(l) {
  return reduce(l, add2, 0);
}
console.log(sum3([1, 2, 3]));

// === Still with L, but we can avoid this by using partial application from the right

let add3 = (a, b) => a + b; // let add = (+)
let reduce2 = (l, fn, init) => [].reduce.call(l, fn, init);
let sum4 = R.partialRight(reduce2, [add3, 0]);
console.log(sum4([1, 2, 3]));

// But if we'd designed our function signature better, we could do this easier
// Just like in math were we isolate an unknown by it self, we do so with non-free variables
// (parameters passed in) and then we can partially apply them from left. By designing our
// functions this way we are open to point free programming. If we don't, we
// need to alter the function signature.

let add4 = (a, b) => a + b; // let add = (+)
let reduce3 = (fn, init, l) => [].reduce.call(l, fn, init);
let sum5 = R.partial(reduce3, [add4, 0]);
console.log(sum5([1, 2, 3]));

// === We could also avoid partial application if we curry instead

let add5 = (a, b) => a + b; // let add = (+)
let reduce4 = R.curry((fn, init, l) => [].reduce.call(l, fn, init));
let sum6 = reduce4(add5, 0);
console.log(sum6([1, 2, 3]));

// === If we have an API designed for tacit programming, by
// being curryable, and with correct argument order, we
// can create sum in a non-verbose, readable way.

let sum7 = R.reduce(R.add, 0);
console.log(sum7([1, 2, 3]));

// No redundant variables cluttering the readability. And we
// choose what we want to name. Only name the important
// parts, which adds value to our program. For instance,
// if we had a sum of sums, we could do:

let sum8 = R.reduce(R.add, 0);
let sumsum = R.compose(sum8, R.map(sum8));
// console.log(sumsum([[1], [2, 6], [3, 4]]));

console.log(sumsum([[1], [2, 6], [3, 4]]));
