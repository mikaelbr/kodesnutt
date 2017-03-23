let util = require('util');
let log = obj => console.log(util.inspect(obj, { colors: true }));
let logFirstKey = obj => log(Object.keys(obj)[0]);
let logFirstKeyType = obj => log(typeof Object.keys(obj)[0]);

// === Objects
let myObject = {
  foo: 'Hello, World'
};

log(myObject.foo);
log(myObject['foo']);

// === Always strings for keys

let myObject = {
  0: 'Hello, World'
};

log(myObject[0]);
logFirstKey(myObject);
logFirstKeyType(myObject);

// === Except for Symbols

let symbol = Symbol('foo');
let myObject = {
  [symbol]: 'Hello, World'
};

log(myObject);
log(myObject[symbol]);
log(myObject.hasOwnProperty(symbol));

// === Map as an alternative

let myMap = new Map();
myMap.set('foo', 'Hello, World!');
log(myMap);

// === Map can hava any key type
let myMap = new Map();
myMap.set(0, 'Hello, World!');
myMap.set(Symbol('foo'), 'Bye, World!');
log(myMap);

// === Initiating new Maps

// Does't work
let myMap = new Map({
  0: 'Hello, World' // <- Would convert key to string
});

// Does work
let myMap = new Map([
  ['key', 'value'],
  [0, 'Hello, World'],
  [Symbol('foo'), 42]
]);

log(myMap);

// === Anything as key

let myMap = new Map();
let key = {};
myMap.set(key, 'Hello, World');
log(myMap); //=> Map { {} => 'Hello, World' }

// Goes by reference
myMap.delete({}); // doesn't match
log(myMap); //=> Map { {} => 'Hello, World' }

// This matches
myMap.delete(key); // doesn't match
log(myMap); //=> Map {}

// *Anything* as a key.
myMap.set(() => {}, 'Hello, World');
log(myMap); //=> Map { [Function] => 'Hello, World' }

// === Goes by value

let myMap = new Map();
var key = NaN;
myMap.set(key, 'Hello, World');
log(myMap.get(key)); //=> 'Hello, World'

// Even if this
log(key === key); //=> false

// Because it checks values, like:
log(Object.is(key, key)); //=> true

// === Can be iterated
let myMap = new Map([
  ['key', 'value'],
  [0, 'Hello, World'],
  [Symbol('foo'), 42]
]);

myMap.forEach(function(val, key) {
  console.log(key, val);
});

for (let [key, val] of myMap) {
  console.log(key, val);
}

for (let val of myMap.values()) {
  console.log(val);
}

for (let key of myMap.keys()) {
  console.log(key);
}

// === Can be iterated
let myMap = new Map([
  ['key', 'value'],
  [0, 'Hello, World'],
  [Symbol('foo'), 42]
]);

// Convert back to array
log([...myMap.values()]);
log([...myMap.keys()]);

log([...myMap]);
let copy = new Map([...myMap]);
