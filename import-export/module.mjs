console.log('Hello from module!');

// === Exporting one thing
export default function sayHello(name) {
  console.log('Hello,', name);
}

// === Can be declared somewhere else
function sayHello(name) {
  console.log('Hello,', name);
}
export default sayHello; // Notice semicolon here.

// === What if we want multiple things?
export function sayHello(name) {
  console.log('Hello,', name);
}
export function sayGoodbye(name) {
  console.log('Bye,', name);
}

// === Alternative way to export
function sayHello(name) {
  console.log('Hello,', name);
}
function sayGoodbye(name) {
  console.log('Bye,', name);
}
// export { sayHello, sayGoodbye };

// Or renamed
export {
  sayHello as hello,
  sayGoodbye as goodbye
};

// or values
export let v1 = 1,
  v2 = 2,
  v3;

// === Default and named
export default function saySomething(name) {
  console.log('Something');
}
export function sayHello(name) {
  console.log('Hello,', name);
}
export function sayGoodbye(name) {
  console.log('Bye,', name);
}

// === Alternative way
function saySomething(name) {
  console.log('Something');
}
function sayHello(name) {
  console.log('Hello,', name);
}
function sayGoodbye(name) {
  console.log('Bye,', name);
}

export {
  saySomething as default,
  sayHello,
  sayGoodbye
};
