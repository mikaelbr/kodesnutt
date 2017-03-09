// === Arrays are objects
console.log(typeof []); //=> object

// Proper check if its a list
console.log(Array.isArray([])); //=> true
console.log(Array.isArray({})); //=> false
console.log(Array.isArray({ length: 4 })); //=> false


// === Arrays are mutable
var arr = [1, 2, 3];
arr[1] = 42;
console.log(arr); //=> [1, 42, 3]


// Shares reference
function delayedLog (arr) {
  setTimeout(() => console.log(arr), 0);
}

var arr = [1, 2, 3];
delayedLog(arr); //=> [1, 42, 3]
arr[1] = 42;


// Many built in tools mutate the array. Like push/pop

var arr = [1, 2, 3];
console.log(arr.push(42, 50)); //=> 5 <- new array length
console.log(arr.pop()); //=> 50 <- popped element
console.log(arr); //=> [-5, 1, 2, 3, 42]

// Same for shift/unshift

var arr = [1, 2, 3];
console.log(arr.unshift(-10, -5)); //=> 5 <- new array length
console.log(arr.shift()); //=> -10 <- shifted element
console.log(arr);

Also with other array functions

var arr = [1, 2, 3];
console.log(arr.reverse()); //=> [3, 2, 1]
console.log(arr); //=> [3, 2, 1]


// Others do not
var arr = [1, 2, 3];
console.log(arr.slice(0, 1)); //=> [1]
console.log(arr); //=> [1, 2, 3]


// === How to avoid mutation?

// Don't do push, do concat
var arr = [1, 2, 3];
var arr2 = arr.concat(42);
console.log(arr); //=> [1, 2, 3];
console.log(arr2); //=> [1, 2, 3, 42]
console.log(arr.concat(42, 50)); //=> [1, 2, 3, 42, 50]

// Concat is for joining two or more Arrays

console.log([1, 2].concat([3, 4], [42, 50])); //=> [1, 2, 3, 4, 42, 50]


// Don't do unshift, do concat
var arr = [1, 2, 3];
var arr2 = [-10, -5].concat(arr);
console.log(arr2); //=> [-10, -5, 1, 2, 3]

// If you have to, shallow copy a list:

var arr = [1, 2, 3];
console.log(arr.slice().reverse()); //=> [3, 2, 1]
console.log(arr); //=> [1, 2, 3]
