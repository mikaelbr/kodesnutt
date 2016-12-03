// node first-class.js

function add (a, b) {
  return a + b;
}

console.log(typeof add);//=> function
console.log(add.name); //=> add

console.log(add.length); //=> 0
console.log(add(2, 5)); //=> 7

add.customProperty = 'foobar';
console.log(add);
