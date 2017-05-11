// Helpers for better logging in Node.js
let util = require('util');
let log = obj => console.log(util.inspect(obj, { colors: true }));

// === Strings in JavaScript

log('Hello, world!');
log("Hello, world!");

// === Not working with new lines

log("Hello,
World!");

// === Also with values inside
let world = 'World';
let a = 5;
let b = 3;
log('Hello, ' + world + '! And ' + a + ' + ' + b + ' = ' + a + b);
//=> Hello, World! And 5 + 3 = 53

// === Have to group to do precedence of operator to avoid type coercion

let world = 'World';
let a = 5;
let b = 3;
log('Hello, ' + world + '! And ' + a + ' + ' + b + ' = ' + (a + b));
//=> Hello, World! And 5 + 3 = 8

// === Third way to do strings in JavaScript: Template literals

log(`Hello, World!`);

// === Can refer to variables:

let world = 'World';
let a = 5;
let b = 3;
log(`Hello, ${world}!
 And ${a} + ${b} = ${a + b}`);
//=> Hello, World! And 5 + 3 = 8

// === Portals into JavaScript

let world = 'World';
let a = 5;
let b = 3;
log(`Hello, ${world + '...'}! And ${a} + ${
  b
} = ${function add(a, b) { return a + b; }(a, b)}`);
//=> Hello, World...! And 5 + 3 = 8

// === Handles expressions, not statements.

let world = 'World';
let a = 5;
let b = 3;
log(`Hello, ${world + '...'}! And ${a} + ${
  if (true) { b }
} = ${function add(a, b) { return a + b; }(a, b)}`);

// === Tagged Template Literals

function tag (str, val1) {
  log(str);
  log(val1);
  return str.join(val1);
}

let world = 'World';
log(tag`Hello, ${world}!`);

// === Can return other things than strings

function tag (str, val1) {
  log(str);
  log(val1);
  return () => str.join(val1);
}

let world = 'World';
log(tag`Hello, ${world}!`());

// === Tagged Template Literals as templates

function zip (arr1, arr2) {
  return arr1.reduce((acc, item, i) =>
    acc.concat([item, arr2[i]]), []);
}
function htmlTemplate (str, ...keys) {
  return function template (obj) {
    const values = keys.map(i => obj[i]);
    return zip(str, values).join('');
  };
}

let template = htmlTemplate`
  <h1>${'title'}</h1>
  <p>${'content'}</p>
`;
console.log(template({
  title: 'Hello, Alan Quatermain!',
  content: 'Have you seen Mina Harker?'
}));
