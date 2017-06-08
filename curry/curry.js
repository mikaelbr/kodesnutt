// === Multiple partial application

function partial(fn, ...args) {
  return fn.bind(null, ...args);
}
function sum(a, b, c, d) {
  return a + b + c + d;
}
const sum42 = partial(sum, 4, 2);
const sum423 = partial(sum42, 3);
console.log(sum423(4));

// === Conditional continous partial application
// Instead of doing `partia` several time, we can convert
// function to a function that only invoke when all arguments
// are accepted.

function sum(a, b, c, d) {
  // <- Arity of 4. Takes 4 arguments
  return a + b + c + d;
}

const sum4 = sum(4); // <- 1 argument fulfilled. Missing 3
const sum42 = sum4(2); // <- 2 argument fulfilled. Missing 2
console.log(sum42(3, 4)); // <- 4 argument fulfilled. Missing 0
// ^ would return 13 as that is sum of 4 + 2 + 3 + 4

// === Partial Application until function is fulfilled.
// This is called currying.

function curry(fn) {
  const arity = fn.length;
  function currier(args) {
    return function curriedFn(...innerArgs) {
      const newArgs = args.concat(innerArgs);
      const isFulfilled = newArgs.length >= arity;
      return isFulfilled ? fn(...newArgs) : currier(newArgs);
    };
  }
  return currier([]);
}

function sum(a, b, c, d) {
  return a + b + c + d;
}

const curriedSum = curry(sum);
console.log(curriedSum(4, 2, 3, 4));
console.log(curriedSum(4)(2, 3)(4));
console.log(curriedSum(4, 2, 3)(4));

// === Doesn't work for rest args

function curry(fn, arity = fn.length) {
  function currier(args) {
    return function curriedFn(...innerArgs) {
      const newArgs = args.concat(innerArgs);
      const isFulfilled = newArgs.length >= arity;
      return isFulfilled ? fn(...newArgs) : currier(newArgs);
    };
  }
  return currier([]);
}
function sum(...args) {
  return args.reduce((a, b) => a + b);
}
const curriedSum = curry(sum, 4);
console.log(curriedSum(4, 2, 3, 4));
console.log(curriedSum(4)(2, 3)(4));
console.log(curriedSum(4, 2, 3)(4));
