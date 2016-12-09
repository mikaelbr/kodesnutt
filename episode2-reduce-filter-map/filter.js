// node filter.js

function filter (arr, predicate) {
  return reduce(arr, function filterFunction (newArray, item, index) {
    return !predicate(item, index) ? newArray : newArray.concat(item);
  }, []);
}

function isEven (n) {
  return n % 2 === 0;
}

console.log([1, 2, 3, 4, 5].filter(isEven)); //=> [2, 4]
console.log(filter([1, 2, 3, 4, 5], isEven)); //=> [2, 4]

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
