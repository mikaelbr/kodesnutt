// @ts-check

// === Block Scope in block statements

if (true) {
  const foo = 'Hello';

  if (true) {
    const bar = 'Bye';
    console.log(foo); // <- Works as expected
  }
  console.log(bar); // <- Doesn't work. Not in scope.
}

// === Function scope

function outer() {
  const foo = 'Hello';
  function inner() {
    const bar = 'Bye';
    console.log(foo); // <- Works as expected
  }
  inner();
  console.log(bar); // <- Doesn't work. Not in scope.
}
outer();

// === Free variables (variables not defined by param or as local variables in function)

function outer() {
  const foo = 'Hello';
  function inner() {
    console.log(foo); // <- Free variable. Not declared in function body or as param.
  }
  inner();
}
outer();

// === Returning functions (higher order functions - see earlier episode)
// Free variables still available. Can access variables from the scope where it was defined.
// Functions remembering the variables declared in the scope where it's created.

function outer() {
  const foo = 'Hello';

  // In higher order functions. Returning a function
  return function inner() {
    console.log(foo); // <- Still works.
  };
}
const inner = outer(); // <- Returns function
inner(); // <- Has access to free variable `foo` from where it was created.

// === Examples of closure.

// - Create adder (state)

function adder(base) {
  // base is a free variable.
  return function add(n) {
    // n is a local variable.
    return base + n;
  };
}

const add2 = adder(2); // <- Returns function
console.log(add2(5)); // <- 7

// - Privacy (Module pattern)

function createModule(state) {
  const private = 'Private variable';
  return {
    api(inner) {
      console.log(private, state, inner);
    }
  };
}

const myModule = createModule('From arguments');
myModule.api('Inner value');
