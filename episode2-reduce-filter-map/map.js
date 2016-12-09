// node map.js

function map (arr, mapper) {
  return reduce(arr, function mapFunction (newArray, item, index) {
    return newArray.concat(mapper(item, index, arr));
  }, []);
}

function double (n) {
  return n * 2;
}
console.log([4, 5].map(double)); //=> [8, 10]
console.log(map([4, 5], double));

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
