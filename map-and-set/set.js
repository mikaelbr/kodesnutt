let util = require('util');
let log = obj => console.log(util.inspect(obj, { colors: true }));

//=== Arrays are not unique (obviously)
let arr = [1, 2, 3, 3, 1, 4];
log(arr); //=> [1, 2, 3, 3, 1, 4]

//=== Sets are unique
let arr = new Set([1, 2, 3, 3, 1, 4]);
log(arr); //=> Set { 1, 2, 3, 4 }

//=== Add many duplicate items (mutation)
let arr = new Set([1, 2, 3, 3, 1, 4]);
arr.add(1).add(2).add(5);
log(arr); //=> Set { 1, 2, 3, 4, 5 }

//=== We can delete and check it has values
let arr = new Set([1, 2, 3, 3, 1, 4]);
log(arr.delete(1)); //=> true
log(arr.has(1)); //=> false
log(arr.has(2)); //=> true
log(arr); //=> Set { 2, 3, 4 }
arr.clear();
log(arr); //=> Set { }

//=== Can iterate
let arr = new Set([1, 2, 3, 3, 1, 4]);
arr.forEach(log);

for (let i of arr.values()) {
  log(i);
}

//=== Checks on SameValueZero, not SameValue
let arr = new Set([NaN, -0]);
log(arr.has(NaN)); //=> true
// Would maybe expect the above to be false as:
log(NaN === NaN); //=> false
// But SameValue say
log(Object.is(NaN, NaN)); //=> true

// However, as it is SameValueZero, this is also true:
log(arr.has(0)); //=> true
log(-0 === 0); //=> true
log(Object.is(-0, 0)); //=> false

//=== Make shallow copy by using spread
let arr = new Set([1, 2, 3, 3, 1, 4]);
let arr2 = new Set([...arr]);
arr.add(5);
log(arr2); //=> Set { 1, 2, 3, 4 }

//=== Can be used to find distinct values in array
let distinct = arr => [...new Set(arr)];
log(distinct([1, 2, 3, 3, 1, 4])); //=> [ 1, 2, 3, 4 ]
