// Helpers for better logging in Node.js
let util = require('util');
let log = obj => console.log(util.inspect(obj, { colors: true }));

// === What is sameness?

// Equality is being equal worth in "status".
// Sameness is lack of variety / uniformity.

// === Four different equal/same algorithms in JS

// Equal
// Strict equal
// Same Value
// Same Value Zero

// === Three (+ 1) ways to check for equality and sameness in JS:

// Equal
log(1 == '1'); //=> true
// Strict equal / identity
log(1 === '1'); //=> false
// Object.is
log(Object.is(1, '1')); //=> false

// === Loose equal

// Works as expected if same type:
log(1 == 1); //=> true

// But can be tricky to manage in some cases, as it does type coercion
log(1 == '1'); //=> true

// Is symetric
log('1' == 1); //=> true

// === Quick on type coercion

log({} == '[object Object]'); //=> true
log([] == ''); //=> true
log([] == 0); //=> true
log(false == 0); //=> true

// This is as non-primitives are converted to primitives
// and booleans are converted to numbers.
// In case the type is equal it works as with strict equal.

// === Undefined and booleans

log(null == undefined); //=> true
log(false == ''); //=> true
log(false == 0); //=> true
log(false == undefined); //=> false
log(!undefined); // => true
log(!false); // => true
log(!''); // => true
log(!0); // => true

// === Strict equal

log(1 === '1'); //=> false
log(1 === 1); //=> false
log({} === '[object Object]'); //=> false
log([] === 0); //=> false
log(null === undefined); //=> false
log(false === ''); //=> false
log(false === 0); //=> false
log(false === undefined); //=> false

// This is why === is often considered safer.
// But in same cases you want ==. As in undefined == null

// === Case of NaN

log(NaN == NaN); //=> false
log(NaN === NaN); //=> false

log(0 == -0); //=> true
log(0 === -0); //=> true

// === Same Value

// In ES2015 Object.is was included to check for sameness
// Same as strict equal, but with:

log(Object.is(0, -1)); //=> false
log(Object.is(NaN, NaN)); //=> true

// === SameValueZero

// It's one more sameness algorithm in JavaScript
// Same as Object.is, but 0 and -0 are the same.
// Used by Maps and Sets, and string.includes

log(new Set([-0]).has(0)); //=> true
log(String.prototype.includes.call(0, -0)); //=> True

// === Equal objects

log({} == {}); //=> false
log({} === {}); //=> false
log(Object.is({}, {})); //=> false

// Always check for the content of objects unless
// you actually want to check the reference of the
// objects. Same goes for functions and arrays.
