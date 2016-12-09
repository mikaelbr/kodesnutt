// node reduce.js

function reduce (arr, fn, initial) {
  const hasInitial = typeof initial === 'undefined';
  let result = typeof initial === 'undefined' ? arr[0] : initial;
  const arrLength = arr.length;
  const startPoint = hasInitial ? 1 : 0;

  for ( let i = startPoint; i < arrLength; i++ ) {
    result = fn(result, arr[i], i);
  }

  return result;
}

function add (a, b) {
  return a + b;
}
const arr = [1, 2, 3, 4];
const sum1 = arr.reduce(add, 5);
console.log(sum1); //=> 15

const sum2 = reduce(arr, add, 5);
console.log(sum2); //=> 15
