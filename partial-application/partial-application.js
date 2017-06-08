// @ts-check

// === Arity of a function
function sum(a, b, c, d) {
  return a + b + c + d;
}
console.log(sum.length); //=> 4.

// Arity is the number of arguments a function expects.

// === Using closure to create a function reducing arity

function sum(a, b, c, d) {
  return a + b + c + d;
}
function sum42(c, d) {
  return sum(4, 2, c, d);
}
console.log(sum42(3, 4)); // <- 13

// sum42 here is a newly created function that has arity 2 instead of 4.
// it carries more semantics/intent as it has bound values. Kind of like
// a half painted picture is more concrete than a unpainted one.

// === A generic helper for reducing arity using closure

function fillFunction(fn, ...args) {
  return function(...innerArgs) {
    return fn(...args.concat(innerArgs));
  };
}
function sum(a, b, c, d) {
  return a + b + c + d;
}
const sum4 = fillFunction(sum, 4);
const sum42 = fillFunction(sum, 4, 2);
const sum423 = fillFunction(sum, 4, 2, 3);

console.log(sum4(2, 3, 4)); // <- 13
console.log(sum42(3, 4)); // <- 13
console.log(sum423(4)); // <- 13

// === Partial Application.
// Prepare a function for invoking a function by binding some arguments.
// Reducing function arity by arbitrary amount, creating a new function.
// Invoking is same as applying a function (application),
// partial apply will only fill function arguments.

function partial(fn, ...args) {
  return function(...innerArgs) {
    return fn(...args.concat(innerArgs));
  };
}

// Built in support also:

function sum(a, b, c, d) {
  return a + b + c + d;
}
const sum42 = sum.bind(null, 4, 2);
console.log(sum42(3, 4)); // <- 13

// === Can partially apply several times

function partial(fn, ...args) {
  return function(...innerArgs) {
    return fn(...args.concat(innerArgs));
  };
}
function sum(a, b, c, d) {
  return a + b + c + d;
}

const sum4 = partial(sum, 4);
const sum42 = partial(sum4, 2);
const sum423 = partial(sum42, 3);
console.log(sum423(4)); // <- 13

// === Very handy for callbacks

function partial(fn, ...args) {
  return function(...innerArgs) {
    return fn(...args.concat(innerArgs));
  };
}

function someAction(log) {
  log('Hello, World!');
}
someAction(partial(console.log, 'Some prefix:'));

// === Useful when mapping

function partial(fn, ...args) {
  return function(...innerArgs) {
    return fn(...args.concat(innerArgs));
  };
}
function add(a, b) {
  return a + b;
}

const result = [1, 2, 3, 4].map(partial(add, 2));
console.log(result);
