// === Problem with passing many arguments.

const arrayOfStrings = ['1', '2', '3', '4'];
const arrayOfNumbers = arrayOfStrings.map(parseInt);
console.log(arrayOfNumbers);
//=> [ 1, NaN, NaN, NaN ]
// ???

// === Second argument of parseInt is radix:

console.log(parseInt('101', 2));
//=> 5, as it is binary

// === Second argument passed on map is index:

const arrayOfStrings = ['1', '2', '3', '4'];
const arrayOfNumbers = arrayOfStrings.map(parseInt);
arrayOfNumbers[0]; //-> parseInt('1', 0) => 1
arrayOfNumbers[1]; //-> parseInt('2', 1) => NaN
arrayOfNumbers[2]; //-> parseInt('3', 2) => NaN
arrayOfNumbers[3]; //-> parseInt('4', 3) => NaN

// === Can avoid it by using function.

const arrayOfStrings = ['1', '2', '3', '4'];
const arrayOfNumbers = arrayOfStrings.map(i => parseInt(i));
console.log(arrayOfNumbers);
//=> [ 1, 2, 3, 4 ]

// === Another way to solve this: Make the function unary.
// That is, a function with 1 in arity. Single argument function.

const arrayOfStrings = ['1', '2', '3', '4'];
const unary = fn => arg => fn(arg);

// No argument in second position, default value 10.
const parseDecimal = unary(parseInt);
const arrayOfNumbers = arrayOfStrings.map(parseDecimal);
console.log(arrayOfNumbers);
// => [ 1, 2, 3, 4 ]

// === But if we actually want binary? We can flip it and partial it!

let flip = fn => (a, b) => fn(b, a);
let partial = (fn, ...args) => (...inner) => fn(...args.concat(inner));

const arrayOfStrings = ['1', '101', '10', '111'];
const parseBinary = partial(flip(parseInt), 2);
const arrayOfBinary = arrayOfStrings.map(parseBinary);
console.log(arrayOfBinary);
// => [ 1, 5, 2, 7 ]
