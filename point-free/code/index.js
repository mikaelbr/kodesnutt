const R = require('ramda');

function sum(l) {
  return l.reduce((a, b) => a + b, 0);
}
function sumsum(ll) {
  return sum(ll.map(l => sum(l)));
}
console.log(sumsum([[1, 2], [3, 4]])); //=> 10

// vs tacit style:

const _sum = R.reduce(R.add, 0);
const _sumsum = R.compose(_sum, R.map(_sum));
console.log(_sumsum([[1, 2], [3, 4]])); //=> 10







